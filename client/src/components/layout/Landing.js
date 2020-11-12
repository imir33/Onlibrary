import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to='/register' className='btn btn-primary'>
              Sign up
            </Link>
            <Link to='/login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
