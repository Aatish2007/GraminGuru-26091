from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

from trusted_data.advisory_engine import (
    build_evidence_based_advisory
)

from trusted_data.census_data import (
    get_census_data
)

from trusted_data.osm_test import (
    get_nearby_businesses,
    get_nearest_mandi
)

from trusted_data.agmarknet_api_test import (
    get_market_data,
    find_commodity_prices,
    STATE_IDS
)


# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="GraminGuru API",
    description="Hyper-local business advisory and financial planning",
    version="1.3.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ============================================================
# BUSINESS PROFILES
# ============================================================

BUSINESS_PROFILES = {

    "Dairy": {
        "investment": 200000,
        "working_capital": 50000,
        "monthly_income": 20000,
        "monthly_expense": 9000,
        "seasonal_risk": "Medium",
        "market_demand": "High",
        "competition": "Medium"
    },

    "Tailoring": {
        "investment": 80000,
        "working_capital": 20000,
        "monthly_income": 15000,
        "monthly_expense": 6000,
        "seasonal_risk": "Low",
        "market_demand": "Medium",
        "competition": "Low"
    },

    "Kirana": {
        "investment": 150000,
        "working_capital": 40000,
        "monthly_income": 18000,
        "monthly_expense": 9000,
        "seasonal_risk": "Low",
        "market_demand": "High",
        "competition": "High"
    },

    "Poultry": {
        "investment": 180000,
        "working_capital": 45000,
        "monthly_income": 22000,
        "monthly_expense": 11000,
        "seasonal_risk": "High",
        "market_demand": "High",
        "competition": "Medium"
    },

    "SolarGrid": {
        "investment": 250000,
        "working_capital": 30000,
        "monthly_income": 24000,
        "monthly_expense": 8000,
        "seasonal_risk": "Low",
        "market_demand": "Medium",
        "competition": "Low"
    },

    "Flour Mill": {
        "investment": 300000,
        "working_capital": 60000,
        "monthly_income": 30000,
        "monthly_expense": 15000,
        "seasonal_risk": "Medium",
        "market_demand": "High",
        "competition": "Medium"
    },

    "Fishery": {
        "investment": 220000,
        "working_capital": 50000,
        "monthly_income": 24000,
        "monthly_expense": 12000,
        "seasonal_risk": "High",
        "market_demand": "Medium",
        "competition": "Medium"
    }
}


# ============================================================
# LOCATION COORDINATES
# ============================================================

LOCATION_COORDINATES = {

    "kanpur": (26.4499, 80.3319),
    "kanpur nagar": (26.4499, 80.3319),
    "kanpur dehat": (26.4156, 79.8553),

    "lucknow": (26.8467, 80.9462),
    "varanasi": (25.3176, 82.9739),
    "agra": (27.1767, 78.0081),
    "prayagraj": (25.4358, 81.8463),
    "gorakhpur": (26.7606, 83.3732),

    "ayodhya": (26.7999, 82.2047),
    "faizabad": (26.7733, 82.1447),

    "bareilly": (28.3670, 79.4304),
    "meerut": (28.9845, 77.7064),
    "jhansi": (25.4484, 78.5685),

    "jaipur": (26.9124, 75.7873),
    "kota": (25.2138, 75.8648),

    "patna": (25.5941, 85.1376),
    "gaya": (24.7914, 85.0002),
    "muzaffarpur": (26.1209, 85.3647),

    "ranchi": (23.3441, 85.3096),
    "jamshedpur": (22.8046, 86.2029),

    "bhopal": (23.2599, 77.4126),
    "indore": (22.7196, 75.8577),

    "raipur": (21.2514, 81.6296),
    "dehradun": (30.3165, 78.0322)
}


# ============================================================
# BUSINESS -> AGMARKNET RELEVANCE
# ============================================================

BUSINESS_COMMODITY_CONFIG = {

    "Dairy": {
        "commodity": None,
        "benchmark_type": "Milk price",
        "message": (
            "Agmarknet does not directly provide local milk prices. "
            "Verify milk selling price locally."
        )
    },

    "Poultry": {
        "commodity": "Maize",
        "benchmark_type": "Feed input cost",
        "message": (
            "Maize price is shown as a poultry feed input-cost indicator."
        )
    },

    "Kirana": {
        "commodity": "Wheat",
        "benchmark_type": "Stock price reference",
        "message": (
            "Wheat price is shown only as a commodity stock-price reference."
        )
    },

    "Flour Mill": {
        "commodity": "Wheat",
        "benchmark_type": "Raw material cost",
        "message": (
            "Wheat price is shown as a raw-material cost indicator "
            "for flour milling."
        )
    },

    "Tailoring": {
        "commodity": None,
        "benchmark_type": "Local verification",
        "message": (
            "Agmarknet does not provide a relevant tailoring price benchmark."
        )
    },

    "SolarGrid": {
        "commodity": None,
        "benchmark_type": "Local verification",
        "message": (
            "Agmarknet does not provide a relevant solar equipment "
            "price benchmark."
        )
    },

    "Fishery": {
        "commodity": None,
        "benchmark_type": "Local verification",
        "message": (
            "Agmarknet does not provide a directly relevant fishery "
            "price benchmark."
        )
    }
}


# ============================================================
# SCHEME RULES
# ============================================================

