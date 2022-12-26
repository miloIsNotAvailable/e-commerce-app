import { CreateItem, GetItemsQuery, ItemCategories, QueryGetItemsArgs } from "@graphql-types";
import { gql } from "graphql-request";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "../../../redux/api/fetchApi";
import Block from "../../custom/Block/Block";
import PageLayout from "../../custom/PageLayout";
import { styles } from "./CategoryStyles";

const ITEMS_QUERY = gql`query GetItems($category: ItemCategories!) {
    getItems(category: $category) {
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

    return (
        <PageLayout title={ category || "" }>
            <div className={ styles.category_wrap }>
                { data?.getItems && (data!.getItems as CreateItem[])!.map(
                    ( { category, img, title, desc }: Partial<CreateItem> ) => (
                        <Block 
                            desc={ desc }
                            img={ img }
                            title={ title }
                        />
                    )
                ) }
            </div>
        </PageLayout>
    )
}

export default Category