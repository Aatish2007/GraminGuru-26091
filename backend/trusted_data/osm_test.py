"""
GraminGuru - OpenStreetMap / Overpass Helper

Purpose:
- Find nearby mapped places using OpenStreetMap.
- Classify places into:
    1. Direct business matches
    2. Potential retail outlets
    3. Markets / mandis
- Do NOT treat zero OSM results as zero real-world competition.

OSM is community-mapped data. It should be presented as mapped evidence,
not as a complete list of all businesses in an area.
"""

from __future__ import annotations

import math
import time
from typing import Any, Dict, List, Optional, Tuple

import requests


# ============================================================
# CONFIGURATION
# ============================================================

OVERPASS_SERVERS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
    "https://overpass.nchc.org.tw/api/interpreter",
]

REQUEST_TIMEOUT = 30
OVERPASS_TIMEOUT = 25

DEFAULT_RADIUS = 5000


# ============================================================
# BUSINESS CONFIGURATION
# ============================================================

BUSINESS_CONFIG = {

    "Dairy": {
        "direct_shop_tags": [
            "dairy",
            "milk",
            "cheese",
        ],

        "direct_keywords": [
            "dairy",
            "milk",
            "milk booth",
            "milk shop",
            "milk parlour",
            "milk parlor",
            "paneer",
            "curd",
            "dahi",
            "ghee",
            "lassi",
            "buttermilk",
            "chhachh",
            "chhach",
            "cheese",
        ],

        "retail_shop_tags": [
            "supermarket",
            "convenience",
            "general",
            "grocery",
            "department_store",
            "food",
        ],
    },

    "Tailoring": {
        "direct_shop_tags": [
            "tailor",
            "fabric",
            "clothes",
            "clothing",
            "fashion",
            "boutique",
        ],

        "direct_craft_tags": [
            "tailor",
        ],

        "direct_keywords": [
            "tailor",
            "tailoring",
            "silai",
            "silai center",
            "silai centre",
            "boutique",
            "fashion",
            "dress maker",
            "dressmaker",
        ],

        "retail_shop_tags": [
            "clothes",
            "clothing",
            "fabric",
            "fashion",
            "department_store",
        ],
    },

    "Kirana": {
        "direct_shop_tags": [
            "convenience",
            "supermarket",
            "general",
            "grocery",
            "department_store",
            "food",
        ],

        "direct_keywords": [
            "kirana",
            "grocery",
            "general store",
            "provision store",
            "provision",
            "mart",
            "supermarket",
            "departmental store",
            "department store",
        ],

        "retail_shop_tags": [
            "convenience",
            "supermarket",
            "general",
            "grocery",
            "department_store",
            "food",
        ],
    },

    "Poultry": {
        "direct_shop_tags": [
            "poultry",
            "animal_feed",
            "farm_supply",
        ],

        "direct_keywords": [
            "poultry",
            "chicken",
            "broiler",
            "egg",
            "eggs",
            "hatchery",
            "animal feed",
            "poultry feed",
            "feed store",
        ],

        "retail_shop_tags": [
            "farm_supply",
            "animal_feed",
            "food",
        ],
    },

    "SolarGrid": {
        "direct_shop_tags": [
            "electronics",
            "hardware",
            "electrical",
            "doityourself",
        ],

        "direct_keywords": [
            "solar",
            "solar panel",
            "solar panels",
            "solar energy",
            "photovoltaic",
            "pv",
            "inverter",
            "solar inverter",
        ],

        "retail_shop_tags": [
            "electronics",
            "hardware",
            "electrical",
        ],
    },

    "flourMill": {
        "direct_shop_tags": [
            "mill",
            "flour",
            "farm_supply",
        ],

        "direct_keywords": [
            "flour mill",
            "atta chakki",
            "atta mill",
            "rice mill",
            "grain mill",
            "agro",
            "agriculture",
            "farm supply",
            "feed mill",
        ],

        "retail_shop_tags": [
            "farm_supply",
            "agrarian",
            "food",
        ],
    },

    "Fishery": {
        "direct_shop_tags": [
            "seafood",
            "fishing",
            "fish",
        ],

        "direct_keywords": [
            "fish",
            "fisheries",
            "fishery",
            "seafood",
            "aquaculture",
            "prawn",
            "prawns",
            "shrimp",
        ],

        "retail_shop_tags": [
            "seafood",
            "fish",
            "food",
        ],
    },
}


