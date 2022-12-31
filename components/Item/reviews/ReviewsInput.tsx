import { useRedux } from "@hooks/useRedux";
import { gql } from "graphql-request";
import { FC, MouseEvent, useRef } from "react";
import { useParams } from "react-router-dom";
import { reviewInputState } from "../../../interfaces/reduxInterfaces";
import { useCreateReviewMutation } from "../../../redux/api/fetchApi";
import { styles } from "../build/ItemStyles";

const REVIEW_QUERY = gql`mutation CreateReview(
    $text: String!
    $createReviewId: String
    $author: String
    $createdAt: String
    $itemId: String!
  ) {
    createReview(
      text: $text
      id: $createReviewId
      author: $author
      created_at: $createdAt
      item_id: $itemId
    ) {
      author
      created_at
      id
      text
      item_id
    }
  }
  `

const ReviewsInput: FC = () => {

    const { id } = useParams()

    const [ { reviewInput: { open } } ] = useRedux<reviewInputState>()
    const [ createReview, { isLoading } ] = useCreateReviewMutation()

    const inputRef = useRef<HTMLTextAreaElement | null>( null )

    const handleCreateReview: 
    ( e: MouseEvent<HTMLFormElement> ) => Promise<void> = async e => {

        e.preventDefault()

        createReview( {
            body: REVIEW_QUERY,
            variables: {
                text: inputRef.current!.value,
                itemId: id!
            }
        } )
    }

    if( !open ) return (
        <></>
    )

    return (
        <form 
            onSubmit={ handleCreateReview }
            className={ styles.reviews_input_wrap }
        >
            <textarea
                ref={ inputRef } 
                className={ styles.input }
                placeholder={ "leave a review" }
            />
            <button>send review</button>
        </form>
    )
}

export default ReviewsInput