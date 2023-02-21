import { useItemContext } from "@contexts/ItemContext";
import { GetReviewsQuery } from "@graphql-types";
import { useIsInView } from "@hooks/useIsInView";
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
    const isInView = useIsInView<HTMLDivElement | null>( reviewsRef )

    useEffect( () => {
        if( itemDataLoading || itemLoadingError || !isInView || isSuccess ) return;

        getItem?.id && getReviews( {
            body: REVIEW_QUERY,
            variables: {
                itemId: getItem!.id
            }
        }  )

    }, [ getItem, itemDataLoading, isInView, isSuccess ] )

    if( !isSuccess ) return (
        <div className={ styles.reviews_wrap }>
            <div className={ styles.reviews_header }>
                reviews
            </div>
            <div 
                className={ styles.review_loading }
                ref={ reviewsRef }
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