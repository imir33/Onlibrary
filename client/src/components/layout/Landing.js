import React from 'react';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Reading Tracker</h1>
          <p className='lead'>
            Track your reading progress and share it with your friends
          </p>
          <div className='buttons'>
            <a href='register.html' className='btn btn-primary'>
              Sign up
            </a>
            <a href='login.html' className='btn'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
