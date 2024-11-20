import { useEffect, useRef } from "react";
import { TGameStatus } from "../../types";
import { UIButton, UIModule } from "../ui"
import { gsap } from "gsap";

interface IResultText {
    [key: string]: string
}

const resultText: IResultText = {
    "win": "Победа",
    "lose": "Поражение",
    "active": ""
}

export const GameOverModule = ({ answer, result, onClickNewGame, onClickExit }:
    {
        answer: string;
        result: TGameStatus;
        onClickNewGame: () => void;
        onClickExit: () => void
    }) => {
    const moduleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const module = moduleRef.current
        gsap.fromTo(module, {
            y: 200,
            scale: 0.5,
            rotateX: -90,
            delay: 2
        }, {
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 2.5,
            ease: "back"
        })
    }, [result])
    return (
        <div className="absolute top-1/2 -translate-y-1/2" ref={moduleRef}>
            <UIModule title="Игра завершена" className="w-[400px]" >
                <UIModule.Text>{resultText[result]}</UIModule.Text>
                <UIModule.Text>Ответ: {answer}</UIModule.Text>
                <UIModule.ButtonGroup className="mx-auto w-1/2">
                    <UIButton onClick={onClickNewGame} className="w-full text-nowrap">Новая игра</UIButton>
                    <UIButton onClick={onClickExit} className="w-full text-nowrap">Выйти</UIButton>
                </UIModule.ButtonGroup>
            </UIModule>
        </div>
    )
}