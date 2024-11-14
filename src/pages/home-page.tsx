import { useNavigate } from "react-router-dom";
import { UIButton } from "../component/ui";
import { useGame } from "../api/game-context";
import { startGame } from "../utils";

export const Home = () => {
	const navigate = useNavigate();
	const { startGameState, changeLanguageState, data } = useGame();
	const { answer, language } = data;
	
	function onStartGame() {
		startGame(language, startGameState)
		navigate("/game");
	}
	return (
		<div className="flex w-full h-screen justify-center items-center">
			<div className="px-3 py-5 flex flex-col gap-4">
				{answer && (
					<UIButton onClick={() => navigate("/game")}>Продолжить игру</UIButton>
				)}

				<UIButton onClick={onStartGame}>Новая игра</UIButton>
				<UIButton onClick={changeLanguageState}>Язык: {language}</UIButton>
			</div>
		</div>
	);
}
