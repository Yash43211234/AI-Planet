import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './components/Header'
import CreateChallenge from './Routers/CreateChallenge';
import ChallengeDetails from './ChallengeDetails';
import ChallengePage from './ChallengePage';

import ParentComponent from './ParentComponent'


function App() {
  return (
   
    <div>
       <Header />
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}  />
          <Route path='/createChallenge' element={<CreateChallenge/>}  />
          <Route path="/challenge/:index" element={<ChallengePage/>} />
          <Route path="/challenge/update/:index" element={<ChallengeDetails/>} />
          <Route path='/ParentComponent' element={<ParentComponent/>}  />
        </Routes>
      </Router>
    </div>
  
  );
}

export default App;
