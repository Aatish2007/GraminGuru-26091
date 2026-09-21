import React from "react";

/* =========================================================
   CONFIDENCE STYLES
========================================================= */

const confidenceStyles = {
  "Real Data": "bg-green-100 text-green-700",
  "Mapped Data": "bg-blue-100 text-blue-700",
  Calculated: "bg-purple-100 text-purple-700",
  Estimated: "bg-yellow-100 text-yellow-700",
  "Not Available": "bg-gray-100 text-gray-600",
  "Not Applicable": "bg-gray-100 text-gray-600",
};

/* =========================================================
   UI TRANSLATIONS
========================================================= */

const translations = {
  en: {
    title: "Business Advisory & SWOT",

    subtitle:
      "Based on local evidence, mapped market data, and deterministic financial calculations.",

    evidenceAvailable: "Evidence Available",
    needsReview: "Needs Review",
    evidenceBased: "Evidence-Based",

    realData: "Real Data",
    mappedData: "Mapped Data",
    calculated: "Calculated",
    estimated: "Estimated",
    totalEvidence: "Total Evidence",

    strengths: "Strengths",
    weaknesses: "Weaknesses",
    opportunities: "Opportunities",
    threats: "Threats",

    noEvidence:
      "No specific evidence is available for this category.",

    dataSources: "Data Sources & Confidence",
    sourcesUsed: "Sources Used",

    note: "Note:",
    source: "Source",

    confidence: {
      "Real Data": "Real Data",
      "Mapped Data": "Mapped Data",
      Calculated: "Calculated",
      Estimated: "Estimated",
      "Not Available": "Not Available",
      "Not Applicable": "Not Applicable",
    },

    status: {
      census: "Census",
      osm: "OSM",
      agmarknet: "Agmarknet",
      financial: "Financial",
      business_profile: "Business Profile",
    },
  },

  hi: {
    title: "व्यवसाय सलाह और SWOT",

    subtitle:
      "स्थानीय प्रमाण, मैप किए गए बाजार डेटा और निश्चित वित्तीय गणनाओं के आधार पर।",

    evidenceAvailable: "प्रमाण उपलब्ध",
    needsReview: "समीक्षा आवश्यक",
    evidenceBased: "प्रमाण-आधारित",

    realData: "वास्तविक डेटा",
    mappedData: "मैप किया गया डेटा",
    calculated: "गणना किया गया",
    estimated: "अनुमानित",
    totalEvidence: "कुल प्रमाण",

    strengths: "ताकत",
    weaknesses: "कमजोरियाँ",
    opportunities: "अवसर",
    threats: "खतरे",

    noEvidence:
      "इस श्रेणी के लिए कोई विशेष प्रमाण उपलब्ध नहीं है।",

    dataSources: "डेटा स्रोत और विश्वसनीयता",
    sourcesUsed: "उपयोग किए गए स्रोत",

    note: "नोट:",
    source: "स्रोत",

    confidence: {
      "Real Data": "वास्तविक डेटा",
      "Mapped Data": "मैप किया गया डेटा",
      Calculated: "गणना किया गया",
      Estimated: "अनुमानित",
      "Not Available": "उपलब्ध नहीं",
      "Not Applicable": "लागू नहीं",
    },

    status: {
      census: "जनगणना",
      osm: "OSM",
      agmarknet: "Agmarknet",
      financial: "वित्तीय",
      business_profile: "व्यवसाय प्रोफाइल",
    },
  },
};

/* =========================================================
   BUSINESS NAME TRANSLATIONS
========================================================= */

const businessNameHindi = {
  Dairy: "डेयरी",
  Tailoring: "सिलाई",
  Kirana: "किराना",
  Poultry: "पोल्ट्री",
  SolarGrid: "सोलर ग्रिड",
  "Solar Grid": "सोलर ग्रिड",
  "Flour Mill": "आटा चक्की",
  FlourMill: "आटा चक्की",
  Fishery: "मत्स्य पालन",
};

/* =========================================================
   EXACT HINDI TRANSLATIONS
========================================================= */

