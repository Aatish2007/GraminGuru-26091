import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Landmark,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

/* =========================================================
   SCHEME INFORMATION
========================================================= */

const SCHEME_INFO = {
  PMEGP: {
    name: {
      en: 'PMEGP',
      hi: 'PMEGP',
    },
    type: {
      en: 'Credit + Subsidy',
      hi: 'ऋण + सब्सिडी',
    },
    reason: {
      en: 'May be relevant for eligible rural micro-enterprises.',
      hi: 'पात्र ग्रामीण सूक्ष्म उद्यमों के लिए उपयोगी हो सकती है।',
    },
  },

  MUDRA: {
    name: {
      en: 'MUDRA',
      hi: 'मुद्रा',
    },
    type: {
      en: 'Credit Scheme',
      hi: 'ऋण योजना',
    },
    reason: {
      en: 'Credit support route for eligible micro-enterprises.',
      hi: 'पात्र सूक्ष्म उद्यमों के लिए ऋण सहायता का विकल्प।',
    },
  },

  JanSamarth: {
    name: {
      en: 'JanSamarth',
      hi: 'जनसमर्थ',
    },
    type: {
      en: 'Scheme Discovery',
      hi: 'योजना खोज',
    },
    reason: {
      en: 'Government platform for discovering suitable credit-linked schemes.',
      hi: 'उपयुक्त ऋण से जुड़ी सरकारी योजनाओं की जानकारी खोजने का सरकारी मंच।',
    },
  },
};

/* =========================================================
   DOCUMENT TRANSLATIONS
========================================================= */

const DOCUMENT_TRANSLATIONS = {
  'Aadhaar / identity proof':
    'आधार पहचान प्रमाण',

  'PAN or applicable identity document':
    'पैन या लागू पहचान दस्तावेज़',

  'Bank account details':
    'बैंक खाते का विवरण',

  'Address / residence proof':
    'पता और निवास प्रमाण',

  'Business or project details':
    'व्यवसाय या परियोजना का विवरण',

  'Project cost / quotation documents':
    'परियोजना लागत और कोटेशन दस्तावेज़',

  'Photographs':
    'फोटो',

  'Category certificate, if applicable':
    'लागू होने पर श्रेणी प्रमाण पत्र',
};

/* =========================================================
   HELPERS
========================================================= */

function getSchemeName(scheme, lang) {
  const info = SCHEME_INFO[scheme];

  if (!info) {
    return scheme || '';
  }

  return (
    info.name?.[lang] ||
    info.name?.en ||
    scheme
  );
}

function getSchemeType(
  scheme,
  lang,
  fallback = ''
) {
  const info = SCHEME_INFO[scheme];

  if (info?.type) {
    return (
      info.type[lang] ||
      info.type.en
    );
  }

  return fallback;
}

/* =========================================================
   RECOMMENDATION TRANSLATOR
========================================================= */

