import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import ListContacts from './ListContacts'
import * as api from './utils/ContactsAPI'
import CreateContact from './createContact'
class App extends Component {
  componentDidMount(){
    if(!this.state.contacts.length){
      api.getAll().then(users => {
        this.setState({
          contacts: users
        })
      })
    }
  }
  state = {
    contacts: [],
  }
  removeContact = (contact) => {
    api.remove(contact).then(contact => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.filter((c) => {
          return c.id !== contact.id
        })
      }))
    }).catch(err => console.log(`Remove contact ${contact.name} failed - ${err  }`))
    
  }

  render() {
    return (
      <div>
       <Route path='/' exact render={() => <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
          onNavigate={this.onNavigate}
        />} />
       <Route path='/create' component={CreateContact}/>
      </div>
    )
  }
}

export default App
