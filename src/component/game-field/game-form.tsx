import { TypeOf } from "zod";
import { useEffect, KeyboardEvent } from "react";
import clsx from "clsx";

import { GameCell } from "./game-cell";
import { IGameState } from "../../types";
import { LANG_REGEX, WORDS } from "../../constants";
import { UIMessage } from "../ui";
import { useGameForm, useShowMessage } from "./services";

export const GameForm = ({
	symbols,
	indexForm,
	activeForm,
	gameState,
	sendWord,
	saveGameState
}: {
	symbols: string[];
	indexForm: number;
	activeForm: boolean;
	gameState: IGameState;
	sendWord: (text: string) => void;
	saveGameState: (state: IGameState) => void;
}) => {
	const { attempts, currentStep, language, answer, placeholders } = gameState;
	const regex = LANG_REGEX[language]

	const { register, handleSubmit, setFocus, setValue, getDefaultValues, getNameInputForm, reset, schema } = useGameForm(regex)
	const { show: showError, showMessage: showMessageError } = useShowMessage(5);

	type Schema = TypeOf<typeof schema>;
	type KeySchema = keyof Schema;

	const defaultValues = getDefaultValues(attempts[indexForm]?.word);
	const styleActiveForm = activeForm && gameState.gameStatus!=="win" ? "bg-slate-400" : "";
	const disabledCell = !activeForm || gameState.gameStatus=="win";

	useEffect(() => {
		setFocus("input1");
	}, [currentStep]);

	useEffect(() => {
		reset()
	}, [answer])

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		e.preventDefault();
		const currentCell = getNameInputForm(index + 1);
		const isLetter = regex.test(e.key);
		let prevCell: KeySchema;
		let nextCell: KeySchema;

		switch (e.key) {
			case "Enter":
				handleSubmit(submit)();
				break;
			case "Backspace":
				prevCell = getNameInputForm(index);
				setValue(currentCell, "");
				setFocus(prevCell);
				break;
			case "ArrowRight":
				nextCell = getNameInputForm(index + 2);
				setFocus(nextCell ?? currentCell)
				break;
			case "ArrowLeft":
				prevCell = getNameInputForm(index);
				setFocus(prevCell ?? currentCell);
				break
			default:
				nextCell = getNameInputForm(index + 2);
				if (isLetter) {
					setValue(currentCell, e.key);
				}
				setFocus(isLetter ? nextCell : currentCell);
				break;
		}
	};

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
					"flex flex-row justify-evenly py-2",
					styleActiveForm
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
						onKeyDown={(e) => handleKeyDown(e, index)}
						disabled={disabledCell}
						className="w-12 h-12 text-center text-3xl uppercase"
						maxLength={1}
						status={
							!activeForm ? attempts[indexForm]?.status[index] : "default"
						}
						index={index+1}
						placeholder={placeholders[index]}
					/>
				))}
				<input type="submit" className="hidden" />
			</form>
		</>
	);
};
