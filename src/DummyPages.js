import React from 'react';

export const Profile = () => (
  <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
    <h1 style={{ color: '#4f46e5' }}>Profile Page</h1>
    <p>This is a dummy Profile page.</p>
  </div>
);

export const About = () => (
  <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '50px 20px', fontFamily: '"Inter", sans-serif' }}>
    <style>
      {`
        .about-header { text-align: center; margin-bottom: 50px; }
        .about-header h1 { font-size: 3rem; color: #4338ca; margin-bottom: 15px; }
        .about-header p { font-size: 1.2rem; color: #aaa; max-width: 600px; margin: 0 auto; line-height: 1.6; }
        .about-content { display: flex; flex-wrap: wrap; gap: 40px; max-width: 1000px; margin: 0 auto; justify-content: center; }
        .about-card { background: #111; padding: 30px; border-radius: 15px; flex: 1; min-width: 300px; border: 1px solid #333; text-align: center; }
        .about-card h3 { font-size: 1.5rem; margin-bottom: 15px; color: #fff; }
        .about-card p { color: #888; line-height: 1.5; }
        .team-section { margin-top: 60px; text-align: center; }
        .team-grid { display: flex; gap: 20px; justify-content: center; margin-top: 30px; flex-wrap: wrap; }
        .team-member { background: #111; padding: 20px; border-radius: 10px; width: 200px; border: 1px solid #333; }
        .team-avatar { width: 80px; height: 80px; background: #333; border-radius: 50%; margin: 0 auto 15px; }
      `}
    </style>
    <div className="about-header">
      <h1>About Us</h1>
      <p>We are dedicated to providing the best online shopping experience. This is a dummy about page created to showcase the layout design.</p>
    </div>
    
    <div className="about-content">
      <div className="about-card">
        <h3>Our Mission</h3>
        <p>To deliver high quality products at affordable prices while ensuring out-of-this-world customer satisfaction.</p>
      </div>
      <div className="about-card">
        <h3>Our Vision</h3>
        <p>A world where everyone has access to premium items without breaking the bank. Innovating retail every single day.</p>
      </div>
    </div>

    <div className="team-section">
      <h2 style={{ fontSize: '2rem', color: '#fff' }}>Meet Our Team</h2>
      <div className="team-grid">
        {[1, 2, 3].map((num) => (
          <div className="team-member" key={num}>
            <div className="team-avatar"></div>
            <h4>Team Member {num}</h4>
            <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '5px' }}>Position Title</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Contact = () => (
  <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '50px 20px', fontFamily: '"Inter", sans-serif' }}>
    <style>
      {`
        .contact-container { max-width: 800px; margin: 0 auto; background: #111; padding: 40px; border-radius: 20px; border: 1px solid #333; }
        .contact-header { text-align: center; margin-bottom: 40px; }
        .contact-header h1 { font-size: 2.5rem; color: #4338ca; margin-bottom: 10px; }
        .contact-header p { color: #888; }
        .contact-form { display: flex; flex-direction: column; gap: 20px; }
        .contact-input, .contact-textarea { width: 100%; padding: 15px; background: #000; border: 1px solid #333; border-radius: 10px; color: #fff; font-size: 1rem; outline: none; box-sizing: border-box; }
        .contact-input:focus, .contact-textarea:focus { border-color: #4338ca; }
        .contact-textarea { min-height: 150px; resize: vertical; }
        .contact-btn { background: #4f46e5; color: #fff; padding: 15px; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .contact-btn:hover { background: #4338ca; transform: translateY(-2px); }
        .contact-info { display: flex; justify-content: space-between; margin-top: 40px; gap: 20px; flex-wrap: wrap; text-align: center; }
        .info-item { background: #000; padding: 20px; border-radius: 10px; flex: 1; border: 1px solid #333; }
        .info-item h4 { color: #4338ca; margin-bottom: 5px; }
        .info-item p { color: #aaa; font-size: 0.9rem; }
      `}
    </style>
    
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>This is a dummy contact form. Fill it out visually, it goes nowhere.</p>
      </div>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" className="contact-input" placeholder="Your Name" />
        <input type="email" className="contact-input" placeholder="Your Email Address" />
        <input type="text" className="contact-input" placeholder="Subject" />
        <textarea className="contact-textarea" placeholder="Write your message here..."></textarea>
        <button type="submit" className="contact-btn">Send Message</button>
      </form>

      <div className="contact-info">
        <div className="info-item">
          <h4>Address</h4>
          <p>123 Dummy Street, Fake City</p>
        </div>
        <div className="info-item">
          <h4>Email</h4>
          <p>support@fakedummy.com</p>
        </div>
        <div className="info-item">
          <h4>Phone</h4>
          <p>+92 300 1234567</p>
        </div>
      </div>
    </div>
  </div>
);

export const Orders = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>Orders Page</h1>
    <p>This is a dummy Orders page.</p>
  </div>
);
