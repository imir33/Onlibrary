import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    social,
    genres,
    location,
    bio,
    books,
  },
}) => {
  const genresStr = genres.join(', ');
  const bookDisplay = books
    .filter((book) => book.finished === true)
    .splice(0, 5)
    .map((book, index) => (
      <li key={index} className='text-primary'>
        <i className='fas fa-check'></i> {book.title} - {book.author}
      </li>
    ));

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{genresStr}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>{bookDisplay}</ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
