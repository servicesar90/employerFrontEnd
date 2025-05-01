
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Building, Database, Notebook, UserSearch, Save, Unlock, X } from 'lucide-react';

const Sidebar = ({ collapsed, mobileVisible, onCloseMobile }) => {
  const navigate = useNavigate();
  
  const [databaseOpen, setDatabaseOpen] = useState(false);

  const navItems = [
    { label: 'Jobs', icon: <Building size={20} />, route: '/employerHome/Jobs' },
    { label: 'Databases', icon: <Database size={20} /> },
    { label: 'Reports', icon: <Notebook size={20} />, route: '/employerHome/Reports' },
  ];

  const databaseSubItems = [
    { label: 'Search Candidates', icon: <UserSearch size={18} />, route: 'SearchCandidates' },
    { label: 'Saved Searches', icon: <Save size={18} />, route: 'SavedSearches' },
    { label: 'Unlocked Candidates', icon: <Unlock size={18} />, route: 'UnlockedCandidates' },
  ];

  const SidebarContent = ({ isCollapsed }) => (
    <div className={`h-full flex flex-col py-4 px-2 ${isCollapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
      <div className="px-4 mb-4">
        <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>
          Talent<span className="text-green-500">Nest</span>
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => {
                if (item.label === 'Databases') {
                  setDatabaseOpen(!databaseOpen);
                } else if (item.route) {
                  navigate(item.route);
                }
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 cursor-pointer"
            >
              <span className="text-gray-600">{item.icon}</span>
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </div>

            {item.label === 'Databases' && databaseOpen && !isCollapsed && (
              <div className="ml-6 mt-1 flex flex-col gap-1">
                {databaseSubItems.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => navigate(sub.route)}
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-sm text-gray-600 cursor-pointer"
                  >
                    {sub.icon}
                    <span>{sub.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className={`h-screen bg-white shadow-md ${collapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
          <SidebarContent isCollapsed={collapsed} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileVisible && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Sidebar drawer */}
          <div className="w-60 bg-white shadow-lg h-full p-4">
            <div className="flex justify-end">
              <X className="cursor-pointer text-gray-600" onClick={onCloseMobile} />
            </div>
            <SidebarContent isCollapsed={false} />
          </div>

          {/* Transparent black overlay */}
          {/* <div className="flex-1 bg-white bg-opacity-100" onClick={onCloseMobile} /> */}
        </div>
      )}
    </>
  );
};

export default Sidebar;



