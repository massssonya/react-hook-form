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
            delay: 1.5
        }, {
            y: 0,
            duration: 1.5,
            ease: "back"
        })
    }, [result])
    return (
        <div className="absolute" ref={moduleRef}>
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