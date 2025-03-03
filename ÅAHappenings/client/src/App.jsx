import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import TopBar from './components/TopBar';
import MainPageView from './pages/MainPageView';
import Event from './pages/EventPage';
import LoginPage from './pages/LoginPage';
import FaqPage from './pages/FaqPage';
import RulesPage from './pages/RulesPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MyEvents from './pages/MyEventsPage';
import SAinfo from './pages/SAinfo';
import Profile from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import './styles/background.css';
import './styles/topbar.css';
import './styles/EventList.css';
import './styles/FilterButton.css';
import './styles/Event.css';
import './styles/FaqPage.css';
import './styles/RulesPage.css';
import './styles/RegisterPage.css';
import './styles/BurgerMenu.css';

const App = () => {
  const { user, isLoading, admin } = useAuthContext();

  
  
  if (isLoading) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        {/* Blurred background layer */}
        <div className="background-image"></div>

        {/* Main content overlay */}
        <TopBar />
        <div className="pages">
          <Routes>
            
            {/* TODO: adminpage needs more protection to check for admin credentials instead of user */}
            <Route
              path="/adminpage"
              element={user && admin ? <AdminPage /> : <Navigate to="/login" />}
            />


            {/* paths for only users, redirects to login if not signed in */}
            <Route
              path="rules"
              element={user ? <RulesPage /> : <Navigate to="/login" />}
            />
            <Route
              path="myevents"
              element={user ? <MyEvents /> : <Navigate to="/login" />}
            />
            <Route
              path="profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/forgot-password"
              element={user ? <ForgotPasswordPage /> : <Navigate to="/login" />}
            />


            {/* paths that redirect already logged in users */}            
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />

            <Route
              path="/register"
              element={!user ? <RegisterPage /> : <Navigate to="/" />}
            />

            {/* public paths that are the same for users and non users */}
            <Route path="/" element={<MainPageView />} />
            <Route path="event/:id" element={<Event />} />
            <Route path="info" element={<SAinfo />} />
            <Route path="faq" element={<FaqPage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;