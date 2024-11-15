import { ReactNode, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useTransition, animated } from "react-spring"

type TDirection = "right" | "left"

export function AnimateTransitionPage(
    { children, direction }:
        {
            children: ReactNode;
            direction: TDirection
        }) {
    const location = useLocation()

    const transform = {
        from: direction === "left" ? "" : "-",
        leave: direction === "left" ? "-" : "",
    }
    const [previousPage, setPreviousPage] = useState("")

    useEffect(() => {
        return() => {
            setPreviousPage(location.pathname)
        }
    }, [location])

    const transitions = useTransition(location, {
        from: {
            transform: `translateX(${transform.from}100px)`,
        },
        enter: {
            transform: 'translateX(0px)',
        },
        leave: {
            transform: `translateX(${transform.leave}100px)`,
        },
        immediate: previousPage === ""
        
    })
    return transitions((styles) => (
        <animated.div style={styles}>
            <div >
                {children}
            </div>
        </animated.div>
    ))
}