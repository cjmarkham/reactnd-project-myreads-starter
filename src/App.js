import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import LaunchPage from './pages/launch'
import SearchPage from './pages/search'

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
        books: state.books.filter(_book => book.id !== _book.id).concat([book]),
      }))
    })
  }

  render() {
    const { shelves, books } = this.state

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage books={books} onMoveBook={(book, shelf) => this.moveBook(book, shelf)} />
        )} />
        <Route exact path="/" render={() => (
          <LaunchPage shelves={shelves} books={books} onMoveBook={(book, shelf) => this.moveBook(book, shelf)} />
        )} />
      </div>
    )
  }
}
