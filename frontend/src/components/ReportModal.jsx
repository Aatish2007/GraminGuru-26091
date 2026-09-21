import React from 'react';

import {
  X,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';

const BUSINESS_NAMES = {
  Dairy: {
    en: 'Dairy',
    hi: 'डेयरी'
  },

  Tailoring: {
    en: 'Tailoring',
    hi: 'सिलाई'
  },

  Kirana: {
    en: 'Kirana',
    hi: 'किराना'
  },

  Poultry: {
    en: 'Poultry',
    hi: 'पोल्ट्री'
  },

  SolarGrid: {
    en: 'Solar Grid',
    hi: 'सोलर ग्रिड'
  },

  'Solar Grid': {
    en: 'Solar Grid',
    hi: 'सोलर ग्रिड'
  },

  FlourMill: {
    en: 'Flour Mill',
    hi: 'आटा चक्की'
  },

  'Flour Mill': {
    en: 'Flour Mill',
    hi: 'आटा मिल'
  },

  Fishery: {
    en: 'Fishery',
    hi: 'मत्स्य पालन'
  }
};

const COMMODITY_NAMES = {
  Maize: {
    en: 'Maize',
    hi: 'मक्का'
  },

  Wheat: {
    en: 'Wheat',
    hi: 'गेहूं'
  }
};

function getBusinessName(business, hi) {
  return (
    BUSINESS_NAMES[business]?.[hi ? 'hi' : 'en'] ||
    business ||
    '—'
  );
}

function getCommodityName(commodity, hi) {
  return (
    COMMODITY_NAMES[commodity]?.[hi ? 'hi' : 'en'] ||
    commodity ||
    '—'
  );
}

export default function ReportModal({
  isOpen,
  onClose,
  form,
  assessmentData,
  marketData,
  schemeData,
  advisoryData,
  comparisonData,
  lang = 'en'
}) {
  if (!isOpen) {
    return null;
  }

  const hi = lang === 'hi';

  /* ============================================================
     FINANCIAL VALUES
  ============================================================ */

  const projectCost = Number(
    form?.project_cost ??
    assessmentData?.project_cost ??
    0
  );

  const ownCapital = Number(
    form?.own_capital ??
    assessmentData?.own_capital ??
    0
  );

  const requiredLoan = Number(
    assessmentData?.required_loan ??
    assessmentData?.loan_required ??
    Math.max(0, projectCost - ownCapital)
  );

  const readinessScore = Number(
    assessmentData?.readiness_score ??
    assessmentData?.score ??
    0
  );

  const normalCash = Number(
    assessmentData?.normal_cash_after_emi ??
    assessmentData?.monthly_cash_after_emi ??
    0
  );

  const stressCash = Number(
    assessmentData?.stress_cash_after_emi ??
    0
  );

  const emi = Number(
  assessmentData?.emi ??
  assessmentData?.financial_engine?.emi ??
  comparisonData?.emi ??
  0
);

  const interestRate = Number(
  assessmentData?.interest_rate ??
  assessmentData?.financial_engine?.interest_rate ??
  form?.interest_rate ??
  10
);

const tenure = Number(
  assessmentData?.tenure_years ??
  assessmentData?.financial_engine?.tenure_years ??
  form?.tenure_years ??
  5
);

  const financialEngine =
  assessmentData?.financial_engine || {};

const moratoriumMonths = Number(
  financialEngine?.moratorium_months ??
  assessmentData?.moratorium_months ??
  form?.moratorium_months ??
  0
);

const moratoriumInterest = Number(
  financialEngine?.moratorium_interest_estimate ??
  financialEngine?.moratorium_interest ??
  assessmentData?.moratorium_interest_estimate ??
  assessmentData?.moratorium_interest ??
  0
);

  /* ============================================================
     MARKET DATA
  ============================================================ */

  const population =
    marketData?.population?.value ??
    marketData?.population?.population ??
    marketData?.census?.population ??
    null;

  const nearbyBusinessData =
    marketData?.nearby_businesses;

  const mappedBusinesses =
    nearbyBusinessData?.business_match_count ??
    nearbyBusinessData?.businessMatches ??
    nearbyBusinessData?.count ??
    nearbyBusinessData?.value ??
    null;

  const osmSuccess =
    nearbyBusinessData?.success !== false;

  const marketPrice =
    marketData?.market_price?.value ??
    marketData?.market_price?.average_modal_price ??
    null;

  const commodity =
    marketData?.market_price?.commodity ??
    null;

  const buyerDistance =
    marketData?.buyer_distance_km?.value ??
    marketData?.buyer_distance?.value ??
    null;

  const buyerName =
    marketData?.buyer_distance_km?.name ??
    marketData?.buyer_distance?.name ??
    null;

  /* ============================================================
     SCHEME DATA
  ============================================================ */

  const verifiedScheme =
    schemeData?.recommended_scheme ||
    schemeData?.verified_scheme ||
    null;

  const possibleSchemes = Array.isArray(
    schemeData?.possible_schemes
  )
    ? schemeData.possible_schemes
    : [];

  const schemeRoutes = possibleSchemes
    .map((scheme) => {
      if (typeof scheme === 'string') {
        return scheme;
      }

      return (
        scheme?.name ||
        scheme?.scheme ||
        scheme?.title ||
        null
      );
    })
    .filter(Boolean);

  const primarySchemeDisplay =
    verifiedScheme ||
    (
      hi
        ? 'पात्रता सत्यापित करें'
        : 'Verify Scheme Eligibility'
    );

  const schemeLoan = Number(
    schemeData?.loan_required ??
    schemeData?.required_loan ??
    requiredLoan
  );

  const stressNegative = stressCash < 0;

  /* ============================================================
     NAMES
  ============================================================ */

  const businessName = getBusinessName(
    form?.business,
    hi
  );

  const commodityName = getCommodityName(
    commodity,
    hi
  );

  /* ============================================================
     ADVISORY
  ============================================================ */

  const advisoryText = hi
    ? 'निवेश से पहले स्थानीय बाजार प्रमाण, वित्तीय व्यवहार्यता और ऋण पुनर्भुगतान जोखिम की समीक्षा करें।'
    : (
        advisoryData?.recommendation ||
        'Verify local demand, competition, costs and repayment capacity before investment.'
      );

  /* ============================================================
     HELPERS
  ============================================================ */

  function handlePrint() {
    window.print();
  }

  /*
    Correct Indian currency formatting.

    Positive:
    ₹5,263.30

    Negative:
    -₹736.70

    NOT:
    ₹-736.70
  */
  const money = (value) => {
    const amount = Number(value) || 0;

    const formatted = Math.abs(amount).toLocaleString(
      'en-IN',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );

    return amount < 0
      ? `-₹${formatted}`
      : `₹${formatted}`;
  };

  const populationDisplay =
    population !== null
      ? Number(population).toLocaleString('en-IN')
      : '—';

  const mappedBusinessDisplay =
    !osmSuccess
      ? (
          hi
            ? 'उपलब्ध नहीं'
            : 'Unavailable'
        )
      : mappedBusinesses !== null
        ? Number(mappedBusinesses).toLocaleString('en-IN')
        : '—';

  const buyerDistanceDisplay =
    Number.isFinite(Number(buyerDistance)) &&
    Number(buyerDistance) > 0
      ? `${Number(buyerDistance).toFixed(2)} km`
      : '—';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4 overflow-y-auto">

      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-violet-100 my-8 animate-slide-up">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-violet-600" />
            </div>

            <div>

              <h3 className="font-extrabold text-slate-900">
                {hi
                  ? 'GraminGuru व्यवसाय रिपोर्ट'
                  : 'GraminGuru Enterprise Report'}
              </h3>

              <p className="text-[11px] text-slate-500">
                {hi
                  ? 'व्यवसाय और वित्तीय निर्णय-सहायता सारांश'
                  : 'Business and financial decision-support summary'}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={handlePrint}
              className="
                flex items-center gap-2
                bg-gradient-to-r
                from-violet-600
                via-purple-600
                to-fuchsia-600
                hover:from-violet-700
                hover:via-purple-700
                hover:to-fuchsia-700
                text-white font-bold text-xs
                px-3 py-2 rounded-lg
                shadow-sm hover:shadow-md
                transition-all duration-200
                hover:-translate-y-0.5
              "
            >
              <Printer className="w-4 h-4" />

              {hi
                ? 'प्रिंट / PDF'
                : 'Print / PDF'}
            </button>

            <button
              onClick={onClose}
              className="
                p-2
                text-slate-400
                hover:text-violet-700
                hover:bg-violet-50
                rounded-lg
                transition-all
                duration-200
              "
            >
              <X className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* ==================================================
            REPORT
        ================================================== */}

        <div className="p-6 sm:p-8 space-y-7">

          {/* ==================================================
              TITLE
          ================================================== */}

          <div className="border-b-2 border-violet-600 pb-4">

            <h1 className="text-3xl font-extrabold text-slate-900">

              Gramin
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Guru
              </span>

            </h1>

            <p className="text-sm font-semibold text-slate-700 mt-1">

              {hi
                ? 'व्यवसाय निर्णय-सहायता रिपोर्ट'
                : 'Enterprise Decision-Support Report'}

            </p>

            <p className="text-xs text-slate-500 mt-1">
              {form?.location || '—'}
            </p>

          </div>

          {/* ==================================================
              BUSINESS PROFILE
          ================================================== */}

          <ReportSection
            title={
              hi
                ? '1. व्यवसाय और बाजार प्रोफ़ाइल'
                : '1. Business & Market Profile'
            }
          >

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

              <Item
                label={hi ? 'व्यवसाय' : 'Business'}
                value={businessName}
              />

              <Item
                label={hi ? 'स्थान' : 'Location'}
                value={form?.location || '—'}
              />

              <Item
                label={hi ? 'जनसंख्या' : 'Population'}
                value={populationDisplay}
              />

              <Item
                label={
                  hi
                    ? 'मैप किए गए व्यवसाय'
                    : 'Mapped Businesses'
                }
                value={mappedBusinessDisplay}
              />

            </div>

          </ReportSection>

          {/* ==================================================
              FINANCIAL
          ================================================== */}

          <ReportSection
            title={
              hi
                ? '2. वित्तीय योजना'
                : '2. Financial Plan'
            }
          >

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

              <Item
                label={hi ? 'परियोजना लागत' : 'Project Cost'}
                value={money(projectCost)}
              />

              <Item
                label={hi ? 'स्वयं की पूंजी' : 'Own Capital'}
                value={money(ownCapital)}
              />

              <Item
                label={hi ? 'आवश्यक ऋण' : 'Required Loan'}
                value={money(requiredLoan)}
              />

              <Item
                label={hi ? 'मासिक EMI' : 'Monthly EMI'}
                value={money(emi)}
              />

              <Item
                label={hi ? 'ब्याज दर' : 'Interest Rate'}
                value={`${interestRate}%`}
              />

              <Item
                label={hi ? 'अवधि' : 'Tenure'}
                value={`${tenure} ${hi ? 'वर्ष' : 'Years'}`}
              />

            </div>

            {/* MORATORIUM */}

            <div className="mt-5 pt-4 border-t border-slate-200">

              <div className="flex items-center gap-2 mb-3">

                <Clock className="w-4 h-4 text-violet-600" />

                <p className="text-xs font-bold text-slate-700">
                  {hi
                    ? 'मोराटोरियम / स्थगन अवधि'
                    : 'Moratorium Period'}
                </p>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                <Item
                  label={
                    hi
                      ? 'स्थगन अवधि'
                      : 'Moratorium'
                  }
                  value={
                    moratoriumMonths > 0
                      ? `${moratoriumMonths} ${hi ? 'महीने' : 'Months'}`
                      : (
                          hi
                            ? 'कोई मोराटोरियम नहीं'
                            : 'No Moratorium'
                        )
                  }
                  valueClass="text-violet-700"
                />

                <Item
                  label={
                    hi
                      ? 'स्थगन ब्याज अनुमान'
                      : 'Moratorium Interest Estimate'
                  }
                  value={money(moratoriumInterest)}
                />

                <Item
                  label={
                    hi
                      ? 'गणना स्थिति'
                      : 'Calculation Status'
                  }
                  value={
                    hi
                      ? 'अनुमानित'
                      : 'Estimated'
                  }
                />

              </div>

              {moratoriumMonths > 0 && (

                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">

                  <p className="text-xs text-amber-700 leading-relaxed">

                    {hi
                      ? `यह ${moratoriumMonths} महीने की स्थगन अवधि का अनुमान है। वास्तविक मोराटोरियम शर्तें संबंधित योजना या ऋणदाता पर निर्भर करती हैं।`
                      : `This is an estimate for a ${moratoriumMonths}-month moratorium. Actual moratorium terms depend on the applicable scheme or lender.`}

                  </p>

                </div>

              )}

            </div>

          </ReportSection>

          {/* ==================================================
              FEASIBILITY
          ================================================== */}

          <ReportSection
            title={
              hi
                ? '3. व्यवहार्यता और तनाव परीक्षण'
                : '3. Feasibility & Stress Test'
            }
          >

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <Item
                label={
                  hi
                    ? 'तैयारी स्कोर'
                    : 'Readiness Score'
                }
                value={`${readinessScore} / 100`}
                valueClass="text-violet-700"
              />

              <Item
                label={
                  hi
                    ? 'EMI के बाद सामान्य नकदी'
                    : 'Normal Cash After EMI'
                }
                value={money(normalCash)}
                valueClass={
                  normalCash >= 0
                    ? 'text-emerald-700'
                    : 'text-red-600'
                }
              />

              <Item
                label={
                  hi
                    ? '30% बिक्री-कमी के बाद नकदी'
                    : 'Cash After 30% Sales Reduction'
                }
                value={money(stressCash)}
                valueClass={
                  stressNegative
                    ? 'text-red-600'
                    : 'text-emerald-700'
                }
              />

            </div>

            {stressNegative && (

              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">

                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />

                <p className="text-xs text-red-700">

                  {hi
                    ? 'बिक्री में 30% कमी होने पर अनुमानित नकदी प्रवाह नकारात्मक हो जाता है।'
                    : 'Projected cash flow becomes negative under the 30% sales-reduction scenario.'}

                </p>

              </div>

            )}

          </ReportSection>

          {/* ==================================================
              MARKET
          ================================================== */}

          <ReportSection
            title={
              hi
                ? '4. बाजार संदर्भ'
                : '4. Market Evidence'
            }
          >

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

              <Item
                label={hi ? 'बाजार मूल्य' : 'Market Price'}
                value={
                  marketPrice !== null
                    ? money(marketPrice)
                    : '—'
                }
              />

              <Item
                label={hi ? 'कमोडिटी' : 'Commodity'}
                value={commodityName}
              />

              <Item
                label={hi ? 'खरीदार दूरी' : 'Buyer Distance'}
                value={buyerDistanceDisplay}
              />

              <Item
                label={hi ? 'बाजार / खरीदार' : 'Buyer / Market'}
                value={buyerName || '—'}
              />

            </div>

            {!osmSuccess && (

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">

                <p className="text-xs text-amber-700">

                  {hi
                    ? 'OpenStreetMap मैपिंग उपलब्ध नहीं है। इसलिए मैप किए गए व्यवसायों की संख्या को शून्य प्रतिस्पर्धा नहीं माना गया है।'
                    : 'OpenStreetMap mapping is unavailable. Therefore, the mapped business count is not treated as zero competition.'}

                </p>

              </div>

            )}

          </ReportSection>

          {/* ==================================================
              SCHEME GUIDANCE
          ================================================== */}

          <ReportSection
            title={
              hi
                ? '5. योजना मार्गदर्शन'
                : '5. Scheme Guidance'
            }
          >

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <Item
                label={
                  hi
                    ? 'योजना स्थिति'
                    : 'Scheme Status'
                }
                value={primarySchemeDisplay}
                valueClass="text-violet-700"
              />

              <Item
                label={
                  hi
                    ? 'योजना ऋण'
                    : 'Scheme Loan'
                }
                value={money(schemeLoan)}
              />

              <Item
                label={
                  hi
                    ? 'स्थिति'
                    : 'Status'
                }
                value={
                  hi
                    ? 'प्रारंभिक मार्ग'
                    : 'Preliminary Route'
                }
              />

            </div>

            <div className="mt-5">

              <p className="text-xs font-bold text-slate-700 mb-2">

                {hi
                  ? 'संभावित योजना मार्ग'
                  : 'Potential Scheme Routes'}

              </p>

              {schemeRoutes.length > 0 ? (

                <div className="flex flex-wrap gap-2">

                  {schemeRoutes.map((scheme, index) => (

                    <span
                      key={`${scheme}-${index}`}
                      className="
                        px-3 py-1.5
                        rounded-full
                        bg-violet-50
                        border border-violet-200
                        text-violet-700
                        text-xs
                        font-semibold
                      "
                    >
                      {scheme}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="text-xs text-slate-500">

                  {hi
                    ? 'कोई योजना मार्ग उपलब्ध नहीं है।'
                    : 'No scheme routes are currently available.'}

                </p>

              )}

            </div>

            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">

              <p className="text-xs text-amber-700 leading-relaxed">

                {hi
                  ? 'यह केवल प्रारंभिक योजना मार्गदर्शन है। अंतिम पात्रता, सब्सिडी और ऋण शर्तों का आधिकारिक स्रोत से सत्यापन आवश्यक है।'
                  : 'This is preliminary scheme guidance only. Final eligibility, subsidy and loan terms must be verified with the official scheme source.'}

              </p>

            </div>

          </ReportSection>

          {/* ==================================================
              ADVISORY
          ================================================== */}

          <ReportSection
            title={
              hi
                ? '6. व्यवसाय सलाह'
                : '6. Business Advisory'
            }
          >

            <p className="text-sm text-slate-600 leading-relaxed">

              {advisoryText}

            </p>

          </ReportSection>

          {/* ==================================================
              DISCLAIMER
          ================================================== */}

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

            <p className="text-xs text-slate-500 leading-relaxed">

              {hi
                ? 'अस्वीकरण: GraminGuru एक निर्णय-सहायता प्रोटोटाइप है। यह ऋण स्वीकृति, व्यवसाय सफलता, सब्सिडी या अंतिम पात्रता की गारंटी नहीं देता। स्थानीय और आधिकारिक स्रोतों से अंतिम सत्यापन आवश्यक है।'
                : 'Disclaimer: GraminGuru is a decision-support prototype. It does not guarantee loan approval, business success, subsidy or final eligibility. Final verification with official and local sources is required.'}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   REPORT SECTION
============================================================ */

function ReportSection({
  title,
  children
}) {
  return (
    <section>

      <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">

        {title}

      </h2>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

        {children}

      </div>

    </section>
  );
}


/* ============================================================
   REPORT ITEM
============================================================ */

function Item({
  label,
  value,
  valueClass = 'text-slate-900'
}) {
  return (
    <div>

      <span className="text-xs text-slate-500 block">
        {label}
      </span>

      <span
        className={`font-bold text-sm mt-1 block ${valueClass}`}
      >
        {value}
      </span>

    </div>
  );
}