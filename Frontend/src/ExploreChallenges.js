import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ChallengeDetails from './ChallengeDetails';

import ChallengePage from './ChallengePage';



const getStatusColor = (status) => {
  if (status === 'Upcoming') {
    return '#F2C94C40'; // Gold for Upcoming
  } else if (status === 'Active') {
    return '#44924C3D'; // LimeGreen for Ongoing
  } else if (status === 'Past') {
    return '#FF3C002B'; // OrangeRed for Completed
  } else {
    return '#D3D3D3'; // LightGrey for default/unknown
  }
};

const getStatusTextColor = (status) => {
  if (status === 'Upcoming') {
    return '#000000'; // Gold for Upcoming
  } else if (status === 'Active') {
    return '#44924C'; // LimeGreen for Ongoing
  } else if (status === 'Past') {
    return '#666666'; // OrangeRed for Completed
  } else {
    return '#D3D3D3'; // LightGrey for default/unknown
  }
};

const ExploreChallenges = () => {

  const navigate = useNavigate('');

  const openParticipatePage = () => {
    navigate('/ChallengePage');
  }
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://localhost:3002/challenges');
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const statusOptions = ["All", "Active", "Upcoming", "Past"];
  const levelOptions = ["Easy", "Medium", "Hard"];

  // Precompute challenge statuses
const challengeStatuses = challenges.map(challenge => {
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  const currentTime = new Date();

  if (currentTime < startDate) {
    return 'Upcoming';
  } else if (currentTime >= startDate && currentTime <= endDate) {
    return 'Active';
  } else {
    return 'Past';
  }
});

// Filter challenges
const filteredChallenges = challenges.filter((challenge, index) => {
  const matchesCategory = filterCategory === 'All' || challenge.category === filterCategory;

  const matchesSearchTerm = (challenge.challengeName || '').toLowerCase().includes((searchTerm || '').toLowerCase());

  const challengeStatus = challengeStatuses[index]; // Use the precomputed status
  const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(challengeStatus);

  const matchesLevel = selectedLevel.length === 0 || selectedLevel.includes(challenge.levelType); // Ensure this matches your data structure

  return matchesCategory && matchesSearchTerm && matchesStatus && matchesLevel;
});

  
  
  


  console.log(challenges);
  const handleStatusChange = (event) => {
    const { name, checked } = event.target;

    if (name === "All") {
      if (checked) {
        setSelectedStatus(statusOptions); // Select all statuses
      } else {
        setSelectedStatus([]); // Deselect all
      }
    } else {
      if (checked) {
        setSelectedStatus(prev => [...prev, name].filter(status => status !== "All")); // Add specific status and remove "All"
      } else {
        setSelectedStatus(prev => prev.filter(item => item !== name)); // Remove specific status
      }
    }
  };

  const handleLevelChange = (event) => {
    const { name, checked } = event.target;

    if (name === "All") {
      if (checked) {
        setSelectedLevel(levelOptions); // Select all levels
      } else {
        setSelectedLevel([]); // Deselect all
      }
    } else {
      if (checked) {
        setSelectedLevel(prev => [...prev, name].filter(levelType => levelType !== "All")); // Add specific level and remove "All"
      } else {
        setSelectedLevel(prev => prev.filter(item => item !== name)); // Remove specific level
      }
    }
  };

  const [isActive, setIsActive] = useState(false); // State to toggle the filters div

  
  const [statusMessages, setStatusMessages] = useState([]);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    const currentTime = new Date();
    const messages = challenges.map(challenge => {
      const startDate = new Date(challenge.startDate);
      const endDate = new Date(challenge.endDate);

      // Check if the dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return `Challenge ID ${challenge.id}: Invalid date format.`;
      }

      const calculateTimeLeft = (targetDate) => {
        const timeDiff = targetDate - currentTime;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        return `${days} days, ${hours} hours, ${minutes} minutes`;
      };

      if (currentTime < startDate) {
        // Competition is upcoming
        const timeLeft = calculateTimeLeft(startDate);

        return (
          <>
            <span><b>Starts in:</b></span>
            <br />
            <br />
            <span>{timeLeft}</span>
          </>
        );
      } else if (currentTime >= startDate && currentTime <= endDate) {
        // Competition is active
        const timeLeft = calculateTimeLeft(endDate);
        return (
          <>
            <span>Active - Ends in:</span>
            <br/>
            <br/>
            <span>{timeLeft}</span>
          </>
        );
        return `  ${timeLeft}`;
      } else {
        
        return (
          <>
            <span><b> Ended on:</b></span>
            <br />
            <br />
            <span>{endDate.toDateString()}</span>
          </>
        );
      }
    });

    setStatusMessages(messages);
  }, [challenges]);




  

  useEffect(() => {
    const currentTime = new Date();
    const newStatus = [];

    challenges.forEach(challenge => {
      const startDate = new Date(challenge.startDate);
      const endDate = new Date(challenge.endDate);

      // Check if the dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        newStatus.push(`Challenge ID ${challenge.id}: Invalid date format.`);
        return;
      }

      if (currentTime < startDate) {
        // Competition is upcoming
        newStatus.push(`Upcoming`);
      } else if (currentTime >= startDate && currentTime <= endDate) {
        // Competition is active
        newStatus.push(`Active`);
      } else {
        // Competition has ended
        newStatus.push(`Past`);
      }
    });

    setStatus(newStatus);
  }, [challenges]);

  const calculateTimeLeft = (targetDate) => {
    const currentTime = new Date();
    const timeDiff = targetDate - currentTime;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    return ``;
  };


  console.log(challenges.image); // Check if the filename is correct

  return (
    <div className="explore-challenges-container">
      <h2>Explore Challenges</h2>
      <div className='search-n-filter'>
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className='filter-design' onClick={() => setIsActive(!isActive)} >
            <h3>Filter</h3>
            <img src='icons/phcaretdown.png' />
          </div>

          <div className='filters' style={{ display: isActive ? 'block' : 'none', }}>
            <div>
              <div className='filters-title' onClick={() => setIsActive(!isActive)}  >
                <h3>Filter</h3>
                <img src='icons/phcaretdown.png' />
              </div>
            </div>

            <div className="filter-section">
              <h4>Status</h4>
              {statusOptions.map((status) => (
                <div key={status}>
                  <input
                    type="checkbox"
                    name={status}
                    onChange={handleStatusChange}
                  />
                  <label>{status}</label>
                </div>
              ))}
            </div>

            <div className="filter-section">
              <h4>Level</h4>
              {levelOptions.map((level) => (
                <div key={level}>
                  <input
                    type="checkbox"
                    name={level}
                    onChange={handleLevelChange}
                  />
                  <label>{level}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="filter-display">
        {selectedStatus.map((status, index) => (
          <span key={`status-${index}`}>{status} <img src='icons/mdi--cross-circle.png' /></span>
        ))}
        {selectedLevel.map((level, index) => (
          <span key={`level-${index}`}>{level}  <img src='icons/mdi--cross-circle.png' /></span>
        ))}
      </div>

      <div className='Explore-Challenges-container-inner'>
        <div className="challenges-grid">
          {filteredChallenges.map((challenge, index) => (
            <div key={index} className="challenge-card">


              <img src={`http://localhost:3002/${challenge.image}`} alt={challenge.challengeName} />

              <h4 style={{ backgroundColor: getStatusColor(status[index]), color: getStatusTextColor(status[index]) }}>
              {status[index]}
              </h4>
              <h3>{challenge.challengeName}</h3>
              {statusMessages.map((message, id) => (
                id === index && <p key={id}>{message}</p>
              ))}

              <div >
                <Link className='paticipate-btn' to={`/challenge/${challenge.id}`} >
                  <img src='icons/charm--circle-tick.png' />
                  <span>Participate</span>
                </Link>
              </div>

            </div>
          ))}

        </div>
      </div>
      <style>
        {
          `
          .explore-challenges-container {
              position:absolute;
              width:1440px;
              top:1731px;
              height:324px;
              text-align: center;
              background-color: #0b2b44;
              color: white;
              
}
          .explore-challenges-container h2{
            font-family: Poppins;
            font-size: 28px;
            font-weight: 600;
            line-height: 40px;
            text-align: center;
            margin-top:50px;

          }

.search-filter-container {
  margin-top:-60px;
  width: 1440px;
  height: 324px;
  top:1731px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
  
}
input[placeholder]{
          font-size:18px;
          padding-left:30px;
}

input[type="text"] {
  width: 950px;
  height: 50px;
  top:1907px;
  border-radius: 12px;
  border: 1px solid #ccc;
  
}



.search-n-filter{
  display:flex;
          
}

.filter-design{
      
       width: 110px;
      height: 50px;
      gap: 10px;
      border-radius: 12px;
      border: 1px 0px 0px 0px;
      opacity: 0px;
      color:black;
      background: #FFFFFF;
      font-family: Inter;
      display:flex;
      cursor:pointer;
          

}

.filter-design img{
          width: 25px;
          height: 17px;
          margin-top:16px;
          margin-left:px;
}
.filters-title{
          display:flex;;
          color:black;
          cursor:pointer;
}
.filters-title img{
          width: 25px;
          height: 17px;
          margin-top:24px;
          margin-left:120px;
}
.filter-design h3{
          margin-left:20px;
}

.filters{
   position: absolute;
    width: 250px;
    height: 394px;
    top: 187px;
    left: 1154px;
    gap: 0px;
    opacity: 0px;
    text-align: left;
    background: white;
    border-width: 0px, 0px, 0px, 0px;
    border-radius: 6px;
    border-style: solid;
}
.filters h4{
    width: 45px;
    height: 14.29px;
    gap: 0px;
    opacity: 0px;
    color:black;
    padding-left:10px;
}
.filter-section{
          font-family: Inter;
          font-size: 18px;
          font-weight: 400;
          line-height: 29.12px;
          text-align: left;
          color:black;
          padding-left: 10px;
}


.filters{
  display:none;
}
.filter-display {
          position:absolute;
          left: 238px;
          margin-top:-110px;
}
.filter-display span{
          width: 142px;
          height: 40px;
          top: 2001px;
          left: 238px;
          
          border-radius: 30px ;
          opacity: 0px;
          background: #F8F9FD7D;
          width: 76px;
          padding:10px 24px 10px 10px;
          margin:10px;
          // font-family: Poppins;
          font-size: 14px;
          font-weight: 500;
          line-height: 14px;
          text-align: center;



}
 .filter-display img{
          width: 17px;
          height: 17px;
         position:absolute;
         margin-left:2px;

 }         

.Explore-Challenges-container-inner{
          margin-top:-56px;
           padding-top:50px;
            width:1442px;
            height:auto;
            min-height:1196px;
           top:2055px;
          background: #003145;
}
.challenges-grid {
  width:1172px;
  height:996px;
  top:2130;
  margin-left:134px;
  display: grid;
  grid-template-columns: repeat(3, 308px); /* 3 columns with fixed width */
  gap: 100px; /* space between grid items */
  justify-content: center;
}

.challenge-card {
  width: 354px;
  height: 473px;
  background-color: white;
  border-radius: 15px ;
  text-align: center;
  color: #000;
}

.challenge-card img {
  width: 354px;
  height: 174px;
  border-radius: 15px 8px 0 0 ;
}
.challenge-card h4{
    color: white;
    font:inter;
    size:12px;
    line-height:16px;
    width:87px;
    height:21px;
    font-weight:100;
    margin-left:127px;
    border-radius:4px;

}

.challenge-card h3 {
  margin: 10px 0;
  font-size:24px;
}

.challenge-card p {
  color: gray;
}

.paticipate-btn{
          display:flex;
          width: 182.55px;
          height: 42px;
          margin-top: 50px;
          margin-left: 75px;
          gap: 0px;
          text-decoration: none;
          border:0;
          border-radius: 10px ;
          opacity: 0px;
          background: #44924C;
          }
          .paticipate-btn Link{
              text-decoration: none;
          }
          .paticipate-btn span{
            color: #FFFFFF;
            font-size:20px;
            margin-left:10px;
            margin-right:20px;
            margin-top:4px;
          }
          .paticipate-btn img{
            height:18px;
            width:18px;
            margin-top:10px;
            margin-left:17px;

          }



          `
        }
      </style>
    </div>
  );
};

export default ExploreChallenges;
