import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MapPinned,
  WalletCards,
  ShieldCheck,
  Landmark
} from 'lucide-react';

export default function HeroBanner({ onStart, lang }) {
  const isHindi = lang === 'hi';

  return (
    <section className="mb-7 page-enter">

      <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-lg shadow-violet-100/50">

        {/* Decorative Background */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-100/60 blur-3xl" />

        <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-purple-100/60 blur-3xl" />

        <div className="absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-fuchsia-100/30 blur-3xl" />

        <div className="relative px-6 py-8 sm:px-9 sm:py-10">

          <div className="max-w-4xl">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1.5 text-xs font-bold text-violet-700 shadow-sm">

              <CheckCircle2 size={14} />

              {isHindi
                ? 'ग्रामीण उद्यम निर्णय सहायता'
                : 'Rural Enterprise Decision Support'}

            </div>

            {/* Heading */}
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">

              {isHindi
                ? 'ऋण लेने से पहले अपने व्यवसाय की जाँच करें।'
                : 'Check your business before taking a loan.'}

            </h1>

            {/* Description */}
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">

              {isHindi
                ? 'GraminGuru ग्रामीण उद्यमियों को व्यवसाय के विकल्पों की तुलना करने, स्थानीय बाज़ार की स्थिति समझने, पूंजी की योजना बनाने और वित्तीय निर्णय लेने से पहले ऋण चुकाने के जोखिम को समझने में मदद करता है।'
                : 'GraminGuru helps rural entrepreneurs compare business options, understand local market conditions, plan their capital and test repayment risk before making a financing decision.'}

            </p>

            {/* Feature Pills */}
            <div className="mt-6 flex flex-wrap gap-2.5 text-xs">

              {[
                [
                  MapPinned,
                  isHindi ? 'स्थानीय बाज़ार' : 'Local Market'
                ],
                [
                  WalletCards,
                  isHindi ? 'वित्तीय योजना' : 'Financial Plan'
                ],
                [
                  ShieldCheck,
                  isHindi ? 'ऋण चुकौती जोखिम' : 'Repayment Risk'
                ],
                [
                  Landmark,
                  isHindi ? 'योजना मार्ग' : 'Scheme Routes'
                ]
              ].map(([Icon, label]) => (

                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50"
                >

                  <Icon
                    size={14}
                    className="text-violet-600"
                  />

                  {label}

                </span>

              ))}

            </div>

            {/* Start Button */}
            {onStart && (
              <button
                type="button"
                onClick={onStart}
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-300"
              >

                {isHindi
                  ? 'विश्लेषण शुरू करें'
                  : 'Start Analysis'}

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}