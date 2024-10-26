import React from "react";
import WhyParticipate from './components/WhyParticipate';
import ExploreChallenges from './ExploreChallenges';
import StatsSection from './StatsSection';
import GlobalAIChallenge from './GlobalAIChallenge'



function Home() {
    return (
     
      <div>
       
        <GlobalAIChallenge/>
        <StatsSection />
        <ExploreChallenges />
        <WhyParticipate />
      </div>
    
    );
  }
  
  export default Home;
  