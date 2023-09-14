
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint'})
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id'})
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message})
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token'
    })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired'
    })
  }
    
  next()
}

const getTokenFrom = req => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  } 
  return null
}

const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req)

  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    req.user = null
  } else {
    const user = await User.findById(decodedToken.id)
    req.user = user
  }
  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor}
