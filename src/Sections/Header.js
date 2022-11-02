import { NavigationButton } from "../Components/NavigationButton";

export const Header = ({section}) => {
    return (
      <div className="header">
        <div className="navButtons">
          <NavigationButton/>
          <NavigationButton page="Profile"/>
          <NavigationButton page="Catalogue"/>
          <NavigationButton page="Shopping Cart"/>
        </div>
        <h1>{section}</h1>
      </div>
    )
  };