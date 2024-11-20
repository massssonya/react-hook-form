import { FaQuestion } from "react-icons/fa"
import { UIButton } from "../ui"
import clsx from "clsx"

export const GameNavMenu = ({openLetter, className}:{openLetter:() => void; className?: string}) => {

    return (
        <nav className={clsx("px-3 py-2 flex justify-end", className)}>
            <div className="flex flex-row  gap-2">
                <UIButton className="bg-yellow-600 hover:border-white hover:border-2" onClick={openLetter}>
                    <FaQuestion className="w-4 h-6" />
                </UIButton>
            </div>
        </nav>
    )
}