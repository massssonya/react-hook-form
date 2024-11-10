import { Link, Outlet, RouteObject } from "react-router-dom"
import { routers as links } from "./main"
import { ReactNode } from "react"
import clsx from "clsx"

export const Layout = () => {
    return (
        <div className="relative">
            <Layout.Nav className="absolute top-5 right-5">
                <Layout.Links
                    links={links}
                    className="after:content-['|'] after:ml-4 after:last:content-[''] after:last:ml-0 "/>
            </Layout.Nav>
            <div className="flex w-full h-screen justify-center items-center">
                <Outlet />
            </div>

        </div>
    )
}

Layout.Nav = (
    function LayoutNav(
        {   children,
            className
        }:
        {   children: ReactNode,
            className?: string
        }) {
        return (
            <nav className={clsx(className)}>
                <ul className="flex justify-center items-center gap-4">
                    {children}
                </ul>
            </nav>
        )
    })

Layout.Links = (
    function LayoutLinks(
        {
            links,
            className
        }:
        {
            links: RouteObject[],
            className?: string
        }) {
        return (
            <>
                {links.map((link) => (
                    <li
                        key={link.id}
                        className={clsx(className)}>
                        <Link to={`${link.path}`}>{link.id}</Link>
                    </li>
                ))}
            </>
        )
    })
