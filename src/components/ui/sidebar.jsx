import React, { useState } from 'react';
import {
  Building,
  Database,
  Notebook,
  UserSearch,
  Save,
  Unlock,
} from 'lucide-react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [databaseOpen, setDatabaseOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    // <Drawer
    //   variant="permanent"
    //   anchor="left"
    //   classes={{ paper: 'w-60 bg-white shadow-md' }}
    // >
      <div className="h-full flex flex-col pt-4">
        <h1 className="text-2xl font-bold mb-6">MyApp</h1>
        <List className="space-y-2">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => {
                  if (item.label === 'Databases') {
                    setDatabaseOpen(!databaseOpen);
                  } else {
                    navigate(item.route);
                  }
                }}
                className="hover:bg-gray-100 rounded-lg"
              >
                <ListItemIcon className="min-w-fit mr-3 text-gray-600">
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  className="text-sm font-medium text-gray-800"
                />
              </ListItem>

              {/* Submenu under Databases */}
              {item.label === 'Databases' && (
                <Collapse in={databaseOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding className="ml-6 space-y-1">
                    {databaseSubItems.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        button
                        onClick={() => navigate(subItem.route)}
                        className="hover:bg-gray-100 rounded-md pl-4"
                      >
                        <ListItemIcon className="min-w-fit mr-3 text-gray-500">
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.label}
                          className="text-sm text-gray-700"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}

            </React.Fragment>
          ))}
        </List>
      </div>
    // </Drawer>
  );
};

export default Sidebar;
