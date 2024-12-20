import clsx from "clsx";
import { FaArrowRight } from "react-icons/fa"
import { MouseEvent, RefObject, useRef} from "react";

import { LETTERS, Languages } from "../../constants"
import { TLetters } from "../../types";
import { styleSymbol } from "./styles";
import gsap from "gsap";


export const GameLetters = ({
    statusLetter,
    clickScreenKeyboard,
    language,
    animate
}:
    {
        statusLetter: TLetters;
        clickScreenKeyboard: (value: string) => void;
        language: Languages;
        animate: Array<string | RefObject<HTMLDivElement>>;
    }) => {
    
    const [keyboardRef, letterAnimate] = animate

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
        <div className={letterAnimate as string} key={`letter_${index}`}>
            <Letter
                letter={letter}
                className="py-1 px-1"
                status={getLetterStatus(letter)}
                onClick={clickScreenKeyboard}
            />
        </div>
    )

    return (
        <div className="mt-4 flex flex-col items-center" ref={keyboardRef}>
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
    const letterRef = useRef(null)
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        onClick(e.currentTarget.value)
        return
    }
    const isEnter = letter === "Enter"
    function animateMouseDown(){
        const letter = letterRef.current
        gsap.to(letter, {
            scale: .8,
            ease: "power1.inOut"
        })
    }
    function animateMouseUp(){
        const letter = letterRef.current
        gsap.to(letter, {
            scale: 1,
        })
    }
    return (
        <div ref={letterRef} className={clsx("rounded", className, styleSymbol[status], isEnter ? "bg-emerald-600 w-[50px]" : "")}>
            <button
                className={clsx("uppercase text-3xl bg-transparent border-none w-full focus:border-none focus-visible:border-none")}
                onClick={e => handleClick(e)}
                value={letter}
                onMouseDown={animateMouseDown}
                onMouseUp={animateMouseUp}
            >{isEnter ? <FaArrowRight className="pt-1 w-full" /> : letter}</button>
        </div >
    )
}