import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import "./App.css";
import Board from "./components/Board";

const words = [
	"tambo",
	"carro",
	"tarot",
	"jarro",
	"tarro",
	"casco",
	"larba",
	"dardo",
	"funko",
	"sidra",
	"zebra",
	"listo",
];
const WORDS_LENGTH = 5;
const ATTEMPTS = 5;

function App() {
	const [board, setBoard] = useState<{ char: string; color: string }[][]>([]);
	const [win, setWin] = useState(false);
	const [currentInput, setCurrentInput] = useState("");
	const [guessCounter, setGuessCounter] = useState(0);
	const [word, setWord] = useState<null | string>(null);
	const [wordAnswer, setWordAnswer] = useState<any>(null);

	useEffect(() => {
		const selectedWord = words[Math.floor(Math.random() * words.length)];
		setWord(selectedWord);
		const answer: any = {};
		selectedWord.split("").forEach((char, idx) => {
			if (!answer[char]) {
				answer[char] = { count: 0, position: [] };
			}
			answer[char].count = answer[char].count + 1;
			answer[char].position.push(idx);
		});
		setWordAnswer(answer);

		generateBoard();
	}, []);

	const generateBoard = () => {
		const rows = Array.from(Array(ATTEMPTS).keys());
		const cols = Array.from(Array(WORDS_LENGTH).keys()).map(() => {
			return { char: "", color: "" };
		});
		const initialBoard = rows.map(() => [...cols]);
		setBoard(initialBoard);
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		if (input.length <= 5) {
			setCurrentInput(input);
			const inputArray = input.toLowerCase().split("");
			const newRow = [
				{ char: "", color: "" },
				{ char: "", color: "" },
				{ char: "", color: "" },
				{ char: "", color: "" },
				{ char: "", color: "" },
			];
			newRow.forEach((col, idx) => {
				newRow[idx] = {
					char: inputArray[idx] ? inputArray[idx] : "",
					color: "",
				};
			});
			setBoard((prevState) => {
				prevState[guessCounter] = newRow;
				return prevState;
			});
		}
	};

	const onCLick = () => {
		if (guessCounter <= ATTEMPTS) {
			const guessDetails = [...board[guessCounter]];
			const res = { ...wordAnswer };
			if (currentInput === word) {
				guessDetails.forEach((objRes, idx) => {
					guessDetails[idx].color = "win";
				});
				setBoard((prevState) => {
					prevState[guessCounter] = guessDetails;
					return prevState;
				});
				setWin(true);
				setCurrentInput("");
			} else {
				//check colors
				console.log("res1");
				console.log(res);
				guessDetails.forEach((objRes, idx) => {
					if (
						res[objRes.char] &&
						res[objRes.char].count &&
						res[objRes.char].position.includes(idx)
					) {
						// esto se have para hacer un deep copy del objeto! si no causa problemas y modifica el estado original
						res[objRes.char] = { ...res[objRes.char] };
						guessDetails[idx].color = "fillGreen";
						res[objRes.char].count = res[objRes.char].count - 1;
					}
				});
				console.log("res2");
				console.log(res);

				guessDetails.forEach((objRes, idx) => {
					if (guessDetails[idx].color === "") {
						if (res[objRes.char] && res[objRes.char].count) {
							res[objRes.char] = { ...res[objRes.char] };
							guessDetails[idx].color = "fillYellow";
							res[objRes.char].count = res[objRes.char].count - 1;
						} else {
							guessDetails[idx].color = "fillGray";
						}
					}
				});

				setBoard((prevState) => {
					prevState[guessCounter] = guessDetails;
					return prevState;
				});
				setGuessCounter(guessCounter + 1);
				setCurrentInput("");
			}
		} else {
			console.log("perdiste");
		}
	};

	return (
		<div className='wrapper'>
			{!Boolean(word) ? (
				"Loading..." // como lo llamamosa ninguna API esto no tiene sentido ahorita
			) : (
				<>
					<ReactConfetti
						run={win}
						tweenDuration={5000}
						recycle={false}
						numberOfPieces={300}
					/>
					<h1>Wordle</h1>
					<p>Palabra: {word}</p>
					<Board board={board} guessCounter={guessCounter} win={win} />
					<div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
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
					</div>
				</>
			)}
		</div>
	);
}

export default App;
