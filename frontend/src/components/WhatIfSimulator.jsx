import React, { useState } from 'react';
import {
  Sliders,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { calculateEMI } from '../services/api';
import { BUSINESS_PROFILES } from '../data/presets';

const FINANCIAL_BASELINES = {
  Dairy: {
    monthlyIncome: 20000,
    monthlyExpense: 9000
  },
  Tailoring: {
    monthlyIncome: 15000,
    monthlyExpense: 6000
  },
  Kirana: {
    monthlyIncome: 18000,
    monthlyExpense: 9000
  },
  Poultry: {
    monthlyIncome: 22000,
    monthlyExpense: 11000
  },
  SolarGrid: {
    monthlyIncome: 24000,
    monthlyExpense: 8000
  },
  'Flour Mill': {
    monthlyIncome: 30000,
    monthlyExpense: 15000
  },
  Fishery: {
    monthlyIncome: 24000,
    monthlyExpense: 12000
  }
};

export default function WhatIfSimulator({ form, lang }) {
  const profile =
    BUSINESS_PROFILES[form.business] ||
    BUSINESS_PROFILES.Dairy;

  const backendBaseline =
    FINANCIAL_BASELINES[form.business] ||
    FINANCIAL_BASELINES.Dairy;

  const [salesDelta, setSalesDelta] = useState(0);
  const [expenseDelta, setExpenseDelta] = useState(0);

  const [rate, setRate] = useState(
    Number(form.interest_rate || 10)
  );

  const [tenure, setTenure] = useState(
    Number(form.tenure_years || 5)
  );

  const hi = lang === 'hi';

  const projectCost = Number(
    form.project_cost || 0
  );

  const ownCapital = Number(
    form.own_capital || 0
  );

  const reqLoan = Math.max(
    0,
    projectCost - ownCapital
  );

  const emi = calculateEMI(
    reqLoan,
    rate,
    tenure
  );

  /*
   * Keep What-If baseline synchronized with
   * the financial values used by backend/main.py.
   */
  const baseSales =
    Number(backendBaseline.monthlyIncome) || 0;

  const baseExpenses =
    Number(backendBaseline.monthlyExpense) || 0;

  const simSales =
    baseSales * (1 + salesDelta / 100);

  const simExpenses =
    baseExpenses * (1 + expenseDelta / 100);

  const simNetCash =
    simSales - simExpenses - emi;

  function handleReset() {
    setSalesDelta(0);
    setExpenseDelta(0);

    setRate(
      Number(form.interest_rate || 10)
    );

    setTenure(
      Number(form.tenure_years || 5)
    );
  }

  const formatCurrency = (value) => {
    const safeValue = Number(value) || 0;

    return `₹${Math.round(
      safeValue
    ).toLocaleString('en-IN')}`;
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 mb-8 shadow-sm transition-all duration-300 hover:shadow-md">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-3">

        <div>
          <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">
            <Sliders className="w-4 h-4" />

            <span>
              {hi
                ? 'इंटरैक्टिव परिदृश्य योजना'
                : 'Interactive Scenario Planning'}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900">
            {hi
              ? 'क्या हो अगर? परिदृश्य सिम्युलेटर'
              : 'What-If Scenario Simulator'}
          </h3>

          <p className="text-slate-500 text-sm mt-1">
            {hi
              ? 'मासिक बिक्री, खर्च, ब्याज दर और ऋण अवधि बदलकर देखें कि मासिक कैश फ्लो कैसे बदलता है।'
              : 'Adjust sales, expenses, interest rate and loan tenure to see how monthly cash flow changes.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 px-3.5 py-2 rounded-lg border border-violet-200 transition-all duration-200 hover:-translate-y-0.5 w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />

          <span>
            {hi
              ? 'डिफ़ॉल्ट रीसेट करें'
              : 'Reset Defaults'}
          </span>
        </button>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Controls */}
        <div className="border border-slate-200 rounded-xl p-5 sm:p-6 bg-gradient-to-br from-slate-50 to-violet-50/30 space-y-6">

          {/* Sales */}
          <div>

            <div className="flex justify-between items-center text-sm mb-2">

              <span className="font-bold text-slate-800">
                {hi
                  ? 'मासिक बिक्री में बदलाव'
                  : 'Monthly Sales Adjustment'}
              </span>

              <span
                className={`font-bold ${
                  salesDelta < 0
                    ? 'text-red-600'
                    : 'text-violet-600'
                }`}
              >
                {salesDelta > 0
                  ? `+${salesDelta}%`
                  : `${salesDelta}%`}
              </span>

            </div>

            <input
              type="range"
              min="-50"
              max="50"
              step="5"
              value={salesDelta}
              onChange={(e) =>
                setSalesDelta(
                  Number(e.target.value)
                )
              }
              className="w-full accent-violet-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-2">

              <span>
                {hi
                  ? '-50% गिरावट'
                  : '-50% Drop'}
              </span>

              <span>
                {hi
                  ? 'आधार'
                  : 'Baseline'}{' '}
                {formatCurrency(baseSales)}
              </span>

              <span>
                {hi
                  ? '+50% वृद्धि'
                  : '+50% Growth'}
              </span>

            </div>

            <div className="mt-2 text-xs text-slate-600">

              {hi
                ? 'अनुमानित बिक्री:'
                : 'Simulated sales:'}{' '}

              <strong className="text-slate-900">
                {formatCurrency(simSales)}
              </strong>

            </div>

          </div>

          {/* Expenses */}
          <div>

            <div className="flex justify-between items-center text-sm mb-2">

              <span className="font-bold text-slate-800">
                {hi
                  ? 'मासिक खर्च में बदलाव'
                  : 'Monthly Expenses Adjustment'}
              </span>

              <span
                className={`font-bold ${
                  expenseDelta > 0
                    ? 'text-red-600'
                    : 'text-violet-600'
                }`}
              >
                {expenseDelta > 0
                  ? `+${expenseDelta}%`
                  : `${expenseDelta}%`}
              </span>

            </div>

            <input
              type="range"
              min="-30"
              max="40"
              step="5"
              value={expenseDelta}
              onChange={(e) =>
                setExpenseDelta(
                  Number(e.target.value)
                )
              }
              className="w-full accent-violet-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-2">

              <span>-30%</span>

              <span>
                {hi
                  ? 'आधार'
                  : 'Baseline'}{' '}
                {formatCurrency(baseExpenses)}
              </span>

              <span>+40%</span>

            </div>

            <div className="mt-2 text-xs text-slate-600">

              {hi
                ? 'अनुमानित खर्च:'
                : 'Simulated expenses:'}{' '}

              <strong className="text-slate-900">
                {formatCurrency(simExpenses)}
              </strong>

            </div>

          </div>

          {/* Interest Rate */}
          <div>

            <div className="flex justify-between items-center text-sm mb-2">

              <span className="font-bold text-slate-800">
                {hi
                  ? 'ब्याज दर'
                  : 'Interest Rate'}
              </span>

              <span className="font-bold text-violet-600">
                {rate}%{' '}
                {hi
                  ? 'प्रति वर्ष'
                  : 'p.a.'}
              </span>

            </div>

            <input
              type="range"
              min="5"
              max="18"
              step="0.5"
              value={rate}
              onChange={(e) =>
                setRate(
                  Number(e.target.value)
                )
              }
              className="w-full accent-violet-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-2">

              <span>5%</span>

              <span>
                {hi
                  ? 'योजना हेतु अनुमान'
                  : 'Planning assumption'}
              </span>

              <span>18%</span>

            </div>

          </div>

          {/* Tenure */}
          <div>

            <div className="flex justify-between items-center text-sm mb-2">

              <span className="font-bold text-slate-800">
                {hi
                  ? 'ऋण चुकाने की अवधि'
                  : 'Repayment Tenure'}
              </span>

              <span className="font-bold text-violet-600">
                {tenure}{' '}
                {hi
                  ? 'वर्ष'
                  : 'Years'}
              </span>

            </div>

            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenure}
              onChange={(e) =>
                setTenure(
                  Number(e.target.value)
                )
              }
              className="w-full accent-violet-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-2">

              <span>
                {hi
                  ? '1 वर्ष'
                  : '1 Year'}
              </span>

              <span>
                {tenure * 12}{' '}
                {hi
                  ? 'महीने'
                  : 'Months'}
              </span>

              <span>
                {hi
                  ? '7 वर्ष'
                  : '7 Years'}
              </span>

            </div>

          </div>

        </div>

        {/* Simulation Result */}
        <div
          className={`border rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ${
            simNetCash >= 0
              ? 'bg-white border-violet-100 shadow-sm'
              : 'bg-red-50 border-red-200'
          }`}
        >

          <div>

            <div className="flex items-center justify-between mb-5 gap-3">

              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {hi
                  ? 'सिमुलेशन परिणाम'
                  : 'Simulation Result'}
              </span>

              <span
                className={`text-xs px-3 py-1.5 rounded-full font-bold border ${
                  simNetCash >= 0
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {simNetCash >= 0
                  ? hi
                    ? 'अधिशेष संभव'
                    : 'Surplus Viable'
                  : hi
                    ? 'घाटा जोखिम'
                    : 'Deficit Risk'}
              </span>

            </div>

            <p className="text-sm font-semibold text-slate-500">
              {hi
                ? 'EMI के बाद अनुमानित शुद्ध कैश'
                : 'Simulated Net Cash After EMI'}
            </p>

            <p
              className={`text-4xl font-extrabold my-2 transition-all duration-300 ${
                simNetCash >= 0
                  ? 'text-violet-600'
                  : 'text-red-600'
              }`}
            >
              {formatCurrency(simNetCash)}
            </p>

            <div className="border-t border-slate-200 pt-4 mt-5 space-y-3 text-sm">

              <div className="flex justify-between">

                <span className="text-slate-500">
                  {hi
                    ? 'अनुमानित बिक्री'
                    : 'Simulated Sales'}
                </span>

                <span className="font-bold text-slate-900">
                  {formatCurrency(simSales)}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  {hi
                    ? 'अनुमानित खर्च'
                    : 'Simulated Expenses'}
                </span>

                <span className="font-bold text-slate-900">
                  {formatCurrency(simExpenses)}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  {hi
                    ? 'पुनर्गणित EMI'
                    : 'Recalculated EMI'}
                </span>

                <span className="font-bold text-violet-600">
                  {formatCurrency(emi)}
                </span>

              </div>

            </div>

          </div>

          {/* Final Status */}
          <div className="border-t border-slate-200 mt-6 pt-4">

            {simNetCash >= 0 ? (

              <div className="flex items-start gap-2 text-xs font-semibold text-green-700">

                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />

                <span>
                  {hi
                    ? 'चयनित परिदृश्य में EMI के बाद भी सकारात्मक मासिक कैश-फ्लो बचता है।'
                    : 'The selected scenario retains a positive monthly cash-flow buffer after EMI.'}
                </span>

              </div>

            ) : (

              <div className="flex items-start gap-2 text-xs font-semibold text-red-700">

                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />

                <span>
                  {hi
                    ? 'चयनित परिदृश्य में EMI चुकाने के बाद कैश-फ्लो घाटा दिख रहा है। ऋण राशि कम करने या पूंजी संरचना सुधारने पर विचार करें।'
                    : 'The selected scenario results in a repayment deficit. Consider reducing the loan amount or improving the capital structure.'}
                </span>

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}