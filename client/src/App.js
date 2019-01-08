import React, { Component } from "react";
import axios from "axios";
import "./App.css";
//components
import Post from "./components/Post";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => {
        console.log(res);
        this.setState({ posts: res.data.post });
      })
      .catch(err => {
        console.log(`CDM failed bruh`);
      });
  }
  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

export default App;
