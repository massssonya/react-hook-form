import { useForm } from "react-hook-form";
import { object, TypeOf, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, KeyboardEvent } from "react";

export const useGameForm = (regex: RegExp) => {

	const zInput = string().max(1).min(1).regex(regex);

	const schema = object({
		input1: zInput,
		input2: zInput,
		input3: zInput,
		input4: zInput,
		input5: zInput
	});

	type Schema = TypeOf<typeof schema>;
	type KeySchema = keyof Schema;

	const [currentInput, setCurrentInput] = useState<KeySchema>("input1")

	function setNextCurrentInput(index: number) {
		setCurrentInput(currentInput === "input5" ? "input5" : getNameInputForm(index + 1))
	}

	function setPrevCurrentInput(index: number) {
		setCurrentInput(currentInput === "input1" ? "input1" : getNameInputForm(index - 1))
	}

	const initForm = {
		input1: "",
		input2: "",
		input3: "",
		input4: "",
		input5: ""
	};

	const { register, handleSubmit, setFocus, setValue, reset  } = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: "all"
	});

	function getDefaultValues(str: string | undefined): Schema {
		const result = initForm;
		if (str) {
			for (let i = 0; i < str.length; i++) {
				result[`input${i + 1}` as KeySchema] = str[i];
			}
		}
		return result;
	}

	function getNameInputForm(value: number) {
		return `input${value}` as KeySchema;
	}

	const handleScreenKeyboardClick = (value: string, submit: ({ }: Schema) => void) => {
		const isLetter = regex.test(value);
		const index = Number(currentInput.split("input")[1])

		switch (value) {
			case "Enter":
				handleSubmit(submit)();
				// setCurrentInput("input1")
				break;
			default:
				const nextCell = getNameInputForm(index);
				if (isLetter) {
					setValue(currentInput, value)
					setNextCurrentInput(index)
				}
				setFocus(nextCell);
		}

	}

	const handleKeyDown = (e: KeyboardEvent, index: number, submit: ({ }: Schema) => void) => {
		e.preventDefault();
		const isLetter = regex.test(e.key);
		let prevCell: KeySchema;
		let nextCell: KeySchema;

		switch (e.key) {
			case "Enter":
				handleSubmit(submit)();
				// setCurrentInput("input1")
				break;
			case "Backspace":
				prevCell = getNameInputForm(index);
				setValue(currentInput, "");
				setFocus(prevCell);
				setPrevCurrentInput(index + 1);
				break;
			case "ArrowRight":
				nextCell = getNameInputForm(index + 2);
				setNextCurrentInput(index + 1)
				setFocus(nextCell)
				break;
			case "ArrowLeft":
				prevCell = getNameInputForm(index);
				setPrevCurrentInput(index + 1);
				setFocus(prevCell);
				break
			default:
				nextCell = getNameInputForm(index + 2);
				if (isLetter) {
					setValue(currentInput, e.key);
					setNextCurrentInput(index + 1)
				}
				setFocus(nextCell);
				break;
		}
	};


	return { register, handleSubmit, setFocus, setValue, getDefaultValues, getNameInputForm, reset, schema, currentInput, setCurrentInput, handleKeyDown, handleScreenKeyboardClick }
}