# ============================================================
# COMMON RETAIL TAGS
# ============================================================

COMMON_RETAIL_TAGS = [
    "supermarket",
    "convenience",
    "general",
    "grocery",
    "department_store",
]


# ============================================================
# MARKET TAGS
# ============================================================

# IMPORTANT:
# supermarket is NOT included here.
#
# A supermarket is a retail outlet, not automatically a
# traditional market / mandi.

MARKET_SHOP_TAGS = [
    "market",
    "wholesale",
]

MARKET_AMENITY_TAGS = [
    "marketplace",
]

MARKET_KEYWORDS = [
    "market",
    "mandi",
    "sabzi mandi",
    "vegetable market",
    "grain market",
    "fruit market",
    "wholesale market",
]


# ============================================================
# HELPERS
# ============================================================

def _clean_text(value: Any) -> str:
    if value is None:
        return ""

    return str(value).strip()


def _normalise_text(value: Any) -> str:
    return _clean_text(value).lower()


def _contains_keyword(
    text: str,
    keywords: List[str],
) -> bool:

    text = _normalise_text(text)

    if not text:
        return False

    for keyword in keywords:

        keyword = _normalise_text(keyword)

        if keyword and keyword in text:
            return True

    return False


def _haversine_km(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
) -> float:

    earth_radius_km = 6371.0088

    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)

    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (
        math.sin(delta_phi / 2) ** 2
        + math.cos(phi1)
        * math.cos(phi2)
        * math.sin(delta_lambda / 2) ** 2
    )

    c = 2 * math.atan2(
        math.sqrt(a),
        math.sqrt(1 - a),
    )

    return earth_radius_km * c


def _element_coordinates(
    element: Dict[str, Any],
) -> Tuple[Optional[float], Optional[float]]:

    if element.get("type") == "node":

        lat = element.get("lat")
        lon = element.get("lon")

        if lat is not None and lon is not None:
            return float(lat), float(lon)

    center = element.get("center") or {}

    lat = center.get("lat")
    lon = center.get("lon")

    if lat is not None and lon is not None:
        return float(lat), float(lon)

    return None, None


def _place_name(
    tags: Dict[str, Any],
) -> str:

    for key in [
        "name",
        "official_name",
        "short_name",
        "brand",
        "operator",
    ]:

        value = _clean_text(tags.get(key))

        if value:
            return value

    return "Unnamed place"


def _collect_search_text(
    tags: Dict[str, Any],
) -> str:

    fields = [
        "name",
        "official_name",
        "short_name",
        "brand",
        "operator",
        "description",
        "product",
        "shop",
        "craft",
        "amenity",
    ]

    values = []

    for field in fields:

        value = _clean_text(tags.get(field))

        if value:
            values.append(value)

    return " ".join(values).lower()


# ============================================================
# CLASSIFICATION
# ============================================================

def _classify_business(
    tags: Dict[str, Any],
    business_type: str,
) -> str:

    config = BUSINESS_CONFIG.get(business_type)

    if not config:
        return "potential_retail"

    shop = _normalise_text(tags.get("shop"))
    craft = _normalise_text(tags.get("craft"))

    search_text = _collect_search_text(tags)

    direct_shop_tags = config.get(
        "direct_shop_tags",
        [],
    )

    direct_craft_tags = config.get(
        "direct_craft_tags",
        [],
    )

    direct_keywords = config.get(
        "direct_keywords",
        [],
    )

    retail_shop_tags = config.get(
        "retail_shop_tags",
        [],
    )

    # --------------------------------------------------------
    # 1. Direct shop tag
    # --------------------------------------------------------

    if shop in direct_shop_tags:
        return "direct"

    # --------------------------------------------------------
    # 2. Direct craft tag
    # --------------------------------------------------------

    if craft in direct_craft_tags:
        return "direct"

    # --------------------------------------------------------
    # 3. Strong keyword match
    # --------------------------------------------------------

    if _contains_keyword(
        search_text,
        direct_keywords,
    ):
        return "direct"

    # --------------------------------------------------------
    # 4. Generic retail outlet
    # --------------------------------------------------------

    if shop in retail_shop_tags:
        return "potential_retail"

    # --------------------------------------------------------
    # 5. Unknown place
    # --------------------------------------------------------

    return "other"


