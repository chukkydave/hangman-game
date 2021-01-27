import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import { randomWord } from './words';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [
			img0,
			img1,
			img2,
			img3,
			img4,
			img5,
			img6,
		],
		maxGuesses: randomWord().length,
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
		this.handleGuess = this.handleGuess.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer.split('').map(
			(ltr) =>

					this.state.guessed.has(ltr) ? ltr :
					'_',
		);
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt.target.value;
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong:
				st.nWrong +
				(
					st.answer.includes(ltr) ? 0 :
					1),
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr, idx) => (
			<button
				value={ltr}
				onClick={this.handleGuess}
				disabled={this.state.guessed.has(ltr)}
				key={ltr}
			>
				{ltr}
			</button>
		));
	}

	handleReload = () => {
		this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
	};

	/** render: render game */
	render() {
		let status;
		if (this.state.nWrong === this.props.maxGuesses) {
			status = true;
		} else {
			status = false;
		}
		const isWinner = this.guessedWord().join('') === this.state.answer;
		const gameOver = this.state.nWrong >= this.props.maxWrong;
		let gameState = this.generateButtons();
		if (gameOver) gameState = 'You Loose!!';
		if (isWinner) gameState = 'You Win!!';
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img
					alt={`${this.state.nWrong} wrong guesses`}
					src={this.props.images[this.state.nWrong]}
				/>
				<p>Number Wrong: {this.state.nWrong}</p>
				<p className="Hangman-word">
					{
						gameOver ? this.state.answer :
						this.guessedWord()}
				</p>
				{
					status ? <p>You Loose!!</p> :
					<p className="Hangman-btns">{gameState}</p>}

				<button id="reset" onClick={this.handleReload}>
					Restart
				</button>
			</div>
		);
	}
}

export default Hangman;
