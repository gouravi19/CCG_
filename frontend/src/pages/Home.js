import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);

  const handleGetStarted = () => {
    navigate("/contact"); // Go to Contact page
  };

  const handleLearnMore = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly
    }
  };

  return (
    <div className="professional-app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Modern <span>MERN</span> Stack Solutions
          </h1>
          <p className="hero-subtitle">
            Build enterprise-grade applications with our optimized development platform
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" ref={featuresRef}>
        <div className="section-header">
          <h2>Key Features</h2>
          <p className="section-subtitle">
            Everything you need to build modern web applications
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
              </svg>
            </div>
            <h3>Full Stack Ready</h3>
            <p>Pre-configured MongoDB, Express, React, and Node.js integration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <h3>Performance Optimized</h3>
            <p>Built-in performance enhancements and best practices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z" />
              </svg>
            </div>
            <h3>Enterprise Security</h3>
            <p>JWT authentication and role-based access control</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p className="section-subtitle">Trusted by developers worldwide</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "This platform reduced our development time by 40%. The pre-configured stack saved us weeks of setup work."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>CTO, TechSolutions Inc.</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "As a solo developer, having all MERN components pre-integrated let me focus on building features instead of infrastructure."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Michael Chen</h4>
                <p>Founder, StartupX</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
