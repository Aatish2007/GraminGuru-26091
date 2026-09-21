import React from 'react';
import {
  MapPin,
  Building2,
  Store,
  TrendingUp,
  Info
} from 'lucide-react';

export default function MarketMap({
  location,
  business,
  marketData,
  lang
}) {
  const hi = lang === 'hi';

  if (!marketData) {
    return (
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">
          <MapPin className="w-4 h-4" />

          <span>
            {hi ? 'बाजार मैप' : 'Market Map'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {hi
            ? 'स्थानीय बाजार मैप'
            : 'Local Market Map'}
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          {hi
            ? 'बाजार मैप देखने के लिए पहले व्यवसाय का विश्लेषण करें।'
            : 'Run business analysis to load the market map.'}
        </p>
      </section>
    );
  }

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

  const population =
    marketData?.population?.value ??
    marketData?.population?.population ??
    marketData?.census?.population ??
    null;

  const populationNumber =
    toNumberOrNull(population);

  const nearbyData =
    marketData?.nearby_businesses || {};

  const mappingAvailable =
    nearbyData?.success === true;

  const businesses =
    Array.isArray(
      nearbyData?.business_matches
    )
      ? nearbyData.business_matches
      : Array.isArray(
          nearbyData?.businesses
        )
        ? nearbyData.businesses
        : [];

  const potentialRetailOutlets =
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

  const businessCount =
    mappingAvailable
      ? businesses.length
      : null;

  const potentialRetailCount =
    mappingAvailable
      ? potentialRetailOutlets.length
      : null;

  const calculatedTotal =
    businesses.length +
    potentialRetailOutlets.length +
    marketplaces.length;

  const backendTotal =
    toNumberOrNull(
      nearbyData?.total_mapped_places
    );

  const totalMappedPlaces =
    mappingAvailable
      ? (
          backendTotal !== null
            ? backendTotal
            : calculatedTotal
        )
      : null;

  const marketPriceData =
    marketData?.market_price || {};

  const priceAvailable =
    marketPriceData?.success === true &&
    marketPriceData?.value !== null &&
    marketPriceData?.value !== undefined;

  const price =
    priceAvailable
      ? marketPriceData.value
      : null;

  const priceNumber =
    toNumberOrNull(price);

  const commodity =
    marketPriceData?.commodity ??
    null;

  const buyerDistance =
    marketData?.buyer_distance_km?.value ??
    marketData?.buyer_distance?.value ??
    null;

  const buyerName =
    marketData?.buyer_distance_km?.name ??
    marketData?.buyer_distance?.name ??
    null;

  const distanceNumber =
    toNumberOrNull(buyerDistance);

  const hasBuyerDistance =
    distanceNumber !== null &&
    distanceNumber > 0 &&
    marketplaces.length > 0;

  const radiusValue =
    marketData?.radius_km ??
    marketData?.search_radius_km ??
    5;

  const radiusNumber =
    toNumberOrNull(radiusValue);

  const radius =
    radiusNumber !== null
      ? radiusNumber
      : 5;

  const populationConfidence =
    marketData?.population?.confidence ??
    marketData?.census?.confidence ??
    'High';

  const businessConfidence =
    mappingAvailable
      ? (
          nearbyData?.confidence ??
          'Medium'
        )
      : 'Not mapped';

  const priceConfidence =
    marketPriceData?.confidence ??
    'Needs commodity selection';

  const buyerConfidence =
    marketData?.buyer_distance_km?.confidence ??
    marketData?.buyer_distance?.confidence ??
    'Needs local buyer/mandi mapping';

  const formatNumber = (value) => {
    const number =
      toNumberOrNull(value);

    if (number === null) {
      return '—';
    }

    return number.toLocaleString(
      'en-IN'
    );
  };

  const formatPrice = (value) => {
    const number =
      toNumberOrNull(value);

    if (number === null) {
      return '—';
    }

    return `₹${number.toLocaleString(
      'en-IN',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )}`;
  };

  const businessNames = {
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

  const displayBusiness =
    businessNames[
      business
    ]?.[hi ? 'hi' : 'en'] ||
    business ||
    (hi
      ? 'व्यवसाय'
      : 'Business');

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
    commodityNames[
      commodity
    ]?.[hi ? 'hi' : 'en'] ||
    commodity ||
    '—';

  const confidenceText = (value) => {
    if (!hi) {
      return value;
    }

    const map = {
      High: 'उच्च',
      Medium: 'मध्यम',
      Estimated: 'अनुमानित',
      'Mapped Data': 'मैप किया गया डेटा',
      'Not mapped': 'मैप नहीं किया गया',

      'Needs commodity selection':
        'कमोडिटी चयन आवश्यक',

      'Needs local buyer/mandi mapping':
        'स्थानीय खरीदार या मंडी मैपिंग आवश्यक'
    };

    return map[value] || value;
  };

  const Confidence = ({
    value
  }) => (
    <span className="inline-flex mt-2 px-2 py-1 rounded-md bg-violet-50 text-violet-700 border border-violet-100 text-[11px] font-medium">
      {hi
        ? 'विश्वसनीयता'
        : 'Confidence'}:{' '}
      {confidenceText(value)}
    </span>
  );

  const coordinates =
    marketData?.coordinates || {};

  const latitude =
    toNumberOrNull(
      coordinates?.lat ??
      coordinates?.latitude
    );

  const longitude =
    toNumberOrNull(
      coordinates?.lon ??
      coordinates?.lng ??
      coordinates?.longitude
    );

  const hasCoordinates =
    latitude !== null &&
    longitude !== null;

  const mappingStatusMessage =
    mappingAvailable
      ? (
          hi
            ? `${businesses.length} संबंधित व्यवसाय, ${potentialRetailOutlets.length} संभावित रिटेल संदर्भ और ${marketplaces.length} बाजार स्थान मैप किए गए हैं।`
            : `${businesses.length} relevant businesses, ${potentialRetailOutlets.length} potential retail references and ${marketplaces.length} market places are mapped.`
        )
      : (
          hi
            ? 'OSM मैपिंग अभी उपलब्ध नहीं है। संबंधित व्यवसाय और बाजार की संख्या उपलब्ध नहीं है।'
            : 'OSM mapping is currently unavailable. Relevant business and market counts are not available.'
        );

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 mb-8 shadow-sm">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 mb-6 border-b border-slate-200">

        <div>

          <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">

            <MapPin className="w-4 h-4" />

            <span>
              {hi
                ? 'बाजार मैप'
                : 'Market Map'}
            </span>

          </div>

          <h3 className="text-xl font-bold text-slate-900">
            {hi
              ? 'स्थानीय बाजार मैप'
              : 'Local Market Map'}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {hi
              ? `${location || 'चयनित स्थान'} के आसपास उपलब्ध बाजार और व्यवसाय संदर्भ।`
              : `Available market and business references around ${location || 'selected location'}.`}
          </p>

        </div>

        <span className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-2 rounded-lg w-fit">
          {hi
            ? 'दायरा'
            : 'Radius'}:{' '}
          {radius} km
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
              {displayBusiness}
            </p>

            <p className="text-xs text-slate-500">
              {location ||
                (hi
                  ? 'स्थान उपलब्ध नहीं'
                  : 'Location not available')}
            </p>

          </div>

        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* POPULATION */}

        <div className="border border-slate-200 rounded-xl p-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200">

          <div className="flex items-center gap-2">

            <MapPin className="w-4 h-4 text-violet-600" />

            <p className="text-sm font-semibold text-slate-700">
              {hi
                ? 'जनसंख्या'
                : 'Population'}
            </p>

          </div>

          <p className="text-2xl font-bold text-slate-900 mt-3">
            {formatNumber(
              populationNumber
            )}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {hi
              ? 'जनगणना 2011'
              : 'Census 2011'}
          </p>

          <Confidence
            value={
              populationConfidence
            }
          />

        </div>

        {/* DIRECT RELEVANT BUSINESSES */}

        <div className="border border-slate-200 rounded-xl p-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200">

          <div className="flex items-center gap-2">

            <Store className="w-4 h-4 text-violet-600" />

            <p className="text-sm font-semibold text-slate-700">
              {hi
                ? 'संबंधित व्यवसाय'
                : 'Relevant Businesses'}
            </p>

          </div>

          <p className="text-2xl font-bold text-slate-900 mt-3">
            {mappingAvailable
              ? formatNumber(
                  businessCount
                )
              : '—'}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {hi
              ? 'ओपनस्ट्रीटमैप'
              : 'OpenStreetMap'}
          </p>

          <Confidence
            value={
              businessConfidence
            }
          />

        </div>

        {/* POTENTIAL RETAIL */}

        <div className="border border-slate-200 rounded-xl p-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200">

          <div className="flex items-center gap-2">

            <Store className="w-4 h-4 text-violet-600" />

            <p className="text-sm font-semibold text-slate-700">
              {hi
                ? 'संभावित रिटेल संदर्भ'
                : 'Potential Retail References'}
            </p>

          </div>

          <p className="text-2xl font-bold text-slate-900 mt-3">
            {mappingAvailable
              ? formatNumber(
                  potentialRetailCount
                )
              : '—'}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {hi
              ? 'वर्तमान OSM क्वेरी'
              : 'Current OSM query'}
          </p>

          <Confidence
            value={
              mappingAvailable
                ? 'Mapped Data'
                : 'Not mapped'
            }
          />

        </div>

        {/* TOTAL MAPPED */}

        <div className="border border-slate-200 rounded-xl p-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200">

          <div className="flex items-center gap-2">

            <Store className="w-4 h-4 text-violet-600" />

            <p className="text-sm font-semibold text-slate-700">
              {hi
                ? 'कुल मैप किए गए स्थान'
                : 'Total Mapped Places'}
            </p>

          </div>

          <p className="text-2xl font-bold text-slate-900 mt-3">
            {mappingAvailable
              ? formatNumber(
                  totalMappedPlaces
                )
              : '—'}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {hi
              ? 'वर्तमान OSM क्वेरी'
              : 'Current OSM query'}
          </p>

        </div>

        {/* PRICE */}

        <div className="border border-slate-200 rounded-xl p-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200">

          <div className="flex items-center gap-2">

            <TrendingUp className="w-4 h-4 text-violet-600" />

            <p className="text-sm font-semibold text-slate-700">
              {hi
                ? 'मूल्य बेंचमार्क'
                : 'Price Benchmark'}
            </p>

          </div>

          <p className="text-2xl font-bold text-slate-900 mt-3">
            {priceAvailable &&
            priceNumber !== null
              ? formatPrice(
                  priceNumber
                )
              : '—'}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {displayCommodity}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {hi
              ? 'एगमार्कनेट'
              : 'Agmarknet'}
          </p>

          <Confidence
            value={
              priceAvailable
                ? (
                    marketPriceData?.confidence ||
                    'Medium'
                  )
                : (
                    marketPriceData?.confidence ||
                    'Needs commodity selection'
                  )
            }
          />

        </div>

        {/* BUYER DISTANCE */}

        <div className="border border-slate-200 rounded-xl p-4 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200">

          <div className="flex items-center gap-2">

            <Building2 className="w-4 h-4 text-violet-600" />

            <p className="text-sm font-semibold text-slate-700">
              {hi
                ? 'खरीदार / बाजार दूरी'
                : 'Buyer / Market Distance'}
            </p>

          </div>

          <p className="text-2xl font-bold text-slate-900 mt-3">
            {hasBuyerDistance
              ? `${distanceNumber.toFixed(2)} km`
              : '—'}
          </p>

          {buyerName && (
            <p className="text-sm text-slate-600 mt-1">
              {buyerName}
            </p>
          )}

          <Confidence
            value={
              buyerConfidence
            }
          />

        </div>

      </div>

      {/* LOCATION REFERENCE */}

      <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden">

        <div className="p-4 bg-slate-50 border-b border-slate-200">

          <div className="flex items-center gap-2">

            <MapPin className="w-4 h-4 text-violet-600" />

            <h4 className="font-bold text-slate-900">
              {hi
                ? 'स्थान संदर्भ'
                : 'Location Reference'}
            </h4>

          </div>

          <p className="text-xs text-slate-500 mt-1">
            {hi
              ? 'नीचे उपलब्ध स्थान और मैप किए गए बाजार संदर्भ दिखाए गए हैं।'
              : 'Available location and mapped market references are shown below.'}
          </p>

        </div>

        {hasCoordinates ? (

          <div className="p-5">

            <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-slate-100 rounded-xl min-h-[220px] flex flex-col items-center justify-center text-center p-6">

              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3">

                <MapPin className="w-6 h-6 text-violet-600" />

              </div>

              <p className="font-bold text-slate-900">
                {location ||
                  (hi
                    ? 'चयनित स्थान'
                    : 'Selected Location')}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {latitude.toFixed(5)},{' '}
                {longitude.toFixed(5)}
              </p>

              <p className="text-xs text-slate-500 mt-3">
                {mappingStatusMessage}
              </p>

            </div>

          </div>

        ) : (

          <div className="p-6 text-center">

            <MapPin className="w-8 h-8 text-slate-400 mx-auto" />

            <p className="text-sm font-semibold text-slate-700 mt-2">
              {hi
                ? 'मैप स्थान उपलब्ध नहीं है'
                : 'Map location is not available'}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              {hi
                ? 'स्थानीय स्थान सत्यापन आवश्यक है।'
                : 'Local location verification is required.'}
            </p>

          </div>

        )}

      </div>

      {/* DIRECT MAPPED BUSINESSES */}

      <div className="mt-5">

        <div className="flex items-center justify-between gap-3 mb-3">

          <div>

            <h4 className="font-bold text-slate-900">
              {hi
                ? 'मैप किए गए संबंधित व्यवसाय'
                : 'Mapped Relevant Businesses'}
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              {hi
                ? 'केवल चयनित व्यवसाय से सीधे संबंधित मैप संदर्भ दिखाए गए हैं।'
                : 'Only mapped references directly related to the selected business are shown.'}
            </p>

          </div>

          <span className="text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-lg">
            {mappingAvailable
              ? formatNumber(
                  businessCount
                )
              : '—'}
          </span>

        </div>

        {businesses.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {businesses
              .slice(0, 8)
              .map(
                (item, index) => (

                  <div
                    key={`${item?.name || 'business'}-${index}`}
                    className="border border-slate-200 rounded-lg p-3 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200"
                  >

                    <div className="flex items-start gap-3">

                      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">

                        <Store className="w-4 h-4 text-violet-600" />

                      </div>

                      <div className="min-w-0">

                        <p className="font-semibold text-slate-800 text-sm truncate">
                          {item?.name ||
                            (hi
                              ? 'मैप किया गया व्यवसाय'
                              : 'Mapped Business')}
                        </p>

                        {item?.distance_km !== undefined &&
                          item?.distance_km !== null && (
                            <p className="text-xs text-slate-500 mt-1">
                              {toNumberOrNull(
                                item.distance_km
                              ) !== null
                                ? `${toNumberOrNull(
                                    item.distance_km
                                  ).toFixed(2)} km`
                                : '—'}
                            </p>
                          )}

                      </div>

                    </div>

                  </div>

                )
              )}

          </div>

        ) : (

          <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">

            <p className="text-sm text-slate-600">

              {mappingAvailable
                ? (
                    hi
                      ? 'वर्तमान OSM क्वेरी में कोई सीधे संबंधित व्यवसाय नहीं मिला। नीचे संभावित रिटेल संदर्भ देखें।'
                      : 'No directly relevant business was found in the current OSM query. See potential retail references below.'
                  )
                : (
                    hi
                      ? 'OpenStreetMap मैपिंग अभी उपलब्ध नहीं है। इसे शून्य प्रतिस्पर्धा नहीं माना गया है।'
                      : 'OpenStreetMap mapping is currently unavailable. This is not treated as zero competition.'
                  )}

            </p>

          </div>

        )}

      </div>

      {/* POTENTIAL RETAIL REFERENCES */}

      {potentialRetailOutlets.length > 0 && (

        <div className="mt-5">

          <div className="flex items-center justify-between gap-3 mb-3">

            <div>

              <h4 className="font-bold text-slate-900">
                {hi
                  ? 'संभावित रिटेल संदर्भ'
                  : 'Potential Retail References'}
              </h4>

              <p className="text-xs text-slate-500 mt-1">
                {hi
                  ? 'ये OSM में मैप किए गए सामान्य रिटेल स्थान हैं। इन्हें सीधे चयनित व्यवसाय नहीं माना गया है।'
                  : 'These are general retail places mapped in OSM. They are not treated as direct businesses for the selected business.'}
              </p>

            </div>

            <span className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg">
              {formatNumber(
                potentialRetailCount
              )}
            </span>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {potentialRetailOutlets
              .slice(0, 8)
              .map(
                (item, index) => (

                  <div
                    key={`${item?.name || 'retail'}-${index}`}
                    className="border border-slate-200 rounded-lg p-3 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200"
                  >

                    <div className="flex items-start gap-3">

                      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">

                        <Store className="w-4 h-4 text-violet-600" />

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="font-semibold text-slate-800 text-sm">
                          {item?.name ||
                            (hi
                              ? 'अनाम रिटेल स्थान'
                              : 'Unnamed Retail Place')}
                        </p>

                        {item?.shop && (
                          <p className="text-xs text-slate-500 mt-1">
                            {item.shop}
                          </p>
                        )}

                        {item?.distance_km !== undefined &&
                          item?.distance_km !== null && (
                            <p className="text-xs text-slate-500 mt-1">
                              {toNumberOrNull(
                                item.distance_km
                              ) !== null
                                ? `${toNumberOrNull(
                                    item.distance_km
                                  ).toFixed(2)} km`
                                : '—'}
                            </p>
                          )}

                      </div>

                    </div>

                  </div>

                )
              )}

          </div>

          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3">

            <p className="text-xs text-slate-500 leading-relaxed">

              <strong>
                {hi
                  ? 'ध्यान दें:'
                  : 'Note:'}
              </strong>{' '}

              {hi
                ? 'ये केवल OpenStreetMap में उपलब्ध मैप किए गए रिटेल संदर्भ हैं। इनकी संख्या को वास्तविक प्रतिस्पर्धियों की कुल संख्या नहीं माना जाना चाहिए।'
                : 'These are only retail references mapped in OpenStreetMap. Their count should not be treated as the total number of real-world competitors.'}

            </p>

          </div>

        </div>

      )}

      {/* MARKET PLACES */}

      {marketplaces.length > 0 && (

        <div className="mt-5">

          <h4 className="font-bold text-slate-900">
            {hi
              ? 'मैप किए गए बाजार'
              : 'Mapped Market Places'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">

            {marketplaces
              .slice(0, 6)
              .map(
                (item, index) => (

                  <div
                    key={`${item?.name || 'market'}-${index}`}
                    className="border border-slate-200 rounded-lg p-3 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-violet-200"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">

                        <Building2 className="w-4 h-4 text-violet-600" />

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          {item?.name ||
                            (hi
                              ? 'बाजार'
                              : 'Market')}
                        </p>

                        {item?.distance_km !== undefined &&
                          item?.distance_km !== null && (
                            <p className="text-xs text-slate-500 mt-1">
                              {toNumberOrNull(
                                item.distance_km
                              ) !== null
                                ? `${toNumberOrNull(
                                    item.distance_km
                                  ).toFixed(2)} km`
                                : '—'}
                            </p>
                          )}

                      </div>

                    </div>

                  </div>

                )
              )}

          </div>

        </div>

      )}

      {/* SOURCES */}

      <div className="mt-6 pt-5 border-t border-slate-200">

        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {hi
            ? 'डेटा स्रोत'
            : 'Data Sources'}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">

          <span className="px-3 py-1.5 bg-slate-100 rounded-md text-xs text-slate-600">
            {hi
              ? 'जनगणना 2011'
              : 'Census 2011'}
          </span>

          <span className="px-3 py-1.5 bg-slate-100 rounded-md text-xs text-slate-600">
            OpenStreetMap
          </span>

          <span className="px-3 py-1.5 bg-slate-100 rounded-md text-xs text-slate-600">
            Agmarknet
          </span>

        </div>

      </div>

      {/* TRANSPARENCY */}

      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-start gap-3">

        <Info className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />

        <p className="text-xs text-slate-500 leading-relaxed">

          {hi
            ? 'जनसंख्या जनगणना 2011 का संदर्भ डेटा है। OpenStreetMap केवल मैप किए गए स्थान दिखाता है। संभावित रिटेल संदर्भ सीधे प्रतिस्पर्धी व्यवसाय नहीं माने जाते। Agmarknet मूल्य संदर्भ बाजार मूल्य है। अंतिम निर्णय से पहले स्थानीय जानकारी सत्यापित करें।'
            : 'Population is Census 2011 reference data. OpenStreetMap shows mapped places only. Potential retail references are not treated as direct competitors. Agmarknet price is a reference market price. Verify local conditions before making a final decision.'}

        </p>

      </div>

    </section>
  );
}