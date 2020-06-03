import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

// this.getSessionUserIds() returns array of userIDs in the game
// this.getMyUserId() returns my userID
// this.getSessionCreatorUserId() returns session creator userID
// this.getSessionDatabaseRef().set({}) sets our 'database'
// onSessionDataChanged(data) ???

//
export default class TicTacToe extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      playerTurn: "initial",
      createAGrid: []
    };
  }

  onSessionDataChanged(data) {
    console.log("onSessionDataChanged", data);
    this.setState({ playerTurn: data.playerTurn });
  }

  handleStartGameClick() {
    console.log("click");
    this.getSessionDatabaseRef().set({
      playerAGrid: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      playerBGrid: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      playerAAttack: 2,
      playerBAttack: 2,
      playerTurn: "setup"
    });
  }

  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());

    if (this.state.playerTurn === "initial") {
      return (
        <div>
          You are in the {this.state.playerTurn} step
          <p>My name is: {UserApi.getName(this.getMyUserId())}</p>
          <p>Session ID: {id}</p>
          <p>Session creator: {creator}</p>
          <p>Session users:</p>
          <ul>{users}</ul>
          <button onClick={() => this.handleStartGameClick()}>
            Start Game!
          </button>
        </div>
      );
    } else if (this.state.playerTurn === "setup") {
      return (
        <div>
          You are in the {this.state.playerTurn} step <br />
          Here is your grid:
          {/* {playerAGrid} */}
        </div>
      );
    } else {
      return <div>THIS SHOULD NEVER HAPPEN</div>;
    }
  }
}
