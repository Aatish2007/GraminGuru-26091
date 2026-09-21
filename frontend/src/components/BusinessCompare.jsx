import React, { useMemo } from 'react';

const BUSINESS_PROFILES = [
  {
    name: 'Dairy',
    investment: 200000,
    workingCapital: 50000,
    income: 20000,
    expense: 9000,
    demand: 'High',
    competition: 'Medium',
    seasonalRisk: 'Medium'
  },
  {
    name: 'Tailoring',
    investment: 80000,
    workingCapital: 20000,
    income: 15000,
    expense: 6000,
    demand: 'Medium',
    competition: 'Low',
    seasonalRisk: 'Low'
  },
  {
    name: 'Kirana',
    investment: 150000,
    workingCapital: 40000,
    income: 18000,
    expense: 9000,
    demand: 'High',
    competition: 'High',
    seasonalRisk: 'Low'
  },
  {
    name: 'Poultry',
    investment: 180000,
    workingCapital: 45000,
    income: 22000,
    expense: 11000,
    demand: 'High',
    competition: 'Medium',
    seasonalRisk: 'High'
  },
  {
    name: 'Solar Grid',
    investment: 250000,
    workingCapital: 30000,
    income: 24000,
    expense: 8000,
    demand: 'Medium',
    competition: 'Low',
    seasonalRisk: 'Low'
  },
  {
    name: 'Flour Mill',
    investment: 300000,
    workingCapital: 60000,
    income: 30000,
    expense: 15000,
    demand: 'High',
    competition: 'Medium',
    seasonalRisk: 'Medium'
  },
  {
    name: 'Fishery',
    investment: 220000,
    workingCapital: 50000,
    income: 24000,
    expense: 12000,
    demand: 'Medium',
    competition: 'Medium',
    seasonalRisk: 'High'
  }
];

/* =========================================================
   BUSINESS TRANSLATIONS
========================================================= */

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

  'Solar Grid': {
    en: 'Solar Grid',
    hi: 'सोलर ग्रिड'
  },

  SolarGrid: {
    en: 'Solar Grid',
    hi: 'सोलर ग्रिड'
  },

  'Flour Mill': {
    en: 'Flour Mill',
    hi: 'आटा चक्की'
  },

  Fishery: {
    en: 'Fishery',
    hi: 'मत्स्य पालन'
  }
};

function getBusinessName(name, lang) {
  const key = String(name || '').trim();

  return (
    BUSINESS_NAMES[key]?.[lang === 'hi' ? 'hi' : 'en'] ||
    key ||
    '—'
  );
}

/* =========================================================
   CHARACTERISTIC TRANSLATIONS
========================================================= */

const VALUE_TRANSLATIONS = {
  High: {
    hi: 'उच्च'
  },

  Medium: {
    hi: 'मध्यम'
  },

  Low: {
    hi: 'कम'
  },

  Stress: {
    hi: 'तनाव'
  },

  'Not Available': {
    hi: 'उपलब्ध नहीं'
  }
};

function getTranslatedValue(value, lang) {
  const text = String(value || '');

  if (lang !== 'hi') {
    return text;
  }

  return VALUE_TRANSLATIONS[text]?.hi || text;
}

/* =========================================================
   EMI
========================================================= */

function calculateEMI(principal, annualRate, years) {
  const p = Number(principal) || 0;
  const r = Number(annualRate) || 0;
  const n = (Number(years) || 0) * 12;

  if (p <= 0 || n <= 0) {
    return 0;
  }

  if (r === 0) {
    return p / n;
  }

  const monthlyRate = r / 12 / 100;

  const factor = Math.pow(
    1 + monthlyRate,
    n
  );

  return (
    p *
    monthlyRate *
    factor /
    (factor - 1)
  );
}

/* =========================================================
   CURRENCY
========================================================= */

function formatCurrency(value) {
  const amount = Number(value) || 0;

  const formatted = Math.abs(amount).toLocaleString(
    'en-IN'
  );

  return amount < 0
    ? `-₹${formatted}`
    : `₹${formatted}`;
}

function formatEMI(value) {
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
}

/* =========================================================
   RISK COLOR
========================================================= */

