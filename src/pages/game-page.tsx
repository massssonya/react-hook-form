import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"
import { GameField, GameOverModule } from "../component/game-field";
import { useGame } from "../api/game-context";
import { startGame } from "../utils";

export const Game = () => {
	const navigate = useNavigate()
	const { data, startGameState } = useGame()
	const { language, gameStatus } = data

	function onStartGame() {
		startGame(language, startGameState)
	}

	useEffect(() => {
		if (data.answer === "") {
			navigate("/")
		}
	})
	return (
		<div className="relative h-screen flex flex-col items-center justify-center">
			{data.answer}
			<GameField />
			{gameStatus === "win" && 
			<Confetti 
				recycle={false} 
				numberOfPieces={1000} 
				gravity={0.1}
				className="w-full "
				 />}
			{(["win", "lose"].includes(gameStatus)) && (
				<>
					<GameOverModule
						answer={data.answer}
						onClickExit={() => navigate("/")}
						onClickNewGame={onStartGame}
						result={gameStatus}

					/>
				</>
			)
			}
		</div>
	);
};
