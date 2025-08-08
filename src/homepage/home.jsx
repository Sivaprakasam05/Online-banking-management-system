import { Link } from 'react-router-dom';
import './home-style.css';

function Home() {
  const toggleMenu = () => {
    document.getElementById("navLinks").classList.toggle("active");
  };

  const toggleDropdown = () => {
    document.getElementById("loginOptions").classList.toggle("show");
  };

  return (
    <>
      <header className="bank-header">
        <div className="logo"><img style={{position:"relative",top:"10px"}} className="bank-logo" src="/vm Bank logo.png" alt="" /> VM BANK</div>
        <nav id="navLinks" className="nav-links">
          <a href="#home"><i className="fa fa-home"></i> Home</a>
          <a href="#services"><i className="fa fa-cogs"></i> Services</a>
          <a href="#accounts"><i className="fa fa-university"></i> Accounts</a>
          <a href="#loans"><i className="fa fa-credit-card"></i> Loans</a>
          <a href="#contact"><i className="fa fa-envelope"></i> Contact</a>
          <a href="#faq"><i className="fa fa-question-circle"></i> FAQ</a>
        </nav>

        <div className="menu-toggle" onClick={toggleMenu}>☰</div>

        <div className="login-dropdown">
          <button className="login-button" onClick={toggleDropdown}>Login ⮟</button>
          <div className="dropdown-content" id="loginOptions">
            <Link style={{textDecoration:"none"}} to="/login"><button className="user-button">User</button></Link>
            <Link style={{textDecoration:"none"}}to="/admin/login"><button className="admin-button">Admin</button></Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <h1>Welcome to VM BANK</h1>
            <p>India's Most Trusted Digital Banking Partner</p>
            <a href="#services" className="btn-primary">Explore Services</a>
          </div>
        </section>

        <section className="section" id="services">
          <h2>Our Core Services</h2>
          <div className="card-container">
            <div className="card"><h3>Online Banking</h3><p>Access your bank anywhere, anytime.</p></div>
            <div className="card"><h3>Mobile Banking</h3><p>Smart banking in your pocket.</p></div>
            <div className="card"><h3>24x7 Support</h3><p>Chat, call or email – always ready to help.</p></div>
            <div className="card"><h3>UPI & Payments</h3><p>Send and receive funds instantly.</p></div>
          </div>
        </section>

        <section className="section" id="accounts">
          <h2>Types of Bank Accounts</h2>
          <div className="card-container">
            <div className="card"><h3>Savings Account</h3><p>Zero balance account with high interest.</p></div>
            <div className="card"><h3>Current Account</h3><p>Perfect for businesses and traders.</p></div>
            <div className="card"><h3>Fixed Deposits</h3><p>Assured returns with flexible tenures.</p></div>
            <div className="card"><h3>Recurring Deposits</h3><p>Save monthly & earn attractive interest.</p></div>
          </div>
        </section>

        <section className="section" id="loans">
          <h2>Loans for Every Need</h2>
          <div className="card-container">
            <div className="card"><h3>Home Loan</h3><p>Make your dream home a reality.</p></div>
            <div className="card"><h3>Education Loan</h3><p>Support for your academic journey.</p></div>
            <div className="card"><h3>Car Loan</h3><p>Drive home your favorite car today.</p></div>
            <div className="card"><h3>Personal Loan</h3><p>Instant loans with minimal documentation.</p></div>
          </div>
        </section>

        <section className="section testimonials">
          <h2>What Our Customers Say</h2>
          <div className="card-container">
            <div className="card">
              <p>"VM Bank's app is fast, clean, and secure. I love it!"</p>
              <h4>- Abhishek</h4>
            </div>
            <div className="card">
              <p>"Got my loan approved in just 48 hours. Great experience!"</p>
              <h4>- Meena</h4>
            </div>
          </div>
        </section>

        <section className="section" id="security">
          <h2>Your Security is Our Priority</h2>
          <p>We use 256-bit encryption, 2FA, and advanced fraud detection to protect your money and data.</p>
          <ul>
            <li>✔ Biometric login</li>
            <li>✔ Secure OTP verification</li>
            <li>✔ Instant fraud alerts</li>
          </ul>
        </section>

        <section className="section" id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq">
              <h4>How to open a savings account?</h4>
              <p>You can visit your nearest branch or apply online.</p>
            </div>
            <div className="faq">
              <h4>How secure is VM Bank?</h4>
              <p>We use bank-grade encryption and real-time fraud monitoring.</p>
            </div>
            <div className="faq">
              <h4>Can I use UPI without the mobile app?</h4>
              <p>No, UPI registration requires the official mobile app or net banking.</p>
            </div>
          </div>
        </section>

        <section className="section download-app">
          <h2>Download Our Mobile App</h2>
          <p>Bank on the go! Available on Android & iOS</p>
          <div className="store-buttons">
            <img src="https://img.icons8.com/color/48/000000/google-play.png" alt="Google Play" />
            <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="App Store" />
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Get in Touch</h2>
          <p>Email: support@vmbank.com | Phone: +91 88704 27233</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="bank-footer">
        <p>&copy; 2025 VM BANK. All Rights Reserved.</p>
        <div className="social-links">
          <a href=""><i className="fab fa-facebook-f"></i></a>
          <a href=""><i className="fab fa-twitter"></i></a>
          <a href=""><i className="fab fa-instagram"></i></a>
          <a href=""><i className="fab fa-linkedin-in"></i></a>
        </div>
      </footer>
    </>
  );
}

export default Home;
