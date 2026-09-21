import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

const INITIAL_ITEMS = [
  {
    id: 1,
    title: 'Customer Local Demand',
    desc: 'Verify actual daily customer footfall, buyer interest and purchasing willingness in the target village or nearby market.',
    status: 'Needs Review'
  },
  {
    id: 2,
    title: 'Actual Competitor Pricing',
    desc: 'Confirm real selling prices charged by nearby formal and informal businesses.',
    status: 'Not Verified'
  },
  {
    id: 3,
    title: 'Nearby Competitor Count',
    desc: 'Perform a physical check of existing formal and informal businesses within the relevant local area.',
    status: 'Field Verified'
  },
  {
    id: 4,
    title: 'Raw Material & Supplier Access',
    desc: 'Confirm reliable supplier availability, pricing, supply terms and transport arrangements for required raw materials.',
    status: 'Field Verified'
  },
  {
    id: 5,
    title: 'Buyer & Mandi Transport Costs',
    desc: 'Calculate actual freight, fuel and other transport costs to the nearest relevant buyer or market hub.',
    status: 'Needs Review'
  },
  {
    id: 6,
    title: 'Seasonal Demand Fluctuations',
    desc: 'Assess monsoon, festival and harvest-season effects on sales, operating costs and cash flow.',
    status: 'Needs Review'
  },
  {
    id: 7,
    title: 'Utilities (Power & Water)',
    desc: 'Confirm electricity, water and other essential utility availability required for the selected business.',
    status: 'Field Verified'
  },
  {
    id: 8,
    title: 'Local Permissions & Licenses',
    desc: 'Verify applicable local permissions, trade requirements and registrations such as FSSAI where relevant to the business.',
    status: 'Not Verified'
  }
];

const HINDI_ITEMS = {
  1: {
    title: 'स्थानीय ग्राहक मांग',
    desc: 'लक्षित गांव या आसपास के बाजार में वास्तविक दैनिक ग्राहक संख्या, खरीदने की रुचि और भुगतान की क्षमता की पुष्टि करें।'
  },
  2: {
    title: 'वास्तविक प्रतिस्पर्धी कीमत',
    desc: 'आस-पास के औपचारिक और अनौपचारिक व्यवसायों द्वारा ली जा रही वास्तविक बिक्री कीमतों की पुष्टि करें।'
  },
  3: {
    title: 'आस-पास के प्रतिस्पर्धी व्यवसायों की संख्या',
    desc: 'संबंधित स्थानीय क्षेत्र में मौजूद औपचारिक और अनौपचारिक व्यवसायों की वास्तविक संख्या की जांच करें।'
  },
  4: {
    title: 'कच्चा माल और सप्लायर की उपलब्धता',
    desc: 'जरूरी कच्चे माल के लिए विश्वसनीय सप्लायर, कीमत, आपूर्ति व्यवस्था और परिवहन शर्तों की पुष्टि करें।'
  },
  5: {
    title: 'खरीदार और मंडी परिवहन लागत',
    desc: 'निकटतम संबंधित खरीदार या बाजार केंद्र तक वास्तविक माल ढुलाई, ईंधन और अन्य परिवहन खर्च की गणना करें।'
  },
  6: {
    title: 'मौसमी मांग में बदलाव',
    desc: 'मानसून, त्योहार और फसल के समय बिक्री, खर्च और नकदी प्रवाह पर पड़ने वाले प्रभाव का आकलन करें।'
  },
  7: {
    title: 'बिजली और पानी की सुविधा',
    desc: 'चुने गए व्यवसाय के लिए आवश्यक बिजली, पानी और अन्य जरूरी सुविधाओं की उपलब्धता की पुष्टि करें।'
  },
  8: {
    title: 'स्थानीय अनुमति और लाइसेंस',
    desc: 'व्यवसाय के अनुसार लागू स्थानीय अनुमति, व्यापार संबंधी आवश्यकताओं और FSSAI जैसे पंजीकरण की पुष्टि करें।'
  }
};

const STATUS_HI = {
  'Needs Review': 'समीक्षा आवश्यक',
  'Not Verified': 'सत्यापित नहीं',
  'Field Verified': 'मैदानी सत्यापन'
};

