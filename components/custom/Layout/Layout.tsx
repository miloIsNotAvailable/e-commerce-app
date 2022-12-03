import { FC } from "react";

interface LayoutProps {
    children: JSX.Element | JSX.Element[] | string
}

const Layout: FC<LayoutProps> = ( { children } ) => {

    return (
        <div className="page">
            { children }
        </div>
    )
}

export default Layout