const exactHindiTranslations = {
  /* -------------------------------------------------------
     GENERAL
  ------------------------------------------------------- */

  "The planning profile assumes recurring monthly income.":
    "व्यवसाय योजना में नियमित मासिक आय मानी गई है।",

  "The planning profile assumes recurring business income.":
    "व्यवसाय योजना में नियमित व्यवसाय आय मानी गई है।",

  "The planning profile assumes low initial investment.":
    "व्यवसाय योजना में कम प्रारंभिक निवेश माना गया है।",

  "The planning profile assumes high local demand.":
    "व्यवसाय योजना में स्थानीय स्तर पर उच्च मांग मानी गई है।",

  "The planning profile assumes high market demand.":
    "व्यवसाय योजना में स्थानीय बाजार की उच्च मांग मानी गई है।",

  "The planning profile assumes low seasonal risk.":
    "व्यवसाय योजना में कम मौसमी जोखिम माना गया है।",

  "The planning profile assumes relatively low seasonal risk.":
    "व्यवसाय योजना में अपेक्षाकृत कम मौसमी जोखिम माना गया है।",

  "The planning profile assumes comparatively low operating expense.":
    "व्यवसाय योजना में अपेक्षाकृत कम परिचालन खर्च माना गया है।",

  "The planning profile indicates high competition.":
    "व्यवसाय योजना के अनुसार प्रतिस्पर्धा अधिक है।",

  "The planning profile indicates high seasonal risk.":
    "व्यवसाय योजना के अनुसार मौसमी जोखिम अधिक है।",

  "The business requires relatively high initial investment.":
    "इस व्यवसाय के लिए अपेक्षाकृत अधिक प्रारंभिक निवेश की आवश्यकता होती है।",

  "The business requires high initial investment.":
    "इस व्यवसाय के लिए अधिक प्रारंभिक निवेश की आवश्यकता होती है।",

  "The project has a comparatively high investment requirement.":
    "इस परियोजना के लिए तुलनात्मक रूप से अधिक निवेश की आवश्यकता है।",

  "The initial project investment can be relatively high.":
    "प्रारंभिक परियोजना निवेश अपेक्षाकृत अधिक हो सकता है।",

  "Customer demand should be verified before investment.":
    "निवेश से पहले ग्राहक मांग की पुष्टि की जानी चाहिए।",

  "Local market demand should be verified before investment.":
    "निवेश से पहले स्थानीय बाजार की मांग की पुष्टि की जानी चाहिए।",

  "Local competition should be verified before investment.":
    "निवेश से पहले स्थानीय प्रतिस्पर्धा की पुष्टि की जानी चाहिए।",

  "The business should be evaluated using local demand and cost conditions.":
    "व्यवसाय का मूल्यांकन स्थानीय मांग और लागत की परिस्थितियों के आधार पर किया जाना चाहिए।",

  "Local evidence should be verified before investment.":
    "निवेश से पहले स्थानीय प्रमाण की पुष्टि की जानी चाहिए।",

  "Market conditions may vary by location.":
    "बाजार की परिस्थितियाँ स्थान के अनुसार अलग-अलग हो सकती हैं।",

  /* -------------------------------------------------------
     DAIRY
  ------------------------------------------------------- */

  "Dairy products can support regular local consumption.":
    "डेयरी उत्पाद स्थानीय स्तर पर नियमित खपत की मांग को पूरा कर सकते हैं।",

  "Feed and animal-care costs can affect operating margins.":
    "पशु आहार और पशु देखभाल की लागत परिचालन लाभ को प्रभावित कर सकती है।",

  "Income can vary with animal productivity and local selling price.":
    "आय पशुओं की उत्पादकता और स्थानीय बिक्री मूल्य के अनुसार बदल सकती है।",

  "Value-added dairy products can be explored if local demand supports them.":
    "यदि स्थानीय मांग पर्याप्त हो तो मूल्य-वर्धित डेयरी उत्पादों पर विचार किया जा सकता है।",

  "Direct selling to households or local buyers can be evaluated.":
    "घरों या स्थानीय खरीदारों को सीधे बिक्री करने की संभावना का मूल्यांकन किया जा सकता है।",

  "Animal health issues can interrupt production.":
    "पशुओं से जुड़ी स्वास्थ्य समस्याएँ उत्पादन को प्रभावित कर सकती हैं।",

  "Seasonal changes can affect milk production and operating costs.":
    "मौसमी बदलाव दूध उत्पादन और परिचालन लागत को प्रभावित कर सकते हैं।",

  /* -------------------------------------------------------
     TAILORING
  ------------------------------------------------------- */

  "Recurring alterations and clothing needs can support local demand.":
    "कपड़ों की सिलाई और नियमित अल्टरशन स्थानीय मांग को बनाए रख सकते हैं।",

  "Order volume depends on operator skills and local customer demand.":
    "ऑर्डर की संख्या काम करने वाले व्यक्ति के कौशल और स्थानीय ग्राहक मांग पर निर्भर करती है।",

  "Alterations and school or uniform orders can provide additional demand.":
    "अल्टरशन तथा स्कूल या यूनिफॉर्म के ऑर्डर अतिरिक्त मांग प्रदान कर सकते हैं।",

  "Local tailoring competition can affect customer acquisition.":
    "स्थानीय दर्जी व्यवसायों की प्रतिस्पर्धा नए ग्राहकों को प्राप्त करने को प्रभावित कर सकती है।",

  "Seasonal clothing demand can change order volumes.":
    "मौसमी कपड़ों की मांग ऑर्डर की संख्या को बदल सकती है।",

  "Income depends on order volume and customer retention.":
    "आय ऑर्डर की संख्या और ग्राहकों को बनाए रखने पर निर्भर करती है।",

  "The business may depend heavily on the operator's skills.":
    "यह व्यवसाय संचालक के कौशल पर काफी हद तक निर्भर हो सकता है।",

  "Alteration and stitching services can expand the customer base.":
    "अल्टरशन और सिलाई सेवाएँ ग्राहक आधार को बढ़ा सकती हैं।",

  "School uniforms and local institutional orders can be explored.":
    "स्कूल यूनिफॉर्म और स्थानीय संस्थागत ऑर्डर की संभावनाओं का मूल्यांकन किया जा सकता है।",

  "Competition from existing local tailors may reduce order volume.":
    "मौजूदा स्थानीय दर्जियों की प्रतिस्पर्धा ऑर्डर की संख्या को कम कर सकती है।",

  "Demand can vary during different periods of the year.":
    "वर्ष के अलग-अलग समय में मांग बदल सकती है।",

  /* -------------------------------------------------------
     KIRANA
  ------------------------------------------------------- */

  "The planning profile assumes recurring daily-use product demand.":
    "व्यवसाय योजना में दैनिक उपयोग की वस्तुओं की नियमित मांग मानी गई है।",

  "A broad product mix can support repeat local purchases.":
    "विभिन्न उत्पादों का मिश्रण स्थानीय ग्राहकों की बार-बार खरीदारी को बढ़ावा दे सकता है।",

  "Working capital can remain tied up in inventory.":
    "कार्यशील पूंजी का एक हिस्सा इन्वेंट्री में लगा रह सकता है।",

  "Home delivery and local customer relationships can be explored.":
    "होम डिलीवरी और स्थानीय ग्राहकों के साथ संबंध विकसित किए जा सकते हैं।",

  "Fast-moving local products can be prioritized after demand verification.":
    "मांग की पुष्टि के बाद तेजी से बिकने वाले स्थानीय उत्पादों को प्राथमिकता दी जा सकती है।",

  "Existing shops and larger retailers may compete for customers.":
    "मौजूदा दुकानें और बड़े खुदरा विक्रेता ग्राहकों के लिए प्रतिस्पर्धा कर सकते हैं।",

  "Inventory prices can change over time.":
    "इन्वेंट्री की कीमतें समय के साथ बदल सकती हैं।",

  /* -------------------------------------------------------
     POULTRY
  ------------------------------------------------------- */

  "Poultry products can have recurring local demand.":
    "पोल्ट्री उत्पादों की स्थानीय स्तर पर नियमित मांग हो सकती है।",

  "Feed costs can significantly affect operating margins.":
    "पशु आहार की लागत परिचालन लाभ को काफी प्रभावित कर सकती है।",

  "Poultry income can vary with production cycles and selling prices.":
    "पोल्ट्री की आय उत्पादन चक्र और बिक्री मूल्य के अनुसार बदल सकती है।",

  "Local buyers and wholesale channels can be explored.":
    "स्थानीय खरीदारों और थोक बिक्री चैनलों की संभावनाओं का मूल्यांकन किया जा सकता है।",

  "Feed procurement can be planned according to local price conditions.":
    "स्थानीय कीमतों के अनुसार पशु आहार की खरीद की योजना बनाई जा सकती है।",

  "Disease outbreaks can interrupt poultry production.":
    "बीमारियों का प्रकोप पोल्ट्री उत्पादन को प्रभावित कर सकता है।",
  
  "Disease outbreaks can affect production.":
    "बीमारियों का प्रकोप उत्पादन को प्रभावित कर सकता है।",
  "The 30% income-stress scenario becomes negative at ₹-118.23 after EMI.":
  "30% आय-तनाव परिदृश्य में EMI के बाद नकद प्रवाह ₹-118.23 हो जाता है।",

"The planning profile uses a relatively low initial investment.":
  "व्यवसाय योजना में अपेक्षाकृत कम प्रारंभिक निवेश माना गया है।",

"Tailoring can serve recurring local clothing and alteration needs.":
  "सिलाई व्यवसाय स्थानीय कपड़ों की सिलाई और नियमित अल्टरशन की जरूरतों को पूरा कर सकता है।",

  "Feed prices can change over time.":
    "पशु आहार की कीमतें समय के साथ बदल सकती हैं।",

  "Poultry can generate recurring production cycles.":
    "पोल्ट्री व्यवसाय नियमित उत्पादन चक्र उत्पन्न कर सकता है।",

  "Feed is an important operating cost.":
    "पशु आहार एक महत्वपूर्ण परिचालन लागत है।",

  "Local buyer and wholesale channels can be evaluated.":
    "स्थानीय खरीदारों और थोक बिक्री चैनलों की संभावनाओं का मूल्यांकन किया जा सकता है।",

  "Feed procurement and production planning can be optimized.":
    "पशु आहार की खरीद और उत्पादन योजना को बेहतर बनाया जा सकता है।",

  "Feed-price changes can reduce operating margins.":
    "पशु आहार की कीमतों में बदलाव परिचालन लाभ को कम कर सकता है।",

  /* -------------------------------------------------------
     SOLAR GRID
  ------------------------------------------------------- */

  "Local electricity and backup-power needs can support demand.":
    "स्थानीय बिजली और बैकअप पावर की जरूरतें मांग को बढ़ावा दे सकती हैं।",

  "Technical installation and maintenance require appropriate skills.":
    "तकनीकी स्थापना और रखरखाव के लिए उचित कौशल की आवश्यकता होती है।",

  "Local installation and maintenance services can be explored.":
    "स्थानीय स्थापना और रखरखाव सेवाओं की संभावनाओं का मूल्यांकन किया जा सकता है।",

  "Equipment prices can affect project costs.":
    "उपकरणों की कीमतें परियोजना लागत को प्रभावित कर सकती हैं।",

  "The initial project investment can be relatively high.":
    "प्रारंभिक परियोजना निवेश अपेक्षाकृत अधिक हो सकता है।",

  "Technical installation and maintenance capability may be required.":
    "तकनीकी स्थापना और रखरखाव की क्षमता की आवश्यकता हो सकती है।",

  "Local electricity and backup-power requirements can be assessed.":
    "स्थानीय बिजली और बैकअप पावर की आवश्यकताओं का आकलन किया जा सकता है।",

  "Installation and maintenance services can be considered.":
    "स्थापना और रखरखाव सेवाओं पर विचार किया जा सकता है।",

  "Equipment and component prices can change.":
    "उपकरणों और घटकों की कीमतें बदल सकती हैं।",

  "Customer demand should be verified before purchasing inventory.":
    "इन्वेंट्री खरीदने से पहले ग्राहक मांग की पुष्टि की जानी चाहिए।",

  /* -------------------------------------------------------
     FLOUR MILL / AATA CHAKKI
  ------------------------------------------------------- */

  "Recurring grain-processing demand can support the business.":
    "अनाज की नियमित प्रोसेसिंग की मांग व्यवसाय को समर्थन दे सकती है।",

  "The business can serve recurring local grain-processing needs.":
    "यह व्यवसाय स्थानीय स्तर पर अनाज की नियमित प्रोसेसिंग की जरूरतों को पूरा कर सकता है।",

  "Electricity, maintenance and raw-material costs can affect margins.":
    "बिजली, रखरखाव और कच्चे माल की लागत लाभ को प्रभावित कर सकती है।",

  "Electricity, maintenance and raw-material costs affect cash flow.":
    "बिजली, रखरखाव और कच्चे माल की लागत नकद प्रवाह को प्रभावित करती है।",

  "Local grain-processing demand can be evaluated.":
    "स्थानीय अनाज प्रोसेसिंग की मांग का मूल्यांकन किया जा सकता है।",

  "Local grain-processing demand can be verified.":
    "स्थानीय अनाज प्रोसेसिंग की मांग की पुष्टि की जा सकती है।",

  "Flour-processing services can provide additional local demand.":
    "आटा प्रोसेसिंग सेवाएँ अतिरिक्त स्थानीय मांग प्रदान कर सकती हैं।",

  "Different flour and processing services can be evaluated.":
    "विभिन्न आटा और प्रोसेसिंग सेवाओं का मूल्यांकन किया जा सकता है।",

  "Wheat and raw-material prices can change over time.":
    "गेहूँ और कच्चे माल की कीमतें समय के साथ बदल सकती हैं।",

  "Wheat and other raw-material prices can change.":
    "गेहूँ और अन्य कच्चे माल की कीमतें बदल सकती हैं।",

  "Equipment downtime can interrupt operations.":
    "उपकरणों के बंद रहने से व्यवसाय का संचालन प्रभावित हो सकता है।",

  "Equipment downtime can interrupt production.":
    "उपकरणों के बंद रहने से उत्पादन प्रभावित हो सकता है।",

  /* -------------------------------------------------------
     FISHERY
  ------------------------------------------------------- */

  "The planning profile assumes recurring local food demand.":
    "व्यवसाय योजना में स्थानीय खाद्य मांग की नियमितता मानी गई है।",

  "Fish can have recurring local food demand.":
    "मछली की स्थानीय स्तर पर नियमित खाद्य मांग हो सकती है।",

  "Production and water-management costs can affect margins.":
    "उत्पादन और जल प्रबंधन की लागत लाभ को प्रभावित कर सकती है।",

  "Fishery income can vary with production cycles and market prices.":
    "मत्स्य पालन की आय उत्पादन चक्र और बाजार कीमतों के अनुसार बदल सकती है।",

  "Nearby buyers and markets can support sales.":
    "पास के खरीदार और बाजार बिक्री को समर्थन दे सकते हैं।",

  "Suitable fish varieties can be selected according to local conditions.":
    "स्थानीय परिस्थितियों के अनुसार उपयुक्त मछली प्रजातियों का चयन किया जा सकता है।",

  "Disease and environmental conditions can affect production.":
    "बीमारी और पर्यावरणीय परिस्थितियाँ उत्पादन को प्रभावित कर सकती हैं।",

  "Fish perishability can create market-access challenges.":
    "मछली के जल्दी खराब होने के कारण बाजार तक पहुँच में कठिनाई हो सकती है।",

  "Fish can serve local food-market demand.":
    "मछली स्थानीय खाद्य बाजार की मांग को पूरा कर सकती है।",

  "Fishery operations can require careful production and water management.":
    "मत्स्य पालन के लिए उत्पादन और जल प्रबंधन पर विशेष ध्यान देने की आवश्यकता हो सकती है।",

  "Nearby markets and buyers can be identified using available mapped evidence.":
    "उपलब्ध मैप किए गए प्रमाणों का उपयोग करके आसपास के बाजारों और खरीदारों की पहचान की जा सकती है।",

  "Local demand and suitable fish varieties can be verified before expansion.":
    "विस्तार से पहले स्थानीय मांग और उपयुक्त मछली प्रजातियों की पुष्टि की जा सकती है।",

  "A lower-income period could create repayment pressure under the entered assumptions.":
    "कम आय वाली अवधि में दर्ज की गई वित्तीय मान्यताओं के अनुसार ऋण चुकाने का दबाव बढ़ सकता है।",

  "Perishable inventory requires reliable market access.":
    "जल्दी खराब होने वाले उत्पादों के लिए विश्वसनीय बाजार तक पहुंच आवश्यक है।",

  /* -------------------------------------------------------
     OSM
  ------------------------------------------------------- */

  "No directly relevant mapped business was found in the current OpenStreetMap search.":
    "वर्तमान OpenStreetMap खोज में कोई सीधे संबंधित मैप किया गया व्यवसाय नहीं मिला।",

  "OpenStreetMap coverage is incomplete.":
    "OpenStreetMap का कवरेज पूर्ण नहीं है।",

  "OpenStreetMap coverage is incomplete, so the absence of mapped businesses must not be treated as absence of real-world competitors.":
    "OpenStreetMap का कवरेज पूर्ण नहीं है, इसलिए मैप किए गए व्यवसायों की अनुपस्थिति को वास्तविक दुनिया में प्रतिस्पर्धियों की अनुपस्थिति नहीं माना जाना चाहिए।",

  "Mapped local businesses can be used for competitor and market verification.":
    "मैप किए गए स्थानीय व्यवसायों का उपयोग प्रतिस्पर्धी और बाजार की जानकारी की पुष्टि के लिए किया जा सकता है।",

  "OpenStreetMap did not return a mapped business match for this category.":
    "OpenStreetMap ने इस व्यवसाय श्रेणी के लिए कोई मैप किया गया व्यवसाय नहीं दिखाया।",

  "No mapped marketplace was found within the selected search radius.":
    "चयनित खोज क्षेत्र के भीतर कोई मैप किया गया बाजार नहीं मिला।",

  /* -------------------------------------------------------
     GENERAL
  ------------------------------------------------------- */

  "No specific evidence is available for this category.":
    "इस श्रेणी के लिए कोई विशेष प्रमाण उपलब्ध नहीं है।",

  "The absence of mapped businesses does not mean that competitors do not exist.":
    "मैप किए गए व्यवसायों की अनुपस्थिति का अर्थ यह नहीं है कि वास्तविक प्रतिस्पर्धी मौजूद नहीं हैं।",

  /* -------------------------------------------------------
     DISCLAIMER
  ------------------------------------------------------- */

  "Real data reflects source data. Mapped data reflects community-mapped places on OpenStreetMap. Estimated values are based on business-plan or scenario assumptions. Verify local conditions before investment.":
    "वास्तविक डेटा प्राप्त स्रोत डेटा को दर्शाता है। मैप किया गया डेटा OpenStreetMap पर समुदाय द्वारा मैप किए गए स्थानों को दर्शाता है। अनुमानित मान व्यवसाय योजना या परिदृश्य की मान्यताओं पर आधारित हैं। निवेश से पहले स्थानीय परिस्थितियों की पुष्टि करें।",
};

