import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBook, editBook } from '../../actions/profile';

const EditBook = ({
  location: { state },
  profile: { book, loadingBook },
  loadBook,
  editBook,
  history,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    numberOfPages: 0,
    currentPage: 0,
    finished: false,
    rating: 0,
    from: '',
    to: '',
    shouldUnregister: false,
  });

  useEffect(() => {
    const bookID = state.id;
    loadBook(bookID);

    if (book !== null) {
      setFormData({
        title: loadingBook || !book.title ? '' : book.title,
        author: loadingBook || !book.author ? '' : book.author,
        numberOfPages:
          loadingBook || !book.numberOfPages ? '' : book.numberOfPages,
        currentPage: loadingBook || !book.currentPage ? '' : book.currentPage,
        finished: loadingBook || !book.finished ? '' : book.finished,
        rating: loadingBook || !book.rating ? '' : book.rating,
        from: loadingBook || !book.from ? '' : book.from,
        to: loadingBook || !book.to ? '' : book.to,
      });
    }
  }, [loadingBook]);

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

  const [displayRatingDisabled, toggleRating] = useState(true);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editBook(book._id, formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit the Book</h1>
      <small>* = required fields</small>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
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
                console.log(finished);
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
            disabled={!finished ? 'disabled' : ''}>
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
            disabled={!finished ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Number of Current Page'
            name='currentPage'
            value={currentPage}
            onChange={(e) => onChange(e)}
            disabled={!finished ? '' : 'disabled'}
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

EditBook.propTypes = {
  loadBook: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { loadBook, editBook })(
  withRouter(EditBook)
);