function getRiskClass(value) {
  const text = String(value || '').toLowerCase();

  if (
    text.includes('high') ||
    text.includes('stress') ||
    text.includes('उच्च') ||
    text.includes('तनाव')
  ) {
    return 'text-red-600';
  }

  if (
    text.includes('medium') ||
    text.includes('मध्यम')
  ) {
    return 'text-amber-600';
  }

  if (
    text.includes('low') ||
    text.includes('कम')
  ) {
    return 'text-emerald-600';
  }

  return 'text-slate-600';
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function BusinessCompare({
  comparisonData,
  selectedBusiness,
  lang,
  form
}) {

  const projectCost = Number(
    form?.project_cost ??
    comparisonData?.project_cost ??
    0
  );

  const ownCapital = Number(
    form?.own_capital ??
    comparisonData?.own_capital ??
    0
  );

  const interestRate = Number(
    form?.interest_rate ??
    comparisonData?.interest_rate ??
    10
  );

  const tenureYears = Number(
    form?.tenure_years ??
    comparisonData?.tenure_years ??
    5
  );

  const loanAmount = Math.max(
    projectCost - ownCapital,
    0
  );

  const emi = calculateEMI(
    loanAmount,
    interestRate,
    tenureYears
  );

  /* =========================================================
     BUSINESS DATA
  ========================================================= */

  const businesses = useMemo(() => {

    if (
      Array.isArray(comparisonData?.businesses) &&
      comparisonData.businesses.length > 0
    ) {
      return comparisonData.businesses;
    }

    if (
      Array.isArray(comparisonData?.comparisons) &&
      comparisonData.comparisons.length > 0
    ) {
      return comparisonData.comparisons;
    }

    return BUSINESS_PROFILES;

  }, [comparisonData]);

  /* =========================================================
     CASH CALCULATIONS
  ========================================================= */

  function calculateBusinessValues(business) {

    const income = Number(
      business.income ??
      business.monthly_income ??
      0
    );

    const expense = Number(
      business.expense ??
      business.monthly_expense ??
      0
    );

    const normalCash =
      income -
      expense -
      emi;

    const stressedIncome =
      income * 0.70;

    const stressCash =
      stressedIncome -
      expense -
      emi;

    return {
      income,
      expense,
      normalCash,
      stressCash
    };
  }

  const selectedName =
    String(
      selectedBusiness ||
      form?.business ||
      ''
    );

  const selectedBusinessDisplay =
    getBusinessName(
      selectedName,
      lang
    );

  const title =
    lang === 'hi'
      ? 'व्यवसाय विकल्पों की तुलना'
      : 'Compare Business Options';

  const description =
    lang === 'hi'
      ? 'समान वित्तीय मान्यताओं का उपयोग करके विभिन्न व्यवसायों की तुलना करें।'
      : 'Compare different businesses using the same financial assumptions.';

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="text-slate-600 mt-1">
          {description}
        </p>

      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-5">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm text-violet-700 font-medium">

              {lang === 'hi'
                ? '7 व्यवसाय विकल्प'
                : '7 Business Options'}

            </p>

            <p className="text-lg font-bold text-slate-900 mt-1">

              {lang === 'hi'
                ? `चयनित व्यवसाय: ${selectedBusinessDisplay}`
                : `Selected Business: ${selectedBusinessDisplay}`}

            </p>

          </div>

          <div className="text-3xl">
            📊
          </div>

        </div>

        <p className="text-sm text-slate-600 mb-5">

          {lang === 'hi'
            ? `तुलना में प्रोजेक्ट लागत ${formatCurrency(projectCost)}, अपनी पूंजी ${formatCurrency(ownCapital)}, ऋण ${formatCurrency(loanAmount)}, ब्याज ${interestRate}% और अवधि ${tenureYears} वर्ष का उपयोग किया गया है।`
            : `Comparison uses project cost ${formatCurrency(projectCost)}, own capital ${formatCurrency(ownCapital)}, loan ${formatCurrency(loanAmount)}, interest ${interestRate}% and tenure ${tenureYears} years.`}

        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <SummaryCard
            label={
              lang === 'hi'
                ? 'प्रोजेक्ट लागत'
                : 'Project Cost'
            }
            value={formatCurrency(projectCost)}
          />

          <SummaryCard
            label={
              lang === 'hi'
                ? 'अपनी पूंजी'
                : 'Own Capital'
            }
            value={formatCurrency(ownCapital)}
          />

          <SummaryCard
            label={
              lang === 'hi'
                ? 'ऋण'
                : 'Loan'
            }
            value={formatCurrency(loanAmount)}
          />

          <SummaryCard
            label="EMI"
            value={formatEMI(emi)}
          />

        </div>

      </div>

      {/* =====================================================
          BUSINESS CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {businesses.map((business, index) => {

          const name =
            business.name ||
            business.business ||
            business.business_name ||
            `Business ${index + 1}`;

          const displayName =
            getBusinessName(
              name,
              lang
            );

          const investment = Number(
            business.investment ??
            business.project_cost ??
            business.estimated_investment ??
            0
          );

          const workingCapital = Number(
            business.workingCapital ??
            business.working_capital ??
            0
          );

          const values =
            calculateBusinessValues(business);

          const isSelected =
            String(name).toLowerCase() ===
            selectedName.toLowerCase();

          return (

            <div
              key={name}
              className={`
                rounded-2xl border bg-white p-5
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                ${
                  isSelected
                    ? 'border-violet-500 ring-2 ring-violet-100'
                    : 'border-slate-200'
                }
              `}
            >

              {/* Card Header */}

              <div className="flex items-start justify-between gap-3 mb-5">

                <div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {displayName}
                  </h3>

                  {isSelected && (

                    <span className="inline-flex mt-2 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700">

                      {lang === 'hi'
                        ? 'चयनित'
                        : 'Selected'}

                    </span>

                  )}

                </div>

              </div>

              {/* Investment */}

              <div className="grid grid-cols-2 gap-3 mb-5">

                <InfoItem
                  label={
                    lang === 'hi'
                      ? 'निवेश'
                      : 'Investment'
                  }
                  value={formatCurrency(investment)}
                />

                <InfoItem
                  label={
                    lang === 'hi'
                      ? 'कार्यशील पूंजी'
                      : 'Working Capital'
                  }
                  value={formatCurrency(workingCapital)}
                />

              </div>

              {/* EMI */}

              <div className="rounded-xl bg-violet-50 border border-violet-100 p-3 mb-4">

                <p className="text-xs text-violet-600 font-medium">

                  {lang === 'hi'
                    ? 'मासिक EMI'
                    : 'Monthly EMI'}

                </p>

                <p className="text-xl font-bold text-violet-700 mt-1">
                  {formatEMI(emi)}
                </p>

              </div>

              {/* Income / Expense */}

              <div className="grid grid-cols-2 gap-3 mb-4">

                <InfoItem
                  label={
                    lang === 'hi'
                      ? 'मासिक आय'
                      : 'Monthly Income'
                  }
                  value={formatCurrency(values.income)}
                />

                <InfoItem
                  label={
                    lang === 'hi'
                      ? 'मासिक खर्च'
                      : 'Monthly Expense'
                  }
                  value={formatCurrency(values.expense)}
                />

              </div>

              {/* Cash */}

              <div className="space-y-2 mb-5">

                <CashRow
                  label={
                    lang === 'hi'
                      ? 'EMI के बाद सामान्य नकद'
                      : 'Normal Cash After EMI'
                  }
                  value={values.normalCash}
                />

                <CashRow
                  label={
                    lang === 'hi'
                      ? '30% आय कमी के बाद नकद'
                      : 'Cash After 30% Income Reduction'
                  }
                  value={values.stressCash}
                />

              </div>

              {/* Characteristics */}

              <div className="border-t border-slate-100 pt-4 space-y-2">

                <Characteristic
                  label={
                    lang === 'hi'
                      ? 'बाजार मांग'
                      : 'Market Demand'
                  }
                  value={getTranslatedValue(
                    business.demand ??
                    business.marketDemand ??
                    business.market_demand ??
                    'Not Available',
                    lang
                  )}
                />

                <Characteristic
                  label={
                    lang === 'hi'
                      ? 'प्रतिस्पर्धा'
                      : 'Competition'
                  }
                  value={getTranslatedValue(
                    business.competition ??
                    'Not Available',
                    lang
                  )}
                />

                <Characteristic
                  label={
                    lang === 'hi'
                      ? 'मौसमी जोखिम'
                      : 'Seasonal Risk'
                  }
                  value={getTranslatedValue(
                    business.seasonalRisk ??
                    business.seasonal_risk ??
                    'Not Available',
                    lang
                  )}
                />

              </div>

            </div>

          );

        })}

      </div>

      {/* =====================================================
          EXPLANATION
      ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <h3 className="font-bold text-slate-900 mb-2">

          {lang === 'hi'
            ? 'तुलना कैसे काम करती है'
            : 'How the comparison works'}

        </h3>

        <p className="text-sm text-slate-600 leading-6">

          {lang === 'hi'
            ? 'सभी व्यवसायों के लिए समान वर्तमान प्रोजेक्ट लागत, अपनी पूंजी, ऋण, ब्याज दर और अवधि का उपयोग किया जाता है। EMI और अनुमानित नकद प्रवाह की दोबारा गणना की जाती है। किसी व्यवसाय को विजेता या रैंक नहीं किया जाता। अंतिम निर्णय से पहले स्थानीय जानकारी सत्यापित करें।'
            : 'The same current project cost, own capital, loan, interest rate and tenure assumptions are used for all businesses. EMI and estimated cash flow are recalculated from these current financial inputs. No business is declared a winner or ranked. Verify local information before making a final decision.'}

        </p>

      </div>

    </div>
  );
}


/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SummaryCard({
  label,
  value
}) {
  return (
    <div className="rounded-xl bg-white border border-violet-100 p-4">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-xl font-bold text-violet-700 mt-1">
        {value}
      </p>

    </div>
  );
}


function InfoItem({
  label,
  value
}) {
  return (
    <div>

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="font-semibold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}


function CashRow({
  label,
  value
}) {
  return (
    <div className="flex items-center justify-between gap-3">

      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span
        className={`text-sm font-bold ${
          Number(value) >= 0
            ? 'text-emerald-600'
            : 'text-red-600'
        }`}
      >
        {formatCurrency(value)}
      </span>

    </div>
  );
}


function Characteristic({
  label,
  value
}) {
  return (
    <div className="flex items-center justify-between gap-3">

      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span
        className={`text-xs font-semibold ${getRiskClass(value)}`}
      >
        {value}
      </span>

    </div>
  );
}