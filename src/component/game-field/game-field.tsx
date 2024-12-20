import { useState } from "react";
import { GameForm } from "./game-form"
import { useGame } from "../../api/game-context";
import { GameLetters } from "./game-letters";
import { useAnimate } from "./services";
import clsx from "clsx";

export const GameField = () => {
    const { data, saveGameState, sendWord } = useGame()
    const handleAnimate = useAnimate()

    const [letterScreenKeyboard, setLetterScreenKeyboard] = useState("")

    const template = new Array(data.counterRows).fill(null)
    const SYMBOL_ARRAY = data.answer.split("")

    function clickScreenKeyboard(value:string){
        setLetterScreenKeyboard(value)
    }

    return (
        <div className={clsx("relative flex flex-col items-center", handleAnimate.gameDisplayAnimate)}>
            <div className="flex flex-col w-[400px] bg-slate-800">
                {template.map((_, index) => (
                    <GameForm
                        key={`form_${index}`}
                        activeForm={data.currentStep === index}
                        symbols={SYMBOL_ARRAY}
                        indexForm={index}
                        gameState={data}
                        sendWord={sendWord}
                        saveGameState={saveGameState}
                        letterScreenKeyboard={data.currentStep == index ? letterScreenKeyboard : ""}
                        clickScreenKeyboard={clickScreenKeyboard}
                    />

                ))}
            </div>
            <GameLetters 
                statusLetter={data.letters}
                clickScreenKeyboard={clickScreenKeyboard}
                language={data.language}
                animate={[handleAnimate.keyboardRef, handleAnimate.letterAnimate]}
            />
        </div>
    )
}
