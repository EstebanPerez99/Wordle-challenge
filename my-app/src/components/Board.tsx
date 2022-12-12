type Props = {
	board: { char: string; color: string }[][];
	guessCounter: number;
	win: boolean;
};
export default function Board({ board, guessCounter, win }: Props) {
	return (
		<div className='board' style={{ marginTop: "2rem" }}>
			{board.map((row, idx) => (
				<div key={idx + Math.floor(Math.random() * 100000)} className='row'>
					{row.map((col, idx2) => (
						<div
							key={idx2 + Math.floor(Math.random() * 100000)}
							className={`col ${guessCounter === idx ? "azul" : null} ${
								col.color
							}`}
						>
							{col.char}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
