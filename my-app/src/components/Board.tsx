type Props = {
	allGuesses: string[];
	WORDS_LENGTH: string[];
	currentArrayWord: string[];
};
export default function Board({
	allGuesses,
	WORDS_LENGTH,
	currentArrayWord,
}: Props) {
	return (
		<div className='board'>
			{allGuesses.map((guess, idx) => (
				<div key={idx} className='row'>
					{guess !== ""
						? currentArrayWord.map((col) => <div className='col'>{col}</div>)
						: WORDS_LENGTH.map((col) => <div className='col'>{col}</div>)}
				</div>
			))}
		</div>
	);
}
