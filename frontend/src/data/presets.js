// src/data/presets.js

// ============================================================
// BUSINESS OPTIONS
// ============================================================

export const BUSINESS_OPTIONS = [
  "Dairy",
  "Tailoring",
  "Kirana",
  "Poultry",
  "SolarGrid",
  "Flour Mill",
  "Fishery",
];

// ============================================================
// BUSINESS PROFILES
// ============================================================
// Prototype/reference assumptions for demonstration.
// These values should NOT be presented as live market data.

export const BUSINESS_PROFILES = {
  Dairy: {
    name: "Dairy",
    description:
      "Milk production and local dairy supply business for rural and semi-urban markets.",
    investment: 200000,
    ownCapital: 50000,
    demand: "High",
    competition: "Medium",
    margin: 18,
    monthlyRevenue: 30000,
    monthlyExpense: 15000,
    workingCapital: 30000,
    seasonality: "Medium",
    map: {
      lat: 26.4499,
      lng: 80.3319,
    },
    markers: [
      {
        name: "Local Dairy Cluster",
        lat: 26.452,
        lng: 80.334,
      },
      {
        name: "Milk Collection Point",
        lat: 26.447,
        lng: 80.329,
      },
    ],
  },

  Tailoring: {
    name: "Tailoring",
    description:
      "Small tailoring and stitching service focused on local household and clothing demand.",
    investment: 90000,
    ownCapital: 30000,
    demand: "High",
    competition: "Medium",
    margin: 25,
    monthlyRevenue: 22000,
    monthlyExpense: 9000,
    workingCapital: 15000,
    seasonality: "Low",
    map: {
      lat: 26.4499,
      lng: 80.3319,
    },
    markers: [
      {
        name: "Local Tailoring Area",
        lat: 26.451,
        lng: 80.333,
      },
      {
        name: "Market Area",
        lat: 26.448,
        lng: 80.33,
      },
    ],
  },

  Kirana: {
    name: "Kirana",
    description:
      "Small general store serving daily household and grocery requirements.",
    investment: 150000,
    ownCapital: 50000,
    demand: "High",
    competition: "High",
    margin: 12,
    monthlyRevenue: 40000,
    monthlyExpense: 30000,
    workingCapital: 40000,
    seasonality: "Low",
    map: {
      lat: 26.4499,
      lng: 80.3319,
    },
    markers: [
      {
        name: "Local Grocery Market",
        lat: 26.451,
        lng: 80.332,
      },
      {
        name: "Retail Cluster",
        lat: 26.448,
        lng: 80.334,
      },
    ],
  },

  Poultry: {
    name: "Poultry",
    description:
      "Small poultry unit supplying eggs or poultry products to nearby markets.",
    investment: 180000,
    ownCapital: 50000,
    demand: "High",
    competition: "Medium",
    margin: 16,
    monthlyRevenue: 35000,
    monthlyExpense: 21000,
    workingCapital: 35000,
    seasonality: "Medium",
    map: {
      lat: 26.4499,
      lng: 80.3319,
    },
    markers: [
      {
        name: "Poultry Activity Area",
        lat: 26.454,
        lng: 80.329,
      },
      {
        name: "Local Buyer Area",
        lat: 26.447,
        lng: 80.335,
      },
    ],
  },

  SolarGrid: {
    name: "SolarGrid",
    description:
      "Small solar-related service or installation business for local energy needs.",
    investment: 250000,
    ownCapital: 75000,
    demand: "Medium",
    competition: "Low",
    margin: 22,
    monthlyRevenue: 38000,
    monthlyExpense: 22000,
    workingCapital: 40000,
    seasonality: "Low",
    map: {
      lat: 26.4499,
      lng: 80.3319,
    },
    markers: [
      {
        name: "Solar Service Area",
        lat: 26.452,
        lng: 80.336,
      },
      {
        name: "Local Commercial Area",
        lat: 26.446,
        lng: 80.33,
      },
    ],
  },

  // ==========================================================
  // FLOUR MILL
  // Canonical internal/API key: "Flour Mill"
  // English display: Flour Mill
  // Hindi display: आटा चक्की
  // ==========================================================

  "Flour Mill": {
    name: "Flour Mill",
    description:
      "Small agro-processing or milling unit serving nearby farmers and consumers.",
    investment: 300000,
    ownCapital: 80000,
    demand: "Medium",
    competition: "Medium",
    margin: 20,
    monthlyRevenue: 50000,
    monthlyExpense: 30000,
    workingCapital: 50000,
    seasonality: "Medium",
    map: {
      lat: 26.4499,
      lng: 80.3319,
    },
    markers: [
      {
        name: "Agro Processing Area",
        lat: 26.455,
        lng: 80.333,
      },
      {
        name: "Agricultural Market Area",
        lat: 26.443,
        lng: 80.328,
      },
    ],
  },

  Fishery: {
    name: "Fishery",
    description:
      "Small-scale fish farming or fish-related rural enterprise.",
    investment: 220000,
    ownCapital: 60000,
    demand: "Medium",
    competition: "Low",
    margin: 19,
    monthlyRevenue: 36000,
    monthlyExpense: 20000,
    workingCapital: 40000,
    seasonality: "High",
    map: {
      lat: 26.4499,
      lng: 80.3319,
    },
    markers: [
      {
        name: "Fishery Activity Area",
        lat: 26.455,
        lng: 80.325,
      },
      {
        name: "Local Market",
        lat: 26.447,
        lng: 80.337,
      },
    ],
  },
};