function translateRecommendation(item, lang) {
  const raw =
    typeof item === 'string'
      ? item
      : item?.text ||
        item?.reason ||
        item?.message ||
        '';

  if (!raw) {
    return '';
  }

  if (lang !== 'hi') {
    return raw;
  }

  const original = String(raw).trim();

  /*
     Prevent accidental backend/UI value such as "svg"
     from appearing as visible recommendation text.
  */
  if (original.toLowerCase() === 'svg') {
    return '';
  }

  const text = original.toLowerCase();

  /* =======================================================
     CURRENT BACKEND RECOMMENDATION TEXT
  ======================================================= */

  if (
    text ===
    'potentially relevant for eligible rural micro-enterprise projects. final eligibility must be verified officially.'
  ) {
    return (
      'पात्र ग्रामीण सूक्ष्म-उद्यम परियोजनाओं के लिए ' +
      'संभावित रूप से प्रासंगिक। अंतिम पात्रता की ' +
      'आधिकारिक रूप से पुष्टि की जानी चाहिए।'
    );
  }

  if (
    text ===
    'potential credit route for eligible micro-enterprise activities. final eligibility must be verified.'
  ) {
    return (
      'पात्र सूक्ष्म-उद्यम गतिविधियों के लिए संभावित ' +
      'ऋण विकल्प। अंतिम पात्रता की पुष्टि की जानी चाहिए।'
    );
  }

  if (
    text ===
    'government scheme-discovery route for identifying potentially suitable credit-linked schemes.'
  ) {
    return (
      'संभावित रूप से उपयुक्त ऋण-संबंधित सरकारी योजनाओं ' +
      'की पहचान के लिए सरकारी योजना-खोज विकल्प।'
    );
  }

  /* =======================================================
     EXISTING / ALTERNATIVE BACKEND WORDING
  ======================================================= */

  if (
    text.includes('may be relevant') &&
    text.includes('eligible rural')
  ) {
    return (
      'पात्र ग्रामीण सूक्ष्म उद्यमों के लिए ' +
      'उपयोगी हो सकती है।'
    );
  }

  if (
    text.includes('credit support route') &&
    text.includes('eligible micro-enterprises')
  ) {
    return (
      'पात्र सूक्ष्म उद्यमों के लिए ' +
      'ऋण सहायता का विकल्प।'
    );
  }

  if (
    text.includes('government platform') &&
    text.includes('credit-linked schemes')
  ) {
    return (
      'उपयुक्त ऋण से जुड़ी सरकारी योजनाओं की ' +
      'जानकारी खोजने का सरकारी मंच।'
    );
  }

  if (
    text.includes('pmegp') &&
    text.includes('subsidy')
  ) {
    return (
      'पात्र मामलों में PMEGP के अंतर्गत ऋण और ' +
      'सब्सिडी का विकल्प उपलब्ध हो सकता है।'
    );
  }

  /*
     If a new backend recommendation has not yet been
     translated, return the original text instead of
     incorrectly modifying it.
  */
  return original;
}

function getSchemeReason(
  scheme,
  lang,
  fallback = ''
) {
  const info = SCHEME_INFO[scheme];

  if (info?.reason) {
    return (
      info.reason[lang] ||
      info.reason.en
    );
  }

  if (fallback) {
    return translateRecommendation(
      fallback,
      lang
    );
  }

  return '';
}

function translateDocument(
  document,
  lang
) {
  if (lang !== 'hi') {
    return document;
  }

  return (
    DOCUMENT_TRANSLATIONS[document] ||
    document
  );
}

