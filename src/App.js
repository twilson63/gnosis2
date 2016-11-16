const React = require('react')

const ResourceForm = require('./pages/resources/form')
const Resources = require('./pages/resources')

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Gnosis</h1>
        <Resources />
      </div>
    )
  }
})

module.exports = App
