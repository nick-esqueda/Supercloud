import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import SignupModal from "../Modal/SignupModal";
import ProfileNavButton from "./ProfileNavButton";

import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
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
          <NavLink to="/" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            className="header__logo">cloud</NavLink>
          <nav className="nav_links">
            <NavLink exact to="/" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              activeStyle={{ backgroundColor: '#191414' }}>home</NavLink>
            <NavLink exact to="/wip/likes" activeStyle={{ backgroundColor: '#191414' }}
              onClick={() => alert('Sorry! This feature is currently under construction')}
            >likes</NavLink>
            <NavLink exact to="/wip/random" activeStyle={{ backgroundColor: '#191414' }}
              onClick={() => alert('Sorry! This feature is currently under construction')}
            >random</NavLink>
          </nav>
        </div>

        <div className="header__middle">
          <form className="header__searchForm">
            <input type="text" placeholder="search" className="header__searchInput" />
            <button type="submit" className="btn btn--secondary" style={{ boxShadow: "none" }}>
              <FontAwesomeIcon icon={faSearch} style={{ color: '#535353', transform: 'scale(1.2)' }}></FontAwesomeIcon>
            </button>
          </form>
        </div>

        <div className="header__right flexRow">
          {sessionLinks}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
