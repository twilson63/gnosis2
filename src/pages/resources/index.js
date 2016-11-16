const React = require('react')

const dbUrl = process.env.REACT_APP_DB
const PouchDB = require('pouchdb-http')
const db = PouchDB(dbUrl)


const Resources = React.createClass({
  getInitialState() {
    return {
      resources: []
    }
  },
  componentDidMount() {
    db.allDocs({include_docs: true}, (err, result) => {
      if (err) return this.setState({error: err.message })
      const resources = result.rows.map(o => o.doc)
      this.setState({ resources })
    })
  },
  render () {
    const resourceItem = doc => {
      return (
        <li key={doc._id}>
          <a href={doc.reference}>
            {doc.title}
          </a>
        </li>
      )
    }
    return (
      <div>
        <h3>Resources</h3>
        <ul>
          {this.state.resources.map(resourceItem)}
        </ul>
      </div>
    )
  }
})

module.exports = Resources
