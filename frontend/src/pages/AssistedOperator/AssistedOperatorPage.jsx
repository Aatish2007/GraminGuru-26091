import React from 'react';
import VerificationChecklist from '../../components/VerificationChecklist';
import {
  UserCheck,
  FileText,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const BUSINESS_NAMES = {
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
  'Solar Grid': {
    en: 'Solar Grid',
    hi: 'सोलर ग्रिड'
  },
  FlourMill: {
    en: 'Flour Mill',
    hi: 'आटा चक्की'
  },
  'Flour Mill': {
    en: 'Flour Mill',
    hi: 'आटा मिल'
  },
  Fishery: {
    en: 'Fishery',
    hi: 'मत्स्य पालन'
  }
};

function getBusinessName(business, isHindi) {
  return (
    BUSINESS_NAMES[business]?.[isHindi ? 'hi' : 'en'] ||
    business ||
    '-'
  );
}

export default function AssistedOperatorPage({
  form,
  assessmentData,
  schemeData,
  onOpenReport,
  lang
}) {
  const isHindi = lang === 'hi';

  const reqLoan = Math.max(
    0,
    Number(form?.project_cost || 0) -
      Number(form?.own_capital || 0)
  );

  const businessName = getBusinessName(
    form?.business,
    isHindi
  );

  return (
    <div className="space-y-6">

      {/* ==================================================
          ASSISTED WORKSPACE HEADER
      ================================================== */}

      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            {/* Workspace Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-violet-50
                border
                border-violet-100
                text-violet-700
                text-xs
                font-semibold
                px-3
                py-1.5
                rounded-full
                mb-3
              "
            >

              <UserCheck className="w-4 h-4 text-violet-600" />

              <span>
                {isHindi
                  ? 'CSC ऑपरेटर और बैंक मित्र सहायता कार्यक्षेत्र'
                  : 'CSC Operator & Bank Mitra Assisted Workspace'}
              </span>

            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isHindi
                ? 'ग्रामीण उद्यमी सहायता केंद्र'
                : 'Rural Entrepreneur Facilitation Desk'}
            </h2>

            <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
              {isHindi
                ? 'ग्रामीण उद्यमियों को स्थानीय सत्यापन, वित्तीय योजना और बैंक आवेदन के लिए तैयार सारांश बनाने में सहायता करें।'
                : 'Assist rural entrepreneurs with field verification, financial structuring and preparation of a bank-ready application summary.'}
            </p>

          </div>

          {/* Generate Report */}

          <button
            onClick={onOpenReport}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-gradient-to-r
              from-violet-600
              via-purple-600
              to-fuchsia-600
              hover:from-violet-700
              hover:via-purple-700
              hover:to-fuchsia-700
              text-white
              font-semibold
              text-sm
              px-5
              py-3
              rounded-lg
              shadow-sm
              hover:shadow-md
              transition-all
              duration-200
              hover:-translate-y-0.5
              shrink-0
            "
          >

            <FileText className="w-4 h-4" />

            <span>
              {isHindi
                ? 'बैंक रिपोर्ट बनाएँ'
                : 'Generate Bank Report'}
            </span>

          </button>

        </div>

        {/* ==================================================
            ASSISTED METRICS
        ================================================== */}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-200">

          {/* Location */}

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">

            <span className="text-[11px] font-semibold text-slate-500 block">
              {isHindi
                ? 'आवेदक का स्थान'
                : 'Applicant Location'}
            </span>

            <span className="font-bold text-slate-900 text-sm mt-1 block truncate">
              {form?.location || '-'}
            </span>

          </div>

          {/* Business */}

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">

            <span className="text-[11px] font-semibold text-slate-500 block">
              {isHindi
                ? 'चयनित व्यवसाय'
                : 'Selected Business'}
            </span>

            <span className="font-bold text-slate-900 text-sm mt-1 block truncate">
              {businessName}
            </span>

          </div>

          {/* Required Loan */}

          <div className="bg-violet-50 border border-violet-100 rounded-lg p-3">

            <span className="text-[11px] font-semibold text-violet-600 block">
              {isHindi
                ? 'आवश्यक ऋण'
                : 'Required Loan'}
            </span>

            <span className="font-bold text-violet-700 text-sm mt-1 block">
              ₹{reqLoan.toLocaleString('en-IN')}
            </span>

          </div>

          {/* EMI */}

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">

            <span className="text-[11px] font-semibold text-slate-500 block">
              {isHindi
                ? 'मासिक EMI'
                : 'Monthly EMI'}
            </span>

            <span className="font-bold text-slate-900 text-sm mt-1 block">
              ₹
              {Number(
                assessmentData?.emi || 0
              ).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>

          </div>

        </div>

      </section>


      {/* ==================================================
          FIELD VERIFICATION
      ================================================== */}

      <VerificationChecklist lang={lang} />


      {/* ==================================================
          OPERATOR GUIDANCE
      ================================================== */}

      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

        <div className="flex items-start gap-3 mb-5">

          {/* Icon */}

          <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">

            <ShieldCheck className="w-5 h-5 text-violet-600" />

          </div>

          <div>

            <h3 className="font-bold text-lg text-slate-900">
              {isHindi
                ? 'ऑपरेटर सत्यापन दिशानिर्देश'
                : 'Operator Verification Guidelines'}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              {isHindi
                ? 'अंतिम आवेदन सारांश तैयार करने से पहले इन महत्वपूर्ण बातों की जाँच करें।'
                : 'Important checks before preparing the final application summary.'}
            </p>

          </div>

        </div>


        {/* ==================================================
            GUIDELINES
        ================================================== */}

        <div className="space-y-3">

          {/* Guideline 1 */}

          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg transition-all duration-200 hover:border-violet-200 hover:bg-violet-50/30">

            <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
              1
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {isHindi
                ? 'कुल परियोजना लागत की समीक्षा करें और उद्यमी द्वारा लगाई जा रही स्वयं की पूंजी की पुष्टि करें।'
                : "Review the total project cost and confirm the entrepreneur's own capital contribution."}
            </p>

          </div>


          {/* Guideline 2 */}

          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg transition-all duration-200 hover:border-violet-200 hover:bg-violet-50/30">

            <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
              2
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {isHindi
                ? 'स्थानीय कीमतों और आसपास के प्रतिस्पर्धी व्यवसायों की वास्तविक मौजूदगी की उद्यमी के साथ पुष्टि करें।'
                : 'Verify local prices and the physical presence of nearby competing businesses with the entrepreneur.'}
            </p>

          </div>


          {/* Guideline 3 */}

          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg transition-all duration-200 hover:border-violet-200 hover:bg-violet-50/30">

            <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
              3
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {isHindi
                ? 'स्थानीय अनुमति, व्यापार संबंधी आवश्यकताओं और बिजली तथा पानी जैसी मूलभूत सुविधाओं की उपलब्धता की पुष्टि करें।'
                : 'Confirm relevant local permissions, trade requirements and availability of basic utilities such as electricity and water.'}
            </p>

          </div>


          {/* Guideline 4 */}

          <div className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-100 rounded-lg transition-all duration-200 hover:bg-violet-100/60">

            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              4
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {isHindi
                ? 'GraminGuru आवेदन सारांश रिपोर्ट बनाएँ और आगे के सत्यापन के लिए आवेदक को उसकी एक प्रति दें।'
                : 'Generate the GraminGuru application summary report and provide the applicant with a copy for further verification.'}
            </p>

          </div>

        </div>


        {/* ==================================================
            BOTTOM NOTE
        ================================================== */}

        <div className="mt-5 pt-4 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-500">

          <ArrowRight className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />

          <span>
            {isHindi
              ? 'GraminGuru केवल निर्णय-सहायता जानकारी प्रदान करता है। अंतिम स्वीकृति, पात्रता और दस्तावेज़ संबंधी आवश्यकताओं की पुष्टि संबंधित बैंक, सरकारी विभाग या आधिकारिक योजना प्राधिकरण से की जानी चाहिए।'
              : 'GraminGuru provides decision-support information. Final approval, eligibility and documentation requirements should be verified with the concerned bank, government department or official scheme authority.'}
          </span>

        </div>

      </section>

    </div>
  );
}