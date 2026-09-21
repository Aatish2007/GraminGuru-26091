# ============================================================
# EVIDENCE-BASED ADVISORY ENGINE
# ============================================================

BUSINESS_GUIDANCE = {

    "Dairy": {
        "strengths": [
            "The planning profile assumes recurring monthly income.",
            "Dairy products can support regular local consumption."
        ],
        "weaknesses": [
            "Feed and animal-care costs can affect operating margins.",
            "Income can vary with animal productivity and local selling price."
        ],
        "opportunities": [
            "Value-added dairy products can be explored if local demand supports them.",
            "Direct selling to households or local buyers can be evaluated."
        ],
        "threats": [
            "Animal health issues can interrupt production.",
            "Seasonal changes can affect milk production and operating costs."
        ]
    },

    "Tailoring": {
        "strengths": [
            "The planning profile uses a relatively low initial investment.",
            "Tailoring can serve recurring local clothing and alteration needs."
        ],
        "weaknesses": [
            "Income depends on order volume and customer retention.",
            "The business may depend heavily on the operator's skills."
        ],
        "opportunities": [
            "Alteration and stitching services can expand the customer base.",
            "School uniforms and local institutional orders can be explored."
        ],
        "threats": [
            "Competition from existing local tailors may reduce order volume.",
            "Demand can vary during different periods of the year."
        ]
    },

    "Kirana": {
        "strengths": [
            "The planning profile assumes recurring daily-use product demand.",
            "A broad product mix can support repeat local purchases."
        ],
        "weaknesses": [
            "The planning profile indicates high competition.",
            "Working capital can remain tied up in inventory."
        ],
        "opportunities": [
            "Home delivery and local customer relationships can be explored.",
            "Fast-moving local products can be prioritized after demand verification."
        ],
        "threats": [
            "Existing shops and larger retailers may compete for customers.",
            "Inventory prices can change over time."
        ]
    },

    "Poultry": {
        "strengths": [
            "The planning profile assumes high market demand.",
            "Poultry can generate recurring production cycles."
        ],
        "weaknesses": [
            "Feed is an important operating cost.",
            "The planning profile indicates high seasonal risk."
        ],
        "opportunities": [
            "Local buyer and wholesale channels can be evaluated.",
            "Feed procurement and production planning can be optimized."
        ],
        "threats": [
            "Disease outbreaks can affect production.",
            "Feed-price changes can reduce operating margins."
        ]
    },

    "SolarGrid": {
        "strengths": [
            "The planning profile assumes relatively low seasonal risk.",
            "The profile assumes comparatively low operating expense."
        ],
        "weaknesses": [
            "The initial project investment can be relatively high.",
            "Technical installation and maintenance capability may be required."
        ],
        "opportunities": [
            "Local electricity and backup-power requirements can be assessed.",
            "Installation and maintenance services can be considered."
        ],
        "threats": [
            "Equipment and component prices can change.",
            "Customer demand should be verified before purchasing inventory."
        ]
    },

    "Flour Mill": {
        "strengths": [
            "The planning profile assumes high market demand.",
            "The business can serve recurring local grain-processing needs."
        ],
        "weaknesses": [
            "The project has a comparatively high investment requirement.",
            "Electricity, maintenance and raw-material costs affect cash flow."
        ],
        "opportunities": [
            "Local grain-processing demand can be verified.",
            "Different flour and processing services can be evaluated."
        ],
        "threats": [
            "Wheat and other raw-material prices can change.",
            "Equipment downtime can interrupt production."
        ]
    },

    "Fishery": {
        "strengths": [
            "The planning profile assumes recurring business income.",
            "Fish can serve local food-market demand."
        ],
        "weaknesses": [
            "The planning profile indicates high seasonal risk.",
            "Fishery operations can require careful production and water management."
        ],
        "opportunities": [
            "Nearby markets and buyers can be identified using available mapped evidence.",
            "Local demand and suitable fish varieties can be verified before expansion."
        ],
        "threats": [
            "Disease and environmental conditions can affect production.",
            "Perishable inventory requires reliable market access."
        ]
    }
}


# ============================================================
# HELPERS
# ============================================================

def _safe_list(value):
    if isinstance(value, list):
        return value

    return []


def _count_confidence(items):
    """
    Count confidence labels from a list of advisory/evidence items.
    """

    counts = {
        "Real Data": 0,
        "Mapped Data": 0,
        "Calculated": 0,
        "Estimated": 0,
        "Not Available": 0,
        "Not Applicable": 0
    }

    for item in items:

        confidence = item.get(
            "confidence",
            "Not Available"
        )

        if confidence in counts:
            counts[confidence] += 1

    return counts


