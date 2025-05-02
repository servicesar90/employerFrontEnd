
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building, Database, Notebook, UserSearch, Save, Unlock, X, ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = ({ collapsed, mobileVisible, onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [databaseOpen, setDatabaseOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const employerName = "TalentNest";
  const avatarUrl=''; // optional avatar URL

  const navItems = [
    { label: 'Jobs', icon: <Building size={20} />, route: '/employerHome/Jobs' },
    { label: 'Databases', icon: <Database size={20} /> },
    { label: 'Reports', icon: <Notebook size={20} />, route: '/employerHome/Reports' },
  ];

  const databaseSubItems = [
    { label: 'Search Candidates', icon: <UserSearch size={18} />, route: '/employerHome/SearchCandidates' },
    { label: 'Saved Searches', icon: <Save size={18} />, route: '/employerHome/SavedSearches' },
    { label: 'Unlocked Candidates', icon: <Unlock size={18} />, route: '/employerHome/UnlockedCandidates' },
  ];

  const handleNavigate = (route) => {
    navigate(route);
    if (mobileVisible) onCloseMobile(); // auto-close sidebar on mobile
  };

  const SidebarContent = ({ isCollapsed }) => {
    const showFull = !isCollapsed;
    const isDatabaseActive = databaseSubItems.some((sub) => location.pathname === sub.route);

    return (
      <div
        className={`h-full flex flex-col py-4 px-2 ${
          isCollapsed ? 'w-16' : 'w-60'
        } transition-all duration-500 ease-in-out`}
      >
        {/* Logo & Avatar */}
        <div className={`px-2 mb-4 flex items-center ${showFull ? 'gap-3' : 'justify-center'}`}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-[8px] object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-[8px] bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
              {employerName.charAt(0).toUpperCase()}
            </div>
          )}
          {showFull && (
            <h1 className="text-xl font-bold">
              Talent<span className="text-green-500">Nest</span>
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.route;
            const isDatabase = item.label === 'Databases';
            const isItemActive = isActive || (isDatabase && isDatabaseActive);

            return (
              <div key={index}>
                <div
                  onClick={() => {
                    if (isDatabase) {
                      setDatabaseOpen(!databaseOpen);
                    } else if (item.route) {
                      handleNavigate(item.route);
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    isItemActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isItemActive ? 'text-green-700' : 'text-gray-600'}`}>
                      {item.icon}
                    </span>
                    {showFull && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                  {isDatabase && showFull && (
                    <span className="text-gray-400">
                      {databaseOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>

                {/* Submenu */}
                {isDatabase && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      databaseOpen && showFull ? 'max-h-96 mt-1' : 'max-h-0'
                    }`}
                  >
                    <div className="ml-6 flex flex-col gap-1">
                      {databaseSubItems.map((sub, subIndex) => {
                        const isSubActive = location.pathname === sub.route;
                        return (
                          <div
                            key={subIndex}
                            onClick={() => handleNavigate(sub.route)}
                            className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm cursor-pointer transition-colors ${
                              isSubActive
                                ? 'bg-green-100 text-green-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {sub.icon}
                            <span>{sub.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden md:block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`h-screen bg-white shadow-md ${
            collapsed && !hovered ? 'w-16' : 'w-60'
          } transition-[width] duration-500 ease-in-out`}
        >
          <SidebarContent isCollapsed={collapsed && !hovered} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileVisible && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-60 bg-white shadow-lg h-full p-4">
            <div className="flex justify-end">
              <X className="cursor-pointer text-gray-600" onClick={onCloseMobile} />
            </div>
            <SidebarContent isCollapsed={false} />
          </div>
          {/* <div className="flex-1 bg-black bg-opacity-50" onClick={onCloseMobile} /> */}
        </div>
      )}
    </>
  );
};

export default Sidebar;



