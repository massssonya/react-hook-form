import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameField, GameOverModule } from "../component/game-field";
import { useGame } from "../api/game-context";
import { startGame } from "../utils";

export const Game = () => {
	const navigate = useNavigate()
	const { data, startGameState } = useGame()
	const { language } = data

	function onStartGame() {
		startGame(language, startGameState)
	}

	useEffect(() => {
		if (data.answer === "") {
			navigate("/")
		}
	})
	return (
		<>
			<GameField />
			<GameOverModule answer={data.answer} onClickExit={() => navigate("/")} onClickNewGame={onStartGame} />
		</>
	);
};
