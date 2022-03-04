import { NavLink } from "react-router-dom";

import './Navigation.css';

const Navigation = () => {
  return (
    <header>
      <div className="header__left flexRow">
        <div className="header__logo" style={{ textDecoration: 'overline' }}>cloud</div>
        <nav>
          <NavLink exact to="/">home</NavLink>
          <NavLink to="/sample-survey">likes</NavLink>
          <NavLink to="/sensory-preferences-survey">random</NavLink>
        </nav>
      </div>

      <div className="header__middle">
        <form className="header__searchForm">
          <input type="text" placeholder="search" className="header__searchInput" />
          <button>search</button>
        </form>
      </div>

      <div className="header__right flexRow">
        <div className="header__upload">
          <NavLink to="/upload">upload</NavLink>
        </div>
        <NavLink to="/users/:userId OR INTERPOLATION OF CURR USER?" className="header__userNavButton">
          <img
            src="https://pbs.twimg.com/media/EoXQszAVgAE5UMV.jpg"
            alt="profile-picture"
            className="header__userPfp"
          />
          <span className="header__username">username here</span>
        </NavLink>
        <div className="header__about">
          <NavLink to="/about">
            about
          </NavLink>
        </div>
      </div>

    </header>
  );
};

export default Navigation;
