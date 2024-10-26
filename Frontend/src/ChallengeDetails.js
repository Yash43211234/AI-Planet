import React, { useState } from 'react';
import challengesData from './data';
import { useParams, Link } from 'react-router-dom';

const ChallengeDetails = () => {
  const { index } = useParams();
  console.log(index)
  console.log(challengesData[index])

    
  const [formData, setFormData] = useState({
    challengeName: '',
    startDate: '',
    endDate: '',
    description: '',
    image: null,
    levelType: 'Easy',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle the form submission logic here
    console.log(formData);
  };
  
 
  const challenge = challengesData[1];

  return (
    <div className="form-container">

      <h2>Challenge Details</h2>
      <form onSubmit={handleSubmit}>

        <div className='first-Box'>
          <div className="form-group">
            <label>Challenge Name</label>
            <input
              type="text"
              name="challengeName"
              value={challenge.title}
              onChange={handleChange}
              
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={challenge.start.toDateString()}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={challenge.end.toDateString()}
              onChange={handleChange}
            />
          </div>

        </div>
        <div className="form-group desc">
          <label>Description</label>
          <textarea
            name="description"
            value= {challenge.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="form-group uploadimg">
          <div className='image-Box'>
              <label className='upload-text'></label>
              
              <img src={challenge.imageUrl} alt={challenge.title} width='200' />
              
            
          </div>
          
        </div>
      <div className='lvl-n-btn'>

        <div className="form-group lvl-type">
          <label>Level Type</label>
          <select
            name="levelType"
            value={challenge.status}
            onChange={handleChange}
            >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <button type="submit" className="btn-create">Create Challenge</button>
        </div>
      </form>

      <style>
        {
          `
          .form-container {
    position: relative;
}

h2 {
    width: 1440px;
    height: 107px;
    top: 64px;
    padding: 41px 0px 37px 89px;
    background: #F8F9FD;
    opacity: 1; /* Set to 1 for visibility */
}

.first-Box {
    width: 453px;
    height: 305px;
    margin-left: 89px;
    
    opacity: 1; /* Set to 1 for visibility */
}

.first-Box input {
    padding: 10px;
    width: 100%; /* 100% to match container width */
    height: 39px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
}

.first-Box label {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    padding: 10px 0;
}

.desc {
    width: 817px;
    height: 292px;
    margin-top: 80px;
    margin-left: 89px;
    
    opacity: 1; /* Set to 1 for visibility */
}

.desc label {
    color: #333333;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 0;
}

.desc textarea {
    width: 100%; /* Full width */
    height: 252px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    outline: none;
}

.uploadimg label {
    margin-left: 89px;
}

.upload-text {
    width: 236px;
    height: 87px;
    /* background: url('icons/bxs_cloud-upload.svg') no-repeat left center; */
    margin-top: 60px;
    margin-left: 89px;
    cursor: pointer;
    padding-left: 50px; /* Adjust padding for text after icon */
}

.image-input {
    position: absolute;
}
.image-Box img{
      margin-left:89px;

}

.form-group {
    margin-bottom: 15px;
}

.lvl-n-btn {
    width: 236px;
    height: 181px;
    margin-left: 89px;
    opacity: 1; /* Set to 1 for visibility */
}

.lvl-type {
    width: 163px;
    padding: 10px 0;
    opacity: 1; /* Set to 1 for visibility */
}

.lvl-type select {
    width: 236px;
    height: 39px;
    border-radius: 5px;
    border: 1px solid #ccc;
    opacity: 1; /* Set to 1 for visibility */
}

.lvl-type option {
    font-size: 14px;
    font-weight: 500;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
}

.btn-create {
    width: 214px;
    height: 46px;
    margin: 50px 0;
    padding: 10px 22px;
    border-radius: 10px;
    background: #44924C;
    color: #FFFFFF;
    border: none;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
}

.btn-create:hover {
    background-color: #218838;
}

          `
        }
      </style>
      
    </div>
  );
};

export default ChallengeDetails;