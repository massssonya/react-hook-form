import { useEffect } from "react"
import { GameForm } from "./game-form"
import { useGame } from "../../api/GameContext";
import { GameLetters } from "./game-letters";

export const GameField = (
    {
        answer,
        counterAttempts
    }: {
        answer: string;
        counterAttempts: number
    }) => {
    const { data, saveGameState, initGameState, sendWord } = useGame()

    useEffect(() => {
        if (data.answer === "") initGameState(answer, counterAttempts)
        console.log("render")
    }, [answer])

    const template = new Array(data.counterRows).fill(null)
    const SYMBOL_ARRAY = answer.split("")

    return (
        <div className="w-full flex flex-col items-center">
            {data.isWin && <h3>победа</h3>}
            {data.isLose && <h3>поражение</h3>}
            <div className=" flex flex-col w-[400px] bg-slate-800">
                {template.map((_, index) => (
                    <GameForm
                        key={`form_${index}`}
                        activeForm={data.currentStep === index}
                        symbols={SYMBOL_ARRAY}
                        indexForm={index}
                        gameState={data}
                        sendWord={sendWord}
                        saveGameState={saveGameState}
                    />

                ))}
            </div>
            <GameLetters statusLetter={data.letters}/>
        </div>
    )
}