import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileBook = ({ books }) => {
  const booksTable = books.map((book) => (
    <tr key={book._id}>
      <td>{book.title}</td>
      <td className='hide-sm'>{book.author}</td>
      <td className='hide-sm'>
        {book.finished
          ? 'Finished '
          : book.currentPage + '/' + book.numberOfPages}
      </td>
      <td>{book.finished ? book.rating : 'Not rated yet'}</td>
    </tr>
  ));

  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th className='hide-sm'>Author</th>
            <th className='hide-sm'>Page</th>
            <th className='hide-sm'>Rating</th>
          </tr>
        </thead>
        <tbody>{booksTable}</tbody>
      </table>
    </Fragment>
  );
};

ProfileBook.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileBook;