def _is_market(
    tags: Dict[str, Any],
) -> bool:

    shop = _normalise_text(tags.get("shop"))
    amenity = _normalise_text(tags.get("amenity"))
    name = _normalise_text(tags.get("name"))

    # --------------------------------------------------------
    # 1. Explicit OSM marketplace
    # --------------------------------------------------------

    if amenity in MARKET_AMENITY_TAGS:
        return True

    # --------------------------------------------------------
    # 2. Explicit market / wholesale shop tag
    # --------------------------------------------------------

    if shop in MARKET_SHOP_TAGS:
        return True

    # --------------------------------------------------------
    # 3. Market / mandi name
    # --------------------------------------------------------

    if _contains_keyword(
        name,
        MARKET_KEYWORDS,
    ):
        return True

    return False


# ============================================================
# OVERPASS QUERY BUILDERS
# ============================================================

def _build_targeted_query(
    latitude: float,
    longitude: float,
    radius: int,
    business_type: str,
) -> str:

    config = BUSINESS_CONFIG.get(
        business_type,
        {
            "direct_shop_tags": [],
            "direct_craft_tags": [],
            "retail_shop_tags": [],
        },
    )

    shop_tags = set()

    for tag in config.get(
        "direct_shop_tags",
        [],
    ):
        shop_tags.add(tag)

    for tag in config.get(
        "retail_shop_tags",
        [],
    ):
        shop_tags.add(tag)

    craft_tags = set(
        config.get(
            "direct_craft_tags",
            [],
        )
    )

    query_parts = []

    # --------------------------------------------------------
    # Shop-based search
    # --------------------------------------------------------

    for tag in sorted(shop_tags):

        query_parts.append(
            f'nwr["shop"="{tag}"]'
            f'(around:{radius},{latitude},{longitude});'
        )

    # --------------------------------------------------------
    # Craft-based search
    # --------------------------------------------------------

    for tag in sorted(craft_tags):

        query_parts.append(
            f'nwr["craft"="{tag}"]'
            f'(around:{radius},{latitude},{longitude});'
        )

    # --------------------------------------------------------
    # Explicit marketplaces
    # --------------------------------------------------------

    query_parts.append(
        f'nwr["amenity"="marketplace"]'
        f'(around:{radius},{latitude},{longitude});'
    )

    query = f"""
[out:json][timeout:{OVERPASS_TIMEOUT}];
(
{chr(10).join(query_parts)}
);
out center tags;
"""

    return query


def _build_fallback_query(
    latitude: float,
    longitude: float,
    radius: int,
) -> str:

    query = f"""
[out:json][timeout:{OVERPASS_TIMEOUT}];
(
    nwr["shop"](around:{radius},{latitude},{longitude});
    nwr["craft"](around:{radius},{latitude},{longitude});
    nwr["amenity"="marketplace"]
        (around:{radius},{latitude},{longitude});
    nwr["landuse"="retail"]
        (around:{radius},{latitude},{longitude});
);
out center tags;
"""

    return query


# ============================================================
# OVERPASS REQUEST
# ============================================================

