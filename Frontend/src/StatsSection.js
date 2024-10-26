import React from 'react';

const StatsSection = () => {
  return (
    <div className="outer-container">
      <div className="inner-container">
        {/* Stat 1 */}
        <div className='stats-datas'>
         <div className="stat-box">
          <img src="icons/streamline--ai-chip-spark.png" alt="AI Model Submissions" />
         </div>
         <div className="stat-box-1">
          <p>100K+</p>
          <span>AI model submissions</span>

         </div>
        </div>

        {/* Vertical Divider */}
        <div className="divider"></div>

        {/* Stat 2 */}
        <div className='stats-datas'>
         <div className="stat-box">
          <img src="icons/eos-icons--data-scientist.png" alt="AI Model Submissions" />
         </div>
         <div className="stat-box-1">
          <p>50K+</p>
          <span>Data Scientists</span>

         </div>
        </div>

        {/* Vertical Divider */}
        <div className="divider"></div>

        {/* Stat 3 */}
        <div className='stats-datas'>
         <div className="stat-box">
          <img src="icons/eos-icons--ai-healing.png" alt="AI Model Submissions" />
         </div>
         <div className="stat-box-1">
          <p>100+</p>
          <span>AI challenges hosted</span>

         </div>
        </div>
      </div>
      <style>
        {
          `
          .outer-container {
  position: relative;
  width: 1442px;
  height: 200px;
  display: flex;
  justify-content: center; /* Centers inner content */
  align-items: center;
  background-color: #0a2c3d; /* Replace with your background color */
}

.inner-container {
  width: 1075px;
  height: 55px;
  display: flex;
  justify-content: space-between; /* Space between stat boxes */
  align-items: center;
}
.stats-datas{
          display:flex;
}
.stat-box {
  width: 55px;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  text-align: center;
  margin-right:20px;
}
.stat-box-1{
          margin-top:-20px;
          color:white;
  }

.stat-box img {
  width: 30px; /* Example icon size */
  height: 30px;
  margin-bottom: 5px;
}

.stat-box p {
  font-size: 20px;
  font-weight: bold;
}

.stat-box span {
  font-size: 14px;
  color: #555; /* Replace with your desired color */
}

.divider {
  width: 1px;
  height: 55px;
  background-color: #ffffff;
  opacity: 0.5; /* Makes the divider line a bit transparent */
}

          `
        }
      </style>
    </div>
  );
};

export default StatsSection;
