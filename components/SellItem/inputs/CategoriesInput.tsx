import { ItemCategories } from "@graphql-types";
import { useRedux } from "@hooks/useRedux";
import { FC, useState } from "react";
import { items } from "../../../constants/items";
import { itemDataState } from "../../../interfaces/reduxInterfaces";
import { getItemCategory } from "../../../redux/inputs/itemInputSlice";
import { styles } from "../build/SellItemStyles";

const CategoriesInput: FC = () => {

    const [ { inputData: { category } }, dispatch ] = useRedux<itemDataState>()
    // const [ category, setCategory ] = useState<ItemCategories | undefined>( undefined )

    const handleChooseCategory: ( category: ItemCategories | undefined ) => void
    = ( category ) => {
        dispatch( getItemCategory( {
            category
        } ) )
    }

    return (
        <div className={ styles.choose_category_wrap } tabIndex={ 0 }>
            <p>{ category || "choose category" }</p>
            <p className={ styles.arrow }>{ "↓" }</p>
            <ul className={ styles.choose_category_items }>
                { items.map( category => (
                    <li 
                        key={ category } 
                        onClick={ () => handleChooseCategory( category ) }
                    >
                        { category }
                    </li>
                ) ) }
            </ul>
        </div>
    )
}

export default CategoriesInput