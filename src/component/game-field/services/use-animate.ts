import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { addPointClassName, isAnimate } from "../../../utils"

export const useAnimate = (currentStep:number) => {
    const keyboardRef = useRef<HTMLDivElement>(null)
    const gameDisplayAnimate = "game-display-animate"
    const inputAnimate = "input-animate"
    const letterAnimate = "letter-animate"
    const navMenuAnimate = "nav-menu-animate"
    const activeFormAnimate = "active-form-animate"

    useEffect(() => {
        const gameDisplay = addPointClassName(gameDisplayAnimate)
        const input = addPointClassName(inputAnimate)
        const letter = addPointClassName(letterAnimate)
        const navMenu = addPointClassName(navMenuAnimate)
        const tl = gsap.timeline()
        const arrClasses = [gameDisplay, input, letter, navMenu].map(element => isAnimate(element) ? true : false);
        if(!arrClasses.includes(false)){

        
        tl
            .fromTo(gameDisplay, {
                opacity: 0,
                scale: .5
            }, {
                opacity: 1,
                scale: 1
            })
            .fromTo(input, {
                opacity: 0,
                scale: 0,
                rotateZ: 90
            }, {
                opacity: 1,
                scale: 1,
                rotateZ: 0,
                stagger: .05,
                duration: 1,
                ease: "back"
            })
            .fromTo(letter, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                stagger: .05
            }, "-=2")
            .fromTo(navMenu, {
                y: -80
            }, {
                y: 0
            }, "-=2")

        return () => {
            tl.kill()
            gsap.killTweensOf([gameDisplay,input,letter,navMenu])
        }
    }
    }, [])

    useEffect(() => {
            const activeForm = addPointClassName(activeFormAnimate)
            if(currentStep==0){
                gsap.fromTo(activeForm, {
                    x: 500,
                    opacity: 0
                }, {
                    opacity: 1,
                    x:0,
                    duration: 1,
                    delay: 1
                })
            }
            gsap.fromTo(activeForm, {
                top: 64*currentStep-64
            },{
                top: 64*currentStep,
                duration: 1
            })
            return() => {
                gsap.killTweensOf(activeForm)
                
            }
   
    }, [currentStep])

    return { keyboardRef, letterAnimate, gameDisplayAnimate, inputAnimate, navMenuAnimate, activeFormAnimate }
}