import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Login from "./pages/LoginTestPage";
import Signup from "./pages/SignupTestPage";
import "./styles/background.css";
import "./styles/topbar.css";
import "./styles/EventList.css";
import "./styles/FilterButton.css";
import "./styles/Event.css";
import "./styles/FaqPage.css"
import "./styles/RulesPage.css";
import "./styles/RegisterPage.css";
import "./styles/BurgerMenu.css";

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
