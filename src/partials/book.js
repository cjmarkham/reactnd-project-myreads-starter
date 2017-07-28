import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Truncate,
} from '../utils/string'
import Ratings from './ratings'

const Book = (props) => {
  const { book, onRateBook, onMoveBook } = props

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks.thumbnail}")`
          }} />
        <div className="book-shelf-changer">
          <select defaultValue={book.shelf} onChange={event => onMoveBook(book, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">
        <Link to={`/book/${book.id}`}>{ Truncate(book.title, 25) }</Link>
      </div>
      <div className="book-rating">
        <Ratings onRateBook={(book, rating) => onRateBook(book, rating)} book={book} />
      </div>
      <div className="book-authors">
        { book.authors && book.authors[0] }
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  onRateBook: PropTypes.func.isRequired,
}

export default Book
