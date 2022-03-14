import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import SignupModal from "../Modal/SignupModal";
import ProfileNavButton from "./ProfileNavButton";

import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from "../Search";
import { useProfileTab } from "../../Context/ProfileTabContext";

const Navigation = () => {
  const { setActiveTab } = useProfileTab();
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <div className="header__upload">
          <NavLink to="/upload" onClick={() => window.scrollTo({ top: 100, left: 100, behavior: 'smooth' })}
          >upload</NavLink>
        </div>

        <ProfileNavButton user={user} />

        <div className="header__about">
          <NavLink to="/" onClick={() => alert('Sorry! This feature is currently under construction')}>
            about
          </NavLink>
        </div>
      </>
    )

  } else {
    sessionLinks = (
      <>
        <div className="login_signup_btn_container">
          <div>
            <LoginModal />
          </div>
          <div>
            <SignupModal />
          </div>
        </div>

        <div className="header__upload">
          <a
            style={{ cursor: 'pointer' }}
            onClick={e => alert('Please log in or create an account before uploading a song.')}
          >upload</a>
        </div>

        <div className="header__about">
          <NavLink to="/" onClick={() => alert('Sorry! This feature is currently under construction')}>
            about
          </NavLink>
        </div>
      </>
    )
  }

  return (
    <div id="header">
      <div className="navbar">

        <div className="header__left flexRow">
          <NavLink exact to={user ? "/" : "/splash"}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            className="header__logo"
          >cloud</NavLink>

          <nav className="nav_links">
            <NavLink exact to={user ? "/" : "/splash"}
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              activeStyle={{ backgroundColor: '#111213' }}>
              home
            </NavLink>
            <NavLink exact to={`/users/${user.id}`} activeStyle={{ backgroundColor: '#111213' }}
              onClick={() => setActiveTab(2)}
            >likes</NavLink>
            <a style={{ cursor: 'pointer' }}
              onClick={() => alert('Sorry! This feature is currently under construction')}
            >random</a>
          </nav>
        </div>

        <div className="header__middle">
          <Search />
        </div>

        <div className="header__right flexRow">
          {sessionLinks}
        </div>

      </div>
    </div>
  );
};

export default Navigation;
