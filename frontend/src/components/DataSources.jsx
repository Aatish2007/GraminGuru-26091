import React from 'react';
import { OFFICIAL_SOURCES_DIRECTORY } from '../data/presets';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

const SOURCE_TRANSLATIONS = {
  'Census India': {
    name: {
      en: 'Census India',
      hi: 'भारत की जनगणना',
    },
    desc: {
      en: 'Official Census of India data and population references.',
      hi: 'भारत की जनगणना का आधिकारिक डेटा और जनसंख्या संदर्भ।',
    },
  },

  'Census Population Finder': {
    name: {
      en: 'Census Population Finder',
      hi: 'जनगणना जनसंख्या खोज',
    },
    desc: {
      en: 'Population and demographic reference data from Census India.',
      hi: 'भारत की जनगणना से जनसंख्या और जनसांख्यिकीय संदर्भ डेटा।',
    },
  },

  OpenStreetMap: {
    name: {
      en: 'OpenStreetMap',
      hi: 'ओपनस्ट्रीटमैप',
    },
    desc: {
      en: 'Open geographic and mapped point-of-interest data.',
      hi: 'खुले भौगोलिक और मैप किए गए स्थानों का डेटा।',
    },
  },

  Agmarknet: {
    name: {
      en: 'Agmarknet',
      hi: 'एगमार्कनेट',
    },
    desc: {
      en: 'Agricultural market and mandi price reference.',
      hi: 'कृषि बाजार और मंडी मूल्य का संदर्भ।',
    },
  },

  JanSamarth: {
    name: {
      en: 'JanSamarth',
      hi: 'जनसमर्थ',
    },
    desc: {
      en: 'Government credit-linked scheme discovery and reference.',
      hi: 'सरकार से जुड़ी ऋण योजनाओं की खोज और संदर्भ।',
    },
  },

  KVIC: {
    name: {
      en: 'KVIC',
      hi: 'केवीआईसी',
    },
    desc: {
      en: 'Official reference for PMEGP and related entrepreneurship support.',
      hi: 'PMEGP और संबंधित उद्यमिता सहायता के लिए आधिकारिक संदर्भ।',
    },
  },

  Bhashini: {
    name: {
      en: 'Bhashini',
      hi: 'भाषिणी',
    },
    desc: {
      en: 'Indian language and language-technology platform.',
      hi: 'भारतीय भाषाओं और भाषा-प्रौद्योगिकी का मंच।',
    },
  },

  'data.gov.in': {
    name: {
      en: 'data.gov.in',
      hi: 'data.gov.in',
    },
    desc: {
      en: 'Government of India open-data platform.',
      hi: 'भारत सरकार का ओपन-डेटा मंच।',
    },
  },
};

function getSourceTranslation(src, lang) {
  const source = SOURCE_TRANSLATIONS[src.name];

  if (!source) {
    return {
      name: src.name,
      desc: src.desc,
    };
  }

  return {
    name: source.name[lang] || source.name.en,
    desc: source.desc[lang] || source.desc.en,
  };
}

