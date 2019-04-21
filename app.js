const express = require('express')
const GraphQLHTTP = require('express-graphql')
const schema = require('./graphql/schema')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

function start() {
  const app = express()

  const PORT = parseInt(process.env.PORT, 10)
  const NODE_ENV = process.env.NODE_ENV
  app.use(cors())
  app.use(helmet())

  if (NODE_ENV === 'development') {
    app.use(bodyParser.json())

    app.use('*', (req, res, next) => {
      console.log(
        'Request Recevied: ' +
          '\nMETHOD: ' +
          req.method +
          '\nBODY: ' +
          JSON.stringify(req.body)
      )
      next()
    })
  }

  app.post(
    '/graphql',
    GraphQLHTTP({
      schema
    })
  )

  app.use(
    '/graphql',
    GraphQLHTTP({
      schema,
      graphiql: NODE_ENV === 'development' ? true : false
    })
  )

  app.listen(
    PORT,
    console.log(`Server listening...\nPORT = ${PORT}\nNODE_ENV = ${NODE_ENV}`)
  )
}

module.exports = {
  start
}