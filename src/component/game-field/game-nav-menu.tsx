import { FaQuestion } from "react-icons/fa"
import { UIButton } from "../ui"
import clsx from "clsx"
import { useAnimate } from "./services";

export const GameNavMenu = ({openLetter, className}:{openLetter:() => void; className?: string}) => {
    const {navMenuAnimate} = useAnimate()
    return (
        <nav className={clsx("px-3 py-2 flex justify-center", navMenuAnimate, className)}>
            <div className="min-w-[400px] flex flex-row justify-end gap-2">
                <UIButton className="bg-yellow-600 hover:border-white hover:border-2" onClick={openLetter}>
                    <FaQuestion className="w-4 h-6" />
                </UIButton>
            </div>
        </nav>
    )
}