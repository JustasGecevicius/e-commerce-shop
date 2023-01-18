/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useState } from "react";
import { Header } from "./Sections/Header";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

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

  const storage = getStorage();

  // Create a reference under which you want to list
  const listRefference = ref(storage, 'Catalogue/Initial');

  const [mainImagesObject, setMainImagesObject] = useState({});

  useEffect(() => {
    const fetchList = async () => {
      const list = await listAll(listRefference);
      const metadataPromise = [];
      const itemLinkPromise = [];
      list.items.forEach((itemRef) => {
        const metadata = getMetadata(itemRef);
        const item = getDownloadURL(itemRef);
        metadataPromise.push(metadata);
        itemLinkPromise.push(item);      
      });
      const metadataPromises = Promise.all([...metadataPromise]);
      const itemPromises = Promise.all([...itemLinkPromise]);
      const allPromises = await Promise.all([metadataPromises, itemPromises]);
  
      // // eslint-disable-next-line array-callback-return
      allPromises[0].map((elem, index) => {
        setMainImagesObject((prev) => ({
          ...prev, [elem["name"]]: allPromises[1][index]
        }))
      })
      
    }
  
    fetchList()
    .catch(console.error);  
   }, [])

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

  return (Object.keys(mainImagesObject).length !== 0 ? (<div className="profilesWrapper">
  <Header cartCount={cartCount} logo={mainImagesObject["logo.png"]} cartLogo={mainImagesObject["cartLogo.png"]}/>
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
</div>) : (<div className="loaderDiv"><ClipLoader color="#000000" /></div>)
    
  );
};
