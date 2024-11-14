import { getRandomWord } from "./get-random-word";
import { Languages, WORDS } from "../constants";

export function startGame(language: Languages, startGameState: (answer: string, counterAttempts: number, language: Languages) => void) {
    const answer = getRandomWord(WORDS);
    const counterAttempts = answer.length;
    startGameState(answer, counterAttempts, language);
}