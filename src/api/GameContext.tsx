import { createContext, useContext, useState, ReactNode } from "react";
import { IGameState, TLetters, TStatusSymbol } from "../types";

interface IGameContext {
    data: IGameState;
    saveGameState: (state: IGameState) => void;
    initGameState: (answer: string, counterAttempts: number) => void;
    sendWord: (value: string) => void;
}

const initValues: IGameState = {
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
}

const GameContext = createContext<IGameContext>({} as IGameContext)

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<IGameState>(initValues)

    const saveGameState = (state: IGameState) => {
        setData(_ => ({
            ...state
        }))
    }

    const initGameState = (answer: string, counterAttempts: number) => {
        setData(prev => ({
            ...prev,
            answer: answer,
            counterAttempts: counterAttempts
        }))
    }

    const sendWord = (value: string) => {
        const isWin = wordIsAnswer(value, data.answer)
        setData(prev => ({
            ...prev,
            attempts: [...prev.attempts, {
                word: value,
                status: symbolInWord(value, prev.answer)
            }],
            letters: filterLetters(value, prev.answer, prev.letters),
            currentStep: prev.currentStep + 1,
            counterAttempts: prev.counterAttempts - 1,
            isWin: isWin,
            isLose: !isWin && prev.counterAttempts == 1
        }))
        console.log(data.letters)
    }


    return (
        <GameContext.Provider value={{ data, saveGameState, initGameState, sendWord }}>
            {children}
        </GameContext.Provider>
    )

}

export const useGame = () => useContext(GameContext)

function symbolInWord(player_word: string, game_word: string): TStatusSymbol[] {
    let res: TStatusSymbol[] = []
    for (let i = 0; i < player_word.length; i++) {
        const currentSymbol = player_word[i]
        if (game_word.includes(currentSymbol)) {
            if (currentSymbol === game_word[i]) {
                res.push("onSite")
            } else res.push("inWord")
        } else res.push("noSymbol")
    }
    return res
}

function wordIsAnswer(word: string, answer: string,) {
    return word === answer
}

function filterLetters(word: string, answer: string, letters: TLetters) {
    let newLetters = letters
    for (let i = 0; i < word.length; i++) {
        const currentSymbol = word[i];
        if (answer.includes(currentSymbol)) {
            if (currentSymbol === answer[i] && !newLetters.onSite.includes(currentSymbol)) {
                newLetters.onSite.push(currentSymbol)
            } else if (!newLetters.inWord.includes(currentSymbol)) { newLetters.inWord.push(currentSymbol) }
        } else if ((!newLetters.noSymbol.includes(currentSymbol))) newLetters.noSymbol.push(currentSymbol)
    }
    return newLetters
}