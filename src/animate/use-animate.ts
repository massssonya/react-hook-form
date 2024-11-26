import gsap from "gsap"
import { useEffect, createElement } from "react"
import { addPointClassName, isAnimate } from "../utils"
import clsx from "clsx"



export const useAnimate = () => {
    const btnNewGameAnimate = "btn-new-game-animate"
    const btnChangeLanguageAnimate = "btn-change-language-animate"
    const btnContinueAnimate = "btn-continue-animate"
    const circleAnimate = "circle-animate"
    const headerLettersAnimate = "header-letters-animate"
    const headerTextAnimate = "header-animate"
    // const headerRef = useRef<HTMLHeadingElement>(null)
    // const headerSymbols = headerRef.current?.innerText.split("")

    function createDivElement(symbol: string) {
        const span = createElement("span", { className: clsx("text-9xl bg-clip-text text-transparent", headerLettersAnimate) }, symbol)
        const div = createElement("div", { className: "flex justify-center items-center overflow-hidden", key: symbol }, span)
        return div
    }

    function headerAnimate(text: string) {
        const spanLetterArray = text.split("").map(letter => createDivElement(letter))
        return spanLetterArray
    }


    useEffect(() => {
        const tl = gsap.timeline()
        const btnNewGame = addPointClassName(btnNewGameAnimate)
        const btnChangeLanguage = addPointClassName(btnChangeLanguageAnimate)
        const btnContinue = addPointClassName(btnContinueAnimate)
        const btnGroup = [btnContinue, btnNewGame, btnChangeLanguage].filter(btn => isAnimate(btn))
        const headerLettersText = addPointClassName(headerLettersAnimate)
        const headerText = addPointClassName(headerTextAnimate)

        tl
            .fromTo(headerLettersText, {
                x: 110,
                backgroundImage: "linear-gradient(90deg, white -100%, transparent)"
                
            }, {
                x: 0,
                backgroundImage: "linear-gradient(90deg, white 80%, transparent)",
                duration: 1,
                stagger: .1
            })
            .to(headerText, {y: -160}, ">")
            .fromTo(btnGroup, {
                opacity: 0,
                duration: 1,
                y: 100
            }, {
                opacity: 1,
                duration: 1,
                y: 0
            }, "-=0.5")

        return () => {
            tl.kill()
            gsap.killTweensOf(btnGroup)
            gsap.killTweensOf([btnContinue, btnChangeLanguage, btnNewGame])
        }
    }, [])

    return {
        btnNewGameAnimate,
        btnChangeLanguageAnimate,
        btnContinueAnimate,
        circleAnimate,
        headerTextAnimate,
        headerAnimate
    }
}