SCHEME_RULES = [

    {
        "name": "PMEGP",
        "type": "Credit + Subsidy",
        "business_types": [
            "Dairy",
            "Tailoring",
            "Kirana",
            "Poultry",
            "SolarGrid",
            "Flour Mill",
            "Fishery"
        ],
        "reason": (
            "Potentially relevant for eligible rural micro-enterprise "
            "projects. Final eligibility must be verified officially."
        )
    },

    {
        "name": "MUDRA",
        "type": "Credit Scheme",
        "business_types": [
            "Dairy",
            "Tailoring",
            "Kirana",
            "Poultry",
            "SolarGrid",
            "Flour Mill",
            "Fishery"
        ],
        "reason": (
            "Potential credit route for eligible micro-enterprise "
            "activities. Final eligibility must be verified."
        )
    },

    {
        "name": "JanSamarth",
        "type": "Scheme Discovery",
        "business_types": [
            "Dairy",
            "Tailoring",
            "Kirana",
            "Poultry",
            "SolarGrid",
            "Flour Mill",
            "Fishery"
        ],
        "reason": (
            "Government scheme-discovery route for identifying "
            "potentially suitable credit-linked schemes."
        )
    }
]


# ============================================================
# REQUEST MODELS
# ============================================================

class AssessRequest(BaseModel):

    business: str
    location: str

    project_cost: float = Field(
        gt=0
    )

    own_capital: float = Field(
        ge=0
    )

    interest_rate: float = Field(
        default=10,
        ge=0
    )

    tenure_years: int = Field(
        default=5,
        gt=0
    )

    monthly_income: Optional[float] = None
    monthly_expense: Optional[float] = None

    moratorium_months: int = Field(
        default=0,
        ge=0,
        le=60
    )


class MarketCheckRequest(BaseModel):

    business: str
    location: str

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    commodity: Optional[str] = None

    date: Optional[str] = "2026-09-19"


class CompareRequest(BaseModel):

    location: str

    project_cost: float = Field(
        default=200000,
        gt=0
    )

    own_capital: float = Field(
        default=50000,
        ge=0
    )

    business: Optional[str] = "Dairy"

    interest_rate: float = Field(
        default=10,
        gt=0
    )

    tenure_years: float = Field(
        default=5,
        gt=0
    )


class SchemeRequest(BaseModel):

    business: str
    location: str

    project_cost: float = Field(
        gt=0
    )

    own_capital: float = Field(
        ge=0
    )


class AdvisoryRequest(BaseModel):

    business: str
    location: str

    project_cost: float = Field(
        gt=0
    )

    own_capital: float = Field(
        ge=0
    )

    interest_rate: float = Field(
        default=10,
        ge=0
    )

    tenure_years: int = Field(
        default=5,
        gt=0
    )

    moratorium_months: int = Field(
        default=0,
        ge=0,
        le=60
    )


class WhatIfRequest(BaseModel):

    business: str

    project_cost: float = Field(
        gt=0
    )

    own_capital: float = Field(
        ge=0
    )

    interest_rate: float = Field(
        default=10,
        ge=0
    )

    tenure_years: int = Field(
        default=5,
        gt=0
    )

    sales_reduction_percent: float = Field(
        default=30,
        ge=0,
        le=100
    )

    moratorium_months: int = Field(
        default=0,
        ge=0,
        le=60
    )


# ============================================================
# FINANCIAL RULE ENGINE
# ============================================================

def calculate_loan_amount(
    project_cost: float,
    own_capital: float
) -> float:

    loan = max(
        project_cost - own_capital,
        0
    )

    return round(
        loan,
        2
    )


def calculate_emi(
    principal: float,
    annual_rate: float,
    years: int
) -> float:

    if principal <= 0:
        return 0.0

    months = years * 12

    if months <= 0:
        return 0.0

    monthly_rate = (
        annual_rate / 12 / 100
    )

    if monthly_rate == 0:

        return round(
            principal / months,
            2
        )

    factor = (
        1 + monthly_rate
    ) ** months

    emi = (
        principal
        * monthly_rate
        * factor
        / (factor - 1)
    )

    return round(
        emi,
        2
    )


def calculate_moratorium_interest(
    principal: float,
    annual_rate: float,
    moratorium_months: int
) -> float:

    if (
        principal <= 0
        or annual_rate <= 0
        or moratorium_months <= 0
    ):
        return 0.0

    interest = (
        principal
        * annual_rate
        / 100
        * moratorium_months
        / 12
    )

    return round(
        interest,
        2
    )


def build_financial_engine(
    project_cost: float,
    own_capital: float,
    annual_rate: float,
    tenure_years: int,
    moratorium_months: int = 0
):

    loan = calculate_loan_amount(
        project_cost,
        own_capital
    )

    moratorium_interest = (
        calculate_moratorium_interest(
            loan,
            annual_rate,
            moratorium_months
        )
    )

    emi = calculate_emi(
        loan,
        annual_rate,
        tenure_years
    )

    capital_ratio = (
        own_capital / project_cost
        if project_cost > 0
        else 0
    )

    loan_ratio = (
        loan / project_cost
        if project_cost > 0
        else 0
    )

    return {

        "project_cost": round(
            project_cost,
            2
        ),

        "own_capital": round(
            own_capital,
            2
        ),

        "required_loan": round(
            loan,
            2
        ),

        "interest_rate": round(
            annual_rate,
            2
        ),

        "tenure_years":
            tenure_years,

        "moratorium_months":
            moratorium_months,

        "moratorium_interest_estimate":
            moratorium_interest,

        "emi":
            emi,

        "capital_ratio_percent":
            round(
                capital_ratio * 100,
                2
            ),

        "loan_ratio_percent":
            round(
                loan_ratio * 100,
                2
            ),

        "calculation_type":
            "Deterministic Python Rule Engine",

        "confidence":
            "Calculated"
    }


