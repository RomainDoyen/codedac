import React from 'react'

const Footer = () => {
  return (
    <div className="main-footer" id="main-header">
      <div className="footer-left">
        <h2 id="h1"><span className="flow">📨</span> Blog CodeDAC</h2>
      </div>
      <p>2022 - Tous droits réservés</p>
      <div className="footer-right">
        <ul>
          <li><a href="https://www.facebook.com/"><i className="fa-brands fa-facebook-f"></i></a></li>
          <li><a href="https://twitter.com/"><i className="fa-brands fa-twitter"></i></a></li>
          <li><a href="https://discord.com/"><i className="fa-brands fa-discord"></i></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
