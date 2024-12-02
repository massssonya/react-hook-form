import { Outlet } from "react-router-dom"
// import { Suspense } from "react"
import { UILoading } from "./component/ui"


export const Layout = () => {
    return (
        <div className="h-screen w-full">

            {/* <Suspense fallback={<UILoading />} > */}
                <Outlet  />
            {/* </Suspense> */}

        </div>
    )
}
