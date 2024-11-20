import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"

import { GameField, GameNavMenu, GameOverModule } from "../component/game-field";
import { useGame } from "../api/game-context";
import { startGame } from "../utils";

export const Game = () => {
	const navigate = useNavigate()
	const { data, startGameState, openLetter } = useGame()
	const { language, gameStatus } = data

	function onStartGame() {
		startGame(language, startGameState)
	}

	useEffect(() => {	
		if (data.answer === "") {
			navigate("/")
		}
	}, [])

	return (
		<>
		<GameNavMenu 
			className="w-full h-16 "
			openLetter={openLetter}/>
		<div className="h-screen flex flex-col items-center justify-center">
			

			<GameField />
			{gameStatus === "win" && 
			<Confetti 
				recycle={false} 
				numberOfPieces={1000} 
				gravity={0.1}
				className="w-full "
				 />}
			{(["win", "lose"].includes(gameStatus)) && (
					<GameOverModule
						answer={data.answer}
						onClickExit={() => navigate("/")}
						onClickNewGame={onStartGame}
						result={gameStatus}

					/>
			)
			}
		</div>
		</>
	);
};