/* =========================================================
   FINANCIAL TRANSLATIONS
========================================================= */

function translateFinancialEvidence(text, lang) {
  if (lang !== "hi") {
    return text;
  }

  let match;

  match = text.match(
    /^Normal estimated cash after EMI is (₹[\d,]+(?:\.\d+)?) per month\.$/
  );

  if (match) {
    return `सामान्य स्थिति में EMI के बाद अनुमानित नकद ${match[1]} प्रति माह है।`;
  }

  match = text.match(
    /^The 30% income-stress scenario remains positive at (₹[\d,]+(?:\.\d+)?) after EMI\.$/
  );

  if (match) {
    return `30% आय में कमी की स्थिति में भी EMI के बाद ${match[1]} सकारात्मक नकद शेष रहता है।`;
  }

  match = text.match(
    /^The 30% income-stress scenario becomes negative at (₹[\d,]+(?:\.\d+)?) after EMI\.$/
  );

  if (match) {
    return `30% आय में कमी की स्थिति में EMI के बाद नकद शेष ${match[1]} नकारात्मक हो जाता है।`;
  }

  match = text.match(
    /^Normal cash after EMI is (₹[\d,]+(?:\.\d+)?) per month\.$/
  );

  if (match) {
    return `सामान्य स्थिति में EMI के बाद नकद ${match[1]} प्रति माह है।`;
  }

  match = text.match(
    /^Cash after the 30% income reduction is (₹[\d,]+(?:\.\d+)?)\.$/
  );

  if (match) {
    return `30% आय में कमी के बाद नकद शेष ${match[1]} है।`;
  }

  return text;
}

