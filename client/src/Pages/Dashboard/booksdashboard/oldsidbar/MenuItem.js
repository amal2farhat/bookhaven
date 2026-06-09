import React from 'react';
import './Menu.css'; // Import CSS for styling

const MenuItem = ({ text }) => {
  return (
    <li className="submenu-item">
      {text}
    </li>
  );
};

export default MenuItem;
