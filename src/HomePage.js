/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Header } from "./Sections/Header";
import { Link } from "react-router-dom";
import {getStorage, ref, listAll, getMetadata, getDownloadURL} from "firebase/storage";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function HomePage({ cartCount, mountainCatalogue, roadCatalogue }) {

  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, 'HomePage');

  const [imagesObject, setImagesObject] = useState({});
  
 useEffect(() => {
  const fetchList = async () => {
    const list = await listAll(listRef);
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
      setImagesObject((prev) => ({
        ...prev, [elem["name"]]: allPromises[1][index]
      }))
    })
    
  }

  fetchList()
  .catch(console.error);  
 }, [])
  
useEffect(() => {
}, [imagesObject]);




  return (Object.keys(imagesObject).length !== 0 ? (<div className="homePage">
      <Header cartCount={cartCount} logo={imagesObject["logo.png"]} cartLogo={imagesObject["cartLogo.png"]}/>
  <div className="backgroundImg1 homeSection" style={{backgroundImage: `url(${imagesObject["initial.webp"]})`}}>
    <h1>
      See <br />
      where <br />
      the
      <br /> ride
      <br /> takes
      <br /> you
    </h1>
  </div>
  <div className="backgroundImg2 homeSection" style={{backgroundImage: `url(${imagesObject["mountain.jpg"]})`}}>
    <div className="innerDivWrapper">
      <h2>Find<br/>the right tools<br/>to explore<br/>the rough<br/>and<br/>the technical</h2>
      <Link to="/e-commerce-shop/catalogue"><button onClick={mountainCatalogue} className="bigButton">Discover</button></Link>
    </div>
  </div>
  <div className="backgroundImg3 homeSection" style={{backgroundImage: `url(${imagesObject["road.png"]})`}}>
  <div className="innerDivWrapper">
    <h2>Enjoy<br/> the<br/> smooth<br/> and <br/>fast</h2>
    <Link to="/e-commerce-shop/catalogue"><button onClick={roadCatalogue} className="bigButton">Discover</button></Link>
  </div>
  </div>
</div>) : (<div className="loaderDiv"><ClipLoader color="#000000" /></div>)
    
  );
}

export default HomePage;
