import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let message = "Click on an image to earn points, but don't click on any of them more than once!";

class App extends Component {
  state = {
    cards,
    correctGuesses,
    bestScore,
    message
  };

  // function to shuffle the cards
  shuffleArray = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  setClicked = id => {
    // Make a copy of the state cards array to work with
    const cards = this.state.cards;

    // Filter for the clicked match
    const clickedMatch = cards.filter(match => match.id === id);

    // If the card's clicked value is already true, do the game over.
    if (clickedMatch[0].clicked) {
      // console.log ("Correct Guesses: " + correctGuesses);
      // console.log ("Best Score: " + bestScore);

      correctGuesses = 0;
      message = "You already clicked that one. Game over. Try Again";

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      this.setState({ message });
      this.setState({ correctGuesses });
      this.setState({ cards });



      // Otherwise, if the clicked value = false, continue playing
    } else {
      // Set its clicked value to true
      clickedMatch[0].clicked = true;

      // increment the correctGuesses counter
      correctGuesses++;

      // if there is a new best score, set the new best score.
      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }

      // after each click, if the number of correct guesses is less than the number of cards
      // in the game, send a message and keep playing.
      if (correctGuesses < cards.length) {
        message = "Good Guess. Keep guessing until you get all of them!";

        // if all the cards have been guessed correctly.
      } else {
        message = "Well done! You got all of them. See if you can do it again!";
        // reset correct guesses to 0
        correctGuesses = 0;
        // reset all cards clicked values to false
        for (let i = 0; i < cards.length; i++) {
          cards[i].clicked = false;
        }
      }

      // Shuffle the array to be rendered in a random order
      this.shuffleArray(this.state.cards);

      // Set this.state.cards equal to the new cards array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ message });

    }
  };

  render() {
    // start with a shuffled array of cards
    this.shuffleArray(this.state.cards);

    return (
      <Wrapper>
        <Title>Clicky Game</Title>

        <h3 className="scoreSummary">{this.state.message}</h3>

        <h3 className="scoreSummary">
          Correct Guesses: {this.state.correctGuesses}
          <br />
          Best Score: {this.state.bestScore}
        </h3>

        {this.state.cards.map(match => (
          <Card
            setClicked={this.setClicked}
            id={match.id}
            key={match.id}
            image={match.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
