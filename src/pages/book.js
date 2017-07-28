import React from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Ratings from '../partials/ratings'

export default class extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    onRateBook: PropTypes.func.isRequired,
  }

  state = {
    loading: true,
    error: undefined,
    book: undefined,
  }

  componentDidMount () {
    BooksAPI.get(this.props.bookId).then(result => {
      let book = result

      const inMyBooks = this.props.myBooks.find(book => {
        return result.id === book.id
      })

      if (inMyBooks) {
        book = inMyBooks
      }

      this.setState({ book, loading: false })
    }).catch(error => {
      // Unknown book will throw a 500
      this.setState({ loading: false, error: 'Could not find that book' })
    })
  }

  render () {
    const { loading, error, book } = this.state

    if (loading) {
      return (
        <div className="show-book">
          <div className="show-book-title">
            <h1>Loading...</h1>
          </div>
          <div className="show-book-content">

          </div>
        </div>
      )
    } else if (error) {
      return <h4>{ error }</h4>
    } else {
      return (
        <div className="show-book">
          <div className="show-book-title">
            <Link className="close-book" to="/">Close</Link>
            <h1>MyReads</h1>
          </div>
          <div className="show-book-content">
            <div className="show-book-header">
              <div className="show-book-header-left">
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
                      <select defaultValue={book.shelf} onChange={event => this.props.onMoveBook(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="show-book-header-right">
                <div className="show-book-header-right-left">
                  <h3>{ book.title }</h3>
                  <p className="show-book-authors-wrapper">
                    <span className="show-book-authors">
                      By { book.authors.map(author => author) }
                    </span>
                    <strong className="show-book-published">
                      { new Date(book.publishedDate).toLocaleDateString('en-GB') }
                    </strong>
                  </p>
                  <p className="show-book-publisher">
                    { book.publisher }
                  </p>
                </div>
                <div className="show-book-header-right-right">
                  <Ratings book={book} onRateBook={this.props.onRateBook} />
                </div>
              </div>
            </div>
            <hr />
            <p>
              { book.description }
            </p>
            <hr />
            <div>
              <h3>Additional Information</h3>
              <div className="additional-information">
                <div>
                  <h5>Features</h5>
                  <p>
                    Images: { book.readingModes.image.toString() }
                  </p>
                  <p>
                    Text: { book.readingModes.text.toString() }
                  </p>
                </div>
                <div>
                  <h5>Pages</h5>
                  <p>
                    Pages: { book.pageCount }
                  </p>
                </div>
                <div>
                  <h5>Categories</h5>
                  { book.categories.map((category, index) => <p key={index}>{category}</p>) }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
