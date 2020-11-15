import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Book = ({ books }) => {
  const booksTable = books.map((book) => (
    <tr key={book._id}>
      <td>{book.title}</td>
      <td className='hide-sm'>{book.author}</td>
      <td className='hide-sm'>
        {book.finished
          ? 'Finished '
          : book.currentPage + '/' + book.numberOfPages}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
      <td>
        <button className='btn btn-primary'>Edit</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Books</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th className='hide-sm'>Author</th>
            <th className='hide-sm'>Page</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{booksTable}</tbody>
      </table>
    </Fragment>
  );
};

Book.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Book;