# ============================================================
# SEASONAL SCENARIO ENGINE
# ============================================================

def calculate_scenarios(
    monthly_income: float,
    monthly_expense: float,
    emi: float
):

    normal_income = monthly_income

    lean_income = (
        monthly_income * 0.70
    )

    festival_income = (
        monthly_income * 1.20
    )

    normal_cash = (
        normal_income
        - monthly_expense
        - emi
    )

    lean_cash = (
        lean_income
        - monthly_expense
        - emi
    )

    festival_cash = (
        festival_income
        - monthly_expense
        - emi
    )

    return {

        "normal": {

            "income":
                round(normal_income, 2),

            "expense":
                round(monthly_expense, 2),

            "emi":
                round(emi, 2),

            "cash_after_emi":
                round(normal_cash, 2),

            "status": (
                "Repayment Positive"
                if normal_cash >= 0
                else "Repayment Stress"
            ),

            "assumption":
                "Base monthly income assumption",

            "confidence":
                "Estimated"
        },

        "lean_season": {

            "income":
                round(lean_income, 2),

            "expense":
                round(monthly_expense, 2),

            "emi":
                round(emi, 2),

            "cash_after_emi":
                round(lean_cash, 2),

            "status": (
                "Repayment Positive"
                if lean_cash >= 0
                else "Repayment Stress"
            ),

            "assumption":
                "Income reduced by 30% for stress testing",

            "confidence":
                "Estimated"
        },

        "festival_season": {

            "income":
                round(festival_income, 2),

            "expense":
                round(monthly_expense, 2),

            "emi":
                round(emi, 2),

            "cash_after_emi":
                round(festival_cash, 2),

            "status": (
                "Repayment Positive"
                if festival_cash >= 0
                else "Repayment Stress"
            ),

            "assumption":
                "Income increased by 20% for scenario testing",

            "confidence":
                "Estimated"
        }
    }


# ============================================================
# SCORE
# ============================================================

def compute_score(
    project_cost,
    own_capital,
    monthly_income,
    monthly_expense,
    emi
):

    if project_cost <= 0:
        return 0

    capital_ratio = (
        own_capital / project_cost
    )

    normal_cash = (
        monthly_income
        - monthly_expense
        - emi
    )

    lean_income = (
        monthly_income * 0.70
    )

    lean_cash = (
        lean_income
        - monthly_expense
        - emi
    )

    score = 50

    if capital_ratio >= 0.40:
        score += 15

    elif capital_ratio >= 0.25:
        score += 10

    elif capital_ratio >= 0.15:
        score += 5

    else:
        score -= 5

    if normal_cash >= 25000:
        score += 10

    elif normal_cash >= 15000:
        score += 7

    elif normal_cash >= 10000:
        score += 4

    elif normal_cash < 0:
        score -= 15

    elif normal_cash < 5000:
        score -= 8

    if lean_cash >= 5000:
        score += 10

    elif lean_cash >= 0:
        score += 3

    else:
        score -= 10

    return max(
        0,
        min(
            100,
            int(score)
        )
    )


# ============================================================
# SCHEME MATCH ENGINE
# ============================================================

