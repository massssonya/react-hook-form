import gsap from "gsap"
import { useEffect, useRef } from "react"
import {addPointClassName, isAnimate} from "../utils"



export const useAnimate = () => {
    const btnNewGameAnimate = "btn-new-game-animate"
    const btnChangeLanguageAnimate = "btn-change-language-animate"
    const btnContinueAnimate = "btn-continue-animate"
    const circleAnimate = "circle-animate"
    const headerRef = useRef<HTMLHeadingElement>(null)


    useEffect(() => {
        const tl = gsap.timeline()
        const btnNewGame = addPointClassName(btnNewGameAnimate)
        const btnChangeLanguage = addPointClassName(btnChangeLanguageAnimate)
        const btnContinue = addPointClassName(btnContinueAnimate)
        const btnGroup = [btnContinue, btnNewGame, btnChangeLanguage].filter(btn => isAnimate(btn))
        const header = headerRef.current
        if (header) {
            tl
                .fromTo(header, {
                    opacity: 0
                }, {
                    opacity: 1,
                    y: -160,
                    duration: 1.5,
                    stagger: .5
                })
                .fromTo(btnGroup, {
                    opacity: 0,
                    duration: 1,
                    y: 100
                }, {
                    opacity: 1,
                    duration: 1,
                    y: 0
                }, ">")

            return () => {
                tl.kill()
                gsap.killTweensOf(btnGroup)
                gsap.killTweensOf([btnContinue, btnChangeLanguage, btnNewGame])
            }
        }
    }, [])

    return {
        headerRef,
        btnNewGameAnimate,
        btnChangeLanguageAnimate,
        btnContinueAnimate,
        circleAnimate
    }
}