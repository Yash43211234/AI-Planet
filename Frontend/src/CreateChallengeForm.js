import React, { useState } from 'react';
import challengesData from './data';

const CreateChallengeForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle form input including the file
    const formDataToSend = new FormData();
    formDataToSend.append('challengeName', formData.challengeName);
    formDataToSend.append('startDate', formData.startDate);
    formDataToSend.append('endDate', formData.endDate);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('levelType', formData.levelType);
    formDataToSend.append('image', formData.image); // Include the image file

    try {
      const response = await fetch('https://ai-planet-7m1e.onrender.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Reset the form after successful submission
        setFormData({
          challengeName: '',
          startDate: '',
          endDate: '',
          description: '',
          image: null,
          levelType: 'Easy',
        });

        alert("Submission successful");
        const result = await response.text();
        console.log(result);
      } else {
        alert("Submission failed, please try again.");
      }
    } catch (error) {
      console.error('Error submitting challenge:', error);
      alert("Error submitting challenge");
    }
  };

  return (
    <div className="form-container">
      <h2>Challenge Details - Admin</h2>
      <form onSubmit={handleSubmit}>

        <div className='first-Box'>
          <div className="form-group">
            <label>Challenge Name</label>
            <input
              type="text"
              name="challengeName"
              value={formData.challengeName}
              onChange={handleChange}
              placeholder="Enter challenge name"
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

        </div>
        <div className="form-group desc">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="form-group desc">
          <label>Image</label>
          <div className=" uploadimg">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              id="file-upload"
              className="file-input"
            />
            <label htmlFor="file-upload" className="custom-upload">
              <span>{formData.image ? formData.image.name : "Upload Image"}</span>
              <img src="icons/bxs_cloud-upload.svg" alt="Upload Icon" />
            </label>
          </div>
        </div>
        <div className='lvl-n-btn'>

          <div className="form-group lvl-type">
            <label>Level Type</label>
            <select
              name="levelType"
              value={formData.levelType}
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
    margin-bottom: 89px;
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
    margin:20px 0;
}

.first-Box label {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    padding: 20px 0;
}

.desc {
    width: 817px;
    margin-left: 89px;
    opacity: 1;
}

.desc label {
    color: #333333;
    font-size: 16px;
    font-weight: 500;
    
    
}

.desc textarea {
    width: 100%; /* Full width */
    height: 252px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    outline: none;
    margin:20px 0;
}

.custom-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  margin:20px 0;
}
.uploadimg label {
    width: 236px;
    height: 47px;
    left: 89px;
    gap: 0px;
    border-radius: 5px ;
    border: 1px ;
    border:1px solid black;
    opacity: 0px;
    border: 1px solid #D9D9D9
}





.file-input {
  display: none; 
}

.custom-upload img {
  width: 24px;
  height: 24px;
  text-align:center;
  margin-left:10px;
}

.custom-upload span {
    font-size: 18px;
    font-weight: 500;
    line-height: 21.78px;
    text-align: center;
}


.lvl-n-btn {
    font-weight:500;
    margin-left: 89px;
    opacity: 1; /* Set to 1 for visibility */
}


.lvl-type {
    width: 163px;
    padding: 20px 0;
    opacity: 1; /* Set to 1 for visibility */
}

.lvl-type select {
    width: 236px;
    height: 39px;
    border-radius: 5px;
    margin:20px 0;
    border: 1px solid #ccc;
    opacity: 1; /* Set to 1 for visibility */
}

.lvl-type option {
    font-size: 14px;
    font-weight: 500;
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

export default CreateChallengeForm;
