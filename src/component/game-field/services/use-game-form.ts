import { useForm } from "react-hook-form";
import { object, TypeOf, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

	const initForm = {
		input1: "",
		input2: "",
		input3: "",
		input4: "",
		input5: ""
	};

	const { register, handleSubmit, setFocus, setValue, reset } = useForm<Schema>({
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


	return { register, handleSubmit, setFocus, setValue, getDefaultValues, getNameInputForm, reset, schema }
}