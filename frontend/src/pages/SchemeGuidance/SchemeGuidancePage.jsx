import React from 'react';
import SchemeGuidance from '../../components/SchemeGuidance';
import DataSources from '../../components/DataSources';

export default function SchemeGuidancePage({
  schemeData,
  form,
  lang
}) {
  return (
    <div className="space-y-6">

      {/* Government Scheme Guidance */}
      <section>
        <SchemeGuidance
          schemeData={schemeData}
          form={form}
          lang={lang}
        />
      </section>

      {/* Official Data Sources */}
      <section>
        <DataSources
          lang={lang}
        />
      </section>

    </div>
  );
}