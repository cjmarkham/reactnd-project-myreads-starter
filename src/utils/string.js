const Truncate = (string, length = 100) => {
  let truncated = string.substring(0, length)
  if (truncated.length < string.length) {
    truncated += '...'
  }

  return truncated
}

module.exports = {
  Truncate,
}