// ============================================================
// LOCATION BENCHMARKS
// ============================================================
// These are prototype/reference location values for the demo.
// They are NOT live population counts.
//
// For final SIH submission, verify population values against
// official Census 2011 datasets before calling them exact
// Census figures.
//
// Coordinates are used as spatial reference points.
//
// ============================================================

export const LOCATION_BENCHMARKS = {
  Kanpur: {
    lat: 26.4499,
    lng: 80.3319,
    state: "Uttar Pradesh",
    district: "Kanpur Nagar",
    population: "12,450",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Kanpur Local Market Reference",
  },

  Varanasi: {
    lat: 25.3176,
    lng: 82.9739,
    state: "Uttar Pradesh",
    district: "Varanasi",
    population: "15,800",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Varanasi Local Market Reference",
  },

  Gorakhpur: {
    lat: 26.7606,
    lng: 83.3732,
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    population: "11,200",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Gorakhpur Local Market Reference",
  },

  Lucknow: {
    lat: 26.8467,
    lng: 80.9462,
    state: "Uttar Pradesh",
    district: "Lucknow",
    population: "18,500",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Lucknow Local Market Reference",
  },

  Agra: {
    lat: 27.1767,
    lng: 78.0081,
    state: "Uttar Pradesh",
    district: "Agra",
    population: "17,300",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Agra Local Market Reference",
  },

  Prayagraj: {
    lat: 25.4358,
    lng: 81.8463,
    state: "Uttar Pradesh",
    district: "Prayagraj",
    population: "16,100",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Prayagraj Local Market Reference",
  },

  Bareilly: {
    lat: 28.367,
    lng: 79.4304,
    state: "Uttar Pradesh",
    district: "Bareilly",
    population: "13,700",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Bareilly Local Market Reference",
  },

  Meerut: {
    lat: 28.9845,
    lng: 77.7064,
    state: "Uttar Pradesh",
    district: "Meerut",
    population: "16,900",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Meerut Local Market Reference",
  },

  Jhansi: {
    lat: 25.4484,
    lng: 78.5685,
    state: "Uttar Pradesh",
    district: "Jhansi",
    population: "9,600",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Jhansi Local Market Reference",
  },

  Ayodhya: {
    lat: 26.7922,
    lng: 82.1998,
    state: "Uttar Pradesh",
    district: "Ayodhya",
    population: "8,900",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Ayodhya Local Market Reference",
  },

  Patna: {
    lat: 25.5941,
    lng: 85.1376,
    state: "Bihar",
    district: "Patna",
    population: "18,600",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Patna Local Market Reference",
  },

  Gaya: {
    lat: 24.7914,
    lng: 85.0002,
    state: "Bihar",
    district: "Gaya",
    population: "10,700",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Gaya Local Market Reference",
  },

  Muzaffarpur: {
    lat: 26.1209,
    lng: 85.3647,
    state: "Bihar",
    district: "Muzaffarpur",
    population: "11,500",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Muzaffarpur Local Market Reference",
  },

  Ranchi: {
    lat: 23.3441,
    lng: 85.3096,
    state: "Jharkhand",
    district: "Ranchi",
    population: "9,800",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Ranchi Local Market Reference",
  },

  Jamshedpur: {
    lat: 22.8046,
    lng: 86.2029,
    state: "Jharkhand",
    district: "East Singhbhum",
    population: "12,100",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Jamshedpur Local Market Reference",
  },

  Jaipur: {
    lat: 26.9124,
    lng: 75.7873,
    state: "Rajasthan",
    district: "Jaipur",
    population: "14,300",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Jaipur Local Market Reference",
  },

  Kota: {
    lat: 25.2138,
    lng: 75.8648,
    state: "Rajasthan",
    district: "Kota",
    population: "10,900",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Kota Local Market Reference",
  },

  Bhopal: {
    lat: 23.2599,
    lng: 77.4126,
    state: "Madhya Pradesh",
    district: "Bhopal",
    population: "13,600",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Bhopal Local Market Reference",
  },

  Indore: {
    lat: 22.7196,
    lng: 75.8577,
    state: "Madhya Pradesh",
    district: "Indore",
    population: "17,100",
    populationSource: "Census 2011 Reference",
    confidence: "High",
    mandi: "Indore Local Market Reference",
  },

  Raipur: {
    lat: 21.2514,
    lng: 81.6296,
    state: "Chhattisgarh",
    district: "Raipur",
    population: "11,700",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Raipur Local Market Reference",
  },

  Dehradun: {
    lat: 30.3165,
    lng: 78.0322,
    state: "Uttarakhand",
    district: "Dehradun",
    population: "9,400",
    populationSource: "Census 2011 Reference",
    confidence: "Medium",
    mandi: "Dehradun Local Market Reference",
  },
};

