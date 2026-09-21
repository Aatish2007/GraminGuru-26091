import React from 'react';
import {
  MapPin,
  Store,
  TrendingUp,
  Building2,
  Info
} from 'lucide-react';

export default function MarketEvidence({
  marketData,
  form,
  lang
}) {
  const hi = lang === 'hi';

  if (!marketData) {
    return (
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">
          <MapPin className="w-4 h-4" />
          <span>{hi ? 'स्थानीय बाजार' : 'Local Market'}</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          {hi ? 'स्थानीय बाजार जानकारी' : 'Local Market Information'}
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          {hi
            ? 'बाजार जानकारी देखने के लिए पहले व्यवसाय का विश्लेषण करें।'
            : 'Click Analyze Business to load market data.'}
        </p>
      </section>
    );
  }

  const getValue = (obj) => {
    if (obj === null || obj === undefined) {
      return null;
    }

    if (
      typeof obj === 'object' &&
      obj.value !== undefined
    ) {
      return obj.value;
    }

    return obj;
  };

  const toNumberOrNull = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return null;
    }

    const number = Number(value);

    return Number.isFinite(number)
      ? number
      : null;
  };

  const population = getValue(
    marketData.population
  );

  const nearbyData =
    marketData?.nearby_businesses || {};

  const mappingAvailable =
    nearbyData?.success === true;

  const directBusinesses =
    Array.isArray(
      nearbyData?.business_matches
    )
      ? nearbyData.business_matches
      : Array.isArray(
          nearbyData?.businesses
        )
        ? nearbyData.businesses
        : [];

  const potentialRetail =
    Array.isArray(
      nearbyData?.potential_retail_outlets
    )
      ? nearbyData.potential_retail_outlets
      : [];

  const marketplaces =
    Array.isArray(
      nearbyData?.marketplaces
    )
      ? nearbyData.marketplaces
      : [];

  const populationNumber =
    toNumberOrNull(population);

  const directBusinessCount =
    mappingAvailable
      ? directBusinesses.length
      : null;

  const marketPriceData =
    marketData?.market_price || {};

  const priceAvailable =
    marketPriceData?.success === true &&
    marketPriceData?.value !== null &&
    marketPriceData?.value !== undefined;

  const priceNumber =
    priceAvailable
      ? toNumberOrNull(
          marketPriceData.value
        )
      : null;

  const commodity =
    marketPriceData?.commodity ||
    null;

  const buyerDistance =
    marketData?.buyer_distance_km?.value ??
    marketData?.buyer_distance?.value ??
    null;

  const distanceNumber =
    toNumberOrNull(buyerDistance);

  const validDistance =
    distanceNumber !== null &&
    distanceNumber > 0 &&
    marketplaces.length > 0;

  const validPopulation =
    populationNumber !== null;

  const validDirectBusinesses =
    mappingAvailable &&
    directBusinessCount !== null;

  const profiles = {
    Dairy: {
      demand: 'High',
      competition: 'Medium'
    },

    Poultry: {
      demand: 'High',
      competition: 'Medium'
    },

    Kirana: {
      demand: 'High',
      competition: 'High'
    },

    Tailoring: {
      demand: 'Medium',
      competition: 'Low'
    },

    SolarGrid: {
      demand: 'Medium',
      competition: 'Low'
    },

    FlourMill: {
      demand: 'High',
      competition: 'Medium'
    },

    Fishery: {
      demand: 'Medium',
      competition: 'Medium'
    }
  };

  const profile =
    profiles[form?.business] || {
      demand: 'Medium',
      competition: 'Medium'
    };

  const levelText = (value) => {
    const text = String(
      value || 'Medium'
    ).toLowerCase();

    if (text.includes('high')) {
      return hi ? 'उच्च' : 'High';
    }

    if (text.includes('low')) {
      return hi ? 'कम' : 'Low';
    }

    return hi ? 'मध्यम' : 'Medium';
  };

  const businessNames = {
    Dairy: {
      en: 'Dairy',
      hi: 'डेयरी'
    },

    Poultry: {
      en: 'Poultry',
      hi: 'पोल्ट्री'
    },

    Kirana: {
      en: 'Kirana',
      hi: 'किराना'
    },

    Tailoring: {
      en: 'Tailoring',
      hi: 'सिलाई'
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

  const businessName =
    businessNames[
      form?.business
    ]?.[hi ? 'hi' : 'en'] ||
    form?.business ||
    (hi ? 'व्यवसाय' : 'Business');

  const commodityNames = {
    Maize: {
      en: 'Maize',
      hi: 'मक्का'
    },

    Wheat: {
      en: 'Wheat',
      hi: 'गेहूं'
    }
  };

  const displayCommodity =
    commodityNames[commodity]?.[
      hi ? 'hi' : 'en'
    ] ||
    commodity ||
    '—';

  const priceMessage =
    !priceAvailable
      ? (
          hi
            ? 'इस व्यवसाय के लिए Agmarknet पर लागू मूल्य बेंचमार्क उपलब्ध नहीं है। स्थानीय बाजार मूल्य की पुष्टि करें।'
            : 'No applicable Agmarknet price benchmark is available for this business. Verify the local market price.'
        )
      : null;

  const EvidenceCard = ({
    icon,
    title,
    status,
    value,
    source,
    reference,
    message
  }) => {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200">

        <div className="flex items-center gap-2">
          {icon}

          <p className="text-sm font-semibold text-slate-700">
            {title}
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-2">
          {status}
        </p>

        <p className="text-2xl font-bold text-slate-900 mt-3">
          {value}
        </p>

        {source && (
          <p className="text-xs text-slate-500 mt-2">
            {source}
          </p>
        )}

        {reference && (
          <p className="text-xs text-slate-400 mt-1">
            {reference}
          </p>
        )}

        {message && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />

            <p className="text-xs text-amber-800 leading-relaxed">
              {message}
            </p>
          </div>
        )}

      </div>
    );
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 mb-8 shadow-sm">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 mb-6 border-b border-slate-200">

        <div>

          <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">

            <MapPin className="w-4 h-4" />

            <span>
              {hi
                ? 'स्थानीय बाजार संदर्भ'
                : 'Local Market Context'}
            </span>

          </div>

          <h2 className="text-xl font-bold text-slate-900">
            {hi
              ? 'स्थानीय बाजार जानकारी'
              : 'Local Market Information'}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {hi
              ? `${form?.location || 'चयनित स्थान'} के लिए उपलब्ध बाजार संकेतक।`
              : `Available market indicators for ${form?.location || 'selected location'}.`}
          </p>

        </div>

        <span className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-2 rounded-lg w-fit">

          {hi
            ? 'व्यवसाय'
            : 'Business'}:{' '}

          {businessName}

        </span>

      </div>

      {/* SELECTED BUSINESS */}

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">

            <Building2 className="w-5 h-5 text-violet-600" />

          </div>

          <div>

            <p className="text-xs text-slate-500 font-semibold uppercase">
              {hi
                ? 'चयनित व्यवसाय'
                : 'Selected Business'}
            </p>

            <p className="text-lg font-bold text-slate-900">
              {businessName}
            </p>

            <p className="text-xs text-slate-500">
              {form?.location ||
                (hi
                  ? 'स्थान उपलब्ध नहीं'
                  : 'Location not available')}
            </p>

          </div>

        </div>

      </div>

      {/* SOURCE BASED INFORMATION */}

      <div>

        <div className="mb-4">

          <h3 className="text-lg font-bold text-slate-900">
            {hi
              ? 'स्रोत आधारित जानकारी'
              : 'Source-Based Information'}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {hi
              ? 'उपलब्ध सार्वजनिक स्रोतों से प्राप्त बाजार संकेतक।'
              : 'Market indicators from available public sources.'}
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <EvidenceCard
            icon={
              <MapPin className="w-4 h-4 text-violet-600" />
            }
            title={
              hi
                ? 'जनसंख्या'
                : 'Population'
            }
            status={
              validPopulation
                ? hi
                  ? 'वास्तविक डेटा'
                  : 'Real Data'
                : hi
                  ? 'उपलब्ध नहीं'
                  : 'Not available'
            }
            value={
              validPopulation
                ? populationNumber.toLocaleString(
                    'en-IN'
                  )
                : hi
                  ? 'उपलब्ध नहीं'
                  : 'Not available'
            }
            source={
              hi
                ? 'स्रोत: जनगणना 2011'
                : 'Source: Census 2011'
            }
            reference={
              hi
                ? 'डेटा संदर्भ: जनगणना 2011'
                : 'Data reference: Census 2011'
            }
          />

          <EvidenceCard
            icon={
              <Store className="w-4 h-4 text-violet-600" />
            }
            title={
              hi
                ? 'संबंधित मैप किए गए व्यवसाय'
                : 'Relevant Mapped Businesses'
            }
            status={
              mappingAvailable
                ? hi
                  ? 'मैप किया गया डेटा'
                  : 'Mapped Data'
                : hi
                  ? 'मैपिंग उपलब्ध नहीं'
                  : 'Mapping unavailable'
            }
            value={
              validDirectBusinesses
                ? directBusinessCount.toLocaleString(
                    'en-IN'
                  )
                : '—'
            }
            source={
              hi
                ? 'स्रोत: ओपनस्ट्रीटमैप'
                : 'Source: OpenStreetMap'
            }
            reference={
              hi
                ? 'डेटा संदर्भ: वर्तमान OSM क्वेरी'
                : 'Data reference: Current OSM query'
            }
          />

          <EvidenceCard
            icon={
              <TrendingUp className="w-4 h-4 text-violet-600" />
            }
            title={
              hi
                ? 'मूल्य बेंचमार्क'
                : 'Price Benchmark'
            }
            status={
              priceAvailable
                ? hi
                  ? 'बाजार संदर्भ'
                  : 'Market Reference'
                : hi
                  ? 'लागू नहीं'
                  : 'Not Applicable'
            }
            value={
              priceAvailable &&
              priceNumber !== null
                ? `₹${priceNumber.toLocaleString(
                    'en-IN',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }
                  )}`
                : '—'
            }
            source={
              hi
                ? 'स्रोत: एगमार्कनेट'
                : 'Source: Agmarknet'
            }
            reference={
              hi
                ? `डेटा संदर्भ: एगमार्कनेट बाजार डेटा (${displayCommodity})`
                : `Data reference: Agmarknet market data (${displayCommodity})`
            }
            message={priceMessage}
          />

          <EvidenceCard
            icon={
              <Building2 className="w-4 h-4 text-violet-600" />
            }
            title={
              hi
                ? 'खरीदार / बाजार दूरी'
                : 'Buyer / Market Distance'
            }
            status={
              validDistance
                ? hi
                  ? 'मैप किया गया'
                  : 'Mapped'
                : hi
                  ? 'उपलब्ध नहीं'
                  : 'Not available'
            }
            value={
              validDistance
                ? hi
                  ? `${distanceNumber.toFixed(2)} किमी`
                  : `${distanceNumber.toFixed(2)} km`
                : '—'
            }
            source={
              hi
                ? 'स्रोत: ओपनस्ट्रीटमैप'
                : 'Source: OpenStreetMap'
            }
            reference={
              hi
                ? 'डेटा संदर्भ: स्थानिक OSM क्वेरी'
                : 'Data reference: OSM spatial query'
            }
          />

          <EvidenceCard
            icon={
              <TrendingUp className="w-4 h-4 text-violet-600" />
            }
            title={
              hi
                ? 'स्थानीय मांग'
                : 'Local Demand'
            }
            status={
              hi
                ? 'अनुमानित'
                : 'Estimated'
            }
            value={levelText(profile.demand)}
            source={
              hi
                ? 'स्रोत: व्यवसाय योजना प्रोफाइल'
                : 'Source: Business planning profile'
            }
            reference={
              hi
                ? 'डेटा संदर्भ: योजना अनुमान'
                : 'Data reference: Planning estimate'
            }
          />

          <EvidenceCard
            icon={
              <Store className="w-4 h-4 text-violet-600" />
            }
            title={
              hi
                ? 'प्रतिस्पर्धा'
                : 'Competition'
            }
            status={
              hi
                ? 'अनुमानित'
                : 'Estimated'
            }
            value={levelText(profile.competition)}
            source={
              hi
                ? 'स्रोत: व्यवसाय योजना प्रोफाइल'
                : 'Source: Business planning profile'
            }
            reference={
              hi
                ? 'डेटा संदर्भ: योजना अनुमान'
                : 'Data reference: Planning estimate'
            }
          />

        </div>

      </div>

      {/* TRANSPARENCY */}

      <div className="mt-6 pt-5 border-t border-slate-200">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">

            <Info className="w-4 h-4 text-violet-600" />

          </div>

          <div>

            <h3 className="font-bold text-slate-900">
              {hi
                ? 'स्थानीय सत्यापन आवश्यक'
                : 'Local Verification Recommended'}
            </h3>

            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              {hi
                ? 'OpenStreetMap में सभी स्थानीय या अनौपचारिक व्यवसाय शामिल नहीं हो सकते। वास्तविक मांग, प्रतिस्पर्धा और कीमतों की स्थानीय स्तर पर पुष्टि करें।'
                : 'OpenStreetMap may not include every local or informal business. Actual demand, competition and prices should be verified locally.'}
            </p>

          </div>

        </div>

        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">

          <p className="text-sm text-slate-700 leading-relaxed">

            <strong>
              {hi
                ? 'पारदर्शिता:'
                : 'Transparency:'}
            </strong>{' '}

            {hi
              ? 'वास्तविक डेटा, मैप किए गए डेटा और अनुमानित संकेतकों को अलग-अलग दिखाया जाता है। जहां स्रोत से डेटा उपलब्ध नहीं है, वहां कोई नकली मूल्य नहीं दिखाया जाता।'
              : 'Real data, mapped data and estimated indicators are shown separately. When a source does not provide applicable data, no fabricated value is displayed.'}

          </p>

        </div>

      </div>

    </section>
  );
}