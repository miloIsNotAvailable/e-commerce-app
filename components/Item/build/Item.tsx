import { ItemContextProvider } from "@contexts/ItemContext";
import { gql } from "graphql-request";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetItemQuery } from "../../../redux/api/fetchApi";
import Navbar from "../../navbar/build/Navbar";
import Footer from "../footer/Footer";
import HeaderDesc from "../header/HeaderDesc";
import HeaderImage from "../header/HeaderImage";
import Rating from "../rating/Rating";
import Reviews from "../reviews/Reviews";
import { styles } from "./ItemStyles";

const ITEM_QUERY = gql`query GetItem($getItemId: String!) {
    getItem(id: $getItemId) {
    category
    desc
    id
    title
    img
      reviews {
        author
        created_at
        item_id
        id
        text
      }
    }
  }`

const Item: FC = () => {

    const { id } = useParams()
    const { data, isLoading, error } = useGetItemQuery( { 
        body: ITEM_QUERY,
        variables: {
            getItemId: id!
        }
     } )

    return (
        <ItemContextProvider value={ { ...data, isLoading, error } }>
            <div className={ styles.page_wrap }>
                <Navbar/>
                <div className={ styles.item_header_wrap }>
                    <HeaderImage/>
                    <HeaderDesc/>
                    <Rating/>
                    <Reviews/>
                </div>
                <Footer/>
            </div>
        </ItemContextProvider>
    )
}

export default Item