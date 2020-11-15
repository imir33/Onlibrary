import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='profile-buttons'>
      <Link to='/edit-profile' class='btn'>
        <i class='fas fa-book-open text-primary'></i> Edit Profile
      </Link>
      <Link to='/add-book' class='btn'>
        <i class='fas fa-user text-primary'></i> Add Book
      </Link>
    </div>
  );
};

export default DashboardActions;
