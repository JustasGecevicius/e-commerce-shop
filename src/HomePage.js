import { Header } from "./Sections/Header";
import { Link } from "react-router-dom";

function HomePage({ cartCount, mountainCatalogue, roadCatalogue }) {
  return (
    <div className="homePage">
      <div className="backgroundImg1 homeSection">
        <h1>
          See <br />
          where <br />
          the
          <br /> ride
          <br /> takes
          <br /> you
        </h1>
      </div>
      <div className="backgroundImg2 homeSection">
        <div className="innerDivWrapper">
          <h2>Find<br/>the right tools<br/>to explore<br/>the rough<br/>and<br/>the technical</h2>
          <Link to="/e-commerce-shop/catalogue"><button onClick={mountainCatalogue} className="bigButton">Discover</button></Link>
        </div>
      </div>
      <div className="backgroundImg3 homeSection">
      <div className="innerDivWrapper">
        <h2>Enjoy<br/> the<br/> smooth<br/> and <br/>fast</h2>
        <Link to="/e-commerce-shop/catalogue"><button onClick={roadCatalogue} className="bigButton">Discover</button></Link>
      </div>
      </div>
      <Header cartCount={cartCount} />
    </div>
  );
}

export default HomePage;
