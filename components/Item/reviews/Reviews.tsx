import { useItemContext } from "@contexts/ItemContext";
import { GetReviewsQuery } from "@graphql-types";
import { gql } from "graphql-request";
import { FC, useEffect } from "react";
import { useGetReviewsQuery, useLazyGetReviewsQuery } from "../../../redux/api/fetchApi";
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
    
    useEffect( () => {
        if( itemDataLoading || itemLoadingError ) return;

        getItem?.id && getReviews( {
            body: REVIEW_QUERY,
            variables: {
                itemId: getItem!.id
            }
        }  )

    }, [ getItem, itemDataLoading ] )

    return (
        <div className={ styles.reviews_wrap }>
            <div className={ styles.reviews_header }>
                reviews
            </div>
            <div>
                { isSuccess && data?.getReviews && 
                data!.getReviews!.map( ( { text } ) => (
                    <div>
                        { text }
                    </div>
                ) ) }
            </div>
            <ReviewsInput/>
        </div>
    )
}

export default Reviews