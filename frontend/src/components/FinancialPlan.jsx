import React, { useMemo, useState } from 'react';
import {
  Calculator,
  PieChart as PieIcon,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  WalletCards,
  Landmark,
  TrendingUp
} from 'lucide-react';

/* =========================================================
   PURPLE / BLUE-PURPLE PALETTE
========================================================= */

const COLORS = [
  '#7c3aed', // Purple
  '#9333ea', // Violet
  '#c026d3', // Fuchsia
  '#db2777', // Pink
  '#6366f1', // Indigo
  '#4f46e5'  // Deep Indigo
];


/* =========================================================
   BUSINESS NAMES
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
  SolarGrid: {
    en: 'Solar Grid',
    hi: 'सोलर ग्रिड'
  },
  FlourMill: {
    en: 'Flour Mill',
    hi: 'आटा चक्की'
  },
  Fishery: {
    en: 'Fishery',
    hi: 'मत्स्य पालन'
  }
};


/* =========================================================
   BUSINESS-SPECIFIC ALLOCATION
========================================================= */

const ALLOCATION = {
  Dairy: [
    {
      name: 'Equipment',
      hi: 'उपकरण',
      percentage: 35
    },
    {
      name: 'Feed & Inventory',
      hi: 'चारा और स्टॉक',
      percentage: 20
    },
    {
      name: 'Working Capital',
      hi: 'कार्यशील पूंजी',
      percentage: 20
    },
    {
      name: 'Contingency',
      hi: 'आकस्मिक निधि',
      percentage: 10
    },
    {
      name: 'Veterinary & License',
      hi: 'पशु चिकित्सा और लाइसेंस',
      percentage: 5
    },
    {
      name: 'Milk Transport',
      hi: 'दूध परिवहन',
      percentage: 10
    }
  ],

  Tailoring: [
    {
      name: 'Sewing Machines & Tools',
      hi: 'सिलाई मशीन और उपकरण',
      percentage: 40
    },
    {
      name: 'Cloth & Inventory',
      hi: 'कपड़ा और स्टॉक',
      percentage: 15
    },
    {
      name: 'Working Capital',
      hi: 'कार्यशील पूंजी',
      percentage: 20
    },
    {
      name: 'Contingency',
      hi: 'आकस्मिक निधि',
      percentage: 10
    },
    {
      name: 'Training & License',
      hi: 'प्रशिक्षण और लाइसेंस',
      percentage: 5
    },
    {
      name: 'Delivery & Marketing',
      hi: 'डिलीवरी और मार्केटिंग',
      percentage: 10
    }
  ],

  Kirana: [
    {
      name: 'Shop Setup',
      hi: 'दुकान की व्यवस्था',
      percentage: 25
    },
    {
      name: 'Inventory',
      hi: 'स्टॉक',
      percentage: 35
    },
    {
      name: 'Working Capital',
      hi: 'कार्यशील पूंजी',
      percentage: 20
    },
    {
      name: 'Contingency',
      hi: 'आकस्मिक निधि',
      percentage: 10
    },
    {
      name: 'License & Setup',
      hi: 'लाइसेंस और व्यवस्था',
      percentage: 5
    },
    {
      name: 'Transport & Marketing',
      hi: 'परिवहन और मार्केटिंग',
      percentage: 5
    }
  ],

  Poultry: [
    {
      name: 'Poultry Shed & Equipment',
      hi: 'पोल्ट्री शेड और उपकरण',
      percentage: 35
    },
    {
      name: 'Feed & Stock',
      hi: 'पशु आहार और स्टॉक',
      percentage: 25
    },
    {
      name: 'Working Capital',
      hi: 'कार्यशील पूंजी',
      percentage: 15
    },
    {
      name: 'Contingency',
      hi: 'आकस्मिक निधि',
      percentage: 10
    },
    {
      name: 'Health & Vaccination',
      hi: 'स्वास्थ्य और टीकाकरण',
      percentage: 5
    },
    {
      name: 'Transport',
      hi: 'परिवहन',
      percentage: 10
    }
  ],

  SolarGrid: [
    {
      name: 'Solar Equipment',
      hi: 'सोलर उपकरण',
      percentage: 40
    },
    {
      name: 'Inventory',
      hi: 'स्टॉक',
      percentage: 15
    },
    {
      name: 'Working Capital',
      hi: 'कार्यशील पूंजी',
      percentage: 20
    },
    {
      name: 'Contingency',
      hi: 'आकस्मिक निधि',
      percentage: 10
    },
    {
      name: 'Training & License',
      hi: 'प्रशिक्षण और लाइसेंस',
      percentage: 5
    },
    {
      name: 'Transport & Marketing',
      hi: 'परिवहन और मार्केटिंग',
      percentage: 10
    }
  ],

  FlourMill: [
    {
      name: 'Machinery',
      hi: 'मशीनरी',
      percentage: 40
    },
    {
      name: 'Raw Material',
      hi: 'कच्चा माल',
      percentage: 20
    },
    {
      name: 'Working Capital',
      hi: 'कार्यशील पूंजी',
      percentage: 15
    },
    {
      name: 'Contingency',
      hi: 'आकस्मिक निधि',
      percentage: 10
    },
    {
      name: 'License & Maintenance',
      hi: 'लाइसेंस और रखरखाव',
      percentage: 5
    },
    {
      name: 'Transport & Marketing',
      hi: 'परिवहन और मार्केटिंग',
      percentage: 10
    }
  ],

  Fishery: [
    {
      name: 'Pond & Equipment',
      hi: 'तालाब और उपकरण',
      percentage: 35
    },
    {
      name: 'Fish Stock & Feed',
      hi: 'मछली स्टॉक और आहार',
      percentage: 20
    },
    {
      name: 'Working Capital',
      hi: 'कार्यशील पूंजी',
      percentage: 20
    },
    {
      name: 'Contingency',
      hi: 'आकस्मिक निधि',
      percentage: 10
    },
    {
      name: 'Health & Maintenance',
      hi: 'स्वास्थ्य और रखरखाव',
      percentage: 5
    },
    {
      name: 'Transport',
      hi: 'परिवहन',
      percentage: 10
    }
  ]
};


