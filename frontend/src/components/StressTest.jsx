import React from 'react';
import { Activity, AlertTriangle, TrendingDown, Award } from 'lucide-react';

export default function StressTest({ assessmentData, form, lang }) {
  if (!assessmentData) return null;

  const score = assessmentData.readiness_score ?? assessmentData.score ?? 70;
  const normalCash = Number(assessmentData.normal_cash_after_emi || 0);
  const stressCash = Number(assessmentData.stress_cash_after_emi || 0);
  const isStressNegative = stressCash < 0;

  const risk =
    assessmentData.risk ||
    (score >= 75 ? 'Low Risk' : score >= 55 ? 'Medium Risk' : 'High Risk');

  const translatedRisk =
    risk === 'Low Risk'
      ? lang === 'hi' ? 'कम जोखिम' : 'Low Risk'
      : risk === 'Medium Risk'
      ? lang === 'hi' ? 'मध्यम जोखिम' : 'Medium Risk'
      : lang === 'hi' ? 'उच्च जोखिम' : 'High Risk';

  const scoreStatus =
    score >= 75
      ? lang === 'hi'
        ? 'अच्छी तैयारी'
        : 'Good readiness'
      : score >= 55
      ? lang === 'hi'
        ? 'ध्यान देने की आवश्यकता'
        : 'Needs attention'
      : lang === 'hi'
        ? 'अधिक ध्यान आवश्यक'
        : 'High attention required';

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 mb-8 shadow-sm">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-3">

        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wide mb-1">
            <Activity className="w-4 h-4" />

            <span>
              {lang === 'hi'
                ? 'व्यवहार्यता और पुनर्भुगतान तनाव परीक्षण'
                : 'Feasibility & Repayment Stress Testing'}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900">
            {lang === 'hi'
              ? 'व्यवसाय तैयारी स्कोर और तनाव परीक्षण'
              : 'Enterprise Readiness Score & Stress Test'}
          </h3>

          <p className="text-slate-500 text-sm mt-1">
            {lang === 'hi'
              ? 'अपेक्षित मासिक नकदी प्रवाह की तुलना बिक्री में 30% कमी की स्थिति से करता है।'
              : 'Compares expected monthly cash flow with a 30% reduction in sales.'}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

        {/* Readiness Score */}
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 flex flex-col items-center justify-center text-center">

          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
            {lang === 'hi'
              ? 'कुल तैयारी स्कोर'
              : 'Overall Readiness Score'}
          </span>

          <div className="w-32 h-32 rounded-full border-[10px] border-blue-100 flex flex-col items-center justify-center bg-white">

            <span className="text-4xl font-extrabold text-slate-900">
              {score}
            </span>

            <span className="text-xs font-semibold text-slate-400">
              / 100
            </span>

          </div>

          <span
            className={`mt-4 text-xs font-bold px-3 py-1.5 rounded-full border ${
              score >= 75
                ? 'bg-green-50 text-green-700 border-green-200'
                : score >= 55
                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {translatedRisk}
          </span>

          <p className="text-xs text-slate-500 mt-2">
            {scoreStatus}
          </p>

        </div>

        {/* Cash Flow Comparison */}
        <div className="lg:col-span-2 border border-slate-200 rounded-xl p-6 bg-white">

          <div className="mb-5">

            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">

              <TrendingDown className="w-5 h-5 text-blue-600" />

              <span>
                {lang === 'hi'
                  ? '30% बिक्री कमी का तनाव परीक्षण'
                  : '30% Sales Reduction Stress Test'}
              </span>

            </h4>

            <p className="text-xs text-slate-500 mt-1">
              {lang === 'hi'
                ? 'दिखाता है कि कम बिक्री की अवधि में पुनर्भुगतान क्षमता कैसे बदल सकती है।'
                : 'Shows how repayment capacity may change during a weak sales period.'}
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Normal Cash */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">

              <span className="text-xs font-semibold text-slate-500 block">
                {lang === 'hi'
                  ? 'सामान्य मासिक नकदी, EMI के बाद'
                  : 'Normal Monthly Cash After EMI'}
              </span>

              <span className="text-2xl font-extrabold text-blue-600 mt-1 block">
                ₹{normalCash.toLocaleString('en-IN')}
              </span>

              <span className="text-[11px] text-slate-500 mt-1 block">
                {lang === 'hi'
                  ? 'EMI के बाद अपेक्षित मासिक बचत'
                  : 'Expected monthly surplus after EMI'}
              </span>

            </div>

            {/* Stress Cash */}
            <div
              className={`rounded-lg p-4 border ${
                isStressNegative
                  ? 'bg-red-50 border-red-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >

              <span className="text-xs font-semibold text-slate-500 block">
                {lang === 'hi'
                  ? 'तनाव स्थिति में EMI के बाद नकदी'
                  : 'Stress Cash After EMI'}
              </span>

              <span
                className={`text-2xl font-extrabold mt-1 block ${
                  isStressNegative ? 'text-red-600' : 'text-green-600'
                }`}
              >
                ₹{stressCash.toLocaleString('en-IN')}
              </span>

              <span
                className={`text-[11px] font-semibold mt-1 block ${
                  isStressNegative ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {isStressNegative
                  ? lang === 'hi'
                    ? '30% बिक्री कमी में घाटा'
                    : 'Deficit under 30% sales reduction'
                  : lang === 'hi'
                    ? 'तनाव स्थिति में सकारात्मक बचत'
                    : 'Positive surplus under stress'}
              </span>

            </div>

          </div>

          {/* Warning */}
          {isStressNegative && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-red-700">

              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />

              <span>
                <strong>
                  {lang === 'hi'
                    ? 'पुनर्भुगतान चेतावनी: '
                    : 'Repayment warning: '}
                </strong>

                {lang === 'hi'
                  ? '30% बिक्री कमी की स्थिति में नकदी प्रवाह अपर्याप्त हो सकता है। ऋण राशि कम करने या स्वयं की पूंजी बढ़ाने पर विचार करें।'
                  : 'Cash flow may become insufficient under the 30% sales reduction scenario. Consider reducing the loan amount or increasing own capital.'}
              </span>

            </div>
          )}

          {/* Positive result */}
          {!isStressNegative && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3.5 text-xs text-green-700">

              <strong>
                {lang === 'hi'
                  ? 'तनाव परिणाम: '
                  : 'Stress result: '}
              </strong>

              {lang === 'hi'
                ? '30% बिक्री कमी की स्थिति में भी EMI के बाद अनुमानित नकदी प्रवाह सकारात्मक रहता है।'
                : 'The projected cash flow remains positive after EMI under the 30% sales reduction scenario.'}

            </div>
          )}

        </div>

      </div>

      {/* Capital Fit Principle */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">

        <h4 className="font-bold text-sm text-blue-700 mb-1 flex items-center gap-2">

          <Award className="w-4 h-4" />

          <span>
            {lang === 'hi'
              ? 'पूंजी-उपयुक्तता का सुझाव'
              : 'Capital-Fit Recommendation Principle'}
          </span>

        </h4>

        <p className="text-xs leading-relaxed text-slate-700">

          <strong>
            {lang === 'hi'
              ? '"अधिकतम ऋण हमेशा सबसे सुरक्षित ऋण नहीं होता।"'
              : '"Maximum loan is not always the safest loan."'}
          </strong>{' '}

          {lang === 'hi'
            ? 'यदि तनाव की स्थिति में पुनर्भुगतान कठिन हो जाता है, तो कम ऋण से शुरुआत करने, स्वयं की पूंजी बढ़ाने या उपकरणों को चरणों में खरीदने पर विचार करें।'
            : 'If repayment becomes difficult under stress, consider starting with a smaller loan, increasing own capital contribution, or purchasing equipment in phases.'}

        </p>

      </div>

    </section>
  );
}