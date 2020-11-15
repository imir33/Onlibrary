import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteBook } from '../../actions/profile';

const Book = ({ books, deleteBook }) => {
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
        <button onClick={() => deleteBook(book._id)} className='btn btn-danger'>
          Delete
        </button>
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
  deleteBook: PropTypes.func.isRequired,
};

export default connect(null, { deleteBook })(Book);
