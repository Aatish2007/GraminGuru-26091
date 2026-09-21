import React from 'react';
import FinancialPlan from '../../components/FinancialPlan';
import WhatIfSimulator from '../../components/WhatIfSimulator';

export default function FinancialPlanPage({
  assessmentData,
  form,
  lang
}) {
  return (
    <div className="space-y-6">

      {/* Financial Plan + Capital Allocation + Stress Test */}
      <section>
        <FinancialPlan
          assessmentData={assessmentData}
          form={form}
          lang={lang}
        />
      </section>

      {/* What-If Financial Simulator */}
      <section>
        <WhatIfSimulator
          form={form}
          lang={lang}
        />
      </section>

    </div>
  );
}