// ============================================================
// GOVERNMENT SCHEME REFERENCES
// ============================================================

export const GOVERNMENT_SCHEMES = [
  {
    name: "PMEGP",
    fullName:
      "Prime Minister's Employment Generation Programme",
    category: "Credit Linked Subsidy",
    source: "KVIC",
    description:
      "Credit-linked support route for eligible micro-enterprise applicants.",
  },

  {
    name: "MUDRA",
    fullName:
      "Pradhan Mantri Mudra Yojana",
    category: "Micro Enterprise Credit",
    source: "JanSamarth",
    description:
      "Credit support route for eligible micro and small business activities.",
  },

  {
    name: "NSFDC",
    fullName:
      "National Scheduled Castes Finance and Development Corporation",
    category: "Category Linked Finance",
    source: "NSFDC",
    description:
      "Finance and development support route for eligible applicants.",
  },

  {
    name: "NBCFDC",
    fullName:
      "National Backward Classes Finance & Development Corporation",
    category: "Category Linked Finance",
    source: "NBCFDC",
    description:
      "Financial assistance route for eligible OBC applicants.",
  },

  {
    name: "SVEP",
    fullName:
      "Start-up Village Entrepreneurship Programme",
    category: "Rural Entrepreneurship",
    source: "DAY-NRLM",
    description:
      "Rural entrepreneurship support under the DAY-NRLM ecosystem.",
  },
];

// ============================================================
// OFFICIAL / REFERENCE DATA SOURCES
// ============================================================

export const DATA_SOURCES = [
  {
    name: "Census 2011",
    description:
      "Population and demographic reference data.",
    type: "Official Reference",
  },

  {
    name: "OpenStreetMap",
    description:
      "Mapped points of interest and spatial reference.",
    type: "Spatial Reference",
  },

  {
    name: "Agmarknet",
    description:
      "Agricultural market and mandi price reference.",
    type: "Market Reference",
  },

  {
    name: "JanSamarth",
    description:
      "Government credit-linked scheme discovery and routing reference.",
    type: "Government Scheme Reference",
  },

  {
    name: "Bhashini",
    description:
      "Indian language and language-technology reference.",
    type: "Language Reference",
  },
];

// ============================================================
// OFFICIAL SOURCES DIRECTORY
// ============================================================

export const OFFICIAL_SOURCES_DIRECTORY = [
  {
    name: "Census India",
    description:
      "Official Census of India data and population references.",
    url: "[https://censusindia.gov.in/](https://censusindia.gov.in/)",
  },

  {
    name: "Census Population Finder",
    description:
      "Population and demographic reference data from Census India.",
    url: "[https://censusindia.gov.in/census.website/en/data/population-finder](https://censusindia.gov.in/census.website/en/data/population-finder)",
  },

  {
    name: "OpenStreetMap",
    description:
      "Open geographic and mapped point-of-interest data.",
    url: "[https://www.openstreetmap.org/](https://www.openstreetmap.org/)",
  },

  {
    name: "Agmarknet",
    description:
      "Agricultural market and mandi price reference.",
    url: "[https://agmarknet.gov.in/](https://agmarknet.gov.in/)",
  },

  {
    name: "JanSamarth",
    description:
      "Government credit-linked scheme discovery and reference.",
    url: "[https://www.jansamarth.in/](https://www.jansamarth.in/)",
  },

  {
    name: "KVIC",
    description:
      "Official reference for PMEGP and related entrepreneurship support.",
    url: "[https://www.kviconline.gov.in/](https://www.kviconline.gov.in/)",
  },

  {
    name: "Bhashini",
    description:
      "Indian language and language-technology platform.",
    url: "[https://bhashini.gov.in/](https://bhashini.gov.in/)",
  },

  {
    name: "data.gov.in",
    description:
      "Government of India open-data platform.",
    url: "[https://data.gov.in/](https://data.gov.in/)",
  },
];