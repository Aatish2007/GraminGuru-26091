import React from 'react';
import {
  LayoutDashboard,
  Map,
  WalletCards,
  Landmark,
  GitCompare,
  UserRoundCog
} from 'lucide-react';

import { t } from '../translation/translation';

const tabs = [
  {
    id: 'dashboard',
    key: 'dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'market',
    key: 'market',
    icon: Map
  },
  {
    id: 'financial',
    key: 'financialPlan',
    icon: WalletCards
  },
  {
    id: 'schemes',
    key: 'schemes',
    icon: Landmark
  },
  {
    id: 'compare',
    key: 'compare',
    icon: GitCompare
  },
  {
    id: 'assisted',
    key: 'assistedMode',
    icon: UserRoundCog
  }
];

export default function NavigationTabs({
  activeTab,
  setActiveTab,
  lang = 'en'
}) {
  return (
    <nav className="sticky top-[76px] z-40 border-b border-violet-100 bg-white/85 backdrop-blur-xl">

      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6">

        <div className="flex min-w-max items-center gap-1 py-1">

          {tabs.map((tab) => {

            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-slate-600 hover:bg-violet-50/60 hover:text-violet-700'
                }`}
              >

                <Icon
                  size={16}
                  className={`transition-colors duration-200 ${
                    active
                      ? 'text-violet-600'
                      : 'text-slate-400 group-hover:text-violet-500'
                  }`}
                />

                {t(lang, tab.key)}

                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500" />
                )}

              </button>
            );

          })}

        </div>

      </div>
    </nav>
  );
}