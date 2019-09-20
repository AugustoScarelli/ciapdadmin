/* eslint-disable */

// https://github.com/diessica/is-valid-birthdate/blob/master/index.js
'use strict'

var now = new Date()
var defaults = { maxAge: 120, minAge: 0 }

function isValidBirthdate(_date, _options) {
  var date = _date
  var options = _options

  options = Object.assign({}, defaults, options)

  if (typeof (date) === 'string') {
    date = date.split('/').reverse().join('-')
    date = new Date(date)
  }

  if (date instanceof Date === false) {
    return false
  }

  if (typeof (options) !== 'object') {
    throw new Error(
      'isValidBirthdate(): Second argument (options) expects an object.'
    )
  }

  var age = now.getFullYear() - date.getFullYear()

  return (
    date < now &&
    age >= options.minAge &&
    age <= options.maxAge
  )
}

export default isValidBirthdate
