import React from 'react';

import MarketEvidence from '../../components/MarketEvidence';
import MarketMap from '../../components/MarketMap';

export default function MarketAnalysisPage({
  marketData,
  form,
  lang
}) {
  return (
    <div className="space-y-6">

      <section>
        <MarketEvidence
          marketData={marketData}
          form={form}
          lang={lang}
        />
      </section>

      <section>
        <MarketMap
          location={form?.location}
          business={form?.business}
          marketData={marketData}
          lang={lang}
        />
      </section>

    </div>
  );
}