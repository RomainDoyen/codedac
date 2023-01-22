import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({active, setActive, user, handleLogout}) => {
  const userId = user?.uid;
  return (
    <div class="main-header" id="main-header">
      <h1>⌨️ Blog CodeDAC</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid bg-faded padding-media">
          <div className="container padding-media">
            <nav className="navbar navbar-toggleable-md navbar-light">
              {/* <button 
              type='button' 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls='navbarSupportedContent'
              aria-expanded="true"
              aria-label='Toggle Navigation'
              >
                <span className="fa fa-bars"></span>
              </button> */}
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link to="/" style={{textDecoration: "none"}}>
                    <li className={`nav-item nav-link ${active === "home" ? "active" : ""}`} onClick={() => setActive("home")}>Accueil</li>
                  </Link>
                  <Link to="/created">
                    <li className={`nav-item nav-link ${active === "create" ? "active" : ""}`} onClick={() => setActive("create")}>Créer</li>
                  </Link>
                  <Link to="/about">
                    <li className={`nav-item nav-link ${active === "about" ? "active" : ""}`} onClick={() => setActive("about")}>À propos</li>
                  </Link>
                </ul>
                <div className="row g-3">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {userId ? (
                      <div className='dropdown'>
                        <div className="profile-logo">
                          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="logo" style={{width: "30px", height: "30px", borderRadius: "50%", marginTop: "12px"}}/>
                        </div>
                        <p>
                          {user?.displayName}
                        </p>
                        <li className="nav-link logout" onClick={handleLogout}>Déconnexion</li>
                      </div>
                    ) : (
                      <Link to="/auth">
                        <li className={`account nav-link ${active === "login" ? "active" : ""}`} onClick={() => setActive("login")}>Connexion</li>
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
