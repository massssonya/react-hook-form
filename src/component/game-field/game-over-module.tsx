import { UIButton, UIModule } from "../ui"

export const GameOverModule = ({ answer, onClickNewGame, onClickExit }: 
    { answer: string; onClickNewGame: () => void; onClickExit: () => void }) => {
    return (
        <UIModule title="Игра завершена" className="w-[400px]">
            <UIModule.Text>Ответ: {answer}</UIModule.Text>
            <UIModule.ButtonGroup className="mx-auto w-1/2">
                <UIButton onClick={onClickNewGame} className="w-full text-nowrap">Новая игра</UIButton>
                <UIButton onClick={onClickExit} className="w-full text-nowrap">Выйти</UIButton>
            </UIModule.ButtonGroup>
        </UIModule>
    )
}