/* =========================================================
   FORMATTERS
========================================================= */

function money(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return '₹0';
  }

  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}


function moneyDecimal(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return '₹0.00';
  }

  return `₹${n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}


function getBusinessName(business, lang) {
  return (
    BUSINESS_NAMES[business]?.[
      lang === 'hi' ? 'hi' : 'en'
    ] ||
    business ||
    '-'
  );
}


/* =========================================================
   SCENARIO STATUS
========================================================= */

function getScenarioStatus(status, hi) {
  const value = String(status || '').toLowerCase();

  if (
    value.includes('stress') ||
    value.includes('difficult')
  ) {
    return hi
      ? 'पुनर्भुगतान तनाव'
      : 'Repayment Stress';
  }

  if (
    value.includes('positive') ||
    value.includes('surplus') ||
    value.includes('comfortable')
  ) {
    return hi
      ? 'सकारात्मक नकदी प्रवाह'
      : 'Positive Cash Flow';
  }

  return (
    status ||
    (hi ? 'अनुमानित' : 'Estimated')
  );
}


/* =========================================================
   SCENARIO CARD
========================================================= */

function ScenarioCard({
  title,
  subtitle,
  scenario,
  hi
}) {
  const income = Number(
    scenario?.income ?? 0
  );

  const expense = Number(
    scenario?.expense ?? 0
  );

  const emi = Number(
    scenario?.emi ?? 0
  );

  const cash = Number(
    scenario?.cash_after_emi ?? 0
  );

  const positive = cash >= 0;

  return (
    <div
      className="
        border border-slate-200
        rounded-xl p-4 bg-white
        transition-all duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-lg hover:shadow-indigo-100/50
      "
    >

      <div className="flex items-start justify-between gap-3">

        <div>
          <h4 className="font-bold text-slate-900">
            {title}
          </h4>

          <p className="text-xs text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>

        {positive ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
        )}

      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">

        <SmallMetric
          label={hi ? 'आय' : 'Income'}
          value={money(income)}
        />

        <SmallMetric
          label={hi ? 'खर्च' : 'Expense'}
          value={money(expense)}
        />

        <SmallMetric
          label="EMI"
          value={moneyDecimal(emi)}
        />

        <SmallMetric
          label={
            hi
              ? 'EMI के बाद नकद'
              : 'Cash After EMI'
          }
          value={money(cash)}
          valueClass={
            positive
              ? 'text-emerald-600'
              : 'text-red-600'
          }
        />

      </div>

      <div
        className={`mt-3 text-xs font-semibold ${
          positive
            ? 'text-emerald-700'
            : 'text-red-700'
        }`}
      >
        {getScenarioStatus(
          scenario?.status,
          hi
        )}
      </div>

      {scenario?.assumption && (
  <p className="text-[11px] text-slate-400 mt-2">
    {hi
      ? scenario.assumption === 'Base monthly income assumption'
        ? 'आधार मासिक आय का अनुमान'
        : scenario.assumption === 'Income reduced by 30% for stress testing'
        ? 'तनाव परीक्षण के लिए आय में 30% की कमी'
        : scenario.assumption === 'Income increased by 20% for scenario testing'
        ? 'परिदृश्य परीक्षण के लिए आय में 20% की वृद्धि'
        : scenario.assumption
      : scenario.assumption}
  </p>
)}

    </div>
  );
}


/* =========================================================
   SMALL METRIC
========================================================= */

function SmallMetric({
  label,
  value,
  valueClass = 'text-slate-900'
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-2.5">

      <p className="text-[11px] text-slate-500">
        {label}
      </p>

      <p
        className={`text-sm font-bold mt-1 ${valueClass}`}
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FinancialPlan({
  assessmentData,
  form,
  lang
}) {
  const [activeAllocation, setActiveAllocation] =
    useState(null);

  if (!assessmentData || !form) {
    return null;
  }

  const hi = lang === 'hi';

  const business =
    form.business || 'Dairy';


  /* =======================================================
     BASIC FINANCIAL VALUES
  ======================================================= */

  const projectCost = Number(
    form.project_cost ??
      form.projectCost ??
      assessmentData.project_cost ??
      0
  );

  const ownCapital = Number(
    form.own_capital ??
      form.ownCapital ??
      assessmentData.own_capital ??
      0
  );

  const requiredLoan = Math.max(
    0,
    projectCost - ownCapital
  );

  const tenure = Number(
    assessmentData.tenure_years ??
      form.tenure_years ??
      form.tenure ??
      5
  );

  const interestRate = Number(
    assessmentData.interest_rate ??
      form.interest_rate ??
      form.interestRate ??
      10
  );

  const emi = Number(
    assessmentData.emi ?? 0
  );

  const monthlyIncome = Number(
    assessmentData.monthly_income ?? 0
  );

  const monthlyExpense = Number(
    assessmentData.monthly_expense ?? 0
  );

  const normalCash = Number(
    assessmentData.normal_cash_after_emi ??
      assessmentData.monthly_cash_after_emi ??
      monthlyIncome -
        monthlyExpense -
        emi
  );

  const stressCash = Number(
    assessmentData.stress_cash_after_emi ??
      assessmentData.stress_cash ??
      monthlyIncome * 0.7 -
        monthlyExpense -
        emi
  );

  const score = Number(
    assessmentData.readiness_score ??
      assessmentData.score ??
      0
  );

  const risk = String(
    assessmentData.risk || 'Medium'
  );


  /* =======================================================
     FINANCIAL ENGINE
  ======================================================= */

  const financialEngine =
    assessmentData.financial_engine || {};

  const capitalRatio = Number(
    financialEngine.capital_ratio_percent ??
      0
  );

  const loanRatio = Number(
    financialEngine.loan_ratio_percent ??
      0
  );

  const moratoriumMonths = Number(
    financialEngine.moratorium_months ??
      0
  );

  const moratoriumInterest = Number(
    financialEngine.moratorium_interest_estimate ??
      0
  );

  const calculationType =
  hi
    ? 'निर्धारित Python नियम इंजन'
    : (
        financialEngine.calculation_type ||
        'Deterministic Python Rule Engine'
      );

const financialConfidence =
  hi
    ? 'गणना आधारित'
    : (
        assessmentData.financial_confidence ||
        financialEngine.confidence ||
        'Calculated'
      );


  /* =======================================================
     SCENARIOS
  ======================================================= */

  const scenarios =
    assessmentData.scenarios || {};

  const normalScenario =
    scenarios.normal || {
      income: monthlyIncome,
      expense: monthlyExpense,
      emi,
      cash_after_emi: normalCash,
      status:
        normalCash >= 0
          ? 'Positive Cash Flow'
          : 'Repayment Stress',
      assumption:
        'Base monthly income assumption'
    };

  const leanScenario =
    scenarios.lean_season || {
      income: monthlyIncome * 0.7,
      expense: monthlyExpense,
      emi,
      cash_after_emi: stressCash,
      status:
        stressCash >= 0
          ? 'Positive Cash Flow'
          : 'Repayment Stress',
      assumption:
        'Income reduced by 30% for stress testing'
    };

  const festivalScenario =
    scenarios.festival_season || {
      income: monthlyIncome * 1.2,
      expense: monthlyExpense,
      emi,
      cash_after_emi:
        monthlyIncome * 1.2 -
        monthlyExpense -
        emi,
      status: 'Positive Cash Flow',
      assumption:
        'Income increased by 20% for scenario testing'
    };


  /* =======================================================
     ALLOCATION
  ======================================================= */

  const allocationTemplate =
    ALLOCATION[business] ||
    ALLOCATION.Dairy;

  const allocation = useMemo(
    () =>
      allocationTemplate.map(
        (item, index) => ({
          ...item,
          amount: Math.round(
            projectCost *
              item.percentage /
              100
          ),
          color:
            COLORS[
              index % COLORS.length
            ]
        })
      ),
    [business, projectCost]
  );


  /* =======================================================
     FUNDING
  ======================================================= */

  const safeProjectCost =
    projectCost > 0
      ? projectCost
      : 1;

  const ownCapitalPercentage =
    Math.min(
      100,
      Math.max(
        0,
        (ownCapital / safeProjectCost) *
          100
      )
    );

  const loanPercentage =
    Math.min(
      100,
      Math.max(
        0,
        (requiredLoan / safeProjectCost) *
          100
      )
    );


  /* =======================================================
     GRADIENT
  ======================================================= */

  const conicGradient =
    createGradient(
      allocation,
      activeAllocation
    );


  /* =======================================================
     RISK
  ======================================================= */

  const riskText =
    risk.toLowerCase() === 'high'
      ? hi
        ? 'उच्च जोखिम'
        : 'High Risk'
      : risk.toLowerCase() === 'low'
        ? hi
          ? 'कम जोखिम'
          : 'Low Risk'
        : hi
          ? 'मध्यम जोखिम'
          : 'Medium Risk';

  const stressPositive =
    stressCash >= 0;


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className="
        bg-white
        border border-slate-200
        rounded-2xl
        p-5 sm:p-7
        mb-8
        shadow-sm
        animate-[fadeIn_.45s_ease-out]
      "
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="pb-5 mb-6 border-b border-slate-200">

        <div
          className="
            flex items-center gap-2
            text-indigo-600
            font-semibold text-xs
            mb-2
          "
        >

          <Calculator className="w-4 h-4" />

          {hi
            ? 'वित्तीय योजना'
            : 'Financial Plan'}

        </div>

        <h3
          className="
            text-xl sm:text-2xl
            font-bold
            text-slate-900
          "
        >

          {hi
            ? 'वित्तीय योजना और पूंजी आवंटन'
            : 'Financial Plan & Capital Allocation'}

        </h3>

        <p className="text-slate-500 text-sm mt-1">

          {hi
            ? 'परियोजना लागत, ऋण और पुनर्भुगतान योजना का सारांश।'
            : 'Summary of project cost, loan requirement and repayment planning.'}

        </p>

      </div>


      {/* ===================================================
          BASIC FINANCIAL METRICS
      =================================================== */}

      <div
        className="
          grid grid-cols-2
          md:grid-cols-3
          gap-4 mb-7
        "
      >

        <Metric
          title={
            hi
              ? 'कुल परियोजना लागत'
              : 'Total Project Cost'
          }
          value={money(projectCost)}
          subtitle={
            hi
              ? 'कुल प्रारंभिक निवेश'
              : 'Total initial investment'
          }
        />

        <Metric
          title={
            hi
              ? 'स्वयं की पूंजी'
              : 'Own Capital'
          }
          value={money(ownCapital)}
          subtitle={
            hi
              ? 'अपना योगदान'
              : 'Own contribution'
          }
          valueClass="text-emerald-600"
        />

        <Metric
          title={
            hi
              ? 'आवश्यक बैंक ऋण'
              : 'Required Bank Loan'
          }
          value={money(requiredLoan)}
          subtitle={
            hi
              ? 'परियोजना लागत − स्वयं की पूंजी'
              : 'Project cost − own capital'
          }
          valueClass="text-indigo-700"
        />

        <Metric
          title={
            hi
              ? 'मासिक EMI'
              : 'Monthly EMI'
          }
          value={moneyDecimal(emi)}
          subtitle={
            hi
              ? 'अनुमानित EMI'
              : 'Estimated EMI'
          }
        />

        <Metric
          title={
            hi
              ? 'ब्याज दर'
              : 'Interest Rate'
          }
          value={`${interestRate}%`}
          subtitle={
            hi
              ? 'योजना मान्यता'
              : 'Planning assumption'
          }
        />

        <Metric
          title={
            hi
              ? 'अवधि'
              : 'Repayment Tenure'
          }
          value={`${tenure} ${
            hi ? 'वर्ष' : 'Years'
          }`}
          subtitle={`${tenure * 12} ${
            hi ? 'महीने' : 'months'
          }`}
        />

      </div>


      {/* ===================================================
          CAPITAL ALLOCATION
      =================================================== */}

      <div
        className="
          bg-gradient-to-br
          from-indigo-50/60
          via-white
          to-purple-50/60
          border border-indigo-100
          rounded-2xl
          p-5 sm:p-6
        "
      >

        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">

          <PieIcon className="w-5 h-5 text-indigo-600" />

          {hi
            ? `पूंजी आवंटन — ${getBusinessName(
                business,
                lang
              )}`
            : `Capital Allocation — ${getBusinessName(
                business,
                lang
              )}`}

        </div>

        <p className="text-xs text-slate-500 mt-1 mb-6">

          {hi
            ? 'परियोजना लागत को व्यावहारिक व्यावसायिक आवश्यकताओं में बाँटने का उदाहरण।'
            : 'Illustrative allocation of project cost across practical business requirements.'}

        </p>


        {/* ===============================================
            DONUT + DETAILS
        =============================================== */}

        <div
          className="
            grid grid-cols-1
            lg:grid-cols-2
            gap-8
            items-center
          "
        >

          {/* DONUT */}

          <div className="flex justify-center">

            <div className="relative w-56 h-56">

              <div
                className="
                  absolute
                  -inset-3
                  rounded-full
                  bg-gradient-to-r
                  from-blue-400/10
                  via-indigo-400/10
                  to-purple-500/10
                  blur-xl
                "
              />

              <div
                className="
                  relative
                  w-full h-full
                  rounded-full
                  transition-all
                  duration-500
                "
                style={{
                  background:
                    conicGradient,
                  transform:
                    activeAllocation !== null
                      ? 'scale(1.025)'
                      : 'scale(1)',
                  boxShadow:
                    '0 12px 35px rgba(79,70,229,0.16)'
                }}
              />

              <div
                className="
                  absolute inset-0
                  flex items-center justify-center
                "
              >

                <div
                  className="
                    w-28 h-28
                    rounded-full
                    bg-white
                    border border-indigo-100
                    shadow-inner
                    flex flex-col
                    items-center
                    justify-center
                  "
                >

                  <span className="text-xs text-slate-500 font-medium">
                    {hi
                      ? 'कुल लागत'
                      : 'Total Cost'}
                  </span>

                  <span className="text-base font-bold text-slate-900 mt-1">
                    {money(projectCost)}
                  </span>

                  <span className="text-[10px] text-indigo-500 mt-1">
                    100%
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* DETAILS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {allocation.map(
              (item, index) => {

                const active =
                  activeAllocation === index;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onMouseEnter={() =>
                      setActiveAllocation(index)
                    }
                    onMouseLeave={() =>
                      setActiveAllocation(null)
                    }
                    onFocus={() =>
                      setActiveAllocation(index)
                    }
                    onBlur={() =>
                      setActiveAllocation(null)
                    }
                    className={`
                      text-left
                      bg-white
                      border
                      rounded-xl
                      p-3
                      transition-all
                      duration-300
                      ${
                        active
                          ? 'border-indigo-300 shadow-md shadow-indigo-100 -translate-y-1'
                          : 'border-slate-200 hover:border-indigo-200'
                      }
                    `}
                  >

                    <div className="flex items-center gap-2">

                      <span
                        className="
                          w-3 h-3
                          rounded-full
                          shrink-0
                          transition-transform
                          duration-300
                        "
                        style={{
                          backgroundColor:
                            item.color,
                          transform: active
                            ? 'scale(1.35)'
                            : 'scale(1)'
                        }}
                      />

                      <p
                        className={`
                          text-xs
                          font-semibold
                          ${
                            active
                              ? 'text-indigo-700'
                              : 'text-slate-700'
                          }
                        `}
                      >
                        {hi
                          ? item.hi
                          : item.name}
                      </p>

                    </div>

                    <div className="flex items-center justify-between mt-2">

                      <span
                        className="
                          text-base
                          font-bold
                          text-slate-900
                        "
                      >
                        {item.percentage}%
                      </span>

                      <span className="text-xs font-bold text-indigo-600">
                        {money(item.amount)}
                      </span>

                    </div>


                    {/* ALLOCATION BAR */}

                    <div
                      className="
                        mt-2
                        h-1.5
                        bg-slate-100
                        rounded-full
                        overflow-hidden
                      "
                    >

                      <div
                        className="
                          h-full
                          rounded-full
                          transition-all
                          duration-700
                          ease-out
                        "
                        style={{
                          width: `${item.percentage}%`,
                          background:
                            `linear-gradient(90deg, ${item.color}, #9333ea)`
                        }}
                      />

                    </div>

                  </button>
                );
              }
            )}

          </div>

        </div>


        {/* =================================================
            ALLOCATION SUMMARY
        ================================================= */}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">

          <AllocationSummary
            label={
              hi
                ? 'सबसे बड़ा आवंटन'
                : 'Largest Allocation'
            }
            value={getBusinessName(
              business,
              lang
            )}
            amount={money(
              Math.max(
                ...allocation.map(
                  item => item.amount
                )
              )
            )}
          />

          <AllocationSummary
            label={
              hi
                ? 'कार्यशील पूंजी'
                : 'Working Capital'
            }
            value={
              hi
                ? 'व्यवसाय संचालन'
                : 'Business Operations'
            }
            amount={money(
              allocation.find(
                item =>
                  item.name ===
                  'Working Capital'
              )?.amount || 0
            )}
          />

          <AllocationSummary
            label={
              hi
                ? 'कुल आवंटन'
                : 'Total Allocation'
            }
            value="100%"
            amount={money(
              allocation.reduce(
                (sum, item) =>
                  sum + item.amount,
                0
              )
            )}
          />

        </div>

      </div>


      {/* ===================================================
          FUNDING STRUCTURE
      =================================================== */}

      <section
        className="
          mt-8
          bg-gradient-to-br
          from-white
          to-indigo-50/50
          border border-indigo-100
          rounded-2xl
          p-5 sm:p-6
        "
      >

        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-2">

          <WalletCards className="w-4 h-4" />

          {hi
            ? 'फंडिंग संरचना'
            : 'Funding Structure'}

        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">

          {hi
            ? 'स्वयं की पूंजी बनाम ऋण'
            : 'Own Capital vs Required Loan'}

        </h3>

        <p className="text-sm text-slate-500 mt-1 mb-6">

          {hi
            ? 'परियोजना लागत में स्वयं की पूंजी और ऋण का हिस्सा।'
            : 'Share of own capital and loan in the total project cost.'}

        </p>


        {/* FUNDING BAR */}

        <div className="relative">

          <div
            className="
              h-8
              w-full
              bg-slate-100
              rounded-full
              overflow-hidden
              flex
              shadow-inner
            "
          >

            {ownCapitalPercentage > 0 && (
              <div
                className="
                  h-full
                  bg-gradient-to-r
                  from-blue-500
                  to-indigo-600
                  transition-all
                  duration-1000
                  ease-out
                "
                style={{
                  width:
                    `${ownCapitalPercentage}%`
                }}
              />
            )}

            {loanPercentage > 0 && (
              <div
                className="
                  h-full
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  transition-all
                  duration-1000
                  ease-out
                "
                style={{
                  width:
                    `${loanPercentage}%`
                }}
              />
            )}

          </div>

        </div>


        {/* FUNDING DETAILS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            mt-5
          "
        >

          <FundingCard
            icon={WalletCards}
            title={
              hi
                ? 'स्वयं की पूंजी'
                : 'Own Capital'
            }
            amount={money(ownCapital)}
            percentage={`${ownCapitalPercentage.toFixed(1)}%`}
            type="capital"
          />

          <FundingCard
            icon={Landmark}
            title={
              hi
                ? 'आवश्यक ऋण'
                : 'Required Loan'
            }
            amount={money(requiredLoan)}
            percentage={`${loanPercentage.toFixed(1)}%`}
            type="loan"
          />

          <FundingCard
            icon={TrendingUp}
            title={
              hi
                ? 'कुल परियोजना लागत'
                : 'Total Project Cost'
            }
            amount={money(projectCost)}
            percentage="100%"
            type="total"
          />

        </div>

      </section>


      {/* ===================================================
          FINANCIAL RULE ENGINE
      =================================================== */}

      <section
        className="
          mt-8
          bg-gradient-to-br
          from-indigo-50/50
          to-purple-50/50
          border border-indigo-100
          rounded-2xl
          p-5 sm:p-6
        "
      >

        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-2">

          <ShieldCheck className="w-4 h-4" />

          {hi
            ? 'वित्तीय नियम इंजन'
            : 'Financial Rule Engine'}

        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">

          {hi
            ? 'पूंजी और ऋण संरचना'
            : 'Capital & Loan Structure'}

        </h3>

        <p className="text-sm text-slate-500 mt-1 mb-5">

          {hi
            ? 'यह गणना निर्धारित Python नियमों के आधार पर की गई है।'
            : 'These values are calculated using deterministic Python rules.'}

        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <EngineMetric
            label={
              hi
                ? 'स्वयं की पूंजी अनुपात'
                : 'Own Capital Ratio'
            }
            value={`${capitalRatio}%`}
          />

          <EngineMetric
            label={
              hi
                ? 'ऋण अनुपात'
                : 'Loan Ratio'
            }
            value={`${loanRatio}%`}
          />

          <EngineMetric
            label={
              hi
                ? 'स्थगन अवधि'
                : 'Moratorium'
            }
            value={`${moratoriumMonths} ${
              hi ? 'महीने' : 'months'
            }`}
          />

          <EngineMetric
            label={
              hi
                ? 'स्थगन ब्याज अनुमान'
                : 'Moratorium Interest'
            }
            value={moneyDecimal(
              moratoriumInterest
            )}
          />

        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <p className="text-xs text-slate-500">
              {hi
                ? 'गणना विधि'
                : 'Calculation Method'}
            </p>

            <p className="text-sm font-bold text-slate-900 mt-1">
              {calculationType}
            </p>

          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">

            <p className="text-xs text-slate-500">
              {hi
                ? 'वित्तीय विश्वसनीयता'
                : 'Financial Confidence'}
            </p>

            <p className="text-sm font-bold text-emerald-600 mt-1">
              {financialConfidence}
            </p>

          </div>

        </div>

      </section>


      {/* ===================================================
          SCENARIO ANALYSIS
      =================================================== */}

      <section
        className="
          mt-8
          bg-white
          border border-slate-200
          rounded-2xl
          p-5 sm:p-6
        "
      >

        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-2">

          <Calculator className="w-4 h-4" />

          {hi
            ? 'परिदृश्य विश्लेषण'
            : 'Financial Scenario Analysis'}

        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">

          {hi
            ? 'सामान्य, कमजोर और त्योहारी स्थिति'
            : 'Normal, Lean Season & Festival Scenarios'}

        </h3>

        <p className="text-sm text-slate-500 mt-1 mb-6">

          {hi
            ? 'अलग-अलग आय परिस्थितियों में EMI के बाद उपलब्ध नकदी की तुलना।'
            : 'Comparison of cash available after EMI under different income conditions.'}

        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <ScenarioCard
            title={
              hi
                ? 'सामान्य स्थिति'
                : 'Normal'
            }
            subtitle={
              hi
                ? 'आधार मासिक आय'
                : 'Base monthly income'
            }
            scenario={normalScenario}
            hi={hi}
          />

          <ScenarioCard
            title={
              hi
                ? 'कमजोर अवधि'
                : 'Lean Season'
            }
            subtitle={
              hi
                ? 'आय में 30% कमी'
                : '30% income reduction'
            }
            scenario={leanScenario}
            hi={hi}
          />

          <ScenarioCard
            title={
              hi
                ? 'त्योहारी मौसम'
                : 'Festival Season'
            }
            subtitle={
              hi
                ? 'आय में 20% वृद्धि'
                : '20% income increase'
            }
            scenario={festivalScenario}
            hi={hi}
          />

        </div>

      </section>


      {/* ===================================================
          READINESS + STRESS
      =================================================== */}

      <section
        className="
          mt-8
          bg-white
          border border-slate-200
          rounded-2xl
          p-5 sm:p-6
        "
      >

        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mb-2">

          <Calculator className="w-4 h-4" />

          {hi
            ? 'व्यवहार्यता और पुनर्भुगतान तनाव परीक्षण'
            : 'Feasibility & Repayment Stress Testing'}

        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">

          {hi
            ? 'व्यवसाय तैयारी स्कोर और तनाव परीक्षण'
            : 'Enterprise Readiness Score & Stress Test'}

        </h3>

        <p className="text-sm text-slate-500 mt-1 mb-6">

          {hi
            ? 'अपेक्षित मासिक नकदी प्रवाह की तुलना बिक्री में 30% कमी की स्थिति से करता है।'
            : 'Compares expected monthly cash flow with a 30% reduction in sales.'}

        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

            <p className="text-xs font-semibold text-slate-500">
              {hi
                ? 'कुल तैयारी स्कोर'
                : 'Overall Readiness Score'}
            </p>

            <p className="text-2xl font-bold text-slate-900 mt-1">
              {score}/100
            </p>

          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

            <p className="text-xs font-semibold text-slate-500">
              {hi
                ? 'जोखिम स्तर'
                : 'Risk Level'}
            </p>

            <p className="text-xl font-bold text-slate-900 mt-1">
              {riskText}
            </p>

          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

            <p className="text-xs font-semibold text-slate-500">
              {hi
                ? 'EMI के बाद सामान्य नकद'
                : 'Normal Cash After EMI'}
            </p>

            <p
              className={`text-xl font-bold mt-1 ${
                normalCash >= 0
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}
            >
              {money(normalCash)}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="border border-slate-200 rounded-lg p-4">

            <div className="flex items-center gap-2 mb-3">

              {stressPositive ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}

              <h4 className="font-bold text-slate-900">
                {hi
                  ? '30% बिक्री कमी का तनाव परीक्षण'
                  : '30% Sales Reduction Stress Test'}
              </h4>

            </div>

            <p className="text-sm text-slate-500 mb-4">

              {hi
                ? 'कम बिक्री की अवधि में पुनर्भुगतान क्षमता का अनुमान।'
                : 'Estimated repayment capacity during a weak sales period.'}

            </p>

            <div className="flex justify-between">

              <span className="text-sm text-slate-500">
                {hi
                  ? 'तनाव स्थिति में नकद'
                  : 'Stress Cash After EMI'}
              </span>

              <span
                className={`font-bold ${
                  stressPositive
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {money(stressCash)}
              </span>

            </div>

          </div>


          <div className="border border-slate-200 rounded-lg p-4">

            <h4 className="font-bold text-slate-900 mb-3">

              {hi
                ? 'पूंजी-उपयुक्तता का सुझाव'
                : 'Capital-Fit Recommendation Principle'}

            </h4>

            <p className="text-sm font-semibold text-slate-800 mb-2">

              {hi
                ? '"अधिकतम ऋण हमेशा सबसे सुरक्षित ऋण नहीं होता।"'
                : '"Maximum loan is not always the safest loan."'}

            </p>

            <p className="text-sm text-slate-500 leading-6">

              {hi
                ? 'यदि तनाव की स्थिति में पुनर्भुगतान कठिन हो जाता है, तो कम ऋण से शुरुआत करने, स्वयं की पूंजी बढ़ाने या उपकरणों को चरणों में खरीदने पर विचार करें।'
                : 'If repayment becomes difficult under stress, consider starting with a smaller loan, increasing own capital contribution, or purchasing equipment in phases.'}

            </p>

          </div>

        </div>

      </section>


      {/* ===================================================
          DISCLAIMER
      =================================================== */}

      {assessmentData.financial_disclaimer && (
        <div
          className="
            mt-6
            bg-amber-50
            border border-amber-200
            rounded-xl
            p-4
          "
        >

          <div className="flex items-start gap-3">

            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />

            <div>

              <p className="text-sm font-bold text-amber-800">

                {hi
                  ? 'महत्वपूर्ण सूचना'
                  : 'Important Note'}

              </p>

              <p className="text-xs text-amber-700 mt-1 leading-5">

                {hi
                  ? 'वित्तीय मान गणना पर आधारित हैं। योजना पात्रता और अंतिम ऋण स्वीकृति संबंधित ऋणदाता से सत्यापित करें।'
                  : assessmentData.financial_disclaimer}

              </p>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}


/* =========================================================
   ALLOCATION GRADIENT
========================================================= */

function createGradient(
  items,
  activeIndex
) {
  let current = 0;

  const stops = items.map(
    (item, index) => {

      const start = current;

      current += item.percentage;

      const isActive =
        activeIndex === index;

      const color = isActive
        ? lightenColor(item.color)
        : item.color;

      return `${color} ${start}% ${current}%`;
    }
  );

  return `conic-gradient(${stops.join(', ')})`;
}


/* =========================================================
   LIGHTEN COLOR
========================================================= */

function lightenColor(hex) {
  const value =
    hex.replace('#', '');

  const r = parseInt(
    value.substring(0, 2),
    16
  );

  const g = parseInt(
    value.substring(2, 4),
    16
  );

  const b = parseInt(
    value.substring(4, 6),
    16
  );

  const amount = 35;

  const newR = Math.min(
    255,
    r + amount
  );

  const newG = Math.min(
    255,
    g + amount
  );

  const newB = Math.min(
    255,
    b + amount
  );

  return `rgb(${newR}, ${newG}, ${newB})`;
}


/* =========================================================
   METRIC
========================================================= */

function Metric({
  title,
  value,
  subtitle,
  valueClass = 'text-slate-900'
}) {
  return (
    <div
      className="
        bg-white
        border border-slate-200
        rounded-xl
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-md
      "
    >

      <p className="text-xs font-semibold text-slate-500">
        {title}
      </p>

      <p
        className={`text-xl font-bold mt-1 ${valueClass}`}
      >
        {value}
      </p>

      <p className="text-[11px] text-slate-400 mt-1">
        {subtitle}
      </p>

    </div>
  );
}


/* =========================================================
   ENGINE METRIC
========================================================= */

function EngineMetric({
  label,
  value
}) {
  return (
    <div
      className="
        bg-white
        border border-indigo-100
        rounded-xl
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        hover:shadow-indigo-100/50
      "
    >

      <p className="text-xs font-semibold text-slate-500">
        {label}
      </p>

      <p className="text-xl font-bold text-indigo-700 mt-1">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   ALLOCATION SUMMARY
========================================================= */

function AllocationSummary({
  label,
  value,
  amount
}) {
  return (
    <div
      className="
        bg-white
        border border-indigo-100
        rounded-xl
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      <p className="text-[11px] text-slate-500">
        {label}
      </p>

      <p className="text-sm font-bold text-slate-900 mt-1">
        {value}
      </p>

      <p className="text-sm font-bold text-indigo-600 mt-1">
        {amount}
      </p>

    </div>
  );
}


/* =========================================================
   FUNDING CARD
========================================================= */

function FundingCard({
  icon: Icon,
  title,
  amount,
  percentage,
  type
}) {
  const styles = {
  capital: {
    icon: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    amount: 'text-blue-700'
  },

  loan: {
    icon: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    amount: 'text-purple-700'
  },

  total: {
    icon: 'text-fuchsia-600',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-200',
    amount: 'text-fuchsia-700'
  }
};

  const style =
    styles[type] || styles.total;

  return (
    <div
      className={`
        ${style.bg}
        border ${style.border}
        rounded-xl
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      `}
    >

      <div className="flex items-center gap-2">

        <div
          className="
            w-8 h-8
            rounded-lg
            bg-white
            flex items-center
            justify-center
            shadow-sm
          "
        >

          <Icon
            className={`w-4 h-4 ${style.icon}`}
          />

        </div>

        <p className="text-xs font-semibold text-slate-600">
          {title}
        </p>

      </div>

      <div className="flex items-end justify-between mt-4">

        <p
          className={`
            text-xl
            font-bold
            ${style.amount}
          `}
        >
          {amount}
        </p>

        <span className="text-xs font-bold text-slate-500">
          {percentage}
        </span>

      </div>

    </div>
  );
}