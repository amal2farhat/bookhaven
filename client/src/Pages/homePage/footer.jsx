import React from "react";
import "./Footer.css";

import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShieldIcon from "@mui/icons-material/Shield";
import LockIcon from "@mui/icons-material/Lock";
import stipeImage from "../../../src/assets/stripe/stripe4.png";

function Footer() {
  return (
    <div className="footer">
      <div>
        <div className="footer-data">
          <div className="contact-details">
            <i>
              {" "}
              <h1>Contact Us</h1>
              <p>Beirut , baabda</p>
              <p>
                <b>Email:</b>info@Bookhaven.com
              </p>
              <p>+91 71380374</p>
            </i>
          </div>
          <div className="usefull-links">
            <i>
              {" "}
              <h1>Secure Payment</h1>
              <p>
                <LockIcon style={{ fontSize: "20px", color: "#edd695" }} />
                100 Secure Payment
              </p>
            </i>
          </div>
          <div className="librarian-details">
            <i>
              {" "}
              <h1>Payment Metods</h1>
              <img
                src={stipeImage}
                alt="Stripe Logo"
                style={{ marginLeft: "-14px", width: 240, height: "80px" }}
              />
            </i>
          </div>
        </div>
        <div className="contact-social">
          <a href="#home" className="social-icon">
            <TwitterIcon style={{ fontSize: 40, color: "#edd695" }} />
          </a>
          <a href="#home" className="social-icon">
            <LinkedInIcon style={{ fontSize: 40, color: "#edd695" }} />
          </a>
          <a href="#home" className="social-icon">
            <TelegramIcon style={{ fontSize: 40, color: "#edd695" }} />
          </a>
          <a href="#home" className="social-icon">
            <InstagramIcon style={{ fontSize: 40, color: "#edd695" }} />
          </a>
        </div>
      </div>
      <div className="copyright-details">
        <p className="footer-copyright">
          <i>
            {" "}
            &#169; 2024 copyright all right reserved
            <br />
            <span>Designed with ❤️ by Amal Farhat</span>
          </i>
        </p>
      </div>
    </div>
  );
}

export default Footer;
