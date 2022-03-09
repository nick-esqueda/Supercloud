import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import SignupModal from "../Modal/SignupModal";

import './Navigation.css';
import ProfileNavButton from "./ProfileNavButton";

const Navigation = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <div className="header__upload">
          <NavLink to="/upload">upload</NavLink>
        </div>

        <ProfileNavButton user={user}/>

        <div className="header__about">
          <NavLink to="/about">
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
          <NavLink to="/about">
            about
          </NavLink>
        </div>
      </>
    )
  }

  return (
    <header>
      <div className="header__left flexRow">
        <NavLink to="/" className="header__logo">cloud</NavLink>
        <nav className="nav_links">
          <NavLink exact to="/">home</NavLink>
          <NavLink to="/">likes</NavLink>
          <NavLink to="/">random</NavLink>
        </nav>
      </div>

      <div className="header__middle">
        <form className="header__searchForm">
          <input type="text" placeholder="search" className="header__searchInput" />
          <button>search</button>
        </form>
      </div>

      <div className="header__right flexRow">
        {sessionLinks}
      </div>

    </header>
  );
};

export default Navigation;
