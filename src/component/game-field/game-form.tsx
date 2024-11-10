import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, KeyboardEvent } from "react";
import clsx from "clsx";

import { GameCell } from "./game-cell";
import { IGameState } from "../../types";
import { WORDS } from "../../constants";
import { UIMessage } from "../ui";
import { useShowMessage } from "./services";

const zInput = z
	.string()
	.max(1)
	.min(1)
	.regex(/^[a-zA-Zа-яА-Я]+$/);

const schema = z.object({
	input1: zInput,
	input2: zInput,
	input3: zInput,
	input4: zInput,
	input5: zInput
});

type Schema = z.TypeOf<typeof schema>;
type KeySchema = keyof Schema;

const initForm = {
	input1: "",
	input2: "",
	input3: "",
	input4: "",
	input5: ""
};

function stringToObj(str: string | undefined): Schema {
	const result = initForm;
	if (str) {
		for (let i = 0; i < str.length; i++) {
			result[`input${i + 1}` as KeySchema] = str[i];
		}
	}
	return result;
}

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
	const { show: showError, showMessage: showMessageError } = useShowMessage(5);
	const { attempts, currentStep } = gameState;
	const defaultValues = stringToObj(attempts[indexForm]?.word);
	const { register, handleSubmit, setFocus, setValue } = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: "all"
	});

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		e.preventDefault();
		const currentCell = `input${index + 1}` as KeySchema;
		const isLetter = /^[а-яА-Я]$/.test(e.key);
		let prevCell: KeySchema;
		let nextCell: KeySchema;

		switch (e.key) {
			case "Enter":
				handleSubmit(submit)();
				return;
			case "Backspace":
				prevCell = `input${index}` as KeySchema;
				setValue(currentCell, "");
				setFocus(prevCell);
				return;
			default:
				nextCell = `input${index + 2}` as KeySchema;
				if (isLetter) {
					setValue(currentCell, e.key);
				}
				setFocus(isLetter ? nextCell : currentCell);
				return;
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

	useEffect(() => {
		setFocus("input1");
	}, [currentStep]);

	return (
		<>
			{showMessageError && (
				<UIMessage
					message="Такого слова нет. Попробуйте другое слово"
					className="absolute -top-12 right-1/2 left-1/2 -translate-x-1/2 w-full bg-red-500/50"
				/>
			)}
			<form
				onSubmit={handleSubmit(submit)}
				className={clsx(
					"flex flex-row justify-evenly py-2",
					activeForm && !gameState.isWin ? "bg-slate-400" : ""
				)}
			>
				{symbols.map((_, index) => (
					<GameCell
						key={`input${indexForm}_${index + 1}`}
						{...register(`input${index + 1}` as KeySchema, {
							value:
								indexForm < currentStep
									? defaultValues[`input${index + 1}` as KeySchema]
									: ""
						})}
						type="text"
						onKeyDown={(e) => handleKeyDown(e, index)}
						disabled={!activeForm || gameState.isWin}
						className="w-12 h-12 text-center text-3xl uppercase"
						maxLength={1}
						status={
							!activeForm ? attempts[indexForm]?.status[index] : "default"
						}
					/>
				))}
				<input type="submit" className="hidden" />
			</form>
		</>
	);
};
