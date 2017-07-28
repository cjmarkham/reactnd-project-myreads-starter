import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import LaunchPage from './pages/launch'
import SearchPage from './pages/search'
import BookPage from './pages/book'
import sortBy from 'sort-by'

export default class extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  }

  componentDidMount () {
    this.getAllBooks()
  }

  getAllBooks () {
    BooksAPI.getAll().then(books => {
      books.sort(sortBy('title'))
      this.setState({ books })
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelves => {
      book.shelf = shelf

      // Update the list of shelves in the state
      this.setState(state => ({
        shelves: {
          currentlyReading: shelves.currentlyReading,
          wantToRead: shelves.wantToRead,
          read: shelves.read,
        },
        // Remove the book from the state and re-add it with the updated shelf property
        books: state.books.filter(_book => book.id !== _book.id).concat([book]).sort(sortBy('title')),
      }))
    })
  }

  rateBook = (book, rating) => {
    book.rating = rating

    // Remove the book from the state and re-add it with the updated rating property
    this.setState(state => ({
      books: state.books.filter(_book => book.id !== _book.id).concat([book]).sort(sortBy('title')),
    }))
  }

  render() {
    const { shelves, books } = this.state

    return (
      <div className="app">
        <Route path="/book/:id" render={route => (
          <BookPage
            bookId={route.match.params.id}
            myBooks={books}
            onRateBook={(book, rating) => this.rateBook(book, rating)}
            onMoveBook={(book, shelf) => this.moveBook(book, shelf)} />
        )} />
        <Route path="/search" render={() => (
          <SearchPage
            myBooks={books}
            onRateBook={(book, rating) => this.rateBook(book, rating)}
            onMoveBook={(book, shelf) => this.moveBook(book, shelf)} />
        )} />
        <Route exact path="/" render={() => (
          <LaunchPage
            shelves={shelves}
            books={books}
            onRateBook={(book, rating) => this.rateBook(book, rating)}
            onMoveBook={(book, shelf) => this.moveBook(book, shelf)} />
        )} />
      </div>
    )
  }
}
