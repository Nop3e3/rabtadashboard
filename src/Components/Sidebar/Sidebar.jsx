import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

import logo from "../../Assets/logo.svg";

// Import ALL icons
import dashboardIcon from "../../Assets/dashboard.svg";
import contentIcon from "../../Assets/content.svg";
import suppliersIcon from "../../Assets/suppliers.svg";
import learningIcon from "../../Assets/learning.svg";
import communityIcon from "../../Assets/Icon.svg";
import usersIcon from "../../Assets/users.svg";
import verificationIcon from "../../Assets/verification.svg";
import ordersIcon from "../../Assets/orders.svg";
import reportsIcon from "../../Assets/reports.svg";
import notificationsIcon from "../../Assets/notifications.svg";
import supportIcon from "../../Assets/support.svg";
import settingsIcon from "../../Assets/settings.svg";
import logoutIcon from "../../Assets/logoout.svg";

// Simple Image Icon Component
const Icon = ({ src }) => (
  <img src={src} alt="icon" width="20" height="20" />
);

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: dashboardIcon },
    { name: 'App Content', path: '/AppContentHome', icon: contentIcon },
    { name: 'Suppliers', path: '/Suppliercontentpages', icon: suppliersIcon },
    { name: 'Learning', path: '/Learninghub', icon: learningIcon },
    { name: 'Community', path: '/Community', icon: communityIcon },
    { name: 'Users', path: '/Users', icon: usersIcon },
    { name: 'Verification', path: '/Verification', icon: verificationIcon },
    { name: 'Orders', path: '/Orders', icon: ordersIcon },
    { name: 'Reports', path: '/reports', icon: reportsIcon },
    { name: 'Notifications', path: '/notifications', icon: notificationsIcon },
    { name: 'Support', path: '/support', icon: supportIcon },
    { name: 'Settings', path: '/settings', icon: settingsIcon },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <img src={logo} alt="logo" />
      </div>

      <nav className="nav-list">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon src={item.icon} />
            <span className="nav-label">{item.name}</span>
   
          </NavLink>
        ))}
      </nav>

      <div className="footer-section">
        <button className="logout-button">
          <Icon src={logoutIcon} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;