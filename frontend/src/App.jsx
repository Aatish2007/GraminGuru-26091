import React, { useState } from 'react';

import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import ReportModal from './components/ReportModal';

import DashboardPage from './pages/Dashboard/DashboardPage';
import MarketAnalysisPage from './pages/MarketAnalysis/MarketAnalysisPage';
import FinancialPlanPage from './pages/FinancialPlan/FinancialPlanPage';
import SchemeGuidancePage from './pages/SchemeGuidance/SchemeGuidancePage';
import BusinessComparePage from './pages/BusinessCompare/BusinessComparePage';
import AssistedOperatorPage from './pages/AssistedOperator/AssistedOperatorPage';

import { callApiEndpoint } from './services/api';

export default function App() {
  const [lang, setLang] = useState('en');
  const [assistedMode, setAssistedMode] = useState(false);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [form, setForm] = useState({
    business: 'Dairy',
    location: 'Kanpur',

    project_cost: 200000,
    own_capital: 50000,

    social_category: 'General',
    gender: 'Not specified',
    rural_area: true,

    interest_rate: 10,
    tenure_years: 5,

    // NEW
    moratorium_months: 0
  });

  const [loading, setLoading] = useState(false);

  const [assessmentData, setAssessmentData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [schemeData, setSchemeData] = useState(null);
  const [advisoryData, setAdvisoryData] = useState(null);

  const [isReportOpen, setIsReportOpen] = useState(false);

  async function analyzeBusiness() {
    setLoading(true);

    try {
      /*
       * ---------------------------------------------------------
       * 1. NORMALIZE CURRENT INPUTS
       * ---------------------------------------------------------
       */

      const currentBusiness = String(form.business);
      const currentLocation = String(form.location);

      const currentProjectCost =
        Number(form.project_cost) || 0;

      const currentOwnCapital =
        Number(form.own_capital) || 0;

      const currentInterestRate =
        Number(form.interest_rate) || 0;

      const currentTenureYears =
        Number(form.tenure_years) || 5;

      const currentMoratoriumMonths =
        Number(form.moratorium_months) || 0;

      const currentLoan = Math.max(
        currentProjectCost - currentOwnCapital,
        0
      );

      console.log(
        'GraminGuru Financial Inputs:',
        {
          project_cost: currentProjectCost,
          own_capital: currentOwnCapital,
          required_loan: currentLoan,
          interest_rate: currentInterestRate,
          tenure_years: currentTenureYears,
          moratorium_months: currentMoratoriumMonths
        }
      );

      /*
       * ---------------------------------------------------------
       * 2. ASSESSMENT
       * ---------------------------------------------------------
       */

      const assessRes = await callApiEndpoint(
        '/assess',
        {
          business: currentBusiness,
          location: currentLocation,

          project_cost: currentProjectCost,
          own_capital: currentOwnCapital,

          interest_rate: currentInterestRate,
          tenure_years: currentTenureYears,

          // NEW
          moratorium_months: currentMoratoriumMonths
        }
      );

      const normalizedAssessment =
        assessRes?.data || {};

      setAssessmentData(normalizedAssessment);

      setIsLiveBackend(
        Boolean(assessRes?.isLiveBackend)
      );

      /*
       * ---------------------------------------------------------
       * 3. MARKET CHECK
       * ---------------------------------------------------------
       */

      const LOCATION_COORDINATES = {
        Kanpur: {
          latitude: 26.4499,
          longitude: 80.3319
        },

        Lucknow: {
          latitude: 26.8467,
          longitude: 80.9462
        },

        Varanasi: {
          latitude: 25.3176,
          longitude: 82.9739
        },

        Agra: {
          latitude: 27.1767,
          longitude: 78.0081
        },

        Prayagraj: {
          latitude: 25.4358,
          longitude: 81.8463
        },

        Gorakhpur: {
          latitude: 26.7606,
          longitude: 83.3732
        },

        Jaipur: {
          latitude: 26.9124,
          longitude: 75.7873
        },

        Patna: {
          latitude: 25.5941,
          longitude: 85.1376
        },

        Ranchi: {
          latitude: 23.3441,
          longitude: 85.3096
        },

        Bhopal: {
          latitude: 23.2599,
          longitude: 77.4126
        },

        Indore: {
          latitude: 22.7196,
          longitude: 75.8577
        }
      };

      const coordinates =
        LOCATION_COORDINATES[currentLocation];

      const marketPayload = {
        business: currentBusiness,
        location: currentLocation
      };

      if (coordinates) {
        marketPayload.latitude =
          coordinates.latitude;

        marketPayload.longitude =
          coordinates.longitude;
      }

      const marketRes =
        await callApiEndpoint(
          '/market-check',
          marketPayload
        );

      setMarketData(
        marketRes?.data || {}
      );

      /*
       * ---------------------------------------------------------
       * 4. BUSINESS COMPARISON
       *
       * Same financial assumptions are used for
       * the comparison.
       * ---------------------------------------------------------
       */

      const comparePayload = {
        business: currentBusiness,
        location: currentLocation,

        project_cost: currentProjectCost,
        own_capital: currentOwnCapital,

        interest_rate: currentInterestRate,
        tenure_years: currentTenureYears
      };

      console.log(
        'GraminGuru Compare Payload:',
        comparePayload
      );

      const compareRes =
        await callApiEndpoint(
          '/compare-businesses',
          comparePayload
        );

      const normalizedComparison = {
        ...(compareRes?.data || {}),

        business: currentBusiness,
        location: currentLocation,

        project_cost: currentProjectCost,
        own_capital: currentOwnCapital,

        required_loan: currentLoan,

        interest_rate: currentInterestRate,
        tenure_years: currentTenureYears,

        // Keep this available to frontend components
        moratorium_months:
          currentMoratoriumMonths
      };

      console.log(
        'GraminGuru Comparison Data:',
        normalizedComparison
      );

      setComparisonData(
        normalizedComparison
      );

      /*
       * ---------------------------------------------------------
       * 5. SCHEME ELIGIBILITY ROUTES
       * ---------------------------------------------------------
       */

      const schemeRes =
        await callApiEndpoint(
          '/scheme-recommendation',
          {
            business: currentBusiness,
            location: currentLocation,

            project_cost: currentProjectCost,
            own_capital: currentOwnCapital,

            social_category:
              String(form.social_category),

            gender:
              String(form.gender),

            rural_area:
              Boolean(form.rural_area)
          }
        );

      setSchemeData(
        schemeRes?.data || {}
      );

      /*
       * ---------------------------------------------------------
       * 6. BUSINESS ADVISORY
       *
       * IMPORTANT:
       * Send the ACTUAL moratorium selected
       * by the user.
       * ---------------------------------------------------------
       */

      const advisoryRes =
        await callApiEndpoint(
          '/business-advisory',
          {
            business: currentBusiness,
            location: currentLocation,

            project_cost: currentProjectCost,
            own_capital: currentOwnCapital,

            interest_rate: currentInterestRate,
            tenure_years: currentTenureYears,

            // FIXED
            moratorium_months:
              currentMoratoriumMonths
          }
        );

      setAdvisoryData(
  advisoryRes?.data ||
  advisoryRes?.advisory ||
  advisoryRes ||
  {}
);
      /*
       * ---------------------------------------------------------
       * 7. RETURN TO DASHBOARD
       * ---------------------------------------------------------
       */

      setActiveTab('dashboard');

    } catch (err) {
      console.error(
        'GraminGuru Error:',
        err
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAssistedModeChange(value) {
    setAssistedMode(value);

    setActiveTab(
      value
        ? 'assisted'
        : 'dashboard'
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 app-shell">

      <Header
        isLiveBackend={isLiveBackend}
        lang={lang}
        setLang={setLang}
        assistedMode={assistedMode}
        setAssistedMode={handleAssistedModeChange}
        onOpenReport={() =>
          setIsReportOpen(true)
        }
      />

      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        assistedMode={assistedMode}
        lang={lang}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 page-container">

        <div
          key={activeTab}
          className="page-enter"
        >

          {activeTab === 'dashboard' && (
            <DashboardPage
              form={form}
              setForm={setForm}
              onAnalyze={analyzeBusiness}
              loading={loading}
              assessmentData={assessmentData}
              setActiveTab={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'market' && (
            <MarketAnalysisPage
              marketData={
                marketData?.nearby_businesses?.success === true
                  ? marketData
                  : (advisoryData?.market_evidence || marketData)
              }
              form={form}
              lang={lang}
            />
          )}

          {activeTab === 'financial' && (
            <FinancialPlanPage
              assessmentData={assessmentData}
              form={form}
              lang={lang}
            />
          )}

          {activeTab === 'schemes' && (
            <SchemeGuidancePage
              schemeData={schemeData}
              form={form}
              lang={lang}
            />
          )}

          {activeTab === 'compare' && (
            <BusinessComparePage
              comparisonData={comparisonData}
              advisoryData={advisoryData}
              form={form}
              lang={lang}
            />
          )}

          {activeTab === 'assisted' && (
            <AssistedOperatorPage
              form={form}
              assessmentData={assessmentData}
              schemeData={schemeData}
              onOpenReport={() =>
                setIsReportOpen(true)
              }
              lang={lang}
            />
          )}

        </div>
      </main>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() =>
          setIsReportOpen(false)
        }
        form={form}
        assessmentData={assessmentData}
        marketData={marketData}
        schemeData={schemeData}
        advisoryData={advisoryData}
        comparisonData={comparisonData}
        lang={lang}
      />

      <footer className="border-t border-slate-200 bg-white py-10 mt-16">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <p className="font-bold text-slate-900 text-xl">
            Gramin
            <span className="gradient-text">
              Guru
            </span>

            <span className="font-normal text-slate-500 text-sm sm:text-base">
              {' '}— Har Udyami ka Apna Salahkar
            </span>
          </p>

          <p className="text-sm text-slate-500 mt-3">
            Hyper-local business advisory and financial
            structuring platform for rural micro-entrepreneurs.
          </p>

          <p className="text-xs text-slate-400 mt-4">
            References: Census 2011 • OpenStreetMap • Agmarknet APMC • JanSamarth
          </p>

        </div>

      </footer>

    </div>
  );
}