def _run_overpass_query(
    query: str,
) -> Tuple[
    Optional[Dict[str, Any]],
    Optional[str],
]:

    headers = {
        "User-Agent": (
            "GraminGuru/1.0 "
            "(OSM market research prototype)"
        )
    }

    for index, server in enumerate(
        OVERPASS_SERVERS,
        start=1,
    ):

        print()
        print(
            f"[OSM] Attempt {index} "
            f"of {len(OVERPASS_SERVERS)}"
        )

        print(
            f"[OSM] Server: {server}"
        )

        try:

            response = requests.post(
                server,
                data=query,
                headers=headers,
                timeout=REQUEST_TIMEOUT,
            )

            print(
                f"[OSM] HTTP: "
                f"{response.status_code}"
            )

            if response.status_code != 200:

                print(
                    f"[OSM] Server returned HTTP "
                    f"{response.status_code}"
                )

                continue

            data = response.json()

            elements = data.get(
                "elements",
                [],
            )

            print(
                f"[OSM] Elements received: "
                f"{len(elements)}"
            )

            return data, server

        except requests.RequestException as exc:

            print(
                f"[OSM] Request error: "
                f"{exc}"
            )

        except ValueError as exc:

            print(
                f"[OSM] Invalid JSON response: "
                f"{exc}"
            )

        except Exception as exc:

            print(
                f"[OSM] Unexpected error: "
                f"{exc}"
            )

        time.sleep(0.5)

    return None, None


# ============================================================
# ELEMENT PROCESSING
# ============================================================

def _process_elements(
    elements: List[Dict[str, Any]],
    latitude: float,
    longitude: float,
    business_type: str,
) -> Tuple[
    List[Dict[str, Any]],
    List[Dict[str, Any]],
    List[Dict[str, Any]],
    List[Dict[str, Any]],
]:

    all_places = []

    direct_businesses = []

    potential_retail = []

    marketplaces = []

    for element in elements:

        tags = element.get("tags") or {}

        lat, lon = _element_coordinates(
            element
        )

        if lat is None or lon is None:
            continue

        distance_km = _haversine_km(
            latitude,
            longitude,
            lat,
            lon,
        )

        osm_type = element.get(
            "type",
            "unknown",
        )

        osm_id = element.get("id")

        name = _place_name(tags)

        place = {
            "name": name,
            "type": osm_type,
            "osm_id": osm_id,
            "latitude": lat,
            "longitude": lon,
            "distance_km": round(
                distance_km,
                2,
            ),
            "shop": tags.get("shop"),
            "craft": tags.get("craft"),
            "amenity": tags.get("amenity"),
            "brand": tags.get("brand"),
            "operator": tags.get("operator"),
            "tags": tags,
        }

        # ----------------------------------------------------
        # MARKET
        # ----------------------------------------------------

        if _is_market(tags):

            place["category"] = "market"

            marketplaces.append(place)

            all_places.append(place)

            continue

        # ----------------------------------------------------
        # BUSINESS CLASSIFICATION
        # ----------------------------------------------------

        classification = _classify_business(
            tags,
            business_type,
        )

        place["category"] = classification

        all_places.append(place)

        if classification == "direct":

            direct_businesses.append(place)

        elif classification == "potential_retail":

            potential_retail.append(place)

    return (
        all_places,
        direct_businesses,
        potential_retail,
        marketplaces,
    )


# ============================================================
# DEDUPLICATION
# ============================================================

def _deduplicate(
    places: List[Dict[str, Any]],
) -> List[Dict[str, Any]]:

    seen = set()

    result = []

    for place in places:

        osm_type = place.get("type")
        osm_id = place.get("osm_id")

        key = (
            osm_type,
            osm_id,
        )

        if osm_id is not None:

            if key in seen:
                continue

            seen.add(key)

        result.append(place)

    return result


# ============================================================
# SORTING
# ============================================================

def _sort_by_distance(
    places: List[Dict[str, Any]],
) -> List[Dict[str, Any]]:

    return sorted(
        places,
        key=lambda item: item.get(
            "distance_km",
            float("inf"),
        ),
    )


# ============================================================
# MAIN OSM FUNCTION
# ============================================================