def match_schemes(
    business: str,
    project_cost: float,
    own_capital: float
):

    loan = calculate_loan_amount(
        project_cost,
        own_capital
    )

    matches = []

    for scheme in SCHEME_RULES:

        if business in scheme["business_types"]:

            matches.append({

                "name":
                    scheme["name"],

                "type":
                    scheme["type"],

                "match_status":
                    "Potential Match",

                "reason":
                    scheme["reason"],

                "required_loan":
                    loan,

                "confidence":
                    "Preliminary",

                "verification_required":
                    True
            })

    return matches


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {

        "success":
            True,

        "service":
            "GraminGuru API",

        "status":
            "running"
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {

        "success":
            True,

        "status":
            "healthy"
    }


# ============================================================
# ASSESS
# ============================================================

@app.post("/api/assess")
def assess_business(
    req: AssessRequest
):

    profile = BUSINESS_PROFILES.get(
        req.business,
        BUSINESS_PROFILES["Dairy"]
    )

    income = (
        req.monthly_income
        if req.monthly_income is not None
        else profile["monthly_income"]
    )

    expense = (
        req.monthly_expense
        if req.monthly_expense is not None
        else profile["monthly_expense"]
    )

    financial = build_financial_engine(
        req.project_cost,
        req.own_capital,
        req.interest_rate,
        req.tenure_years,
        req.moratorium_months
    )

    loan = financial["required_loan"]

    emi = financial["emi"]

    scenarios = calculate_scenarios(
        income,
        expense,
        emi
    )

    normal_cash = scenarios[
        "normal"
    ]["cash_after_emi"]

    lean_cash = scenarios[
        "lean_season"
    ]["cash_after_emi"]

    stress_income = scenarios[
        "lean_season"
    ]["income"]

    score = compute_score(
        req.project_cost,
        req.own_capital,
        income,
        expense,
        emi
    )

    if score >= 75:
        risk = "Low"

    elif score >= 50:
        risk = "Medium"

    else:
        risk = "High"

    schemes = match_schemes(
        req.business,
        req.project_cost,
        req.own_capital
    )

    return {

        "success":
            True,

        "business":
            req.business,

        "location":
            req.location,

        "project_cost":
            req.project_cost,

        "own_capital":
            req.own_capital,

        "required_loan":
            loan,

        "interest_rate":
            req.interest_rate,

        "tenure_years":
            req.tenure_years,

        "moratorium_months":
            req.moratorium_months,

        "emi":
            emi,

        "monthly_income":
            round(income, 2),

        "monthly_expense":
            round(expense, 2),

        "monthly_cash_after_emi":
            round(normal_cash, 2),

        "normal_cash_after_emi":
            round(normal_cash, 2),

        "stress_income":
            round(stress_income, 2),

        "stress_cash_after_emi":
            round(lean_cash, 2),

        "score":
            score,

        "readiness_score":
            score,

        "risk":
            risk,

        "seasonal_risk":
            profile["seasonal_risk"],

        "market_demand":
            profile["market_demand"],

        "competition":
            profile["competition"],

        "financial_engine":
            financial,

        "scenarios":
            scenarios,

        "scheme_matches":
            schemes,

        "financial_confidence":
            "Calculated",

        "financial_disclaimer": (
            "Financial values are calculated by deterministic "
            "Python rules. Scheme eligibility and final loan "
            "sanction must be verified with the lender."
        )
    }


# ============================================================
# MARKET CHECK
# ============================================================

@app.post("/api/market-check")
def market_check(
    req: MarketCheckRequest
):

    location_key = (
        req.location.strip().lower()
    )

    latitude = req.latitude
    longitude = req.longitude

    # ========================================================
    # COORDINATES
    # ========================================================

    if (
        latitude is None
        or longitude is None
    ):

        coords = LOCATION_COORDINATES.get(
            location_key
        )

        if coords:

            latitude = coords[0]
            longitude = coords[1]

    # ========================================================
    # CENSUS
    # ========================================================

    try:

        census = get_census_data(
            req.location
        )

    except Exception as error:

        census = {
            "success": False,
            "message": str(error)
        }

    if census.get("success"):

        census_data = {

            "value":
                census.get("population"),

            "population":
                census.get("population"),

            "households":
                census.get("households"),

            "area_km2":
                census.get("area_km2"),

            "population_density":
                census.get("population_density"),

            "confidence":
                "Real Data",

            "source":
                "Census 2011",

            "source_url":
                "https://censusindia.gov.in/"
        }

    else:

        census_data = {

            "value": None,
            "population": None,
            "households": None,
            "area_km2": None,
            "population_density": None,

            "confidence":
                "Not Available",

            "source":
                "Census 2011",

            "source_url":
                "https://censusindia.gov.in/"
        }

    # ========================================================
    # OSM DEFAULT
    # ========================================================

    osm_data = {

        "success": False,

        "businesses": [],
        "business_matches": [],
        "direct_businesses": [],

        "direct_business_count": 0,

        "potential_retail_outlets": [],
        "potential_retail_count": 0,

        "marketplaces": [],
        "marketplace_count": 0,

        "count": 0,
        "business_match_count": 0,
        "total_mapped_places": 0,
        "value": 0,

        "confidence":
            "Not Available",

        "source":
            "OpenStreetMap",

        "source_type":
            "Community-mapped POI",

        "message": (
            "No mapped OpenStreetMap evidence is available. "
            "This must not be interpreted as zero competition."
        )
    }

    # ========================================================
    # OSM SEARCH
    # ========================================================

    if (
        latitude is not None
        and longitude is not None
    ):

        try:

            osm_result = get_nearby_businesses(
                latitude,
                longitude,
                radius=5000,
                business_type=req.business
            )

            if isinstance(
                osm_result,
                dict
            ):

                direct_businesses = osm_result.get(
                    "business_matches",
                    osm_result.get(
                        "businesses",
                        []
                    )
                )

                potential_retail_outlets = osm_result.get(
                    "potential_retail_outlets",
                    []
                )

                marketplaces = osm_result.get(
                    "marketplaces",
                    []
                )

                if not isinstance(
                    direct_businesses,
                    list
                ):
                    direct_businesses = []

                if not isinstance(
                    potential_retail_outlets,
                    list
                ):
                    potential_retail_outlets = []

                if not isinstance(
                    marketplaces,
                    list
                ):
                    marketplaces = []

                direct_business_count = len(
                    direct_businesses
                )

                potential_retail_count = len(
                    potential_retail_outlets
                )

                marketplace_count = len(
                    marketplaces
                )

                competition = osm_result.get(
                    "competition",
                    {
                        "level": "Not Available",
                        "mapped_business_count": 0,
                        "radius_m": 5000,
                        "basis": (
                            "No directly mapped businesses were found "
                            "in the selected OpenStreetMap search area."
                        ),
                        "confidence": "Not Available",
                        "source": "OpenStreetMap",
                        "warning": (
                            "No mapped businesses does not mean "
                            "there are no real-world competitors."
                        )
                    }
                )

                total_mapped_places = (
                    direct_business_count
                    + potential_retail_count
                    + marketplace_count
                )

                osm_success = osm_result.get(
                    "success",
                    False
                )

                if osm_success:

                    if (
                        direct_business_count > 0
                        or potential_retail_count > 0
                        or marketplace_count > 0
                    ):

                        osm_confidence = "Mapped Data"

                    else:

                        osm_confidence = "Not Available"

                    osm_data = {

                        **osm_result,

                        "success":
                            True,

                        "businesses":
                            direct_businesses,

                        "business_matches":
                            direct_businesses,

                        "direct_businesses":
                            direct_businesses,

                        "direct_business_count":
                            direct_business_count,

                        "potential_retail_outlets":
                            potential_retail_outlets,

                        "potential_retail_count":
                            potential_retail_count,

                        "marketplaces":
                            marketplaces,

                        "marketplace_count":
                            marketplace_count,

                        "count":
                            direct_business_count,

                        "business_match_count":
                            direct_business_count,

                        "total_mapped_places":
                            total_mapped_places,

                        "value":
                            direct_business_count,

                        "competition":
                            competition,

                        "confidence":
                            osm_confidence,

                        "source":
                            "OpenStreetMap",

                        "source_type":
                            "Community-mapped POI",

                        "note": (
                            "OpenStreetMap is community-mapped "
                            "and may not contain every local "
                            "or informal business. Direct "
                            "businesses, potential retail "
                            "outlets and mapped markets are "
                            "reported separately. Zero direct "
                            "matches must not be interpreted "
                            "as zero real-world competition."
                        )
                    }

                else:

                    osm_data = {

                        **osm_result,

                        "success":
                            False,

                        "businesses": [],
                        "business_matches": [],
                        "direct_businesses": [],

                        "direct_business_count": 0,

                        "potential_retail_outlets": [],
                        "potential_retail_count": 0,

                        "marketplaces": [],
                        "marketplace_count": 0,

                        "count": 0,
                        "value": 0,

                        "business_match_count": 0,
                        "total_mapped_places": 0,

                        "confidence":
                            "Not Available",

                        "source":
                            "OpenStreetMap",

                        "source_type":
                            "Community-mapped POI"
                    }

        except Exception as error:

            osm_data = {

                "success":
                    False,

                "businesses": [],
                "business_matches": [],
                "direct_businesses": [],

                "direct_business_count": 0,

                "potential_retail_outlets": [],
                "potential_retail_count": 0,

                "marketplaces": [],
                "marketplace_count": 0,

                "count": 0,
                "value": 0,

                "business_match_count": 0,
                "total_mapped_places": 0,

                "confidence":
                    "Not Available",

                "source":
                    "OpenStreetMap",

                "source_type":
                    "Community-mapped POI",

                "message":
                    str(error)
            }

    # ========================================================
    # BUYER / MARKET DISTANCE
    # ========================================================

    buyer_distance = {

        "value": None,
        "unit": "km",
        "name": None,
        "latitude": None,
        "longitude": None,

        "confidence":
            "Not Available",

        "source":
            "OpenStreetMap"
    }

    marketplace_candidates = osm_data.get(
        "marketplaces",
        []
    )

    if not isinstance(
        marketplace_candidates,
        list
    ):
        marketplace_candidates = []

    if marketplace_candidates:

        marketplace_candidates.sort(
            key=lambda x:
                x.get(
                    "distance_km",
                    999999
                )
        )

        nearest = marketplace_candidates[0]

        buyer_distance = {

            "value":
                nearest.get(
                    "distance_km"
                ),

            "unit":
                "km",

            "name":
                nearest.get(
                    "name"
                ),

            "latitude":
                nearest.get(
                    "latitude"
                ),

            "longitude":
                nearest.get(
                    "longitude"
                ),

            "confidence":
                "Mapped Data",

            "source":
                "OpenStreetMap"
        }

    # ========================================================
    # AGMARKNET
    # ========================================================

    commodity_config = (
        BUSINESS_COMMODITY_CONFIG.get(
            req.business,
            {
                "commodity": None,
                "benchmark_type": "Local verification",
                "message": (
                    "No relevant Agmarknet commodity "
                    "benchmark is available."
                )
            }
        )
    )

    commodity = commodity_config.get(
        "commodity"
    )

    market_price = {

        "success":
            False,

        "commodity":
            commodity,

        "reference_date":
            req.date,

        "market_count":
            0,

        "record_count":
            0,

        "minimum_modal_price":
            None,

        "maximum_modal_price":
            None,

        "average_modal_price":
            None,

        "value":
            None,

        "unit":
            "Rs./Quintal",

        "markets":
            [],

        "benchmark_type":
            commodity_config.get(
                "benchmark_type"
            ),

        "message":
            commodity_config.get(
                "message"
            ),

        "confidence": (
            "Not Applicable"
            if commodity is None
            else "Not Available"
        ),

        "source":
            "Agmarknet",

        "source_url":
            "https://agmarknet.gov.in/"
    }

    # ========================================================
    # AGMARKNET FETCH
    # ========================================================

    if commodity:

        state_code = census.get(
            "state_code"
        )

        state_id = None

        CENSUS_TO_AGMARKNET_STATE = {

            "09": "Uttar Pradesh",
            "10": "Bihar",
            "20": "Jharkhand",
            "08": "Rajasthan",
            "23": "Madhya Pradesh"
        }

        if state_code is not None:

            census_state_code = str(
                state_code
            ).zfill(2)

            state_name = (
                CENSUS_TO_AGMARKNET_STATE.get(
                    census_state_code
                )
            )

            if state_name:

                state_id = STATE_IDS.get(
                    state_name
                )

        if state_id is not None:

            try:

                agmark_data = get_market_data(
                    state_id,
                    req.date
                )

                if (
                    isinstance(
                        agmark_data,
                        dict
                    )
                    and agmark_data.get("markets")
                ):

                    records = find_commodity_prices(
                        agmark_data,
                        commodity
                    )

                    if not isinstance(
                        records,
                        list
                    ):
                        records = []

                    prices = []

                    for item in records:

                        price = item.get(
                            "modal_price"
                        )

                        if price is not None:

                            try:

                                prices.append(
                                    float(price)
                                )

                            except (
                                ValueError,
                                TypeError
                            ):
                                pass

                    if prices:

                        average_price = round(
                            sum(prices)
                            / len(prices),
                            2
                        )

                        market_price = {

                            "success":
                                True,

                            "commodity":
                                commodity,

                            "reference_date":
                                req.date,

                            "market_count":
                                len(
                                    agmark_data.get(
                                        "markets",
                                        []
                                    )
                                ),

                            "record_count":
                                len(records),

                            "minimum_modal_price":
                                min(prices),

                            "maximum_modal_price":
                                max(prices),

                            "average_modal_price":
                                average_price,

                            "value":
                                average_price,

                            "unit":
                                (
                                    records[0].get(
                                        "price_unit"
                                    )
                                    or
                                    "Rs./Quintal"
                                ),

                            "markets":
                                records[:10],

                            "benchmark_type":
                                commodity_config.get(
                                    "benchmark_type"
                                ),

                            "message":
                                commodity_config.get(
                                    "message"
                                ),

                            "confidence":
                                "Real Data",

                            "source":
                                "Agmarknet",

                            "source_url":
                                "https://agmarknet.gov.in/"
                        }

                    else:

                        market_price["message"] = (
                            f"No {commodity} price records "
                            f"were found for the selected "
                            f"state and date."
                        )

                else:

                    market_price["message"] = (
                        f"Agmarknet returned no market records "
                        f"for {commodity} on {req.date}."
                    )

            except Exception as error:

                market_price["message"] = str(
                    error
                )

        else:

            market_price["message"] = (
                "The location could not be mapped to a "
                "supported Agmarknet state."
            )

    else:

        market_price["success"] = False

        market_price["confidence"] = (
            "Not Applicable"
        )

        market_price["value"] = None

        market_price["average_modal_price"] = None

        market_price["markets"] = []

        market_price["message"] = (
            commodity_config.get(
                "message",
                "Agmarknet is not applicable to this business."
            )
        )

    # ========================================================
    # DATA SOURCES
    # ========================================================

    data_sources = {

        "census_2011": {

            "source":
                "Census 2011",

            "confidence":
                census_data["confidence"]
        },

        "agmarknet": {

            "source":
                "Agmarknet",

            "confidence":
                market_price["confidence"]
        },

        "openstreetmap": {

            "source":
                "OpenStreetMap",

            "confidence":
                osm_data["confidence"],

            "source_type":
                "Community-mapped POI"
        }
    }

    # ========================================================
    # FINAL MARKET RESPONSE
    # ========================================================

    return {

        "success":
            True,

        "business":
            req.business,

        "location":
            req.location,

        "coordinates": {

            "latitude":
                latitude,

            "longitude":
                longitude
        },

        "radius_km":
            5,

        "search_radius_km":
            5,

        "population":
            census_data,

        "census":
            census_data,

        "nearby_businesses":
            osm_data,

        "market_price":
            market_price,

        "buyer_distance_km":
            buyer_distance,

        "buyer_distance":
            buyer_distance,

        "data_sources":
            data_sources,

        "confidence_summary": {

            "census":
                census_data["confidence"],

            "agmarknet":
                market_price["confidence"],

            "osm":
                osm_data["confidence"]
        },

        "note": (
            "Market evidence combines Census 2011, "
            "OpenStreetMap mapped POIs and relevant "
            "Agmarknet commodity data. OpenStreetMap "
            "is community-mapped and must not be "
            "interpreted as complete business coverage."
        )
    }


# ============================================================
# COMPARE
# ============================================================

@app.post("/api/compare-businesses")
def compare_businesses(
    req: CompareRequest
):

    results = []

    project_cost = float(
        getattr(req, "project_cost", 0) or 0
    )

    own_capital = float(
        getattr(req, "own_capital", 0) or 0
    )

    interest_rate = float(
        getattr(req, "interest_rate", 10) or 10
    )

    tenure_years = float(
        getattr(req, "tenure_years", 5) or 5
    )

    for name, profile in BUSINESS_PROFILES.items():

        investment = float(
            profile.get(
                "investment",
                0
            ) or 0
        )

        working_capital = float(
            profile.get(
                "working_capital",
                0
            ) or 0
        )

        monthly_income = float(
            profile.get(
                "monthly_income",
                0
            ) or 0
        )

        monthly_expense = float(
            profile.get(
                "monthly_expense",
                0
            ) or 0
        )

        seasonal_risk = profile.get(
            "seasonal_risk",
            "Medium"
        )

        market_demand = profile.get(
            "market_demand",
            "Medium"
        )

        competition = profile.get(
            "competition",
            "Medium"
        )

        business_project_cost = (
            project_cost
            if project_cost > 0
            else investment
        )

        business_own_capital = (
            own_capital
            if own_capital > 0
            else 0
        )

        loan = max(
            0,
            business_project_cost
            - business_own_capital
        )

        if loan > 0 and tenure_years > 0:

            monthly_rate = (
                interest_rate / 12 / 100
            )

            months = (
                tenure_years * 12
            )

            if monthly_rate > 0:

                emi = (
                    loan
                    * monthly_rate
                    * (1 + monthly_rate) ** months
                    /
                    (
                        (1 + monthly_rate) ** months
                        - 1
                    )
                )

            else:

                emi = (
                    loan / months
                )

        else:

            emi = 0

        normal_cash_after_emi = (
            monthly_income
            - monthly_expense
            - emi
        )

        stress_income = (
            monthly_income * 0.70
        )

        stress_cash_after_emi = (
            stress_income
            - monthly_expense
            - emi
        )

        data_sources = {

            "investment":
                "Estimated",

            "working_capital":
                "Estimated",

            "monthly_income":
                "Estimated",

            "monthly_expense":
                "Estimated",

            "seasonal_risk":
                "Estimated",

            "market_demand":
                "Estimated",

            "competition":
                "Estimated"
        }

        results.append({

            "business":
                name,

            "investment":
                investment,

            "working_capital":
                working_capital,

            "monthly_income":
                monthly_income,

            "monthly_expense":
                monthly_expense,

            "seasonal_risk":
                seasonal_risk,

            "market_demand":
                market_demand,

            "competition":
                competition,

            "project_cost":
                business_project_cost,

            "own_capital":
                business_own_capital,

            "required_loan":
                round(loan, 2),

            "interest_rate":
                interest_rate,

            "tenure_years":
                tenure_years,

            "emi":
                round(emi, 2),

            "normal_cash_after_emi":
                round(
                    normal_cash_after_emi,
                    2
                ),

            "stress_cash_after_emi":
                round(
                    stress_cash_after_emi,
                    2
                ),

            "stress_sales_reduction":
                30,

            "data_sources":
                data_sources
        })

    selected_business = (
        req.business
        or "Dairy"
    )

    return {

        "success":
            True,

        "location":
            req.location,

        "selected_business":
            selected_business,

        "businesses":
            results,

        "comparison_method": {

            "financial_assumptions":
                "Same financial assumptions are used for comparison.",

            "cash_flow":
                "Normal and 30% sales-stress cash flow are calculated using deterministic formulas.",

            "data_transparency":
                "Business profile values are labelled as Estimated unless supported by an external data source.",

            "ranking":
                False,

            "comparative_score":
                False,

            "recommendation":
                False
        }
    }


# ============================================================
# SCHEME RECOMMENDATION
# ============================================================

@app.post("/api/scheme-recommendation")
def scheme_recommendation(
    req: SchemeRequest
):

    loan = calculate_loan_amount(
        req.project_cost,
        req.own_capital
    )

    loan_ratio = (
        loan
        / req.project_cost
        * 100
        if req.project_cost > 0
        else 0
    )

    possible_schemes = match_schemes(
        req.business,
        req.project_cost,
        req.own_capital
    )

    if loan <= 0:

        reason = (
            "No bank loan is required because "
            "own capital covers the entered project cost."
        )

    else:

        reason = (
            "Preliminary scheme routing based on "
            "project cost, required loan and business details. "
            "Final eligibility must be verified with the "
            "official portal and lender."
        )

    documents = [

        "Aadhaar / identity proof",
        "PAN or applicable identity document",
        "Bank account details",
        "Address / residence proof",
        "Business or project details",
        "Project cost / quotation documents",
        "Photographs",
        "Category certificate, if applicable"
    ]

    return {

        "success":
            True,

        "business":
            req.business,

        "location":
            req.location,

        "project_cost":
            req.project_cost,

        "own_capital":
            req.own_capital,

        "required_loan":
            loan,

        "loan_required":
            loan,

        "loan_ratio":
            round(
                loan_ratio,
                1
            ),

        "Potentially applicable schemes":
            None,

        "reason":
            reason,

        "eligibility_status":
            "Preliminary Route - Verification Required",

        "possible_schemes":
            possible_schemes,

        "recommendations":
            possible_schemes,

        "documents":
            documents,

        "next_action": (
            "Verify final eligibility, current terms and "
            "applicable limits with the official scheme "
            "portal or nearest bank / Bank Mitra."
        ),

        "disclaimer": (
            "GraminGuru provides preliminary decision "
            "support only. It does not guarantee loan "
            "sanction, subsidy approval or final eligibility."
        )
    }


# ============================================================
# BUSINESS ADVISORY
# ============================================================

@app.post("/api/business-advisory")
def business_advisory(
    req: AdvisoryRequest
):

    # ========================================================
    # BUSINESS PROFILE
    # ========================================================

    profile = BUSINESS_PROFILES.get(
        req.business
    )

    if profile is None:

        return {

            "success":
                False,

            "message": (
                f"Unsupported business type: "
                f"{req.business}"
            )
        }

    # ========================================================
    # FINANCIAL ENGINE
    # ========================================================

    financial_engine = build_financial_engine(

        project_cost=req.project_cost,

        own_capital=req.own_capital,

        annual_rate=req.interest_rate,

        tenure_years=req.tenure_years,

        moratorium_months=req.moratorium_months
    )

    # ========================================================
    # BUSINESS INCOME / EXPENSE
    # ========================================================

    monthly_income = float(
        profile.get(
            "monthly_income",
            0
        )
    )

    monthly_expense = float(
        profile.get(
            "monthly_expense",
            0
        )
    )

    emi = float(
        financial_engine.get(
            "emi",
            0
        ) or 0
    )

    # ========================================================
    # SCENARIOS
    # ========================================================

    scenarios = calculate_scenarios(

        monthly_income,

        monthly_expense,

        emi
    )

    normal_cash = float(
        scenarios[
            "normal"
        ][
            "cash_after_emi"
        ]
    )

    stress_cash = float(
        scenarios[
            "lean_season"
        ][
            "cash_after_emi"
        ]
    )

    # ========================================================
    # READINESS SCORE
    # ========================================================

    readiness_score = compute_score(

        req.project_cost,

        req.own_capital,

        monthly_income,

        monthly_expense,

        emi
    )

    # ========================================================
    # FINANCIAL DATA FOR ADVISORY ENGINE
    # ========================================================

    financial = {

        **financial_engine,

        "normal_cash_after_emi":
            normal_cash,

        "stress_cash_after_emi":
            stress_cash,

        "readiness_score":
            readiness_score
    }

    # ========================================================
    # MARKET EVIDENCE
    # ========================================================

    market_request = MarketCheckRequest(

        business=req.business,

        location=req.location
    )

    try:

        market = market_check(
            market_request
        )

    except Exception as error:

        market = {

            "success":
                False,

            "business":
                req.business,

            "location":
                req.location,

            "nearby_businesses":
                {},

            "market_price":
                {},

            "buyer_distance":
                {},

            "data_sources":
                {},

            "error":
                str(error)
        }

    # ========================================================
    # BUILD DYNAMIC ADVISORY
    # ========================================================

    try:

        advisory = build_evidence_based_advisory(

            business=req.business,

            location=req.location,

            financial=financial,

            market=market,

            profile=profile
        )

    except Exception as error:

        return {

            "success":
                False,

            "business":
                req.business,

            "location":
                req.location,

            "message":
                "Advisory engine failed.",

            "error":
                str(error)
        }

    # ========================================================
    # SAFETY NORMALIZATION
    # ========================================================

    if not isinstance(
        advisory,
        dict
    ):
        advisory = {}

    swot = advisory.get(
        "swot",
        {}
    )

    if not isinstance(
        swot,
        dict
    ):
        swot = {}

    evidence_summary = advisory.get(
        "evidence_summary",
        {}
    )

    if not isinstance(
        evidence_summary,
        dict
    ):
        evidence_summary = {}

    data_status = advisory.get(
        "data_status",
        {}
    )

    if not isinstance(
        data_status,
        dict
    ):
        data_status = {}

    sources = advisory.get(
        "sources",
        []
    )

    if not isinstance(
        sources,
        list
    ):
        sources = []

    # ========================================================
    # FINAL RESPONSE
    # ========================================================

    return {

        "success":
            True,

        "business":
            req.business,

        "location":
            req.location,

        # ----------------------------------------------------
        # FINANCIAL
        # ----------------------------------------------------

        "project_cost":
            req.project_cost,

        "own_capital":
            req.own_capital,

        "required_loan":
            financial_engine[
                "required_loan"
            ],

        "interest_rate":
            req.interest_rate,

        "tenure_years":
            req.tenure_years,

        "moratorium_months":
            req.moratorium_months,

        "emi":
            financial_engine[
                "emi"
            ],

        "financial_engine":
            financial,

        "scenarios":
            scenarios,

        "readiness_score":
            readiness_score,

        "monthly_income":
            monthly_income,

        "monthly_expense":
            monthly_expense,

        "normal_cash_after_emi":
            normal_cash,

        "stress_cash_after_emi":
            stress_cash,

        # ----------------------------------------------------
        # MARKET
        # ----------------------------------------------------

        "market_evidence":
            market,

        # ----------------------------------------------------
        # COMPLETE ADVISORY
        # ----------------------------------------------------

        "advisory":
            advisory,

        # ----------------------------------------------------
        # SWOT AT TOP LEVEL
        # ----------------------------------------------------

        "swot":
            swot,

        "enterprise_status":
            advisory.get(
                "enterprise_status"
            ),

        "evidence_based":
            advisory.get(
                "evidence_based",
                True
            ),

        "evidence_summary":
            evidence_summary,

        "data_status":
            data_status,

        "sources":
            sources,

        "disclaimer":
            advisory.get(
                "disclaimer",
                "Advisory information combines "
                "mapped evidence, estimated business "
                "profiles and deterministic financial "
                "calculations. Verify local conditions "
                "before making business or financial decisions."
            )
    }


# ============================================================
# WHAT-IF
# ============================================================

@app.post("/api/what-if")
def what_if(
    req: WhatIfRequest
):

    profile = BUSINESS_PROFILES.get(
        req.business,
        BUSINESS_PROFILES["Dairy"]
    )

    income = profile[
        "monthly_income"
    ]

    expense = profile[
        "monthly_expense"
    ]

    financial = build_financial_engine(

        req.project_cost,

        req.own_capital,

        req.interest_rate,

        req.tenure_years,

        req.moratorium_months
    )

    loan = financial[
        "required_loan"
    ]

    emi = financial[
        "emi"
    ]

    normal_cash = (
        income
        - expense
        - emi
    )

    reduction = (
        req.sales_reduction_percent
        / 100
    )

    simulated_income = (
        income
        * (1 - reduction)
    )

    simulated_cash = (
        simulated_income
        - expense
        - emi
    )

    scenarios = calculate_scenarios(
        income,
        expense,
        emi
    )

    return {

        "success":
            True,

        "business":
            req.business,

        "project_cost":
            req.project_cost,

        "own_capital":
            req.own_capital,

        "required_loan":
            loan,

        "emi":
            emi,

        "normal_income":
            income,

        "normal_expense":
            expense,

        "normal_cash_after_emi":
            round(
                normal_cash,
                2
            ),

        "sales_reduction_percent":
            req.sales_reduction_percent,

        "simulated_income":
            round(
                simulated_income,
                2
            ),

        "simulated_cash_after_emi":
            round(
                simulated_cash,
                2
            ),

        "stress_cash_after_emi":
            round(
                simulated_cash,
                2
            ),

        "risk": (

            "High"

            if simulated_cash < 0

            else
            "Medium"

            if simulated_cash < 5000

            else
            "Low"
        ),

        "financial_engine":
            financial,

        "scenarios":
            scenarios,

        "confidence":
            "Calculated"
    }