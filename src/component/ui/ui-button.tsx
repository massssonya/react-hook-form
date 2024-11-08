import clsx from "clsx";
import { ReactNode } from "react";

export const UIButton = ({children, className}:{children: ReactNode; className?: string}) => {
    return(
        <button className={clsx("", className)}>{children}</button>
    )
}