/* =========================================================
   CENSUS TRANSLATIONS
========================================================= */

function translateCensusEvidence(text, lang) {
  if (lang !== "hi") {
    return text;
  }

  let match;

  match = text.match(
    /^Census 2011 reports a population of ([\d,]+) for the selected area\.$/
  );

  if (match) {
    return `Census 2011 के अनुसार चयनित क्षेत्र की जनसंख्या ${match[1]} है।`;
  }

  match = text.match(
    /^Census 2011 reports population of ([\d,]+) for the selected area\.$/
  );

  if (match) {
    return `Census 2011 के अनुसार चयनित क्षेत्र की जनसंख्या ${match[1]} है।`;
  }

  return text;
}

/* =========================================================
   OSM TRANSLATIONS
========================================================= */

function translateOSMEvidence(text, lang) {
  if (lang !== "hi") {
    return text;
  }

  let match;

  match = text.match(
    /^OpenStreetMap contains (\d+) directly mapped (.+?) business reference\(s\) within the search area\.$/
  );

  if (match) {
    const business = businessNameHindi[match[2]] || match[2];

    return `OpenStreetMap में खोज क्षेत्र के भीतर ${match[1]} सीधे मैप किए गए ${business} व्यवसाय संदर्भ मिले।`;
  }

  match = text.match(
    /^OpenStreetMap contains (\d+) potential retail references in the selected search area\. These can support local market verification\.$/
  );

  if (match) {
    return `OpenStreetMap में चयनित खोज क्षेत्र के भीतर ${match[1]} संभावित खुदरा संदर्भ मिले। इनका उपयोग स्थानीय बाजार की जानकारी की पुष्टि के लिए किया जा सकता है।`;
  }

  match = text.match(
    /^OpenStreetMap contains (\d+) potential retail references in the selected search area\.$/
  );

  if (match) {
    return `OpenStreetMap में चयनित खोज क्षेत्र के भीतर ${match[1]} संभावित खुदरा संदर्भ मिले।`;
  }

  match = text.match(
    /^OpenStreetMap contains (\d+) mapped local businesses in the selected search area\.$/
  );

  if (match) {
    return `OpenStreetMap में चयनित खोज क्षेत्र के भीतर ${match[1]} स्थानीय मैप किए गए व्यवसाय मिले।`;
  }

  match = text.match(
    /^A mapped marketplace was found approximately ([\d.]+) km from the selected location\.$/
  );

  if (match) {
    return `चयनित स्थान से लगभग ${match[1]} किमी की दूरी पर एक मैप किया गया बाजार मिला।`;
  }

  match = text.match(
    /^A mapped marketplace is approximately ([\d.]+) km away\.$/
  );

  if (match) {
    return `एक मैप किया गया बाजार लगभग ${match[1]} किमी की दूरी पर है।`;
  }

  if (
    text ===
    "No mapped marketplace was found within the selected search radius."
  ) {
    return "चयनित खोज क्षेत्र के भीतर कोई मैप किया गया बाजार नहीं मिला।";
  }

  if (
    text ===
    "OpenStreetMap did not return a mapped business match for this category."
  ) {
    return "OpenStreetMap ने इस व्यवसाय श्रेणी के लिए कोई मैप किया गया व्यवसाय नहीं दिखाया।";
  }

  if (
    text ===
    "No directly relevant mapped business was found in the current OpenStreetMap search."
  ) {
    return "वर्तमान OpenStreetMap खोज में कोई सीधे संबंधित मैप किया गया व्यवसाय नहीं मिला।";
  }

  if (
    text ===
    "OpenStreetMap coverage is incomplete."
  ) {
    return "OpenStreetMap का कवरेज पूर्ण नहीं है।";
  }

  if (
    text ===
    "OpenStreetMap coverage is incomplete, so the absence of mapped businesses must not be treated as absence of real-world competitors."
  ) {
    return "OpenStreetMap का कवरेज पूर्ण नहीं है, इसलिए मैप किए गए व्यवसायों की अनुपस्थिति को वास्तविक दुनिया में प्रतिस्पर्धियों की अनुपस्थिति नहीं माना जाना चाहिए।";
  }

  return text;
}

