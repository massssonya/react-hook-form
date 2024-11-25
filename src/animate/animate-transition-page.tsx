import { ReactNode, useState, useEffect } from "react"
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

    useEffect(() => {
        return() => {
            setPreviousPage(location.pathname)
        }
    }, [location])

    const transitions = useTransition(location,  {
        from: {
            filter: "blur(15px)",
            scale: 1.1,
            // translateX: "100%",
            // translateY: "0px",
            config: {
                duration: 2000,

            }
        },
        enter: {
            filter: "blur(0px)",
            scale: 1,
            config: {
                duration: 2000
            }
            // translateX: "0%",
            // translateY: "0px"
        },
        leave: {
            filter: "blur(10px)",
            scale: 1.1,
            config: {
                duration: 2000
            }
            // translateX: "-100%",
            // translateY: "0px",
            // config: {
            //     duration: 1000
            // }
        },
        // onRest: () => setPreviousPage(location.pathname),
        // immediate: previousPage === ""
        
    })
    return transitions((styles, {pathname}) => {
        if(pathname == location.pathname)
        return (
        <animated.div style={styles}>
            <div className="">
                {children}
            </div>
        </animated.div>
    )})
}