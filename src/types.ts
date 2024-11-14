import { Languages } from "./constants";

export type TPlayer = {
    name: string;
    rating: number;
    id: string;
}

export type TData = {
    countCells: number;
    time: number;
    players: TPlayer[] | []
}

export type TStatusSymbol = "default" | "onSite" | "inWord" | "noSymbol"

export type TGameStatus = "win" | "lose" | "active"

type TAttempt = {
    word: string;
    status: TStatusSymbol[]
}

export type TLetters = {
    inWord: string[];
    onSite: string[];
    noSymbol: string[]
}

export interface IGameState {
    language: Languages;
    answer: string;
    counterAttempts: number;
    counterRows:  number;
    attempts: [] | TAttempt[];
    letters: TLetters;
    placeholders: string[];
    currentStep: number;
    gameStatus: TGameStatus
}