/* =========================================================
   AGMARKNET TRANSLATIONS
========================================================= */

function translateMarketEvidence(text, lang) {
  if (lang !== "hi") {
    return text;
  }

  let match;

  /* Current format shown in the UI */

  match = text.match(
    /^Agmarknet provides a (.+?) price reference of ([\d,]+(?:\.\d+)?) Rs\.\/Quintal\.$/
  );

  if (match) {
    const commodity = match[1];

    return `Agmarknet के अनुसार ${commodity} की कीमत का संदर्भ ₹${match[2]} प्रति क्विंटल है।`;
  }

  /* Modal price */

  match = text.match(
    /^Agmarknet reports a modal price of ₹?([\d,]+(?:\.\d+)?) for (.+?) in the selected market area\.$/
  );

  if (match) {
    return `Agmarknet के अनुसार चयनित बाजार क्षेत्र में ${match[2]} का औसत बाजार मूल्य ₹${match[1]} है।`;
  }

  /* Generic market price */

  match = text.match(
    /^Agmarknet reports a market price of ₹?([\d,]+(?:\.\d+)?) for (.+?)\.$/
  );

  if (match) {
    return `Agmarknet के अनुसार ${match[2]} का बाजार मूल्य ₹${match[1]} है।`;
  }

  if (
    text ===
    "No applicable Agmarknet commodity was configured for this business."
  ) {
    return "इस व्यवसाय के लिए कोई लागू Agmarknet वस्तु निर्धारित नहीं है।";
  }

  if (
    text ===
    "Agmarknet data was not available for the selected commodity and location."
  ) {
    return "चयनित वस्तु और स्थान के लिए Agmarknet डेटा उपलब्ध नहीं था।";
  }

  return text;
}

