import { useState } from "react";
import { Header } from "./Sections/Header";

export const Profile = ({ cartCount }) => {
  const [saveState, setSaveState] = useState(true);
  const [profile, setProfile] = useState({
    Name: "John",
    "Last Name": "Brown",
    Age: 25,
    Country: "Canada",
    City: "Toronto",
    "Post Code": "95950",
  });

  const handleEdit = () => {
    setSaveState(false);
  }

  const handleSave = () => {
    setSaveState(true);
  }

  const handleInputChange = (e) => {
    setProfile((prev) => {
      return {...prev, [e.target.className] : e.target.value}
    })
  }

  return (
    <div className="profilesWrapper">
      <Header cartCount={cartCount} />
      <div className="profilesBackground">
        <h2> Your Profile</h2>
        {saveState ? 
        <div className="profileInputs">
          {Object.keys(profile).map((section, index) => {
              return (
                <div key={index} id={section} className="inputSection">
                  <h3>
                    <b>{section}:</b>
                  </h3>
                  <p>{profile[section]}</p>
                </div>
              );
            })}
          <button onClick={handleEdit}>Edit</button>
        </div> : 
        <div className="formDiv">
          <form onSubmit={handleSave} className="form">
              <label>Name: <input value={profile["Name"] || ""} className="Name" onChange={handleInputChange}></input></label>
              <label>Last Name: <input value={profile["Last Name"] || ""} className="Last Name" onChange={handleInputChange}></input></label>
              <label>Age: <input value={profile["Age"] || ""} className="Age" onChange={handleInputChange}></input></label>
              <label>Country: <input value={profile["Country"] || ""} className="Country" onChange={handleInputChange}></input></label>
              <label>City: <input value={profile["City"] || ""} className="City" onChange={handleInputChange}></input></label>
              <label>Postcode: <input value={profile["Post Code"] || ""} className="Post Code" onChange={handleInputChange}></input></label>
              <button type="submit">Submit</button>
          </form>

        </div>}
      </div>
    </div>
  );
};
