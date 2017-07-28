import React from 'react'
import PropTypes from 'prop-types'

const Ratings = (props) => {
  let stars = [],
      i = 1,
      rating = props.book.rating || 0

  for (i; i <= 5; ++i) {
    stars.push(
      <button
        className="rating-star"
        key={i}
        onClick={props.onRateBook.bind(this, props.book, i)}
      >
        <span className={`fa fa-star${rating < i ? '-o' : ''}`} />
      </button>
    )
  }

  return <div>{ stars }</div>
}

Ratings.propTypes = {
  onRateBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}

export default Ratings
