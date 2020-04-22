import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

export default class TicTacToe extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage() {
    if (this.getSessionCreatorUserId() === this.getMyUserId()) {
      this.setState({ message: "Youre the host" });
    } else {
      this.setState({ message: "Youre the guest" });
    }
  }

  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());

    return (
      <div>
        <p>You're the host</p>
        <p>You're a guest, welcome!</p>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul>{users}</ul>
      </div>
    );
  }
}