def get_nearby_businesses(
    latitude: float,
    longitude: float,
    radius: int = DEFAULT_RADIUS,
    business_type: str = "Dairy",
) -> Dict[str, Any]:

    print()
    print("=" * 60)
    print(
        "[OSM] GRAMINGURU OSM SEARCH"
    )
    print("=" * 60)

    print(
        f"[OSM] Business: "
        f"{business_type}"
    )

    print(
        f"[OSM] Latitude: "
        f"{latitude}"
    )

    print(
        f"[OSM] Longitude: "
        f"{longitude}"
    )

    print(
        f"[OSM] Radius: "
        f"{radius} meters"
    )

    # ========================================================
    # STEP 1 - TARGETED SEARCH
    # ========================================================

    print()
    print(
        "[OSM] STEP 1: Targeted search"
    )

    targeted_query = _build_targeted_query(
        latitude,
        longitude,
        radius,
        business_type,
    )

    data, server = _run_overpass_query(
        targeted_query
    )

    elements = []

    if data:

        elements = data.get(
            "elements",
            [],
        )

    (
        all_places,
        direct_businesses,
        potential_retail,
        marketplaces,
    ) = _process_elements(
        elements,
        latitude,
        longitude,
        business_type,
    )

    # ========================================================
    # STEP 2 - FALLBACK SEARCH
    # ========================================================

    if not all_places:

        print()
        print(
            "[OSM] STEP 2: "
            "Broad fallback search"
        )

        fallback_query = _build_fallback_query(
            latitude,
            longitude,
            radius,
        )

        (
            fallback_data,
            fallback_server,
        ) = _run_overpass_query(
            fallback_query
        )

        if fallback_data:

            fallback_elements = (
                fallback_data.get(
                    "elements",
                    [],
                )
            )

            (
                fallback_all,
                fallback_direct,
                fallback_retail,
                fallback_markets,
            ) = _process_elements(
                fallback_elements,
                latitude,
                longitude,
                business_type,
            )

            all_places.extend(
                fallback_all
            )

            direct_businesses.extend(
                fallback_direct
            )

            potential_retail.extend(
                fallback_retail
            )

            marketplaces.extend(
                fallback_markets
            )

            if fallback_server:
                server = fallback_server

    # ========================================================
    # DEDUPLICATE
    # ========================================================

    all_places = _deduplicate(
        all_places
    )

    direct_businesses = _deduplicate(
        direct_businesses
    )

    potential_retail = _deduplicate(
        potential_retail
    )

    marketplaces = _deduplicate(
        marketplaces
    )

    # ========================================================
    # SORT
    # ========================================================

    all_places = _sort_by_distance(
        all_places
    )

    direct_businesses = _sort_by_distance(
        direct_businesses
    )

    potential_retail = _sort_by_distance(
        potential_retail
    )

    marketplaces = _sort_by_distance(
        marketplaces
    )

    # ========================================================
    # STATUS
    # ========================================================

    total_mapped_places = len(
        all_places
    )

    direct_count = len(
        direct_businesses
    )
    competition = calculate_competition_level(
    direct_business_count=direct_count,
    radius_m=radius,
    )
    retail_count = len(
        potential_retail
    )

    market_count = len(
        marketplaces
    )

    if total_mapped_places == 0:

        success = False

        confidence = "Not Available"

        data_status = (
            "no_mapped_data"
        )

        message = (
            "No relevant mapped places were "
            "found in the available "
            "OpenStreetMap data. "
            "This does not mean there are "
            "no real businesses in the area."
        )

    elif direct_count > 0:

        success = True

        confidence = "High"

        data_status = (
            "mapped_data_found"
        )

        message = (
            "Direct business matches were "
            "identified in OpenStreetMap. "
            "Potential retail outlets are "
            "reported separately."
        )

    elif retail_count > 0:

        success = True

        confidence = "Medium"

        data_status = (
            "mapped_retail_only"
        )

        message = (
            "Mapped retail outlets were "
            "identified, but no directly "
            "tagged business match was "
            "identified for the selected "
            "business."
        )

    else:

        success = True

        confidence = "Low"

        data_status = (
            "mapped_other_places"
        )

        message = (
            "OpenStreetMap returned mapped "
            "places, but no direct business "
            "match was identified."
        )

    # ========================================================
    # PRINT RESULT
    # ========================================================

    print()
    print("=" * 60)
    print("RESULT")
    print("=" * 60)

    print(
        f"Success: {success}"
    )

    print(
        f"Direct businesses: "
        f"{direct_count}"
    )

    print(
        f"Potential retail outlets: "
        f"{retail_count}"
    )

    print(
        f"Total mapped places: "
        f"{total_mapped_places}"
    )

    print(
        f"Market places: "
        f"{market_count}"
    )

    print(
        f"Confidence: "
        f"{confidence}"
    )

    print(
        f"Data status: "
        f"{data_status}"
    )

    print(
        "Source: "
        "OpenStreetMap / Overpass API"
    )

    print(
        f"Server: "
        f"{server}"
    )

    print(
        f"Message: "
        f"{message}"
    )

    # ========================================================
    # DIRECT BUSINESSES
    # ========================================================

    print()
    print("=" * 60)
    print(
        "DIRECT BUSINESS MATCHES"
    )
    print("=" * 60)

    if direct_businesses:

        for place in direct_businesses:

            print(
                f"- {place['name']} | "
                f"{place.get('shop') or place.get('craft') or 'mapped'} | "
                f"{place['distance_km']} km"
            )

    else:

        print(
            "No directly tagged "
            "business matches found."
        )

    # ========================================================
    # POTENTIAL RETAIL OUTLETS
    # ========================================================

    print()
    print("=" * 60)
    print(
        "POTENTIAL RETAIL OUTLETS"
    )
    print("=" * 60)

    if potential_retail:

        for place in potential_retail:

            print(
                f"- {place['name']} | "
                f"{place.get('shop') or 'retail'} | "
                f"{place['distance_km']} km"
            )

    else:

        print(
            "No potential retail "
            "outlets found."
        )

    # ========================================================
    # MARKETS
    # ========================================================

    print()
    print("=" * 60)
    print("MARKETS / MANDIS")
    print("=" * 60)

    if marketplaces:

        for place in marketplaces:

            print(
                f"- {place['name']} | "
                f"{place.get('amenity') or place.get('shop') or 'market'} | "
                f"{place['distance_km']} km"
            )

    else:

        print(
            "No mapped markets or "
            "mandis found in the "
            "available OSM data."
        )

    # ========================================================
    # RETURN OBJECT
    # ========================================================

    return {

        # ----------------------------------------------------
        # Existing fields expected by GraminGuru
        # ----------------------------------------------------

        "success": success,

        "confidence": confidence,

        "data_status": data_status,

        "source": (
            "OpenStreetMap / Overpass API"
        ),

        "source_type": (
            "Community-mapped POI"
        ),

        "server": server,

        "radius_m": radius,

        "business_type_requested": (
            business_type
        ),

        "message": message,
        "competition": competition,
        # ----------------------------------------------------
        # All mapped places
        # ----------------------------------------------------

        "all_places": all_places,

        "businesses": (
            direct_businesses
        ),

        "business_matches": (
            direct_businesses
        ),

        # ----------------------------------------------------
        # Potential retail evidence
        # ----------------------------------------------------

        "potential_retail_outlets": (
            potential_retail
        ),

        "potential_retail_count": (
            retail_count
        ),

        # ----------------------------------------------------
        # Counts
        # ----------------------------------------------------

        "count": direct_count,

        "business_match_count": (
            direct_count
        ),

        "direct_business_count": (
            direct_count
        ),

        "total_mapped_places": (
            total_mapped_places
        ),

        # ----------------------------------------------------
        # Markets
        # ----------------------------------------------------

        "marketplaces": marketplaces,

        "marketplace_count": (
            market_count
        ),

        # ----------------------------------------------------
        # Backward-compatible generic value
        # ----------------------------------------------------

        "value": direct_count,

        # ----------------------------------------------------
        # Transparency
        # ----------------------------------------------------

        "note": (
            "OpenStreetMap is community-mapped "
            "data and may not contain every "
            "local or informal business. "
            "Direct business matches, potential "
            "retail outlets, and markets/mandis "
            "are separated. "
            "Zero direct matches must not be "
            "interpreted as zero real-world "
            "competition."
        ),
    }


