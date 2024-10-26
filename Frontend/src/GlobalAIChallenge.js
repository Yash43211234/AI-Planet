import React from 'react';
import './GlobalAIChallenge.css'; // Make sure to create this CSS file
import {useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const GlobalAIChallenge = () => {

  const navigate = useNavigate('');

  const openCreateChallengeIn = () => {
    // Opens the Create Challenge page in a new tab
    navigate('/CreateChallenge');
  }
  return (
    <div className="challenge-container">
      <div className="challenge-content">
        <div className="inner-challange-line">

        </div>

        <div className="inner-challange-content">

        <h1>Accelerate Innovation with Global AI Challenges</h1>
        <p>
          AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.
        </p>

        <button onClick={openCreateChallengeIn} className='challenge-button'>Create Challenge</button>
              </div>


      </div>
      <div className="challenge-image">
        <img src="icons/PicsArt.svg" alt="Rocket Launching" />
      </div>
    </div>
  );
};

export default GlobalAIChallenge;
