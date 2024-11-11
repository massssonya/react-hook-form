import "./App.css";
import { useNavigate } from "react-router-dom";
import { UIButton } from "./component/ui";
import { useGame } from "./api/game-context";
import { getRandomWord } from "./utils/get-random-word";
import { Languages, WORDS } from "./constants";

function App() {
	const navigate = useNavigate();
	const { startGameState, changeLanguageState, data } = useGame();
	const { answer } = data;
	function startGame() {
		const answer = getRandomWord(WORDS);
		const counterAttempts = answer.length;
		startGameState(answer, counterAttempts, Languages.RU);
		navigate("/game");
	}
	return (
		<div className="flex w-full h-screen justify-center items-center">
			<div className="px-3 py-5 flex flex-col gap-4">
				{answer && (
					<UIButton onClick={() => navigate("/game")}>Продолжить игру</UIButton>
				)}

				<UIButton onClick={startGame}>Новая игра</UIButton>
				<UIButton onClick={changeLanguageState}>Язык: {data.language}</UIButton>
			</div>
		</div>
	);
}

export default App;
