import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from '../partials/book'

export default class extends React.Component {
  static propTypes = {
    shelves: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    onRateBook: PropTypes.func.isRequired,
  }

  // Simple abstraction to render shelved books
  renderShelvedBook = (book) => {
    return (
      <li key={book.id}>
        <Book
          book={book}
          onRateBook={this.props.onRateBook}
          onMoveBook={this.props.onMoveBook} />
      </li>
    )
  }

  render () {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    books.filter(book => book.shelf === 'currentlyReading').map(book => this.renderShelvedBook(book))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    books.filter(book => book.shelf === 'wantToRead').map(book => this.renderShelvedBook(book))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    books.filter(book => book.shelf === 'read').map(book => this.renderShelvedBook(book))
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}
