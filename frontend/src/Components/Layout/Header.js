import React from "react";
import {  NavLink } from "react-router-dom";

function Header () {
    return (
        <>
            <header>
                <div className="center">
                    <nav id="main-menu">
                        <ul className="d-flex">
                            <li>
                                <NavLink to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/tweets">
                                    Tweets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink target="_blank" to="/telao">
                                    Telão
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;