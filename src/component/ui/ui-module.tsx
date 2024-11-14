import clsx from "clsx"
import { ReactNode } from "react";

export const UIModule =  ({ title = "Пример заголовка", children, className }: 
{ 
    title?: string;
    children: ReactNode; 
    className?: string 
}) => {
    return (
        <div className={clsx("bg-black/80 px-3 py-2 rounded", className)}>
            <UIModule.Header title={title} />
            <UIModule.Body>{children}</UIModule.Body>   
        </div>
    )
}

UIModule.Header = function UIModuleHeader({ title = "Заголовок" }: { title: string }) {
    return (
        <h1 className="text-3xl">{title}</h1>
    )
}

UIModule.Body = function UIModuleBody({ children }: { children: ReactNode; }) {
    return (
        <div className="my-2 w-full justify-center items-center">
            {children}
        </div>
    )
}

UIModule.Text = function UIModuleText({ children }: { children: ReactNode; }) {
    return (
        <p className="text-xl my-1">
            {children}
        </p>
    )
}

UIModule.ButtonGroup =function UIModuleButtonGroup({ children, className }: { children: ReactNode; className?: string}) {
    return (
        <div className={clsx("flex flex-col items-center gap-3", className)}>
            {children}
        </div>
    )
}