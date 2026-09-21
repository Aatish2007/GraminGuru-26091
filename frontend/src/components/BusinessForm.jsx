import React from 'react';

import {
  BUSINESS_OPTIONS,
  LOCATION_BENCHMARKS
} from '../data/presets';

import {
  Milk,
  Scissors,
  ShoppingBag,
  Egg,
  Sun,
  Wheat,
  Fish,
  MapPin,
  IndianRupee,
  Wallet,
  Sliders,
  Users,
  Sparkles,
  Clock
} from 'lucide-react';

import { t } from '../translation/translation';

export default function BusinessForm({
  form,
  setForm,
  onAnalyze,
  loading,
  lang
}) {
  const isHindi = lang === 'hi';

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'project_cost' ||
            name === 'own_capital' ||
            name === 'moratorium_months'
          ? Number(value)
          : value
    }));
  }

  function handlePresetCost(cost) {
    setForm((prev) => ({
      ...prev,
      project_cost: cost,
      own_capital: Math.min(
        Number(prev.own_capital || 0),
        cost
      )
    }));
  }

  function handlePresetCapital(cap) {
    setForm((prev) => ({
      ...prev,
      own_capital: Math.min(
        cap,
        Number(prev.project_cost || 0)
      )
    }));
  }

  /*
   * Business naming rule:
   *
   * Internal/API key:
   * Flour Mill
   *
   * English display:
   * Flour Mill
   *
   * Hindi display:
   * आटा चक्की
   *
   * Do not use:
   * FlourMill
   * AgroMill
   * आटा मिल
   */

  function getBusinessLabel(business) {
    const labels = {
      Dairy: 'डेयरी',
      Tailoring: 'सिलाई',
      Kirana: 'किराना',
      Poultry: 'पोल्ट्री',
      SolarGrid: 'सोलर ग्रिड',
      'Flour Mill': 'आटा चक्की',
      Fishery: 'मत्स्य पालन'
    };

    return isHindi
      ? labels[business] || business
      : business === 'SolarGrid'
      ? 'Solar Grid'
      : business;
  }

  const projectCost = Number(form.project_cost || 0);
  const ownCapital = Number(form.own_capital || 0);

  const requiredLoan = Math.max(
    projectCost - ownCapital,
    0
  );

  const ownCapitalPercent =
    projectCost > 0
      ? Math.round((ownCapital / projectCost) * 100)
      : 0;

  const loanPercent =
    projectCost > 0
      ? Math.round((requiredLoan / projectCost) * 100)
      : 0;

  return (
    <section className="card-awesome rounded-xl p-5 sm:p-7 mb-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">

        <div>

          <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wide mb-1">

            <Sliders className="w-4 h-4" />

            <span>
              {isHindi
                ? 'इनपुट जानकारी'
                : 'Input Parameters'}
            </span>

          </div>

          <h3 className="text-2xl font-bold text-slate-900">
            {isHindi
              ? 'व्यवसाय विवरण दर्ज करें'
              : 'Business Details & Financial Assumptions'}
          </h3>

          <p className="text-slate-500 text-sm mt-1">
            {isHindi
              ? 'अपना व्यवसाय, स्थान, कुल परियोजना लागत और उपलब्ध पूंजी दर्ज करें।'
              : 'Select your enterprise model, location, total project cost, and available equity capital.'}
          </p>

        </div>

        {/* Analyze Button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 disabled:from-slate-300 disabled:via-slate-300 disabled:to-slate-300 disabled:text-slate-500 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5"
        >

          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

              <span>
                {isHindi
                  ? 'विश्लेषण हो रहा है...'
                  : 'Analyzing...'}
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />

              <span>
                {t(lang, 'analyzeBusiness')}
              </span>
            </>
          )}

        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Business Selector */}
        <div className="md:col-span-2">

          <label className="block text-sm font-bold text-slate-800 mb-2.5">

            {isHindi
              ? 'व्यवसाय मॉडल चुनें'
              : 'Select Enterprise Model'}

            <span className="text-violet-600 text-xs font-semibold ml-2">
              (7 {isHindi ? 'विकल्प' : 'options'})
            </span>

          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">

            {BUSINESS_OPTIONS.map((b) => {

              const selected =
                form.business === b;

              let IconComponent = Milk;

              if (b === 'Tailoring') {
                IconComponent = Scissors;
              }

              if (b === 'Kirana') {
                IconComponent = ShoppingBag;
              }

              if (b === 'Poultry') {
                IconComponent = Egg;
              }

              if (b === 'SolarGrid') {
                IconComponent = Sun;
              }

              /*
               * Flour Mill is the canonical internal key.
               */
              if (b === 'Flour Mill') {
                IconComponent = Wheat;
              }

              if (b === 'Fishery') {
                IconComponent = Fish;
              }

              return (
                <button
                  type="button"
                  key={b}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      business: b
                    }))
                  }
                  className={`group flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all duration-200 ${
                    selected
                      ? 'bg-violet-50 border-violet-500 text-violet-700 ring-1 ring-violet-500 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50/50'
                  }`}
                >

                  <IconComponent
                    className={`w-6 h-6 mb-1.5 transition-transform duration-200 group-hover:scale-110 ${
                      selected
                        ? 'text-violet-600'
                        : 'text-slate-400 group-hover:text-violet-500'
                    }`}
                  />

                  <span className="text-xs">
                    {getBusinessLabel(b)}
                  </span>

                </button>
              );
            })}

          </div>
        </div>

        {/* Location */}
        <div>

          <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">

            <MapPin className="w-4 h-4 text-violet-600" />

            <span>
              {isHindi
                ? 'गाँव / स्थान'
                : 'Village / Location'}
            </span>

          </label>

          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
          >

            {Object.keys(LOCATION_BENCHMARKS).map(
              (loc) => (
                <option
                  key={loc}
                  value={loc}
                >
                  {loc}, {LOCATION_BENCHMARKS[loc].state}
                </option>
              )
            )}

          </select>

          <p className="text-xs text-slate-400 mt-1.5">
            {isHindi
              ? 'स्थान चुनें। वास्तविक Census, OpenStreetMap और Agmarknet डेटा विश्लेषण के बाद दिखाया जाएगा।'
              : 'Select a location. Actual Census, OpenStreetMap and Agmarknet data will be shown after analysis.'}
          </p>

        </div>

        {/* Selected Enterprise Summary */}
        <div className="flex items-center gap-4 bg-gradient-to-br from-violet-50/70 to-purple-50/50 border border-violet-100 rounded-lg p-4">

          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
            ₹
          </div>

          <div className="text-xs text-slate-600 space-y-0.5">

            <p className="font-bold text-slate-800">

              {isHindi
                ? 'चयनित व्यवसाय:'
                : 'Selected Enterprise:'}

              <span className="text-violet-600 ml-1">
                {getBusinessLabel(form.business)}
              </span>

            </p>

            <p>

              {isHindi
                ? 'स्थान:'
                : 'Location:'}{' '}

              {form.location}

              {' • '}

              {isHindi
                ? 'आवश्यक ऋण:'
                : 'Required Loan:'}{' '}

              ₹
              {requiredLoan.toLocaleString('en-IN')}

            </p>

            <p className="text-[11px] text-slate-500">
              {isHindi
                ? `स्वयं की पूंजी ${ownCapitalPercent}% • ऋण ${loanPercent}%`
                : `Own Capital ${ownCapitalPercent}% • Loan ${loanPercent}%`}
            </p>

          </div>

        </div>

        {/* Project Cost */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 transition-all duration-200 hover:border-violet-200 hover:shadow-sm">

          <div className="flex justify-between items-center mb-3">

            <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">

              <IndianRupee className="w-4 h-4 text-violet-600" />

              <span>
                {isHindi
                  ? 'कुल परियोजना लागत'
                  : 'Total Project Cost'}
              </span>

            </label>

            <span className="text-xl font-bold text-violet-600">
              ₹
              {projectCost.toLocaleString('en-IN')}
            </span>

          </div>

          <input
            type="range"
            name="project_cost"
            min="30000"
            max="1000000"
            step="10000"
            value={form.project_cost}
            onChange={handleChange}
            className="w-full accent-violet-600 cursor-pointer"
          />

          <div className="flex flex-wrap gap-2 mt-3">

            {[50000, 100000, 200000, 500000, 1000000].map(
              (preset) => (

                <button
                  type="button"
                  key={preset}
                  onClick={() =>
                    handlePresetCost(preset)
                  }
                  className={`text-xs px-3 py-1.5 rounded-md border font-semibold transition-all duration-200 ${
                    Number(form.project_cost) === preset
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  {preset >= 100000
                    ? `₹${(preset / 100000).toFixed(0)}L`
                    : `₹${(preset / 1000).toFixed(0)}k`}
                </button>

              )
            )}

          </div>

        </div>

        {/* Own Capital */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 transition-all duration-200 hover:border-violet-200 hover:shadow-sm">

          <div className="flex justify-between items-center mb-3">

            <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">

              <Wallet className="w-4 h-4 text-violet-600" />

              <span>
                {isHindi
                  ? 'आपकी स्वयं की पूंजी'
                  : 'Your Own Capital (Equity)'}
              </span>

            </label>

            <span className="text-xl font-bold text-slate-800">
              ₹
              {ownCapital.toLocaleString('en-IN')}
            </span>

          </div>

          <input
            type="range"
            name="own_capital"
            min="0"
            max={projectCost}
            step="5000"
            value={form.own_capital}
            onChange={handleChange}
            className="w-full accent-violet-600 cursor-pointer"
          />

          <div className="flex flex-wrap gap-2 mt-3">

            {[20000, 50000, 100000, 150000].map(
              (preset) => (

                <button
                  type="button"
                  key={preset}
                  onClick={() =>
                    handlePresetCapital(preset)
                  }
                  className={`text-xs px-3 py-1.5 rounded-md border font-semibold transition-all duration-200 ${
                    Number(form.own_capital) === preset
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  ₹{(preset / 1000).toFixed(0)}k
                </button>

              )
            )}

          </div>

        </div>

        {/* Financial Assumptions */}
        <div className="md:col-span-2 bg-gradient-to-br from-violet-50/70 to-purple-50/50 border border-violet-100 rounded-lg p-5">

          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-4">

            <Clock className="w-4 h-4 text-violet-600" />

            <span>
              {isHindi
                ? 'ऋण और पुनर्भुगतान विवरण'
                : 'Loan & Repayment Details'}
            </span>

            <span className="text-xs text-slate-400 font-normal">
              ({isHindi
                ? 'वैकल्पिक'
                : 'Optional'})
            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Interest Rate */}
            <div>

              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {isHindi
                  ? 'वार्षिक ब्याज दर'
                  : 'Annual Interest Rate'}
              </label>

              <div className="relative">

                <input
                  type="number"
                  name="interest_rate"
                  min="0"
                  max="30"
                  step="0.1"
                  value={form.interest_rate ?? 10}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 pr-10 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-violet-600">
                  %
                </span>

              </div>

            </div>

            {/* Tenure */}
            <div>

              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {isHindi
                  ? 'ऋण अवधि'
                  : 'Loan Tenure'}
              </label>

              <select
                name="tenure_years"
                value={form.tenure_years ?? 5}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              >

                <option value={1}>
                  1 {isHindi ? 'वर्ष' : 'year'}
                </option>

                <option value={2}>
                  2 {isHindi ? 'वर्ष' : 'years'}
                </option>

                <option value={3}>
                  3 {isHindi ? 'वर्ष' : 'years'}
                </option>

                <option value={5}>
                  5 {isHindi ? 'वर्ष' : 'years'}
                </option>

                <option value={7}>
                  7 {isHindi ? 'वर्ष' : 'years'}
                </option>

                <option value={10}>
                  10 {isHindi ? 'वर्ष' : 'years'}
                </option>

              </select>

            </div>

            {/* Moratorium */}
            <div className="sm:col-span-2">

              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {isHindi
                  ? 'मोराटोरियम अवधि'
                  : 'Moratorium Period'}
              </label>

              <select
                name="moratorium_months"
                value={form.moratorium_months ?? 0}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              >

                <option value={0}>
                  {isHindi
                    ? '0 महीने — कोई मोराटोरियम नहीं'
                    : '0 months — No Moratorium'}
                </option>

                <option value={3}>
                  3 {isHindi ? 'महीने' : 'months'}
                </option>

                <option value={6}>
                  6 {isHindi ? 'महीने' : 'months'}
                </option>

                <option value={9}>
                  9 {isHindi ? 'महीने' : 'months'}
                </option>

                <option value={12}>
                  12 {isHindi ? 'महीने' : 'months'}
                </option>

                <option value={18}>
                  18 {isHindi ? 'महीने' : 'months'}
                </option>

                <option value={24}>
                  24 {isHindi ? 'महीने' : 'months'}
                </option>

              </select>

              <p className="text-[11px] text-slate-500 mt-1.5">
                {isHindi
                  ? 'मोराटोरियम वह प्रारंभिक अवधि है जिसमें नियमित ऋण भुगतान स्थगित हो सकता है। वास्तविक शर्तें योजना या ऋणदाता पर निर्भर करती हैं।'
                  : 'Moratorium is an initial period during which regular loan repayment may be deferred. Actual terms depend on the scheme or lender.'}
              </p>

            </div>

          </div>

        </div>

        {/* Applicant & Scheme Details */}
        <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-lg p-5">

          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-4">

            <Users className="w-4 h-4 text-violet-600" />

            <span>
              {isHindi
                ? 'आवेदक और योजना विवरण'
                : 'Applicant & Scheme Details'}
            </span>

            <span className="text-xs text-slate-400 font-normal">
              ({isHindi
                ? 'वैकल्पिक'
                : 'Optional'})
            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Social Category */}
            <div>

              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {isHindi
                  ? 'सामाजिक श्रेणी'
                  : 'Social Category'}
              </label>

              <select
                name="social_category"
                value={
                  form.social_category ||
                  'General'
                }
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              >

                <option value="General">
                  {isHindi
                    ? 'सामान्य श्रेणी'
                    : 'General Category'}
                </option>

                <option value="OBC">
                  OBC (Other Backward Classes)
                </option>

                <option value="SC">
                  SC (Scheduled Caste)
                </option>

                <option value="ST">
                  ST (Scheduled Tribe)
                </option>

              </select>

            </div>

            {/* Gender */}
            <div>

              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {isHindi
                  ? 'आवेदक का लिंग'
                  : 'Applicant Gender'}
              </label>

              <select
                name="gender"
                value={
                  form.gender ||
                  'Not specified'
                }
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
              >

                <option value="Not specified">
                  {isHindi
                    ? 'निर्दिष्ट नहीं'
                    : 'Not specified'}
                </option>

                <option value="Female">
                  {isHindi
                    ? 'महिला'
                    : 'Female'}
                </option>

                <option value="Male">
                  {isHindi
                    ? 'पुरुष'
                    : 'Male'}
                </option>

                <option value="Other">
                  {isHindi
                    ? 'अन्य'
                    : 'Other'}
                </option>

              </select>

            </div>

            {/* Rural Checkbox */}
            <div className="flex items-center gap-2 pt-5">

              <input
                type="checkbox"
                id="rural_area"
                name="rural_area"
                checked={
                  form.rural_area !== false
                }
                onChange={handleChange}
                className="w-4 h-4 accent-violet-600 rounded cursor-pointer"
              />

              <label
                htmlFor="rural_area"
                className="text-xs font-semibold text-slate-700 cursor-pointer"
              >
                {isHindi
                  ? 'स्थान ग्रामीण पंचायत क्षेत्र में है'
                  : 'Location is in Rural Panchayat area'}
              </label>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}