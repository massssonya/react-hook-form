import { TypeOf } from "zod";
import { useEffect } from "react";
import clsx from "clsx";

import { GameCell } from "./game-cell";
import { IGameState } from "../../types";
import { LANG_REGEX, WORDS } from "../../constants";
import { UIMessage } from "../ui";
import { useAnimate, useGameForm, useShowMessage } from "./services";

export const GameForm = ({
	symbols,
	indexForm,
	activeForm,
	gameState,
	sendWord,
	saveGameState,
	letterScreenKeyboard,
	clickScreenKeyboard
}: {
	symbols: string[];
	indexForm: number;
	activeForm: boolean;
	gameState: IGameState;
	sendWord: (text: string) => void;
	saveGameState: (state: IGameState) => void;
	letterScreenKeyboard: string;
	clickScreenKeyboard: (value:string) => void;
}) => {
	
	const { attempts, currentStep, language, answer, placeholders } = gameState;
	const regex = LANG_REGEX[language]

	const { register, handleSubmit, setFocus, getDefaultValues, getNameInputForm, reset, schema, currentInput, setCurrentInput, handleKeyDown, handleScreenKeyboardClick } = useGameForm(regex)
	const { show: showError, showMessage: showMessageError } = useShowMessage(5);

	type Schema = TypeOf<typeof schema>;

	const {activeFormAnimate} = useAnimate(currentStep)
	
	const defaultValues = getDefaultValues(attempts[indexForm]?.word);
	// const styleActiveForm = activeForm && gameState.gameStatus!=="win" ? activeFormAnimate : "";
	const disabledCell = !activeForm || gameState.gameStatus=="win";

	useEffect(() => {
		setFocus(currentInput);
	}, [currentStep]);

	useEffect(() => {
		reset()
	}, [answer])

	useEffect(() => {
		handleScreenKeyboardClick(letterScreenKeyboard, submit)
		return() => clickScreenKeyboard("")
	}, [letterScreenKeyboard])

	const submit = (data: Schema) => {
		const word = Object.values(data).join("");
		if (!WORDS.includes(word)) {
			showError();
			return;
		}
		saveGameState(gameState);
		sendWord(word);
	};

	return (
		<>
			{showMessageError && (
				<UIMessage
					message="Такого слова нет. Попробуйте другое слово"
					msgType="error"
					className="absolute -top-12 right-1/2 left-1/2 -translate-x-1/2 w-full"
				/>
			)}
			<form
				onSubmit={handleSubmit(submit)}
				className={clsx(
					"z-10 flex flex-row justify-evenly py-2",
					// styleActiveForm,
				
				)}
			>
				{symbols.map((_, index) => (
					<GameCell
						key={`input${indexForm}_${index + 1}`}
						{...register(getNameInputForm(index + 1), {
							value:
								indexForm < currentStep
									? defaultValues[getNameInputForm(index + 1)]
									: ""
						})}
						type="text"
						onKeyDown={(e) => handleKeyDown(e, index, submit)}
						onClick={() => setCurrentInput(getNameInputForm(index+1))}
						disabled={disabledCell}
						className="w-12 h-12 text-center text-3xl uppercase"
						maxLength={1}
						status={
							!activeForm ? attempts[indexForm]?.status[index] : "default"
						}
						index={index+1}
						placeholder={ activeForm ? placeholders[index] : ""}

					/>
				))}
				<input type="submit" className="hidden" />
			</form>
			{activeForm && (<div className={clsx("absolute bg-slate-400 w-full h-16 py-2 z-0", activeFormAnimate)}/>)}
		</>
	);
};
