import { GameForm } from "./game-form"
import { useGame } from "../../api/game-context";
import { GameLetters } from "./game-letters";

export const GameField = () => {
    const { data, saveGameState, sendWord } = useGame()
    // const [letterScreenKeyboard, setLetterScreenKeyboard] = useState("")

    const template = new Array(data.counterRows).fill(null)
    const SYMBOL_ARRAY = data.answer.split("")

    // useEffect(() => {
    //     const letter = setLetterScreenKeyboard()
    //     setLetterScreenKeyboard()
    // })

    // function clickScreenKeyboard(e:KeyboardEvent){
    //     setLetterScreenKeyboard(e.key)
    // }

    return (
        <div className="relative flex flex-col items-center">
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
                        // letterScreenKeyboard={letterScreenKeyboard}
                    />

                ))}
            </div>
            <GameLetters 
                statusLetter={data.letters}
                // clickScreenKeyboard={clickScreenKeyboard}
            />
        </div>
    )
}
