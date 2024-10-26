import React from 'react';

const Header = () => {
  return (
    <div className="header-container">
      <div className="icon-container">
        {/* Ensure the image path starts with `/` */}
        <img src="/logoimage.png" alt="DPhi Logo" className="header-icon" />
        
      </div>

      <style>
        {
          `
          /* Header container */
          .header-container {
            width: 1441px;
            height: 64px;
            background-color: #fff; /* Set background to white */
            position: relative;
            display: flex;
            align-items: center;
            opacity: 1; /* Set opacity to 1 to make it visible */
          }

          /* Icon container */
          .icon-container {
            position: absolute;
            top: 13px;
            left: 89px;
            display: flex;
            align-items: center;
            gap: 0px;
          }

          /* Icon image */
          .header-icon {
            width: 87px;
            height: 38.11px;
            opacity: 1; /* Opacity set to 1 to make it visible */
          }

          /* Text beside icon */
          .header-text {
            font-size: 16px;
            font-weight: bold;
            color: black;
          }
          `
        }
      </style>
    </div>
  );
};

export default Header;