function normalizeSchemeKey(name) {
  if (!name) {
    return '';
  }

  const value = String(name)
    .trim()
    .toLowerCase();

  if (value === 'pmegp') {
    return 'PMEGP';
  }

  if (value === 'mudra') {
    return 'MUDRA';
  }

  if (value === 'jansamarth') {
    return 'JanSamarth';
  }

  if (value === 'jan samarth') {
    return 'JanSamarth';
  }

  return name;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SchemeGuidance({
  schemeData,
  form,
  lang
}) {
  const [
    checkedDocuments,
    setCheckedDocuments
  ] = useState({});

  const isHindi = lang === 'hi';

  if (!schemeData) {
    return null;
  }

  /* =======================================================
     FINANCIAL DATA
  ======================================================= */

  const loanRequired =
    Number(
      schemeData.loan_required ??
      schemeData.required_loan ??
      0
    ) || 0;

  const loanRatio =
    Number(
      schemeData.loan_ratio ?? 0
    ) || 0;

  /* =======================================================
     SCHEME DATA
  ======================================================= */

  const recommendedScheme =
    normalizeSchemeKey(
      schemeData.recommended_scheme ||
      schemeData.recommendedScheme ||
      ''
    );

  const possibleSchemes =
    Array.isArray(
      schemeData.possible_schemes
    )
      ? schemeData.possible_schemes
      : [];

  const recommendations =
    Array.isArray(
      schemeData.recommendations
    )
      ? schemeData.recommendations
      : [];

  const documents =
    Array.isArray(
      schemeData.documents
    )
      ? schemeData.documents
      : [
          'Aadhaar / identity proof',
          'PAN or applicable identity document',
          'Bank account details',
          'Address / residence proof',
          'Business or project details',
          'Project cost / quotation documents',
          'Photographs',
          'Category certificate, if applicable',
        ];

  /* =======================================================
     DOCUMENT TOGGLE
  ======================================================= */

  const toggleDocument = (index) => {
    setCheckedDocuments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const checkedCount =
    Object.values(
      checkedDocuments
    ).filter(Boolean).length;

  const recommendedReason =
    getSchemeReason(
      recommendedScheme,
      lang,
      schemeData.reason || ''
    );

  /* =======================================================
     SCHEME CARD
  ======================================================= */

  const SchemeCard = ({
    schemeKey,
    scheme,
    index
  }) => {
    const schemeName =
      getSchemeName(
        schemeKey,
        lang
      );

    const schemeType =
      typeof scheme === 'object'
        ? getSchemeType(
            schemeKey,
            lang,
            scheme.type || ''
          )
        : getSchemeType(
            schemeKey,
            lang,
            ''
          );

    const schemeReason =
      typeof scheme === 'object'
        ? getSchemeReason(
            schemeKey,
            lang,
            scheme.reason || ''
          )
        : getSchemeReason(
            schemeKey,
            lang,
            ''
          );

    return (
      <div
        className="group bg-white border border-slate-200 rounded-xl p-5
                   hover:border-violet-300 hover:shadow-lg
                   hover:-translate-y-1
                   transition-all duration-300
                   animate-slide-up"
        style={{
          animationDelay: `${index * 80}ms`
        }}
      >
        {/* Icon */}

        <div
          className="w-10 h-10 rounded-lg
                     bg-gradient-to-br from-violet-50 to-purple-100
                     border border-violet-100
                     flex items-center justify-center
                     mb-4
                     group-hover:scale-105
                     transition-transform duration-300"
        >
          <Landmark className="w-5 h-5 text-violet-600" />
        </div>

        {/* Name */}

        <h4 className="font-bold text-slate-900 text-lg">
          {schemeName}
        </h4>

        {/* Type */}

        <p className="text-sm font-semibold text-violet-600 mt-2">
          {schemeType}
        </p>

        {/* Reason */}

        <p className="text-sm text-slate-600 leading-relaxed mt-3">
          {schemeReason}
        </p>

        {/* Verification */}

        <div
          className="mt-4 inline-flex items-center gap-1.5
                     text-xs font-semibold text-violet-600"
        >
          <ShieldCheck className="w-3.5 h-3.5" />

          {isHindi
            ? 'आधिकारिक स्रोत से पुष्टि करें'
            : 'Verify with official source'}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* ===================================================
          MAIN HEADING
      =================================================== */}

      <section
        className="bg-white border border-slate-200 rounded-xl
                   p-5 sm:p-7 shadow-sm
                   hover:shadow-md transition-shadow duration-300
                   animate-slide-up"
      >

        <div className="flex items-start gap-3">

          <div
            className="w-11 h-11 rounded-xl
                       bg-gradient-to-br from-violet-100 to-purple-100
                       border border-violet-200
                       flex items-center justify-center
                       shrink-0
                       animate-pulse"
            style={{
              animationDuration: '3s'
            }}
          >
            <Landmark className="w-5 h-5 text-violet-600" />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-2xl font-bold text-slate-900">
                {isHindi
                  ? 'वित्तीय और योजना मार्गदर्शन'
                  : 'Financing & Scheme Routing'}
              </h2>

              <Sparkles className="w-4 h-4 text-violet-500" />

            </div>

            <p className="text-sm text-slate-500 mt-1">
              {isHindi
                ? 'परियोजना लागत और ऋण आवश्यकता के आधार पर प्रारंभिक योजना मार्गदर्शन।'
                : 'Preliminary scheme routing based on project cost and loan requirement.'}
            </p>

          </div>

        </div>

        {/* =================================================
            PRIMARY ROUTE
        ================================================= */}

        <div className="mt-6">

          <div
            className="flex items-center gap-2
                       text-violet-600 text-xs font-bold
                       uppercase tracking-wide mb-3"
          >
            <CheckCircle2 className="w-4 h-4" />

            <span>
              {isHindi
                ? 'प्राथमिक मार्ग'
                : 'Primary Route'}
            </span>
          </div>

          <div
            className="relative overflow-hidden
                       bg-gradient-to-br from-violet-50
                       via-purple-50 to-white
                       border border-violet-200
                       rounded-xl p-5
                       hover:shadow-md
                       transition-all duration-300"
          >

            {/* Decorative gradient */}

            <div
              className="absolute -right-12 -top-12
                         w-32 h-32 rounded-full
                         bg-purple-200/30 blur-2xl
                         pointer-events-none"
            />

            <div className="relative">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
                    {isHindi
                      ? 'प्रारंभिक योजना मार्ग'
                      : 'Preliminary Scheme Route'}
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {recommendedScheme
                      ? getSchemeName(
                          recommendedScheme,
                          lang
                        )
                      : isHindi
                        ? 'योजना पात्रता सत्यापित करें'
                        : 'Verify Scheme Eligibility'}
                  </h3>

                </div>

                <div
                  className="inline-flex items-center gap-2
                             px-3 py-2 rounded-lg
                             bg-white border border-violet-200
                             text-xs font-semibold text-violet-700
                             w-fit"
                >
                  <ShieldCheck className="w-4 h-4" />

                  {isHindi
                    ? 'प्रारंभिक'
                    : 'Preliminary'}
                </div>

              </div>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {isHindi
                  ? 'परियोजना लागत, आवश्यक ऋण और व्यवसाय विवरण के आधार पर यह प्रारंभिक योजना मार्ग दिखाया गया है। अंतिम पात्रता की पुष्टि आधिकारिक पोर्टल और ऋणदाता से करें।'
                  : 'This is an initial scheme route based on project cost, required loan and business details. Final eligibility must be verified with the official portal and lender.'}
              </p>

              {/* Metrics */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                {/* Loan */}

                <div
                  className="bg-white border border-slate-200
                             rounded-lg p-4
                             hover:border-violet-200
                             hover:shadow-sm
                             transition-all duration-200"
                >
                  <p className="text-xs text-slate-500">
                    {isHindi
                      ? 'आवश्यक ऋण'
                      : 'Loan Required'}
                  </p>

                  <p className="text-lg font-bold text-slate-900 mt-1">
                    ₹{loanRequired.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Ratio */}

                <div
                  className="bg-white border border-slate-200
                             rounded-lg p-4
                             hover:border-violet-200
                             hover:shadow-sm
                             transition-all duration-200"
                >
                  <p className="text-xs text-slate-500">
                    {isHindi
                      ? 'ऋण अनुपात'
                      : 'Loan Ratio'}
                  </p>

                  <p className="text-lg font-bold text-slate-900 mt-1">
                    {loanRatio.toFixed(1)}%
                  </p>
                </div>

                {/* Status */}

                <div
                  className="bg-white border border-slate-200
                             rounded-lg p-4
                             hover:border-violet-200
                             hover:shadow-sm
                             transition-all duration-200"
                >
                  <p className="text-xs text-slate-500">
                    {isHindi
                      ? 'स्थिति'
                      : 'Status'}
                  </p>

                  <p className="text-lg font-bold text-violet-600 mt-1">
                    {isHindi
                      ? 'प्रारंभिक मार्ग'
                      : 'Preliminary Route'}
                  </p>
                </div>

              </div>

              {recommendedReason && (
                <div
                  className="mt-4 px-4 py-3 rounded-lg
                             bg-white/80
                             border border-violet-100"
                >
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-violet-700">
                      {isHindi
                        ? 'संदर्भ: '
                        : 'Context: '}
                    </span>

                    {recommendedReason}
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* ===================================================
          POSSIBLE SCHEME ROUTES
      =================================================== */}

      <section
        className="bg-white border border-slate-200 rounded-xl
                   p-5 sm:p-7 shadow-sm
                   animate-slide-up"
      >

        <div className="flex items-center gap-2 mb-5">

          <div
            className="w-9 h-9 rounded-lg
                       bg-violet-50
                       flex items-center justify-center"
          >
            <Landmark className="w-5 h-5 text-violet-600" />
          </div>

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              {isHindi
                ? 'संभावित योजना मार्ग'
                : 'Possible Scheme Routes'}
            </h3>

            <p className="text-xs text-slate-500 mt-0.5">
              {isHindi
                ? 'उपलब्ध योजना विकल्पों का प्रारंभिक संदर्भ।'
                : 'Initial reference for available scheme options.'}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {possibleSchemes.length > 0
            ? possibleSchemes.map(
                (scheme, index) => {

                  const schemeKey =
                    normalizeSchemeKey(
                      typeof scheme === 'string'
                        ? scheme
                        : scheme?.name ||
                          scheme?.scheme ||
                          ''
                    );

                  return (
                    <SchemeCard
                      key={`${schemeKey}-${index}`}
                      schemeKey={schemeKey}
                      scheme={scheme}
                      index={index}
                    />
                  );
                }
              )
            : Object.keys(
                SCHEME_INFO
              ).map(
                (schemeKey, index) => (

                  <SchemeCard
                    key={schemeKey}
                    schemeKey={schemeKey}
                    scheme={schemeKey}
                    index={index}
                  />

                )
              )}

        </div>
      </section>

      {/* ===================================================
          RECOMMENDATIONS
      =================================================== */}

      {recommendations.length > 0 && (
        <section
          className="bg-white border border-slate-200
                     rounded-xl p-5 sm:p-7 shadow-sm
                     animate-slide-up"
        >

          <div className="flex items-center gap-2 mb-4">

            <CheckCircle2 className="w-5 h-5 text-violet-600" />

            <h3 className="text-xl font-bold text-slate-900">
              {isHindi
                ? 'योजना संबंधी सुझाव'
                : 'Scheme Recommendations'}
            </h3>

          </div>

          <div className="space-y-3">

            {recommendations.map(
              (item, index) => {

                const recommendationText =
                  translateRecommendation(
                    item,
                    lang
                  );

                /*
                   Do not render an empty recommendation.
                   This also prevents a stray "svg" value
                   from creating an empty-looking card.
                */
                if (!recommendationText) {
                  return null;
                }

                return (
                  <div
                    key={index}
                    className="group flex gap-3
                               bg-gradient-to-r
                               from-violet-50/70
                               to-purple-50/30
                               border border-violet-100
                               rounded-lg p-4
                               hover:border-violet-200
                               hover:shadow-sm
                               transition-all duration-300
                               animate-slide-up"
                    style={{
                      animationDelay: `${index * 70}ms`
                    }}
                  >

                    <div
                      className="w-8 h-8 rounded-lg
                                 bg-violet-100
                                 flex items-center justify-center
                                 shrink-0
                                 group-hover:scale-105
                                 transition-transform"
                    >
                      <CheckCircle2 className="w-4 h-4 text-violet-600" />
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {recommendationText}
                    </p>

                  </div>
                );
              }
            )}

          </div>
        </section>
      )}

      {/* ===================================================
          DOCUMENT CHECKLIST
      =================================================== */}

      <section
        className="bg-white border border-slate-200
                   rounded-xl p-5 sm:p-7 shadow-sm
                   animate-slide-up"
      >

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">

          <div className="flex items-center gap-2">

            <div
              className="w-9 h-9 rounded-lg
                         bg-violet-50
                         flex items-center justify-center"
            >
              <FileText className="w-5 h-5 text-violet-600" />
            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-900">
                {isHindi
                  ? 'दस्तावेज़ चेकलिस्ट'
                  : 'Document Checklist'}
              </h3>

              <p className="text-xs text-slate-500 mt-0.5">
                {isHindi
                  ? 'तैयारी की स्थिति ट्रैक करें।'
                  : 'Track your document preparation.'}
              </p>

            </div>

          </div>

          {/* Progress */}

          <div
            className="text-xs font-semibold
                       text-violet-700
                       bg-violet-50
                       border border-violet-100
                       px-3 py-2 rounded-lg
                       w-fit"
          >
            {checkedCount}/{documents.length}{' '}
            {isHindi
              ? 'तैयार'
              : 'ready'}
          </div>

        </div>

        <p className="text-sm text-slate-500 mb-5 mt-3">
          {isHindi
            ? 'सामान्य रूप से आवश्यक दस्तावेज़ तैयार करने के लिए इस सूची का उपयोग करें।'
            : 'Use this checklist to prepare commonly required documents.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {documents.map(
            (document, index) => {

              const checked =
                !!checkedDocuments[index];

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    toggleDocument(index)
                  }
                  className={`group text-left flex items-start gap-3
                              rounded-lg border p-4
                              transition-all duration-300
                              hover:-translate-y-0.5
                              ${
                                checked
                                  ? 'border-violet-300 bg-violet-50 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-violet-200 hover:shadow-sm'
                              }`}
                >

                  <div
                    className={`w-5 h-5 rounded border
                                flex items-center justify-center
                                shrink-0 transition-all duration-200
                                ${
                                  checked
                                    ? 'bg-violet-600 border-violet-600 scale-105'
                                    : 'bg-white border-slate-300 group-hover:border-violet-300'
                                }`}
                  >
                    {checked && (
                      <CheckCircle2
                        className="w-4 h-4 text-white"
                      />
                    )}
                  </div>

                  <span
                    className={`text-sm leading-relaxed ${
                      checked
                        ? 'text-violet-800 font-medium'
                        : 'text-slate-700'
                    }`}
                  >
                    {translateDocument(
                      document,
                      lang
                    )}
                  </span>

                </button>
              );
            }
          )}

        </div>
      </section>

      {/* ===================================================
          NEXT PRACTICAL ACTION
      =================================================== */}

      <section
        className="relative overflow-hidden
                   bg-gradient-to-br
                   from-violet-50 via-purple-50 to-fuchsia-50
                   border border-violet-200
                   rounded-xl p-5 sm:p-6
                   shadow-sm
                   animate-slide-up"
      >

        {/* Decorative glow */}

        <div
          className="absolute -right-16 -top-16
                     w-40 h-40 rounded-full
                     bg-purple-200/30
                     blur-3xl
                     pointer-events-none"
        />

        <div className="relative">

          <div className="flex items-start gap-3">

            <div
              className="w-10 h-10 rounded-xl
                         bg-white border border-violet-200
                         flex items-center justify-center
                         shrink-0
                         shadow-sm
                         hover:translate-x-1
                         transition-transform duration-300"
            >
              <ArrowRight className="w-5 h-5 text-violet-600" />
            </div>

            <div>

              <h3 className="font-bold text-violet-800 text-lg">
                {isHindi
                  ? 'अगला व्यावहारिक कदम'
                  : 'Next Practical Action'}
              </h3>

              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                {isHindi
                  ? 'अंतिम पात्रता, वर्तमान शर्तों और लागू सीमाओं की पुष्टि आधिकारिक योजना पोर्टल या नजदीकी बैंक और बैंक मित्र से करें।'
                  : 'Verify final eligibility, current terms and applicable limits with the official scheme portal or nearest bank or Bank Mitra.'}
              </p>

            </div>

          </div>

          <div
            className="mt-5 pt-4
                       border-t border-violet-200"
          >

            <div className="flex items-start gap-2">

              <ShieldCheck className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />

              <p className="text-xs text-slate-600 leading-relaxed">
                {isHindi
                  ? 'GraminGuru केवल प्रारंभिक निर्णय-सहायता प्रदान करता है। यह ऋण स्वीकृति, सब्सिडी स्वीकृति या अंतिम पात्रता की गारंटी नहीं देता।'
                  : 'GraminGuru provides preliminary decision support only. It does not guarantee loan sanction, subsidy approval or final eligibility.'}
              </p>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}