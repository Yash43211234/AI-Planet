import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const ChallengePage = () => {
  const { index } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`https://ai-planet-7m1e.onrender.com/challenge/${index}`);
        if (!response.ok) {
          throw new Error('Challenge not found');
        }
        const data = await response.json();
        setChallenge(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [index]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="form-container">

      <div className='Box'>
        <div className='inner-box'>
          <div className='date-div'>
            <img src='/icons/mdi--clock-outline.svg' />
            <p>Starts on {challenge.startDate ? new Date(challenge.startDate).toDateString() : "No start date available"}</p>

          </div>

          <div className='model-name'>
            <h3>{challenge.challengeName}</h3>
            <p>Identify the class to which each butterfly belongs to</p>
          </div>
          <div className='lvl-type'>
            <img src='/icons/carbon_skill-level-basic.svg' />
            <p>{challenge.levelType}</p>
          </div>
        </div>
      </div>
      <div className='customize'>

        <div className='inner-customize'>
          <div className='overview-text'>
            <p>Overview</p>
          </div>
          <Link to={`/challenge/update/${index}`} > <Button variant="contained" color="success">
            Edit
          </Button></Link>
          {/* <button className='m-btn' onClick={() => handleDelete(challenge.index)} >Delete</button> */}
          <Button variant="contained" color="error">
            Delete
          </Button>
        </div>
      </div>

      <div className='Overview'>

        <p>
          
          <br/>
          {challenge.description}</p>
      </div>

<div className='footer'></div>

      <style>
        {
          `
          .body{
            background-color: #;
          }
            .Box{
              width:1442px;
              height:400px;
              background-color: #003145;
              color:white;
              
            }
           
            .inner-box{
                position:absolute;
                width: 818px;
                height: 228px;
                margin-top: 96px;
                margin-left: 126px;
                gap: 0px;
                opacity: 0px;

            }

             .date-div{
                display:flex;
                width: 464px;
                height: 34px;
                left: 130px;
                gap: 0px;
                border-radius: 5px ;
                opacity: 0px;
                border: 1.3px solid #000000;
                background: #FFCE5C;
                color: #000000;


            }
            .date-div img{
                width: 14.33px;
                height: 14.33px;
                top: 170px;
                left: 152px;
                gap: 0px;
                border: 1.3px ;
                opacity: 0px;
                margin-top:12px;
                margin-left:10px;

            }
            .date-div p{
                width: 367px;
                height: 12px;
                top: 171px;
                left: 180px;
                gap: 0px;
                opacity: 0px;
                font-family: Inter;
                font-size: 14px;
                font-weight: 600;
                line-height: 12px;
                text-align: left;
                margin-left:10px;
            }
            .model-name{
              width: 818px;
              height: 112px;
             
              gap: 0px;
              opacity: 0px;

            }
            .model-name h3{
              width: 818px;
              height: 48px;
            
              gap: 0px;
              opacity: 0px;
              font-family: Poppins;
              font-size: 40px;
              font-weight: 600;
              line-height: 48px;
              text-align: left;
              color: #FFFFFF;

            }
              .nodel-name p{
                width: 576px;
                height: 31px;
            
                gap: 0px;
                opacity: 0px;
                font-family: Inter;
                font-size: 18px;
                font-weight: 500;
                line-height: 24px;
                text-align: left;
 
              }

            .lvl-type{
              width: 95px;
              height: 34px;
              margin-top: 10px;
              left: 126px;
              gap: 0px;
              opacity: 0px;
              border-radius:5px;
              background: #F8F9FD;
              text-align:center;
              display:flex;
              justify-content:center;
              align-items:center;
            }
            .lvl-type p{
                width: 97px;
              top: 366px;
              left: 171px;
              gap: 0px;
              opacity: 0px;
              color: #003145;
              

            }
               .lvl-type img{
                  width: 15.75px;
                  height: 14.63px;
                  top: 2.25px;
                  margin-left: 6.13px;
                  gap: 0px;
                  opacity: 0px;
               }
                 .customize{
                    width: 1440px;
                    height: 108px;
                    border: 0.3px solid #DDE6ED;
                    box-shadow: 0px 6px 12px 0px #DDE6ED;
                    padding-bottom:17px;
                 }
           
                 .inner-customize {
                  
             
                      top: 483px;
                      left: -1px;
                      gap: 0px;
                      border: 0.3px 0px 0px 0px;
                      opacity: 0px;
                      
                      display:flex;
                      margin:30px;
                        width: 91px;
                        
                        top: 497px;
                        gap:20px;
                        margin-left: 1120px;
                          // font-family: Poppins;
                        font-size: 17px;
                        font-weight: 600;
                        line-height: 18px;
                        text-align: center;
                        
                        
                  }

                  .customize p{
                      margin-left: -1820px;
                      

                   }
                      .inner-customize button{
                        margin-bottom:30px;
                      }
                  
            .Overview{margin-top:40px;
                width:1200px;
    
                text-align:left;
                
                text-size:16px;
                text-align:center;
                margin-left: 126px;
                  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center;      /* Centers vertically */
  
 
              }
  .overview-text p{
          font-size:24px;
          color:grey;
  }
           .Overview p {
    
    margin-top: -70px;
    padding: 30px;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.8;
    letter-spacing: -0.02em;
    color: red;
    text-align: center;
    
    
    /* Glass effect background */
    
    border-radius: 5px;
    backdrop-filter: blur(1px); /* Glass blur effect */
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
    
    
    color:white;
    background: linear-gradient(135deg, #ff7a9f, #feb47b); /* Orange to light pink */
}

.footer{
height:30px;
      width:1442px;
          color:white;
          box-shadow: 6px 0px 18px 9px #DDE6ED;
}
          `
        }
      </style>

    </div>
  );
};

export default ChallengePage;