export default function VerificationChecklist({ lang }) {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const isHindi = lang === 'hi';

  function cycleStatus(id) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          let next = 'Field Verified';

          if (item.status === 'Field Verified') {
            next = 'Not Verified';
          } else if (item.status === 'Not Verified') {
            next = 'Needs Review';
          }

          return {
            ...item,
            status: next
          };
        }

        return item;
      })
    );
  }

  const verifiedCount = items.filter(
    (item) => item.status === 'Field Verified'
  ).length;

  const verificationPercent =
    items.length > 0
      ? Math.round((verifiedCount / items.length) * 100)
      : 0;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200 gap-4">

        <div>

          <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">

            <UserCheck className="w-4 h-4" />

            <span>
              {isHindi
                ? 'मानव सत्यापन प्रक्रिया'
                : 'Human-in-the-Loop Verification'}
            </span>

          </div>

          <h3 className="text-2xl font-bold text-slate-900">

            {isHindi
              ? 'स्थानीय मैदानी सत्यापन चेकलिस्ट'
              : 'Local Field Verification Checklist'}

          </h3>

          <p className="text-slate-500 text-sm mt-1 max-w-3xl">

            {isHindi
              ? 'महत्वपूर्ण स्थानीय जानकारियों की पुष्टि CSC Operator, Bank Mitra या स्थानीय प्रतिनिधि के माध्यम से करें।'
              : 'Verify important local assumptions through a CSC Operator, Bank Mitra or local field representative.'}

          </p>

        </div>

        {/* Verification Counter */}

        <div className="flex flex-col items-start sm:items-end gap-2">

          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200 w-fit flex items-center gap-1.5">

            <ShieldCheck className="w-4 h-4 text-emerald-600" />

            <span>
              {isHindi
                ? `सत्यापित: ${verifiedCount} / ${items.length}`
                : `Verified: ${verifiedCount} / ${items.length}`}
            </span>

          </div>

          {/* Progress */}

          <div className="w-36">

            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                style={{
                  width: `${verificationPercent}%`
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          VERIFICATION ITEMS
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {items.map((item, index) => {

          let badgeStyle =
            'bg-slate-100 text-slate-600 border-slate-200';

          let icon = Clock;

          let accent =
            'group-hover:border-slate-300';

          if (item.status === 'Field Verified') {

            badgeStyle =
              'bg-emerald-50 text-emerald-700 border-emerald-200';

            icon = CheckCircle2;

            accent =
              'hover:border-emerald-300';

          } else if (item.status === 'Needs Review') {

            badgeStyle =
              'bg-amber-50 text-amber-700 border-amber-200';

            icon = AlertCircle;

            accent =
              'hover:border-amber-300';

          } else {

            accent =
              'hover:border-violet-300';

          }

          const IconComp = icon;

          const itemText = isHindi
            ? HINDI_ITEMS[item.id]
            : {
                title: item.title,
                desc: item.desc
              };

          return (
            <div
              key={item.id}
              onClick={() => cycleStatus(item.id)}
              className={`
                group
                bg-white
                border
                border-slate-200
                ${accent}
                rounded-xl
                p-4
                transition-all
                duration-300
                cursor-pointer
                flex
                flex-col
                justify-between
                hover:-translate-y-1
                hover:shadow-md
                animate-slide-up
              `}
              style={{
                animationDelay: `${index * 60}ms`
              }}
            >

              <div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">

                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-violet-700 transition-colors duration-200">

                    {itemText.title}

                  </h4>

                  <span
                    className={`
                      text-[10px]
                      px-2.5
                      py-1
                      rounded-md
                      border
                      flex
                      items-center
                      gap-1
                      w-fit
                      shrink-0
                      font-semibold
                      ${badgeStyle}
                    `}
                  >

                    <IconComp className="w-3 h-3" />

                    <span>
                      {isHindi
                        ? STATUS_HI[item.status]
                        : item.status}
                    </span>

                  </span>

                </div>

                <p className="text-xs text-slate-600 leading-relaxed">

                  {itemText.desc}

                </p>

              </div>

              {/* Action Hint */}

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px]">

                <span className="text-slate-400">

                  {isHindi
                    ? 'स्थिति बदलने के लिए क्लिक करें'
                    : 'Click to change status'}

                </span>

                <span className="text-violet-600 font-bold group-hover:text-violet-700 transition-colors">

                  {isHindi
                    ? 'अपडेट करें'
                    : 'Update'}

                </span>

              </div>

            </div>
          );
        })}

      </div>

      {/* =====================================================
          BOTTOM NOTE
      ===================================================== */}

      <div className="mt-6 bg-violet-50 border border-violet-200 rounded-xl p-4">

        <p className="text-xs text-slate-700 leading-relaxed">

          <strong className="text-violet-700">

            {isHindi
              ? 'मैदानी सत्यापन महत्वपूर्ण है:'
              : 'Field verification matters:'}

          </strong>{' '}

          {isHindi
            ? 'GraminGuru स्थानीय परिस्थितियों को स्वयं सत्यापित नहीं करता। कुछ जानकारियाँ मैप किए गए या संदर्भ डेटा से पूरी तरह निर्धारित नहीं की जा सकतीं। अंतिम व्यवसाय या वित्तीय निर्णय से पहले मांग, प्रतिस्पर्धा, परिवहन, सुविधाओं और आवश्यक अनुमतियों की स्थानीय स्तर पर पुष्टि करें।'
            : 'GraminGuru does not independently verify local conditions. Some information cannot be reliably determined from mapped or reference data alone. Verify demand, competitors, transport, utilities and required permissions before making a final business or financing decision.'}

        </p>

      </div>

    </section>
  );
}