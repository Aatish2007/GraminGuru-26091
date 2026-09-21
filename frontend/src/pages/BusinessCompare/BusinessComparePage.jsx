import React from 'react';
import BusinessCompare from '../../components/BusinessCompare';
import AdvisorySWOT from '../../components/AdvisorySWOT';

export default function BusinessComparePage({
  comparisonData,
  advisoryData,
  form,
  lang
}) {
  return (
    <div className="space-y-6">

      {/* Business Comparison */}
      <section>
        <BusinessCompare
          comparisonData={comparisonData}
          selectedBusiness={form.business}
          form={form}
          lang={lang}
        />
      </section>

      {/* Business Advisory */}
      <section>
        <AdvisorySWOT
          data={advisoryData}
          lang={lang}
        />
      </section>

    </div>
  );
}