import React from 'react';

export const Profile = () => (
  <div style={{ padding: '50px 20px', textAlign: 'center', color: 'white', minHeight: '100vh', background: '#000' }}>
    <h1 style={{ color: '#4f46e5', fontSize: '2rem' }}>Profile Page</h1>
    <p style={{ color: '#888', marginTop: '10px' }}>This is a dummy Profile page.</p>
  </div>
);

export const About = () => (
  <>
    <style>
      {`
        .abt-page { background: #000; color: #fff; min-height: 100vh; padding: 40px 15px; font-family: 'Segoe UI', sans-serif; }
        .abt-header { text-align: center; margin-bottom: 40px; }
        .abt-header h1 { font-size: 2.2rem; color: #4f46e5; margin-bottom: 12px; }
        .abt-header p { font-size: 1rem; color: #888; max-width: 550px; margin: 0 auto; line-height: 1.6; }
        .abt-cards { display: flex; flex-wrap: wrap; gap: 25px; max-width: 900px; margin: 0 auto; justify-content: center; }
        .abt-card { background: #1a1a1a; padding: 25px; border-radius: 12px; flex: 1; min-width: 260px; max-width: 420px; border: 1px solid #333; text-align: center; }
        .abt-card h3 { font-size: 1.3rem; margin-bottom: 12px; color: #fff; }
        .abt-card p { color: #888; line-height: 1.5; font-size: 0.9rem; }
        .abt-team { margin-top: 50px; text-align: center; }
        .abt-team h2 { font-size: 1.8rem; color: #fff; margin-bottom: 25px; }
        .abt-team-grid { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
        .abt-member { background: #1a1a1a; padding: 20px; border-radius: 10px; width: 180px; border: 1px solid #333; text-align: center; }
        .abt-avatar { width: 70px; height: 70px; background: #333; border-radius: 50%; margin: 0 auto 12px; }
        .abt-member h4 { color: #fff; font-size: 0.95rem; }
        .abt-member p { color: #888; font-size: 0.8rem; margin-top: 4px; }

        @media (max-width: 600px) {
          .abt-header h1 { font-size: 1.6rem; }
          .abt-header p { font-size: 0.85rem; }
          .abt-card { min-width: 100%; padding: 20px; }
          .abt-member { width: 140px; padding: 15px; }
          .abt-avatar { width: 55px; height: 55px; }
          .abt-team h2 { font-size: 1.4rem; }
        }
      `}
    </style>
    
    <div className="abt-page">
      <div className="abt-header">
        <h1>About Us</h1>
        <p>We are dedicated to providing the best online shopping experience. This is a dummy about page created to showcase the layout design.</p>
      </div>
      
      <div className="abt-cards">
        <div className="abt-card">
          <h3>Our Mission</h3>
          <p>To deliver high quality products at affordable prices while ensuring out-of-this-world customer satisfaction.</p>
        </div>
        <div className="abt-card">
          <h3>Our Vision</h3>
          <p>A world where everyone has access to premium items without breaking the bank. Innovating retail every single day.</p>
        </div>
      </div>

      <div className="abt-team">
        <h2>Meet Our Team</h2>
        <div className="abt-team-grid">
          {[1, 2, 3].map((num) => (
            <div className="abt-member" key={num}>
              <div className="abt-avatar"></div>
              <h4>Team Member {num}</h4>
              <p>Position Title</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export const Contact = () => (
  <>
    <style>
      {`
        .cnt-page { background: #000; color: #fff; min-height: 100vh; padding: 40px 15px; font-family: 'Segoe UI', sans-serif; }
        .cnt-container { max-width: 700px; margin: 0 auto; background: #1a1a1a; padding: 35px; border-radius: 16px; border: 1px solid #333; }
        .cnt-header { text-align: center; margin-bottom: 30px; }
        .cnt-header h1 { font-size: 2rem; color: #4f46e5; margin-bottom: 8px; }
        .cnt-header p { color: #888; font-size: 0.9rem; }
        .cnt-form { display: flex; flex-direction: column; gap: 15px; }
        .cnt-input, .cnt-textarea { width: 100%; padding: 14px; background: #000; border: 1px solid #333; border-radius: 10px; color: #fff; font-size: 0.95rem; outline: none; box-sizing: border-box; }
        .cnt-input:focus, .cnt-textarea:focus { border-color: #4f46e5; }
        .cnt-textarea { min-height: 120px; resize: vertical; font-family: inherit; }
        .cnt-btn { background: #4f46e5; color: #fff; padding: 14px; border: none; border-radius: 10px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .cnt-btn:hover { background: #4338ca; }
        .cnt-info { display: flex; gap: 15px; margin-top: 30px; flex-wrap: wrap; }
        .cnt-info-item { background: #000; padding: 18px; border-radius: 10px; flex: 1; min-width: 180px; border: 1px solid #333; text-align: center; }
        .cnt-info-item h4 { color: #4f46e5; margin-bottom: 5px; font-size: 0.95rem; }
        .cnt-info-item p { color: #aaa; font-size: 0.85rem; }

        @media (max-width: 600px) {
          .cnt-container { padding: 20px; }
          .cnt-header h1 { font-size: 1.5rem; }
          .cnt-info-item { min-width: 100%; }
          .cnt-input, .cnt-textarea { font-size: 0.85rem; padding: 12px; }
        }
      `}
    </style>
    
    <div className="cnt-page">
      <div className="cnt-container">
        <div className="cnt-header">
          <h1>Contact Us</h1>
          <p>This is a dummy contact form. It goes nowhere.</p>
        </div>

        <form className="cnt-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" className="cnt-input" placeholder="Your Name" />
          <input type="email" className="cnt-input" placeholder="Your Email Address" />
          <input type="text" className="cnt-input" placeholder="Subject" />
          <textarea className="cnt-textarea" placeholder="Write your message here..."></textarea>
          <button type="submit" className="cnt-btn">Send Message</button>
        </form>

        <div className="cnt-info">
          <div className="cnt-info-item">
            <h4>Address</h4>
            <p>123 Dummy Street, Fake City</p>
          </div>
          <div className="cnt-info-item">
            <h4>Email</h4>
            <p>support@fakedummy.com</p>
          </div>
          <div className="cnt-info-item">
            <h4>Phone</h4>
            <p>+92 300 1234567</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export const Orders = () => (
  <div style={{ padding: '50px 20px', textAlign: 'center', color: 'white', minHeight: '100vh', background: '#000' }}>
    <h1 style={{ color: '#4f46e5', fontSize: '2rem' }}>Orders</h1>
    <p style={{ color: '#888', marginTop: '10px' }}>No orders yet. This is a dummy page.</p>
  </div>
);
