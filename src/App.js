import React, { Component } from 'react';
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Pusher from 'pusher-js';

    const client = new ApolloClient({
      uri: "http://localhost:4000/graphql"
    });

class App extends Component {

    constructor(){
        super();
        // connect to pusher
        this.pusher = new Pusher("c89c7d0f075322c08deb", {
         cluster: 'us2',
         encrypted: true
        });
    }

    componentDidMount(){
        if ('actions' in Notification.prototype) {
          alert('You can enjoy the notification feature');
        } else {
          alert('Sorry notifications are NOT supported on your browser');
        }
      }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Header />
          <div className="content">
            <Posts pusher={this.pusher} apollo_client={client}/>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
