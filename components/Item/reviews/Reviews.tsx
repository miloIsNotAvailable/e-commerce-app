import { useItemContext } from "@contexts/ItemContext";
import { GetReviewsQuery } from "@graphql-types";
import { gql } from "graphql-request";
import { FC, useEffect, useRef, useState } from "react";
import { useGetReviewsQuery, useLazyGetReviewsQuery } from "../../../redux/api/fetchApi";
import Loader from "../../custom/Loader";
import { styles } from "../build/ItemStyles";
import ReviewsInput from "./ReviewsInput";

const REVIEW_QUERY = gql`query GetReviews($itemId: String!) {
    getReviews(item_id: $itemId) {
      author
      id
      text
    }
  }`

const Reviews: FC = () => {

    const { getItem, isLoading: itemDataLoading, error: itemLoadingError } = useItemContext()
    
    const [getReviews, { data, isLoading, error, isSuccess }] = useLazyGetReviewsQuery()
    
    const reviewsRef = useRef<HTMLDivElement | null>( null )
    const [ isInView, setIsInView ] = useState<boolean>( false )

    useEffect( () => {

        const target = document.getElementById( "reviews" );
        if( !target ) return 

        const observer = new IntersectionObserver( ( entries ) => {
            const [ entry ] = entries
            setIsInView( entry.isIntersecting )
        }, {} )

        observer.observe( target )
    } )


    useEffect( () => {
        if( itemDataLoading || itemLoadingError || !isInView ) return;

        getItem?.id && getReviews( {
            body: REVIEW_QUERY,
            variables: {
                itemId: getItem!.id
            }
        }  )

    }, [ getItem, itemDataLoading, isInView ] )

    if( !isSuccess ) return (
        <div className={ styles.reviews_wrap }>
            <div className={ styles.reviews_header }>
                reviews
            </div>
            <div 
                className={ styles.review_loading }
                id={ "reviews" }
            >
                <Loader/> 
            </div>
            <ReviewsInput/>
        </div>
    )

    return (
        <div className={ styles.reviews_wrap }>
            <div className={ styles.reviews_header }>
                reviews
            </div>
            <div 
                className={ styles.review_wrap }
                ref={ reviewsRef }
                id={ "reviews" }
            >
                { isSuccess && data?.getReviews && 
                data!.getReviews!.map( ( { text } ) => (
                    <div className={ styles.review }>
                        <div className={ styles.review_icon }></div>
                        <div>{ text }</div>
                    </div>
                ) ) }
            </div>
            <ReviewsInput/>
        </div>
    )
}

export default Reviews