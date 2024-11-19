import { ReactNode, useState } from "react"
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
        from: direction === "left" ? "-" : "",
        leave: direction === "left" ? "" : "-",
    }
    const [previousPage, setPreviousPage] = useState("")

    // useEffect(() => {
    //     return() => {
    //         setPreviousPage(location.pathname)
    //     }
    // }, [location])

    const transitions = useTransition(location, {
        from: {
            // opacity:0,
        },
        enter: {
            // opacity:1,
        },
        leave: {
            // opacity:0,
        },
        onRest: () => setPreviousPage(location.pathname),
        immediate: previousPage === ""
        
    })
    return transitions((styles) => (
        <animated.div style={styles}>
            {/* <div className=""> */}
                {children}
            {/* </div> */}
        </animated.div>
    ))
}