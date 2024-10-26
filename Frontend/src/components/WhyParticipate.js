import React from 'react';


const WhyParticipate = () => {
  return (
    <div className="why-participate">
      <h2>Why Participate in <span>AI Challenges</span>?</h2>
      <div className="cards-container" >
        <div className="card"  >
          <img src="/icons/carbon_notebook-reference.svg" alt="Prove your skills" />
          <h3>Prove your skills</h3>
          <p>Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.</p>
        </div>

        <div className="card"  >
          <img src="icons/Vector.svg" alt="Learn from community" />
          <h3>Learn from community</h3>
          <p>One can look and analyze the solutions submitted by other Data Scientists in the community and learn from them.</p>
        </div>

        <div className="card"  >
          <img src="icons/Robot.svg" alt="Challenge yourself" />
          <h3>Challenge yourself</h3>
          <p>There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience, and bounce back harder.</p>
        </div>

        <div className="card"  style={{ textAlign: 'left' }}>
          <img src="icons/IdentificationCard.svg" alt="Earn recognition" />
          <h3>Earn recognition</h3>
          <p>You will stand out from the crowd if you do well in AI challenges. It not only helps you shine in the community but also earns rewards.</p>
        </div>
      </div>
      <style>
        {
          `
            .why-participate {
                width: 1439px;
                height: 902px;
                top: 829px;
                text-align: center;
                background-color: #f5f7fa; /* Background color */
            }

            .why-participate h2 {
              font-size: 28px;
              margin-bottom: 40px;
              color: #2b2b2b;
            }

            .why-participate h2 span {
              color: #3ba94d; /* Highlighted text */
            }

            .cards-container {
              position:absolute;
              width: 1119px;
              height: 593px;
              top: 1015px;
              left: 160px;
              text-align: left;
              display: grid;
              grid-template-columns: repeat(2, 1fr); /* Two columns */
              gap: 30px; /* Spacing between cards */
              tex-align:left;
            }

            .card {
             
              width:542px;
              height:276px;
              background: #F8F9FD;
              padding: 20px;
              border-radius: 10px;
              display: flex;
              flex-direction: column;
              align-items: left;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
              }
           

            .card img {

              width: 40px;
              height: 40px;
              margin-bottom: 15px; 
            }

            .card h3 {
           
              font-size: 18px;
              color: #2b2b2b;
              margin-bottom: 10px;
              text-align:left;
            }

            .card p {
              font-size: 14px;
              color: #666666;
              line-height: 1.5;
}

            `
        }
      </style>
    </div>
  );
};

export default WhyParticipate;
