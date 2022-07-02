import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  useNavigate,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Login";

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  vote = (e) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    fetch(
      "http://127.0.0.1:8000/api/poll/" +
        e.currentTarget.getAttribute("data-id") +
        "/vote/" +
        e.currentTarget.getAttribute("data-choices_id"),
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + loggedInUser.access_token,
        },
        method: "POST",
      }
    )
      // fetch('http://127.0.0.1:8000/api/poll/' + e.currentTarget.getAttribute("data-id") + '/vote/' + e.currentTarget.getAttribute("data-choices_id"))
      .then((response) => response.json())
      .then((json) => {
        alert("You Are Selected ! " + json.data);
      });
  };

  render() {
    var choices = JSON.parse(this.props.choices);
    return (
      <div className="card">
        <div className="card-body">
          <h2>{this.props.title}</h2>
          <p>{this.props.description}</p>
          <h5>{this.props.deadline}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px",
            }}
          >
            {Object.keys(choices).map((element) => (
              // <a style={{margin:'10px'}}  href={'http://127.0.0.1:8000/api/poll/' + this.props.id + '/vote/' + element}>{choices[element]}</a>
              <button
                data-id={this.props.id}
                data-choices_id={element}
                style={{ margin: "10px" }}
                onClick={this.vote}
              >
                {choices[element]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    fetch("http://127.0.0.1:8000/api/poll", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + loggedInUser.access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json.data,
        });
      });
  }

  renderPoll(item, index) {
    return (
      <Card
        id={item.id}
        title={item.title}
        description={item.description}
        deadline={item.deadline}
        choices={item.choices}
      />
    );
  }

  render() {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser === null) {
      return <Navigate to="/login" />;
    } else {
      return (
        <>
          <div class="header">
            <h1>Pool List</h1>
          </div>
          <div className="cards">{this.state.data.map(this.renderPoll)}</div>
        </>
      );
    }
  }
}

export default Home;
