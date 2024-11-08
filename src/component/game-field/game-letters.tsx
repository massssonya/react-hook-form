import clsx from "clsx";
import { LETTERS } from "../../constants"
import { TLetters } from "../../types";
import { styleSymbol } from "./styles";
import { MouseEvent } from "react";

export const GameLetters = ({ statusLetter }: { statusLetter: TLetters }) => {
    function getLetterStatus(letter: string) {
        if (statusLetter.onSite.includes(letter)) {
            return "onSite"
        }
        if (statusLetter.inWord.includes(letter)) {
            return "inWord"
        }
        if (statusLetter.noSymbol.includes(letter)) {
            return "noSymbol"
        }
        return "default"
    }
    return (
        <div className="mt-4 flex flex-col items-center">
            <div className="flex gap-1">
                {LETTERS.slice(0, 12).map((letter, index) => (
                    <Letter 
                        key={`letter_${index}`} 
                        letter={letter} 
                        className="py-1 px-1" 
                        status={getLetterStatus(letter)} />
                ))}
            </div>
            <div className="mt-1 flex gap-1">
                {LETTERS.slice(12, 23).map((letter, index) => (
                    <Letter 
                        key={`letter_${index}`} 
                        letter={letter} 
                        className="py-1 px-1" 
                        status={getLetterStatus(letter)} />
                ))}
            </div>
            <div className="mt-1 flex gap-1">
                {LETTERS.slice(23).map((letter, index) => (
                    <Letter 
                        key={`letter_${index}`} 
                        letter={letter} 
                        className="py-1 px-1" 
                        status={getLetterStatus(letter)} />
                ))}
            </div>
        </div>
    )
}

const Letter = ({ letter, className, status }: { letter: string; className: string; status: string; }) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const event = new KeyboardEvent('keydown', { key: e.currentTarget.value })
        return event
    }
    return (
        <div className={clsx("rounded", className, styleSymbol[status])} >
            <button
                className="uppercase text-3xl bg-transparent border-none w-full"
                onClick={e => handleClick(e)}
                value={letter}
            >{letter}</button>
        </div >
    )
}