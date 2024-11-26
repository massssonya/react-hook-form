import { useNavigate } from "react-router-dom";
import { UIButton } from "../component/ui";
import { useGame } from "../api/game-context";
import { startGame } from "../utils";
import { useAnimate } from "../animate";
import clsx from "clsx";


export const Home = () => {
	const {
		btnNewGameAnimate,
		btnChangeLanguageAnimate,
		btnContinueAnimate,
		headerTextAnimate,
		headerAnimate
	} = useAnimate()
	const navigate = useNavigate();
	const { startGameState, changeLanguageState, data } = useGame();
	const { language, gameStatus, answer } = data;

	const headerText = headerAnimate("Wordle").map(span => span)

	function onStartGame() {
		startGame(language, startGameState)
		navigate("/game");
	}
	return (
		<div className="flex w-full h-screen justify-center items-center">
			<div className={clsx("absolute flex flex-row", headerTextAnimate)}>{headerText}</div>
			<div className={clsx("px-3 py-5 flex flex-col gap-4 z-10 ")}>
				{(gameStatus == "active" && answer) && (
					<UIButton
						className={clsx(btnContinueAnimate)}
						onClick={() => navigate("/game")}>Продолжить игру</UIButton>
				)}

				<UIButton
					className={clsx(btnNewGameAnimate)}
					onClick={onStartGame}>
					Новая игра
				</UIButton>
				<UIButton
					className={clsx(btnChangeLanguageAnimate)}
					onClick={changeLanguageState}>
					Язык: {language}
				</UIButton>
			</div>
		</div>
	);
}