/* =========================================================
   MASTER TEXT TRANSLATOR
========================================================= */

function translateText(text, lang) {
  if (!text || typeof text !== "string") {
    return text;
  }

  /* English mode = show backend English exactly */

  if (lang !== "hi") {
    return text;
  }

  /* -------------------------------------------------------
     1. Exact translation
  ------------------------------------------------------- */

  if (exactHindiTranslations[text]) {
    return exactHindiTranslations[text];
  }

  /* -------------------------------------------------------
     2. Financial evidence
  ------------------------------------------------------- */

  let translated = translateFinancialEvidence(
    text,
    lang
  );

  if (translated !== text) {
    return translated;
  }

  /* -------------------------------------------------------
     3. Census
  ------------------------------------------------------- */

  translated = translateCensusEvidence(
    text,
    lang
  );

  if (translated !== text) {
    return translated;
  }

  /* -------------------------------------------------------
     4. OSM
  ------------------------------------------------------- */

  translated = translateOSMEvidence(
    text,
    lang
  );

  if (translated !== text) {
    return translated;
  }
  const stressMatch = text.match(
    /^The 30% income-stress scenario becomes negative at (₹-?[\d,]+(?:\.\d+)?) after EMI\.$/
  );

  if (stressMatch) {
    return `30% आय-तनाव परिदृश्य में EMI के बाद नकद प्रवाह ${stressMatch[1]} हो जाता है।`;
  }

  /* -------------------------------------------------------
     5. Agmarknet
  ------------------------------------------------------- */

  translated = translateMarketEvidence(
    text,
    lang
  );

  if (translated !== text) {
    return translated;
  }

  /* -------------------------------------------------------
     6. Dynamic business-name replacement
  ------------------------------------------------------- */

  let result = text;

  Object.entries(
    businessNameHindi
  ).forEach(
    ([english, hindi]) => {
      result = result.replaceAll(
        english,
        hindi
      );
    }
  );

  if (result !== text) {
    return result;
  }

  /* -------------------------------------------------------
     7. Final common translations
  ------------------------------------------------------- */

  const genericTranslations = {
    "No specific evidence is available for this category.":
      "इस श्रेणी के लिए कोई विशेष प्रमाण उपलब्ध नहीं है।",

    "Mapped local businesses can be used for competitor and market verification.":
      "मैप किए गए स्थानीय व्यवसायों का उपयोग प्रतिस्पर्धी और बाजार की जानकारी की पुष्टि के लिए किया जा सकता है।",

    "Local market demand should be verified before investment.":
      "निवेश से पहले स्थानीय बाजार की मांग की पुष्टि की जानी चाहिए।",

    "Local competition should be verified before investment.":
      "निवेश से पहले स्थानीय प्रतिस्पर्धा की पुष्टि की जानी चाहिए।",

    "The business should be evaluated using local demand and cost conditions.":
      "व्यवसाय का मूल्यांकन स्थानीय मांग और लागत की परिस्थितियों के आधार पर किया जाना चाहिए।",

    "The absence of mapped businesses does not mean that competitors do not exist.":
      "मैप किए गए व्यवसायों की अनुपस्थिति का अर्थ यह नहीं है कि वास्तविक प्रतिस्पर्धी मौजूद नहीं हैं।",

    "Local evidence should be verified before investment.":
      "निवेश से पहले स्थानीय प्रमाण की पुष्टि की जानी चाहिए।",

    "Market conditions may vary by location.":
      "बाजार की परिस्थितियाँ स्थान के अनुसार अलग-अलग हो सकती हैं।",
  };

  return (
    genericTranslations[text] ||
    text
  );
}

