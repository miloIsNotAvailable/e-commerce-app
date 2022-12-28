import { CreateItem, GetItemsQuery, ItemCategories, QueryGetItemsArgs } from "@graphql-types";
import { gql } from "graphql-request";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "../../../redux/api/fetchApi";
import Block from "../../custom/Block/Block";
import Loader from "../../custom/Loader";
import PageLayout from "../../custom/PageLayout";
import { styles } from "./CategoryStyles";

const ITEMS_QUERY = gql`query GetItems($category: ItemCategories!) {
    getItems(category: $category) {
      id
      category
      desc
      img
      title
    }
  }`

const Category: FC = () => {

    const { category } = useParams() 
    const { data, isLoading, error } = useGetItemsQuery( {
        body: ITEMS_QUERY,
        variables: { category: category!.toUpperCase() as ItemCategories }
    } )

    if( isLoading ) return (
        <PageLayout title={ "loading..." }>
            <div className={ styles.page_loading }>
                <Loader/>
            </div>
        </PageLayout> 
    )

    return (
        <PageLayout title={ category || "" }>
            <div className={ styles.category_wrap }>
                { !isLoading && data?.getItems && (data!.getItems as CreateItem[])!.map(
                    ( { category, img, title, desc, id }: Partial<CreateItem> ) => (
                        <Block 
                            key={ id }
                            id={ id }
                            desc={ desc }
                            img={ img }
                            title={ title }
                            category={ category }
                        />
                    )
                ) }
            </div>
        </PageLayout>
    )
}

export default Category