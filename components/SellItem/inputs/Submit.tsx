import { useGoBack } from "@hooks/useGoBack";
import { useRedux } from "@hooks/useRedux";
import { gql } from "graphql-request";
import { FC } from "react";
import { itemDataState } from "../../../interfaces/reduxInterfaces";
import { useNewItemMutation } from "../../../redux/api/fetchApi";
import { styles } from "../build/SellItemStyles";

const ITEM_QUERY = gql`mutation NewItem($title: String!, $img: String!, $desc: String!) {
    newItem(title: $title, img: $img, desc: $desc) {
      desc
      img
      title
    }
  }`

const Submit: FC = () => {

    const goBack = useGoBack()
    
    const [ createItem, { data, isLoading, error } ] = useNewItemMutation()
    const [ { inputData } ] = useRedux<itemDataState>()

    const handleCreateItem: () => void = () => {
        if( isLoading ) return
        
        createItem( {
            body: ITEM_QUERY,
            variables: inputData
        } )
    }

    return (
        <div className={ styles.submit_wrap }>
            <button 
                disabled={ isLoading }
                className={ styles.submit_button }
                onClick={ handleCreateItem }
            >
                { isLoading ? "hold on..." : "submit" }
            </button>
            <button 
                className={ styles.cancel_button }
                onClick={ goBack }
            >
                cancel
            </button>
        </div>
    )
}

export default Submit