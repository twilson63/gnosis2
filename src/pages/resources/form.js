const React = require('react')

const dbUrl = process.env.REACT_APP_DB
const PouchDB = require('pouchdb-http')
const db = PouchDB(dbUrl)

const ResourceForm = React.createClass({
  getInitialState () {
    return {
      error: '',
      result: {},
      resource: {
        title: 'Foo',
        reference: 'Bar'
        //,
        //_id: new Date().toISOString()
      }
    }
  },
  handleChange(field) {
    return e => {
      let resource = this.state.resource
      resource[field] = e.target.value
      let newState = { resource: resource }
      this.setState(newState)
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    const resource = this.state.resource
    resource._id = new Date().toISOString()
    db.put(resource, (err, result) => {
      if (err) return this.setState({error: err.message })
      this.setState({result: result})
    })
  },
  render () {
    const foo = () => {
      if (this.state.error !== '') {
        return <div style={{color: 'red'}}>{this.state.error}</div>
      } else {
        return <h1>All Good Here</h1>
      }
    }
    return (
      <div>
        {foo()}
        <h1>New Resource</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <input
              onChange={this.handleChange('title')}
              value={this.state.resource.title} />
          </div>
          <div>
            <label>Reference</label>
            <input
              onChange={this.handleChange('reference')}
              value={this.state.resource.reference} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <hr />
        <pre>{JSON.stringify(this.state.resource, null, 2)}</pre>
      </div>
    )
  }
})

module.exports = ResourceForm
