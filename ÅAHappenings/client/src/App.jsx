import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import "./background.css";
import "./topbar.css";
import "./EventList.css";
import "./FilterButton.css";
import "./Event.css";
import "./FaqPage.css"
import "./RulesPage.css";

const App = () => {
  return (
    <div className="app-container">
      {/* Blurred background layer */}
      <div className="background-image"></div>
      
      {/* Main content overlay */}
      <div className="content-overlay">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
