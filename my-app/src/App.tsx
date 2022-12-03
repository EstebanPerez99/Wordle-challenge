import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

const words = ["carro", "tarot", "tambor"];
const WORDS_LENGTH = Array(5).join(".").split(".");
const ATTEMPTS = Array.from(Array(5).keys());

function App() {
	const [win, setWin] = useState(false);
	const [currentInput, setCurrentInput] = useState("");
	const [currentGuess, setCurrentGuess] = useState(0);
	const [allGuesses, setAllGuesses] = useState<string[]>(["", "", "", "", ""]);
	const [currentArrayWord, setCurrentArrayWord] = useState<string[]>([
		"",
		"",
		"",
		"",
		"",
	]);
	const [word, setWord] = useState<null | string>(null);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputArray = e.target.value.split("");

		if (inputArray.length <= WORDS_LENGTH.length) {
			setCurrentInput(e.target.value);
			let updatedGuesses = allGuesses;
			updatedGuesses[currentGuess] = e.target.value;
			setAllGuesses(updatedGuesses);

			const newGuess = ["", "", "", "", ""];
			inputArray.forEach((char, idx) => {
				newGuess[idx] = char;
			});
			setCurrentArrayWord(newGuess);
		}
	};

	const onCLick = () => {
		if (currentGuess <= 5) {
			if (currentInput === word) {
				setWin(true);
			} else {
				setCurrentGuess(currentGuess + 1);
				setCurrentInput("");
				setCurrentArrayWord(["", "", "", "", ""]);
			}
		} else {
			console.log("perdistes");
		}
	};

	useEffect(() => {
		const selectedWord = words[Math.floor(Math.random() * words.length)];
		setWord(selectedWord);
	}, []);

	return (
		<div className='wrapper'>
			{!Boolean(word) ? (
				"Loading..."
			) : (
				<>
					<h1>Jueguito XD</h1>
					<p>Palabra: {word}</p>
					<p>guess: {currentInput}</p>
					<Board
						allGuesses={allGuesses}
						WORDS_LENGTH={WORDS_LENGTH}
						currentArrayWord={currentArrayWord}
					/>
					<p>Adivina mi cuate:</p>
					<TextField
						label='Guess'
						variant='outlined'
						onChange={onChangeInput}
						value={currentInput}
					/>
					<Button
						variant='contained'
						style={{ marginTop: "1rem" }}
						onClick={onCLick}
						disabled={currentInput.length !== 5 || win}
					>
						TEST!
					</Button>
				</>
			)}
		</div>
	);
}

export default App;
