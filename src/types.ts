export type TPlayer = {
    name: string;
    rating: number;
    id: string;
}

export type TData = {
    // countPlayers: number;
    countCells: number;
    time: number;
    players: TPlayer[] | []
}

export type TStatusSymbol = "default" | "onSite" | "inWord" | "noSymbol"

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
    answer: string;
    counterAttempts: number;
    counterRows:  number;
    attempts: [] | TAttempt[];
    letters: TLetters;
    currentStep: number;
    isWin: boolean;
    isLose: boolean;
}