/* =========================================================
   SOURCE TRANSLATIONS
========================================================= */

function translateSource(source, lang) {
  if (lang !== "hi") {
    return source;
  }

  const map = {
    "Financial Rule Engine":
      "वित्तीय नियम इंजन",

    "Seasonal Stress Test":
      "मौसमी तनाव परीक्षण",

    "Business Planning Profile":
      "व्यवसाय योजना प्रोफाइल",

    "Census 2011":
      "Census 2011",

    OpenStreetMap:
      "OpenStreetMap",

    Agmarknet:
      "Agmarknet",

    "Agmarknet APMC":
      "Agmarknet APMC",

    "Deterministic Python Financial Rule Engine":
      "डिटरमिनिस्टिक Python वित्तीय नियम इंजन",
  };

  return map[source] || source;
}

/* =========================================================
   EVIDENCE ITEM
========================================================= */

function EvidenceItem({
  item,
  lang,
}) {
  const t =
    translations[lang] ||
    translations.en;

  if (!item) {
    return null;
  }

  const text =
    typeof item === "string"
      ? item
      : item.text ||
        item.message ||
        "";

  const confidence =
    typeof item === "object"
      ? item.confidence
      : null;

  const source =
    typeof item === "object"
      ? item.source
      : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

      <div className="flex items-start justify-between gap-3">

        <p className="text-sm font-medium leading-6 text-gray-800">
          {translateText(
            text,
            lang
          )}
        </p>

        {confidence && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
              confidenceStyles[confidence] ||
              "bg-gray-100 text-gray-600"
            }`}
          >
            {t.confidence[confidence] ||
              confidence}
          </span>
        )}

      </div>

      {source && (
        <p className="mt-2 text-xs text-gray-500">
          {t.source}:{" "}
          {translateSource(
            source,
            lang
          )}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   SWOT SECTION
========================================================= */

function SWOTSection({
  title,
  items,
  icon,
  lang,
}) {
  const t =
    translations[lang] ||
    translations.en;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center gap-2">

        <span className="text-xl">
          {icon}
        </span>

        <h3 className="text-lg font-bold text-gray-800">
          {title}
        </h3>

      </div>

      {items.length > 0 ? (

        <div className="space-y-3">

          {items.map(
            (item, index) => (
              <EvidenceItem
                key={`${title}-${index}`}
                item={item}
                lang={lang}
              />
            )
          )}

        </div>

      ) : (

        <p className="text-sm text-gray-500">
          {t.noEvidence}
        </p>

      )}

    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdvisorySWOT({
  data,
  advisory,
  lang = "en",
}) {
  const t =
    translations[lang] ||
    translations.en;

  /* =======================================================
     NORMALIZE API RESPONSE
  ======================================================= */

  let response =
    data ||
    advisory ||
    {};

  if (
    response?.data &&
    typeof response.data === "object" &&
    (
      response.data.swot ||
      response.data.advisory ||
      response.data.evidence_summary
    )
  ) {
    response =
      response.data;
  }

  const advisoryData =
    response?.advisory &&
    typeof response.advisory === "object"
      ? response.advisory
      : response;

  /* =======================================================
     SWOT
  ======================================================= */

  const swot =
    response?.swot ||
    advisoryData?.swot ||
    {};

  const strengths =
    Array.isArray(
      swot.strengths
    )
      ? swot.strengths
      : [];

  const weaknesses =
    Array.isArray(
      swot.weaknesses
    )
      ? swot.weaknesses
      : [];

  const opportunities =
    Array.isArray(
      swot.opportunities
    )
      ? swot.opportunities
      : [];

  const threats =
    Array.isArray(
      swot.threats
    )
      ? swot.threats
      : [];

  /* =======================================================
     EVIDENCE SUMMARY
  ======================================================= */

  const evidenceSummary =
    response?.evidence_summary ||
    advisoryData?.evidence_summary ||
    {};

  /* =======================================================
     ENTERPRISE STATUS
  ======================================================= */

  const enterpriseStatus =
    response?.enterprise_status ||
    advisoryData?.enterprise_status ||
    "Needs Review";

  /* =======================================================
     EVIDENCE BASED
  ======================================================= */

  const evidenceBased =
    response?.evidence_based ??
    advisoryData?.evidence_based ??
    false;

  /* =======================================================
     DATA STATUS
  ======================================================= */

  const dataStatus =
    response?.data_status ||
    advisoryData?.data_status ||
    {};

  /* =======================================================
     SOURCES
  ======================================================= */

  const sources =
    response?.sources ||
    advisoryData?.sources ||
    [];

  /* =======================================================
     DISCLAIMER
  ======================================================= */

  const disclaimer =
    response?.disclaimer ||
    advisoryData?.disclaimer ||
    "";

  /* =======================================================
     DISCLAIMER TRANSLATION
  ======================================================= */

  const hindiDisclaimer =
    "वास्तविक डेटा प्राप्त स्रोत डेटा को दर्शाता है। मैप किया गया डेटा OpenStreetMap पर समुदाय द्वारा मैप किए गए स्थानों को दर्शाता है। अनुमानित मान व्यवसाय योजना या परिदृश्य की मान्यताओं पर आधारित हैं। निवेश से पहले स्थानीय परिस्थितियों की पुष्टि करें।";

  return (
    <div className="mt-8 space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              {t.title}
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              {t.subtitle}
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                enterpriseStatus ===
                "Evidence Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {enterpriseStatus ===
              "Evidence Available"
                ? t.evidenceAvailable
                : t.needsReview}
            </span>

            {evidenceBased && (
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                {t.evidenceBased}
              </span>
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          EVIDENCE SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            {t.realData}
          </p>

          <p className="mt-1 text-xl font-bold text-green-600">
            {evidenceSummary.real_data_items ?? 0}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            {t.mappedData}
          </p>

          <p className="mt-1 text-xl font-bold text-blue-600">
            {evidenceSummary.mapped_data_items ?? 0}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            {t.calculated}
          </p>

          <p className="mt-1 text-xl font-bold text-purple-600">
            {evidenceSummary.calculated_items ?? 0}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            {t.estimated}
          </p>

          <p className="mt-1 text-xl font-bold text-yellow-600">
            {evidenceSummary.estimated_items ?? 0}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            {t.totalEvidence}
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {evidenceSummary.total_evidence_items ?? 0}
          </p>
        </div>

      </div>

      {/* =====================================================
          SWOT
      ===================================================== */}

      <div className="grid gap-5 md:grid-cols-2">

        <SWOTSection
          title={t.strengths}
          icon="💪"
          items={strengths}
          lang={lang}
        />

        <SWOTSection
          title={t.weaknesses}
          icon="⚠️"
          items={weaknesses}
          lang={lang}
        />

        <SWOTSection
          title={t.opportunities}
          icon="🚀"
          items={opportunities}
          lang={lang}
        />

        <SWOTSection
          title={t.threats}
          icon="🛡️"
          items={threats}
          lang={lang}
        />

      </div>

      {/* =====================================================
          DATA STATUS
      ===================================================== */}

      {Object.keys(dataStatus).length > 0 && (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <h3 className="mb-4 text-lg font-bold text-gray-800">
            {t.dataSources}
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">

            {Object.entries(
              dataStatus
            ).map(
              ([source, status]) => (

                <div
                  key={source}
                  className="rounded-xl bg-gray-50 p-3"
                >

                  <p className="text-xs capitalize text-gray-500">

                    {t.status[source] ||
                      source.replaceAll(
                        "_",
                        " "
                      )}

                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">

                    {t.confidence[status] ||
                      status}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* =====================================================
          SOURCES
      ===================================================== */}

      {Array.isArray(sources) &&
        sources.length > 0 && (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <h3 className="mb-3 text-lg font-bold text-gray-800">
            {t.sourcesUsed}
          </h3>

          <div className="flex flex-wrap gap-2">

            {sources.map(
              (source, index) => (

                <span
                  key={`${source}-${index}`}
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  {translateSource(
                    source,
                    lang
                  )}
                </span>

              )
            )}

          </div>

        </div>

      )}

      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      {disclaimer && (

        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

          <p className="text-sm leading-6 text-yellow-800">

            <strong>
              {t.note}
            </strong>{" "}

            {lang === "hi"
              ? hindiDisclaimer
              : disclaimer}

          </p>

        </div>

      )}

    </div>
  );
}