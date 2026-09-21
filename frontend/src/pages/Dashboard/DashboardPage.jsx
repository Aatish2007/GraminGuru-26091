import React from 'react';

import HeroBanner from '../../components/HeroBanner';
import BusinessForm from '../../components/BusinessForm';

import {
  ArrowRight,
  Activity,
  Landmark,
  TrendingUp
} from 'lucide-react';

import { t } from '../../translation/translation';

export default function DashboardPage({
  form,
  setForm,
  onAnalyze,
  loading,
  assessmentData,
  setActiveTab,
  lang
}) {
  const isHindi = lang === 'hi';

  // Backend / normalized assessment values
  const score = Number(
    assessmentData?.readiness_score ??
    assessmentData?.score ??
    70
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
    assessmentData?.emi ?? 0
  );

  const requiredLoan = Number(
    assessmentData?.required_loan ??
    assessmentData?.loan_required ??
    Math.max(
      0,
      Number(form?.project_cost || 0) -
      Number(form?.own_capital || 0)
    )
  );

  // Normalize risk
  let risk = assessmentData?.risk || '';

  if (risk === 'Low') {
    risk = 'Low Risk';
  } else if (risk === 'Medium') {
    risk = 'Medium Risk';
  } else if (risk === 'High') {
    risk = 'High Risk';
  }

  if (!risk) {
    risk =
      score >= 75
        ? 'Low Risk'
        : score >= 55
        ? 'Medium Risk'
        : 'High Risk';
  }

  const translatedRisk =
    risk === 'Low Risk'
      ? t(lang, 'lowRisk')
      : risk === 'Medium Risk'
      ? t(lang, 'mediumRisk')
      : t(lang, 'highRisk');

  // Dynamic recommendation
  const recommendation =
  stressCash < 0
    ? (
      isHindi
        ? 'वर्तमान वित्तीय योजना में सामान्य स्थिति में सकारात्मक नकदी प्रवाह है, लेकिन 30% आय कमी के परिदृश्य में EMI के बाद नकदी नकारात्मक हो जाती है। ऋण राशि और पूंजी संरचना की समीक्षा करें।'
        : 'The current financial plan has positive cash flow under normal conditions, but cash becomes negative after EMI under a 30% income-reduction scenario. Review the loan amount and capital structure.'
    )
    : (
      isHindi
        ? 'वर्तमान वित्तीय योजना में सामान्य और 30% आय कमी दोनों स्थितियों में EMI के बाद नकदी प्रवाह सकारात्मक रहता है। स्थानीय जानकारी और ऋणदाता की शर्तों की पुष्टि करें।'
        : 'The current financial plan retains positive cash flow after EMI in both normal and 30% income-reduction scenarios. Verify local information and lender terms before financing.'
    );

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })}`;
  };

  return (
    <div className="space-y-6">

      {/* Hero */}
      <HeroBanner lang={lang} />

      {/* Business Input Form */}
      <BusinessForm
        form={form}
        setForm={setForm}
        onAnalyze={onAnalyze}
        loading={loading}
        lang={lang}
      />

      {/* Summary */}
      {assessmentData && (
        <section className="space-y-4">

          {/* Section Heading */}
          <div>

            <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide">

              <Activity className="w-4 h-4" />

              <span>
                {isHindi
                  ? 'मूल्यांकन सारांश'
                  : 'Assessment Summary'}
              </span>

            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {isHindi
                ? 'व्यवसाय की तैयारी का अवलोकन'
                : 'Business Readiness Overview'}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {isHindi
                ? 'व्यवसाय की व्यवहार्यता, नकदी प्रवाह और वित्तीय विकल्पों का संक्षिप्त विवरण।'
                : 'A quick view of business feasibility, cash flow and the preliminary financing route.'}
            </p>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Readiness Score */}
            <div className="card-awesome p-6 flex flex-col justify-between animate-[fadeUp_0.45s_ease-out_0.05s_both]">

              <div>

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-2">

                    <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-violet-600" />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      {isHindi
                        ? 'तैयारी स्कोर'
                        : 'Readiness Score'}
                    </span>

                  </div>

                  {/* Risk Badge */}
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      risk === 'Low Risk'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : risk === 'Medium Risk'
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {translatedRisk}
                  </span>

                </div>

                <div className="flex items-end gap-2">

                  <span className="text-4xl font-extrabold text-slate-900">
                    {score}
                  </span>

                  <span className="text-sm font-semibold text-slate-400 mb-1">
                    / 100
                  </span>

                </div>

                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  {recommendation}
                </p>

                {/* Negative Stress Warning */}
                {stressCash < 0 && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-xs text-red-700 leading-relaxed">

                    <strong>
                      {isHindi
                        ? 'ध्यान दें: '
                        : 'Attention: '}
                    </strong>

                    {isHindi
                      ? '30% बिक्री-कमी वाले परिदृश्य में EMI के बाद नकदी प्रवाह नकारात्मक हो जाता है।'
                      : 'Cash flow becomes negative after EMI under the 30% sales-reduction scenario.'}

                  </div>
                )}

              </div>

              {/* Market Button */}
              <button
                onClick={() => setActiveTab('market')}
                className="mt-5 flex items-center justify-between w-full text-sm font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 px-4 py-3 rounded-lg border border-violet-100 transition-all duration-200 hover:-translate-y-0.5"
              >

                <span>
                  {isHindi
                    ? 'बाज़ार और संदर्भ जानकारी देखें'
                    : 'View Market & Reference Data'}
                </span>

                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />

              </button>

            </div>

            {/* Cash Flow */}
            <div className="card-awesome p-6 flex flex-col justify-between animate-[fadeUp_0.45s_ease-out_0.12s_both]">

              <div>

                <div className="flex items-center gap-2 mb-4">

                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>

                  <span className="text-sm font-bold text-slate-700">
                    {isHindi
                      ? 'मासिक नकदी प्रवाह'
                      : 'Monthly Cash Flow'}
                  </span>

                </div>

                <span className="text-xs font-semibold text-slate-500">
                  {isHindi
                    ? 'EMI के बाद नकदी'
                    : 'Cash After EMI'}
                </span>

                <h4
                  className={`text-3xl font-extrabold mt-1 ${
                    normalCash < 0
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {formatCurrency(normalCash)}
                </h4>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">

                  {/* Stress Scenario */}
                  <div className="flex items-center justify-between text-xs">

                    <span className="text-slate-500">
                      {isHindi
                        ? '30% बिक्री-कमी परिदृश्य'
                        : '30% Sales-Reduction Scenario'}
                    </span>

                    <span
                      className={`font-bold ${
                        stressCash < 0
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {formatCurrency(stressCash)}
                    </span>

                  </div>

                  {/* EMI */}
                  <div className="flex items-center justify-between text-xs">

                    <span className="text-slate-500">
                      {isHindi
                        ? 'मासिक EMI'
                        : 'Monthly EMI'}
                    </span>

                    <span className="font-bold text-slate-900">
                      {formatCurrency(emi)}
                    </span>

                  </div>

                  {/* Loan */}
                  <div className="flex items-center justify-between text-xs">

                    <span className="text-slate-500">
                      {isHindi
                        ? 'आवश्यक ऋण'
                        : 'Required Loan'}
                    </span>

                    <span className="font-bold text-slate-900">
                      {formatCurrency(requiredLoan)}
                    </span>

                  </div>

                </div>

                {/* Negative Stress */}
                {stressCash < 0 && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-xs text-red-700">
                    {isHindi
                      ? '30% बिक्री-कमी वाले परिदृश्य में अनुमानित नकदी प्रवाह नकारात्मक हो जाता है।'
                      : 'Projected cash flow becomes negative under the 30% sales-reduction scenario.'}
                  </div>
                )}

                {/* Positive Stress */}
                {stressCash >= 0 && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 text-xs text-green-700">
                    {isHindi
                      ? '30% बिक्री-कमी के बाद भी EMI के पश्चात सकारात्मक नकदी प्रवाह बचता है।'
                      : 'Positive cash flow remains after EMI even under a 30% sales-reduction scenario.'}
                  </div>
                )}

              </div>

              {/* Financial Button */}
              <button
                onClick={() => setActiveTab('financial')}
                className="mt-5 flex items-center justify-between w-full text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 px-4 py-3 rounded-lg border border-slate-200 transition-all duration-200 hover:-translate-y-0.5"
              >

                <span>
                  {isHindi
                    ? 'पूंजी आवंटन देखें'
                    : 'View Capital Allocation'}
                </span>

                <ArrowRight className="w-4 h-4" />

              </button>

            </div>

            {/* Government Scheme Route */}
            <div className="card-awesome p-6 flex flex-col justify-between animate-[fadeUp_0.45s_ease-out_0.19s_both]">

              <div>

                <div className="flex items-center gap-2 mb-4">

                  <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-violet-600" />
                  </div>

                  <span className="text-sm font-bold text-slate-700">
                    {isHindi
                      ? 'संभावित योजना मार्ग'
                      : 'Potential Scheme Routes'}
                  </span>

                </div>

                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {isHindi
                    ? 'प्रारंभिक मार्ग'
                    : 'Preliminary Route'}
                </span>

                <h4 className="text-xl font-bold text-slate-900 mt-1">
                {isHindi
                  ? 'संभावित योजना मार्ग'
                  : 'Potential Scheme Routes'}
                </h4>

                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  {isHindi
                    ? 'दर्ज की गई जानकारी के आधार पर प्रारंभिक योजना मार्ग। यह पात्रता की पुष्टि नहीं है। अंतिम पात्रता, सब्सिडी और वित्तीय शर्तों की आधिकारिक योजना या ऋणदाता से पुष्टि करें।'
                    : 'A preliminary route based on the information entered. This is not an eligibility confirmation. Final eligibility, subsidy and financing terms must be verified with the official scheme or lender.'}
                </p>

              </div>

              {/* Scheme Button */}
              <button
                onClick={() => setActiveTab('schemes')}
                className="mt-5 flex items-center justify-between w-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 px-4 py-3 rounded-lg shadow-md shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5"
              >

                <span>
                  {isHindi
                    ? 'योजना मार्गदर्शन देखें'
                    : 'Review Scheme Guidance'}
                </span>

                <ArrowRight className="w-4 h-4" />

              </button>

            </div>

          </div>
        </section>
      )}

    </div>
  );
}