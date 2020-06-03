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
      playerAGrid: [],
      playerBGrid: [],
      playerAHealth: 0,
      playerBHealth: 0
    };
  }

  onSessionDataChanged(data) {
    console.log("onSessionDataChanged", data);
    this.setState({
      playerTurn: data.playerTurn,
      playerAGrid: data.playerAGrid,
      playerBGrid: data.playerBGrid,
      playerAHealth: data.playerAHealth,
      playerBHealth: data.playerBHealth
    });
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
      playerAHealth: 2,
      playerBHealth: 2,
      playerTurn: "setup"
    });
  }

  handleAttackStep(currentUserId, creatorId) {
    if (currentUserId === creatorId) {
      //
    } else {
    }
    // this.getSessionDatabaseRef().update({

    // })
  }

  handleClickOnNumber(rowIdx, numIdx, currentUserId, creatorId) {
    console.log("clicked on", rowIdx, numIdx);
    var grid = [];
    if (currentUserId === creatorId) {
      grid = this.state.playerAGrid;
      grid[rowIdx][numIdx] = 1;
      this.setState({ playerAGrid: grid });
    } else {
      grid = this.state.playerBGrid;
      grid[rowIdx][numIdx] = 1;
      this.setState({ playerBGrid: grid });
    }
  }

  render() {
    var sessionId = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var currentUserId = this.getMyUserId();
    var currentUserName = UserApi.getName(currentUserId);
    var creatorId = this.getSessionCreatorUserId();
    var creatorName = UserApi.getName(this.getSessionCreatorUserId());

    if (this.state.playerTurn === "initial") {
      return (
        <div>
          You are in the {this.state.playerTurn} step
          <p>My name is: {currentUserName}</p>
          <p>Session ID: {sessionId}</p>
          <p>Session creator: {creatorName}</p>
          <p>Session users:</p>
          <ul>{users}</ul>
          <button onClick={() => this.handleStartGameClick()}>
            Start Game!
          </button>
        </div>
      );
    } else if (this.state.playerTurn === "setup") {
      var grid = [];
      var health;
      if (currentUserId === creatorId) {
        grid = this.state.playerAGrid;
        health = this.state.playerAHealth;
      } else {
        grid = this.state.playerBGrid;
        health = this.state.playerBHealth;
      }
      return (
        <div>
          You are in the {this.state.playerTurn} step <br />
          <br />
          Here is your grid:
          {grid.map((row, rowIdx) => {
            return (
              <div>
                {row.map((num, numIdx) => {
                  return (
                    <span
                      onClick={() =>
                        this.handleClickOnNumber(
                          rowIdx,
                          numIdx,
                          currentUserId,
                          creatorId
                        )
                      }
                    >
                      {num + " "}
                    </span>
                  );
                })}
              </div>
            );
          })}
          <button
            onClick={() => this.handleAttackStep(currentUserId, creatorId)}
          >
            Ready to Attack!
          </button>
        </div>
      );
    } else {
      return <div>THIS SHOULD NEVER HAPPEN</div>;
    }
  }
}