# ============================================================
# NEAREST MARKET
# ============================================================

def find_nearest_market(
    latitude: float,
    longitude: float,
    radius: int = DEFAULT_RADIUS,
) -> Dict[str, Any]:

    result = get_nearby_businesses(
        latitude=latitude,
        longitude=longitude,
        radius=radius,
        business_type="Dairy",
    )

    marketplaces = result.get(
        "marketplaces",
        [],
    )

    if not marketplaces:

        return {
            "name": None,
            "distance_km": None,
            "confidence": "Not Available",
            "message": (
                "No mapped mandi or market "
                "was found in the available "
                "OpenStreetMap data."
            ),
        }

    nearest = min(
        marketplaces,
        key=lambda x: x.get(
            "distance_km",
            float("inf"),
        ),
    )

    return {
        "name": nearest.get("name"),

        "distance_km": nearest.get(
            "distance_km"
        ),

        "confidence": "Mapped Data",

        "message": (
            "Nearest mapped market "
            "identified from "
            "OpenStreetMap."
        ),
    }


# ============================================================
# BACKWARD COMPATIBILITY
# ============================================================

def get_nearest_mandi(
    latitude: float,
    longitude: float,
    radius: int = DEFAULT_RADIUS,
) -> Dict[str, Any]:

    return find_nearest_market(
        latitude=latitude,
        longitude=longitude,
        radius=radius,
    )


