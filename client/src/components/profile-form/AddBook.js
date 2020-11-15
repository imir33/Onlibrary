import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBook } from '../../actions/profile';

const AddBook = ({ addBook, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    numberOfPages: '',
    currentPage: '',
    finished: false,
    rating: 0,
    from: '',
    to: '',
  });

  const [displayRatingDisabled, toggleRating] = useState(true);

  const {
    title,
    author,
    numberOfPages,
    currentPage,
    finished,
    rating,
    from,
    to,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add a New Book</h1>
      <small>* = required fields</small>

      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addBook(formData, history);
        }}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Book Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Book Author'
            name='author'
            value={author}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Number of Pages'
            name='numberOfPages'
            value={numberOfPages}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              onClick={(e) => toggleRating(!displayRatingDisabled)}
              type='checkbox'
              name='finished'
              checked={finished}
              value={finished}
              onChange={(e) => {
                setFormData({ ...formData, finished: !finished });
                toggleRating(!displayRatingDisabled);
              }}
            />{' '}
            Finished
          </p>
        </div>
        <div className='form-group rating'>
          <label for='cars'>Rate the Book:</label>
          <select
            name='rating'
            id='rating'
            value={rating}
            onChange={(e) => onChange(e)}
            disabled={displayRatingDisabled ? 'disabled' : ''}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={displayRatingDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Number of Current Page'
            name='currentPage'
            value={currentPage}
            onChange={(e) => onChange(e)}
            disabled={displayRatingDisabled ? '' : 'disabled'}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn my-1' href='/dashboard'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddBook.propTypes = {
  addBook: PropTypes.func.isRequired,
};

export default connect(null, { addBook })(AddBook);
