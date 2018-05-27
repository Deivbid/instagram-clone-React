import React, { Component } from 'react';
import Header from './components/Header/Header'
import Post from './components/Post/Post'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <Post />
        </div>
      </div>
    );
  }
}

export default App;
