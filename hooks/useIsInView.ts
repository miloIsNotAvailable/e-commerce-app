import { MutableRefObject, useEffect, useState } from "react"

/**
 * @param targetRef is target component ref
 * @description checks is element is in view
 * @example ```tsx
 * const reviewsRef = useRef<HTMLDivElement | null>( null )
 * const isInView = useIsInView<HTMLDivElement | null>( reviewsRef )
 * ...
 * return (
 * <div ref={ reviewsRef }>
 * ...
 * </div>
 * )
 * ```
 * @returns **truthy** is element is in view, **falsy** if it isn't
 */
export const useIsInView = <T=any>( targetRef: MutableRefObject<T> ) => {

    const [ isInView, setIsInView ] = useState<boolean>( false )

    useEffect( () => {
        const target = targetRef.current as any;
        if( !target ) return 

        const observer = new IntersectionObserver( ( entries ) => {
            const [ entry ] = entries
            setIsInView( entry.isIntersecting )
        }, {} )

        observer.observe( target )        
    } )

    return isInView
}