import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from '../partials/book'
import * as BooksAPI from '../utils/BooksAPI'

export default class extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    onRateBook: PropTypes.func.isRequired,
  }

  state = {
    books: [],
    searching: false,
  }

  search = (query) => {
    if (this.state.searching) {
      return
    }
    this.setState({ searching: true })

    if ( ! query) {
      this.setState({ books: [], searching: false })
      return
    }

    BooksAPI.search(query, 10).then(results => {
      if (results.hasOwnProperty('error')) {
        this.setState({ searching: false, books: [] })
        return
      }

      this.props.myBooks.forEach(book => {
        results.forEach((result, index) => {
          if (result.id === book.id) {
            results[index] = book
          }
        })
      })

      this.setState({
        books: results,
        searching: false
      })
    }).catch(error => {
      this.setState({ searching: false })
    })
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.search(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          {
            this.state.searching ?
              <h4 className="loading">Searching...</h4> :
              <ol className="books-grid">
                {
                  this.state.books.map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        onRateBook={this.props.onRateBook}
                        onMoveBook={this.props.onMoveBook} />
                    </li>
                  ))
                }
              </ol>
          }
        </div>
      </div>
    )
  }
}