# ============================================================
# MAIN ADVISORY ENGINE
# ============================================================

def build_evidence_based_advisory(
    business,
    location,
    financial,
    market,
    profile
):
    """
    Builds a dynamic advisory using:

    1. Business planning profile
    2. Deterministic financial calculations
    3. Census evidence
    4. OpenStreetMap evidence
    5. Agmarknet evidence where applicable

    Confidence labels:

    Real Data
        Retrieved from external trusted source.

    Mapped Data
        Retrieved from OpenStreetMap mapped places.

    Calculated
        Produced by deterministic financial/scenario logic.

    Estimated
        Comes from planning assumptions or business profile.

    Not Available
        Relevant information was requested but was not available.

    Not Applicable
        Source does not provide relevant information for the business.
    """

    guidance = BUSINESS_GUIDANCE.get(
        business,
        {}
    )

    strengths = []
    weaknesses = []
    opportunities = []
    threats = []

    evidence = []

    # ========================================================
    # FINANCIAL EVIDENCE
    # ========================================================

    required_loan = float(
        financial.get(
            "required_loan",
            0
        ) or 0
    )

    emi = float(
        financial.get(
            "emi",
            0
        ) or 0
    )

    own_capital = float(
        financial.get(
            "own_capital",
            0
        ) or 0
    )

    capital_ratio = float(
        financial.get(
            "capital_ratio_percent",
            0
        ) or 0
    )

    normal_cash = float(
        financial.get(
            "normal_cash_after_emi",
            0
        ) or 0
    )

    lean_cash = float(
        financial.get(
            "stress_cash_after_emi",
            0
        ) or 0
    )

    # --------------------------------------------------------
    # Required Loan
    # --------------------------------------------------------

    if required_loan <= 0:

        strengths.append({
            "text": (
                "The entered own capital covers the calculated "
                "project cost, so no loan is required."
            ),
            "confidence": "Calculated",
            "source": "Financial Rule Engine"
        })

    else:

        evidence.append({
            "label": "Required loan",
            "value": f"₹{required_loan:,.2f}",
            "confidence": "Calculated",
            "source": "Financial Rule Engine"
        })

    # --------------------------------------------------------
    # EMI
    # --------------------------------------------------------

    evidence.append({
        "label": "Monthly EMI",
        "value": f"₹{emi:,.2f}",
        "confidence": "Calculated",
        "source": "Financial Rule Engine"
    })

    # --------------------------------------------------------
    # Own Capital Ratio
    # --------------------------------------------------------

    evidence.append({
        "label": "Own-capital ratio",
        "value": f"{capital_ratio:.2f}%",
        "confidence": "Calculated",
        "source": "Financial Rule Engine"
    })

    # --------------------------------------------------------
    # Normal Cash
    # --------------------------------------------------------

    if normal_cash >= 0:

        strengths.append({
            "text": (
                f"Normal estimated cash after EMI is "
                f"₹{normal_cash:,.2f} per month."
            ),
            "confidence": "Calculated",
            "source": "Financial Rule Engine"
        })

    else:

        weaknesses.append({
            "text": (
                f"Normal estimated cash after EMI is negative "
                f"at ₹{normal_cash:,.2f} per month."
            ),
            "confidence": "Calculated",
            "source": "Financial Rule Engine"
        })

    # --------------------------------------------------------
    # Lean Season / 30% Income Stress
    # --------------------------------------------------------

    if lean_cash >= 0:

        strengths.append({
            "text": (
                f"The 30% income-stress scenario remains positive "
                f"at ₹{lean_cash:,.2f} after EMI."
            ),
            "confidence": "Calculated",
            "source": "Seasonal Stress Test"
        })

    else:

        weaknesses.append({
            "text": (
                f"The 30% income-stress scenario becomes negative "
                f"at ₹{lean_cash:,.2f} after EMI."
            ),
            "confidence": "Calculated",
            "source": "Seasonal Stress Test"
        })

        threats.append({
            "text": (
                "A lower-income period could create repayment pressure "
                "under the entered assumptions."
            ),
            "confidence": "Calculated",
            "source": "Seasonal Stress Test"
        })

    # ========================================================
    # BUSINESS PROFILE
    # ========================================================

    for item in _safe_list(
        guidance.get("strengths")
    ):

        strengths.append({
            "text": item,
            "confidence": "Estimated",
            "source": "Business Planning Profile"
        })

    for item in _safe_list(
        guidance.get("weaknesses")
    ):

        weaknesses.append({
            "text": item,
            "confidence": "Estimated",
            "source": "Business Planning Profile"
        })

    for item in _safe_list(
        guidance.get("opportunities")
    ):

        opportunities.append({
            "text": item,
            "confidence": "Estimated",
            "source": "Business Planning Profile"
        })

    for item in _safe_list(
        guidance.get("threats")
    ):

        threats.append({
            "text": item,
            "confidence": "Estimated",
            "source": "Business Planning Profile"
        })

    # ========================================================
    # CENSUS EVIDENCE
    # ========================================================

    census = market.get(
        "census",
        market.get(
            "population",
            {}
        )
    )

    if not isinstance(census, dict):
        census = {}

    census_confidence = census.get(
        "confidence",
        "Not Available"
    )

    population = census.get(
        "population"
    )

    if (
        census_confidence == "Real Data"
        and population is not None
    ):

        evidence.append({
            "label": "Population",
            "value": f"{population:,}",
            "confidence": "Real Data",
            "source": "Census 2011"
        })

        opportunities.append({
            "text": (
                f"Census 2011 reports a population of "
                f"{population:,} for the selected area."
            ),
            "confidence": "Real Data",
            "source": "Census 2011"
        })

    else:

        evidence.append({
            "label": "Population",
            "value": "Not Available",
            "confidence": "Not Available",
            "source": "Census 2011"
        })

    # ========================================================
    # OPENSTREETMAP EVIDENCE
    # ========================================================

    osm = market.get(
        "nearby_businesses",
        {}
    )

    if not isinstance(osm, dict):
        osm = {}

    direct_count = int(
        osm.get(
            "direct_business_count",
            0
        ) or 0
    )

    retail_count = int(
        osm.get(
            "potential_retail_count",
            0
        ) or 0
    )

    marketplace_count = int(
        osm.get(
            "marketplace_count",
            0
        ) or 0
    )

    osm_confidence = osm.get(
        "confidence",
        "Not Available"
    )

    # --------------------------------------------------------
    # Direct Businesses
    # --------------------------------------------------------

    evidence.append({
        "label": "Direct mapped businesses",
        "value": direct_count,
        "confidence": osm_confidence,
        "source": "OpenStreetMap"
    })

    # --------------------------------------------------------
    # Potential Retail
    # --------------------------------------------------------

    evidence.append({
        "label": "Potential retail references",
        "value": retail_count,
        "confidence": osm_confidence,
        "source": "OpenStreetMap"
    })

    # --------------------------------------------------------
    # Marketplaces
    # --------------------------------------------------------

    evidence.append({
        "label": "Mapped marketplaces",
        "value": marketplace_count,
        "confidence": osm_confidence,
        "source": "OpenStreetMap"
    })

    # --------------------------------------------------------
    # OSM Interpretation
    # --------------------------------------------------------

    if direct_count > 0:

        weaknesses.append({
            "text": (
                f"OpenStreetMap contains {direct_count} directly "
                f"mapped {business} business reference(s) within "
                f"the search area."
            ),
            "confidence": "Mapped Data",
            "source": "OpenStreetMap"
        })

        opportunities.append({
            "text": (
                "Mapped local businesses can be used for competitor "
                "and market verification."
            ),
            "confidence": "Mapped Data",
            "source": "OpenStreetMap"
        })

    elif retail_count > 0:

        opportunities.append({
            "text": (
                f"OpenStreetMap contains {retail_count} potential "
                "retail references in the selected search area. "
                "These can support local market verification."
            ),
            "confidence": "Mapped Data",
            "source": "OpenStreetMap"
        })

    else:

        weaknesses.append({
            "text": (
                "No directly relevant mapped business was found "
                "in the current OpenStreetMap search."
            ),
            "confidence": "Not Available",
            "source": "OpenStreetMap"
        })

        threats.append({
            "text": (
                "OpenStreetMap coverage is incomplete, so the absence "
                "of mapped businesses must not be treated as absence "
                "of real-world competitors."
            ),
            "confidence": "Not Available",
            "source": "OpenStreetMap"
        })

    # ========================================================
    # MARKET / AGMARKNET
    # ========================================================

    market_price = market.get(
        "market_price",
        {}
    )

    if not isinstance(market_price, dict):
        market_price = {}

    price_confidence = market_price.get(
        "confidence",
        "Not Available"
    )

    commodity = market_price.get(
        "commodity"
    )

    average_price = market_price.get(
        "average_modal_price"
    )

    if (
        price_confidence == "Real Data"
        and average_price is not None
    ):

        evidence.append({
            "label": f"{commodity} market reference",
            "value": (
                f"{average_price:,.2f} "
                f"{market_price.get('unit', '')}"
            ),
            "confidence": "Real Data",
            "source": "Agmarknet"
        })

        opportunities.append({
            "text": (
                f"Agmarknet provides a {commodity} price reference "
                f"of {average_price:,.2f} "
                f"{market_price.get('unit', '')}."
            ),
            "confidence": "Real Data",
            "source": "Agmarknet"
        })

    elif price_confidence == "Not Applicable":

        evidence.append({
            "label": "Commodity benchmark",
            "value": "Not Applicable",
            "confidence": "Not Applicable",
            "source": "Agmarknet"
        })

    else:

        evidence.append({
            "label": "Commodity benchmark",
            "value": "Not Available",
            "confidence": "Not Available",
            "source": "Agmarknet"
        })

    # ========================================================
    # BUYER / MARKETPLACE DISTANCE
    # ========================================================

    buyer_distance = market.get(
        "buyer_distance",
        {}
    )

    if not isinstance(buyer_distance, dict):
        buyer_distance = {}

    distance = buyer_distance.get(
        "value"
    )

    if distance is not None:

        distance_confidence = buyer_distance.get(
            "confidence",
            "Mapped Data"
        )

        evidence.append({
            "label": "Nearest mapped marketplace",
            "value": f"{float(distance):.2f} km",
            "confidence": distance_confidence,
            "source": "OpenStreetMap"
        })

        opportunities.append({
            "text": (
                f"A mapped marketplace is approximately "
                f"{float(distance):.2f} km away."
            ),
            "confidence": distance_confidence,
            "source": "OpenStreetMap"
        })

    # ========================================================
    # COMBINE ALL TAGGED ITEMS
    # ========================================================

    all_advisory_items = (
        evidence
        + strengths
        + weaknesses
        + opportunities
        + threats
    )

    confidence_counts = _count_confidence(
        all_advisory_items
    )

    # ========================================================
    # STATUS
    # ========================================================

    real_data_count = confidence_counts[
        "Real Data"
    ]

    mapped_data_count = confidence_counts[
        "Mapped Data"
    ]

    calculated_count = confidence_counts[
        "Calculated"
    ]

    estimated_count = confidence_counts[
        "Estimated"
    ]

    not_available_count = confidence_counts[
        "Not Available"
    ]

    not_applicable_count = confidence_counts[
        "Not Applicable"
    ]

    # This is the number shown as usable/decision-support
    # evidence in the main dashboard counters.
    total_evidence_items = (
        real_data_count
        + mapped_data_count
        + calculated_count
        + estimated_count
    )

    # This includes unavailable / not-applicable entries too.
    total_tagged_items = len(
        all_advisory_items
    )

    if (
        real_data_count > 0
        or mapped_data_count > 0
        or calculated_count > 0
    ):

        enterprise_status = "Evidence Available"

    else:

        enterprise_status = "Needs Review"

    # ========================================================
    # RETURN
    # ========================================================

    return {

        "success": True,

        "business": business,

        "location": location,

        "enterprise_status":
            enterprise_status,

        "evidence_based": True,

        # ====================================================
        # CONSISTENT EVIDENCE SUMMARY
        # ====================================================

        "evidence_summary": {

            "real_data_items":
                real_data_count,

            "mapped_data_items":
                mapped_data_count,

            "calculated_items":
                calculated_count,

            "estimated_items":
                estimated_count,

            "not_available_items":
                not_available_count,

            "not_applicable_items":
                not_applicable_count,

            # Matches the four main visible evidence categories.
            "total_evidence_items":
                total_evidence_items,

            # Complete count including unavailable data.
            "total_tagged_items":
                total_tagged_items
        },

        # ====================================================
        # SWOT
        # ====================================================

        "swot": {

            "strengths":
                strengths,

            "weaknesses":
                weaknesses,

            "opportunities":
                opportunities,

            "threats":
                threats
        },

        # ====================================================
        # RAW EVIDENCE
        # ====================================================

        "evidence":
            evidence,

        # ====================================================
        # DATA STATUS
        # ====================================================

        "data_status": {

            "census":
                census_confidence,

            "osm":
                osm_confidence,

            "agmarknet":
                price_confidence,

            "financial":
                "Calculated",

            "business_profile":
                "Estimated"
        },

        # ====================================================
        # SOURCES
        # ====================================================

        "sources": [
            "Census 2011",
            "OpenStreetMap",
            "Agmarknet",
            "Deterministic Python Financial Rule Engine"
        ],

        # ====================================================
        # DISCLAIMER
        # ====================================================

        "disclaimer": (
            "Real Data refers to retrieved source data. "
            "Mapped Data refers to OpenStreetMap community-mapped "
            "places. Calculated values come from deterministic "
            "financial and scenario calculations. Estimated values "
            "come from the business planning profile or scenario "
            "assumptions. Verify local conditions before investment."
        )
    }