# ============================================================
# FINAL TEST
# ============================================================

if __name__ == "__main__":

    print()
    print("=" * 60)
    print(
        "GraminGuru - OSM Final Test"
    )
    print("=" * 60)

    test_latitude = 26.4499

    test_longitude = 80.3319

    test_business = "Dairy"

    test_radius = 5000

    print()

    print(
        f"Location: "
        f"{test_latitude}, "
        f"{test_longitude}"
    )

    print(
        f"Business: "
        f"{test_business}"
    )

    print(
        f"Radius: "
        f"{test_radius} meters"
    )

    print()

    print(
        "Running refined OSM search..."
    )

    result = get_nearby_businesses(
        latitude=test_latitude,
        longitude=test_longitude,
        radius=test_radius,
        business_type=test_business,
    )

    print()
    print("=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)

    print(
        "Direct Dairy Businesses:",
        result.get(
            "direct_business_count",
            0,
        ),
    )

    print(
        "Potential Retail Outlets:",
        result.get(
            "potential_retail_count",
            0,
        ),
    )

    print(
        "Total Mapped Places:",
        result.get(
            "total_mapped_places",
            0,
        ),
    )

    print(
        "Mapped Markets / Mandis:",
        result.get(
            "marketplace_count",
            0,
        ),
    )

    print(
        "Confidence:",
        result.get(
            "confidence"
        ),
    )

    print()

    print("=" * 60)
    print("TEST COMPLETE")
    print("=" * 60)
def calculate_competition_level(
    direct_business_count: int,
    radius_m: int = DEFAULT_RADIUS,
) -> Dict[str, Any]:

    if direct_business_count <= 0:
        return {
            "level": "Not Available",
            "mapped_business_count": 0,
            "radius_m": radius_m,
            "basis": (
                "No directly mapped businesses were found "
                "in the selected OpenStreetMap search area."
            ),
            "confidence": "Not Available",
            "source": "OpenStreetMap",
            "warning": (
                "No mapped businesses does not mean "
                "there are no real-world competitors."
            ),
        }

    if direct_business_count <= 2:
        level = "Low"

    elif direct_business_count <= 7:
        level = "Medium"

    else:
        level = "High"

    return {
        "level": level,
        "mapped_business_count": direct_business_count,
        "radius_m": radius_m,
        "basis": (
            f"{direct_business_count} directly mapped "
            f"{'business' if direct_business_count == 1 else 'businesses'} "
            f"within {radius_m / 1000:g} km."
        ),
        "confidence": "Mapped Data",
        "source": "OpenStreetMap",
        "warning": (
            "Competition reflects mapped businesses only; "
            "OSM may not contain every local or informal business."
        ),
    }