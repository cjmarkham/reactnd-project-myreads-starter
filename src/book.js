import React from 'react'
import PropTypes from 'prop-types'
import {
  Truncate,
} from './utils/string'

export default class extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired,
  }

  render () {
    const { book, onMoveBook } = this.props;

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
          { Truncate(book.title, 25) }
        </div>
        <div className="book-authors">
          { book.authors && book.authors[0] }
        </div>
      </div>
    )
  }
}