export default function DataSources({ lang }) {
  const isHindi = lang === 'hi';

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-3">

        <div>

          <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">
            <BookOpen className="w-4 h-4" />

            <span>
              {isHindi
                ? 'पारदर्शिता और डेटा स्रोत'
                : 'Transparency & Data Sources'}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900">
            {isHindi
              ? 'आधिकारिक डेटा स्रोत और संदर्भ'
              : 'Official Data Sources & References'}
          </h3>

          <p className="text-slate-500 text-sm mt-1 max-w-3xl">
            {isHindi
              ? 'GraminGuru में बाजार, स्थान, वित्तीय और सरकारी योजनाओं से संबंधित संदर्भ और सत्यापन के लिए उपयोग किए जाने वाले स्रोत।'
              : 'Sources used by GraminGuru as references for market, location, financial and government-scheme information and verification.'}
          </p>

        </div>

        {/* Small trust indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4" />

          <span>
            {isHindi ? 'स्रोत पारदर्शिता' : 'Source Transparency'}
          </span>
        </div>

      </div>

      {/* Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

        {OFFICIAL_SOURCES_DIRECTORY.map((src, idx) => {

          const translated = getSourceTranslation(src, lang);

          return (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-white
                border border-slate-200
                hover:border-violet-300
                hover:bg-violet-50/30
                rounded-xl
                p-4
                transition-all
                duration-300
                group
                flex flex-col
                justify-between
                hover:-translate-y-1
                hover:shadow-md
                animate-slide-up
              "
              style={{
                animationDelay: `${idx * 60}ms`,
              }}
            >

              <div>

                <div className="flex items-center justify-between gap-2 mb-2">

                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-violet-700 transition-colors duration-200">
                    {translated.name}
                  </h4>

                  <ExternalLink
                    className="
                      w-3.5 h-3.5
                      text-slate-400
                      group-hover:text-violet-600
                      group-hover:scale-110
                      transition-all
                      duration-200
                      shrink-0
                    "
                  />

                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {translated.desc}
                </p>

              </div>

              <div className="text-[11px] font-mono text-violet-600 font-semibold truncate pt-2 border-t border-slate-100 group-hover:text-violet-700 transition-colors">
                {src.url.replace('https://', '')}
              </div>

            </a>
          );
        })}

      </div>

      {/* Principles */}
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 text-xs leading-relaxed space-y-2">

        <div className="flex items-center gap-2 mb-2">

          <ShieldCheck className="w-4 h-4 text-violet-600" />

          <p className="font-bold text-violet-700 text-sm">
            {isHindi
              ? 'GraminGuru डेटा स्रोत के सिद्धांत'
              : 'GraminGuru Data Source Principles'}
          </p>

        </div>

        <p className="text-slate-700">
          <strong className="text-violet-700">1.</strong>{' '}
          {isHindi
            ? 'जहाँ उपलब्ध हो, भारत की जनगणना, data.gov.in और Agmarknet जैसे आधिकारिक स्रोतों को प्राथमिक संदर्भ के रूप में उपयोग करें।'
            : 'Where available, use official sources such as Census of India, data.gov.in and Agmarknet as primary references.'}
        </p>

        <p className="text-slate-700">
          <strong className="text-violet-700">2.</strong>{' '}
          {isHindi
            ? 'बाजार संकेतकों के साथ उच्च, मध्यम, अनुमानित और सत्यापन आवश्यक जैसे स्पष्ट विश्वसनीयता लेबल दिखाएँ।'
            : 'Display clear confidence labels such as High, Medium, Estimated and Needs Verification with market indicators.'}
        </p>

        <p className="text-slate-700">
          <strong className="text-violet-700">3.</strong>{' '}
          {isHindi
            ? 'OpenStreetMap के मैप किए गए स्थानों को स्थानीय क्षेत्र में मौजूद सभी वास्तविक व्यवसायों की पूरी संख्या न मानें।'
            : 'Do not treat OpenStreetMap mapped POIs as a complete count of all businesses physically operating in the local area.'}
        </p>

      </div>

      {/* Transparency */}
      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">

        <p className="text-xs text-slate-600 leading-relaxed">

          <strong className="text-slate-800">
            {isHindi
              ? 'पारदर्शिता सूचना:'
              : 'Transparency note:'}
          </strong>{' '}

          {isHindi
            ? 'किसी स्रोत का यहाँ दिया होना यह नहीं दर्शाता कि उसकी प्रत्येक जानकारी विश्लेषण के समय लाइव या सीधे प्राप्त की गई है। कुछ संकेतक मैप किए गए डेटा, संदर्भ बेंचमार्क या अनुमानित जानकारी पर आधारित हो सकते हैं। अंतिम व्यवसाय या वित्तीय निर्णय से पहले स्थानीय स्तर पर और संबंधित आधिकारिक स्रोतों से सत्यापन किया जाना चाहिए।'
            : 'Listing a source here does not mean that every value from that source was live or directly fetched during the analysis. Some indicators may be based on mapped data, reference benchmarks or estimated information. Local and official-source verification is recommended before making a final business or financing decision.'}

        </p>

      </div>

    </section>
  );
}