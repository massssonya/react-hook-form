import { createContext, useContext, useState, ReactNode } from "react";
import { IGameState, TLetters, TStatusSymbol } from "../types";
import { Languages } from "../constants";

interface IGameContext {
	data: IGameState;
	changeLanguageState: () => void;
	saveGameState: (state: IGameState) => void;
	initGameState: (answer: string, counterAttempts: number) => void;
	startGameState: (answer: string, counterAttempts: number, lang: Languages) => void;
	sendWord: (value: string) => void;

}

const initValues: IGameState = {
	language: Languages.RU,
	answer: "",
	attempts: [],
	counterAttempts: 6,
	counterRows: 6,
	currentStep: 0,
	letters: {
		inWord: [],
		onSite: [],
		noSymbol: []
	},
	isWin: false,
	isLose: false
};

const GameContext = createContext<IGameContext>({} as IGameContext);

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const [data, setData] = useState<IGameState>(initValues);

	const saveGameState = (state: IGameState) => {
		setData(() => ({
			...state
		}));
	};

	const initGameState = (answer: string, counterAttempts: number) => {
		setData((prev) => ({
			...prev,
			answer: answer,
			counterAttempts: counterAttempts
		}));
	};

	const startGameState = (answer: string, counterAttempts: number, lang: Languages) => {
		setData(() => ({
			language: lang,
			answer: answer,
			attempts: [],
			counterAttempts: counterAttempts+1,
			counterRows: counterAttempts+1,
			currentStep: 0,
			letters: {
				inWord: [],
				onSite: [],
				noSymbol: []
			},
			isWin: false,
			isLose: false
		}));
	};

	const changeLanguageState = () => {
		setData((prev) => ({
			...prev,
			language: prev.language === Languages.RU ? Languages.EN : Languages.RU
		}))
	}

	const sendWord = (value: string) => {
		const isWin = wordIsAnswer(value, data.answer);
		setData((prev) => ({
			...prev,
			attempts: [
				...prev.attempts,
				{
					word: value,
					status: symbolInWord(value, prev.answer)
				}
			],
			letters: filterLetters(value, prev.answer, prev.letters),
			currentStep: prev.currentStep + 1,
			counterAttempts: prev.counterAttempts - 1,
			isWin: isWin,
			isLose: !isWin && prev.counterAttempts == 1
		}));
	};

	return (
		<GameContext.Provider
			value={{ data, saveGameState, initGameState, sendWord, startGameState, changeLanguageState }}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = () => useContext(GameContext);

function symbolInWord(player_word: string, game_word: string): TStatusSymbol[] {
	const res: TStatusSymbol[] = [];
	for (let i = 0; i < player_word.length; i++) {
		const currentSymbol = player_word[i];
		if (game_word.includes(currentSymbol)) {
			if (currentSymbol === game_word[i]) {
				res.push("onSite");
			} else res.push("inWord");
		} else res.push("noSymbol");
	}
	return res;
}

function wordIsAnswer(word: string, answer: string) {
	return word === answer;
}

function filterLetters(word: string, answer: string, letters: TLetters) {
	const newLetters = letters;
	for (let i = 0; i < word.length; i++) {
		const currentSymbol = word[i];
		if (answer.includes(currentSymbol)) {
			if (
				currentSymbol === answer[i] &&
				!newLetters.onSite.includes(currentSymbol)
			) {
				newLetters.onSite.push(currentSymbol);
			} else if (!newLetters.inWord.includes(currentSymbol)) {
				newLetters.inWord.push(currentSymbol);
			}
		} else if (!newLetters.noSymbol.includes(currentSymbol))
			newLetters.noSymbol.push(currentSymbol);
	}
	return newLetters;
}
