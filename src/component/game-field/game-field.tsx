import { GameForm } from "./game-form"
import { useGame } from "../../api/game-context";
import { GameLetters } from "./game-letters";

export const GameField = () => {
    const { data, saveGameState, sendWord } = useGame()

    const template = new Array(data.counterRows).fill(null)
    const SYMBOL_ARRAY = data.answer.split("")

    return (
        <div className="relative flex flex-col items-center">
            {data.answer}
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
