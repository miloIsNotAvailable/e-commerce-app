import { useGoBack } from "@hooks/useGoBack";
import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/build/Navbar";
import { styles } from "./PageLayoutStyles";

interface PageLayoutProps {
    title: string
    children: JSX.Element | JSX.Element[] | string
}

const PageLayout: FC<PageLayoutProps> = ( { title, children } ) => {

    const goBack = useGoBack()
    const handleGoBack: ( e: MouseEvent<HTMLButtonElement> ) => void 
    = e => {
        e.preventDefault()
        goBack()
    }

    return (
        <div className={ styles.page_wrap }>
            <Navbar/>
            <nav className={ styles.page_title }>
                <p>{ title }</p>
                <button onClick={ handleGoBack }>
                    go back
                </button>
            </nav>
            { children }
        </div>
    )
}

export default PageLayout