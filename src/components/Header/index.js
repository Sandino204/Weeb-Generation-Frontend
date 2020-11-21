import React from 'react'
import {Nav, NavItem} from 'reactstrap'
import './styles.css'

function Header(){
    return(
        <Nav className="row header shadow">
            <NavItem className="col-md-3 my-auto row">
                <h1 className="mainLogo text-white col-12 text-center">My Anime List</h1>
            </NavItem>
            <NavItem className="offset-md-1 col-md-4 justify-content-between row">
                <div className="navBox">
                    <h2 className="text-light">Anime</h2>
                </div>
                <div className="navBox">
                    <h2 className="text-light">Manga</h2>
                </div>
                <div className="navBox">
                    <h2 className="text-light">LightNovel</h2>
                </div>
                <div className="navBox">
                    <h2 className="text-light">News</h2> 
                </div>
            </NavItem>
            <NavItem className="col-md-4 row justify-content-end">
                <div className="login">
                    <h2 className="text-light text-center">Login</h2>
                </div>
            </NavItem>
        </Nav>
    )
}

export default Header