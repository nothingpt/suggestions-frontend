import React from "react";
import { NavLink } from "react-router-dom";
import Me from "./Me";
import Signout from "./SignOut";

const Header = props => {
  return (
    <Me>
      {data => (
        <div className="header">
          <nav>
            <ul>
              <li>
                <NavLink exact to="/" activeClassName="nav-select">
                  add
                </NavLink>
              </li>
              <li>
                <NavLink to="/see" activeClassName="nav-select">
                  see
                </NavLink>
              </li>
              <li>
                {data.me && (
                  <Signout />
                )}
                {!data.me && (
                  <NavLink to="/login" activeClassName="nav-select">
                    log in
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </Me>
  );
};
export default Header;
