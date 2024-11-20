import clsx from "clsx";
import { FaArrowRight } from "react-icons/fa"
import { LETTERS, Languages } from "../../constants"
import { TLetters } from "../../types";
import { styleSymbol } from "./styles";
import { MouseEvent } from "react";

export const GameLetters = ({
    statusLetter,
    clickScreenKeyboard,
    language
}:
    {
        statusLetter: TLetters;
        clickScreenKeyboard: (value: string) => void;
        language: Languages
    }) => {

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

    const LetterButton = (letter: string, index: number) => (
        <Letter
            key={`letter_${index}`}
            letter={letter}
            className="py-1 px-1"
            status={getLetterStatus(letter)}
            onClick={clickScreenKeyboard}
        />
    )

    return (
        <div className="mt-4 flex flex-col items-center">
            <div className="flex gap-1">
                {LETTERS[language].slice(0, 12).map((letter, index) => (
                    LetterButton(letter, index)
                ))}
            </div>
            <div className="mt-1 flex gap-1">
                {LETTERS[language].slice(12, 23).map((letter, index) => (
                    LetterButton(letter, index)
                ))}
            </div>
            <div className="mt-1 flex gap-1">
                {LETTERS[language].slice(23).map((letter, index) => (
                    LetterButton(letter, index)
                ))}
            </div>
        </div>
    )
}

const Letter = ({
    letter,
    className,
    status,
    onClick
}: {
    letter: string;
    className: string;
    status: string;
    onClick: (value: string) => void
}) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        onClick(e.currentTarget.value)
        return
    }
    const isEnter = letter === "Enter"
    return (
        <div className={clsx("rounded", className, styleSymbol[status], isEnter && "bg-emerald-500 w-[50px]")} >
            <button
                className={clsx("uppercase text-3xl bg-transparent border-none w-full focus:border-none focus-visible:border-none")}
                onClick={e => handleClick(e)}
                value={letter}
            >{isEnter ? <FaArrowRight className="pt-1 w-full"/> : letter}</button>
        </div >
    )
}