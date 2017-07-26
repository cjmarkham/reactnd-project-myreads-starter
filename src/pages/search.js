import React from 'react'
import { Link } from 'react-router-dom'
import Book from '../book'
import * as BooksAPI from '../utils/BooksAPI'

export default class extends React.Component {
  state = {
    books: [],
  }

  search = (query) => {
    if ( ! query) {
      this.setState({ books: [] })
      return
    }

    BooksAPI.search(query, 10).then(books => {
      this.setState({ books })
    }).catch(error => {

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
          <ol className="books-grid">
            {
              this.state.books.map(book => (
                <li key={book.id}>
                  <Book book={book} onMoveBook={this.props.onMoveBook} />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}
