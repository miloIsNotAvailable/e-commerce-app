import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes, Suspense } from "react";
import Fallback from "../Fallback";

interface LazyLoadProps {
    children: JSX.Element | JSX.Element[] | string
    props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>["style"]
}

const LazyLoad: FC<LazyLoadProps> = ( { children, ...props } ) => {

    return (
        <Suspense fallback={ <Fallback { ...props.props as CSSProperties }/> }>
            { children }
        </Suspense>
    )
}

export default LazyLoad