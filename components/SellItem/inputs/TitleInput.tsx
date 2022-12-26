import { useRedux } from "@hooks/useRedux";
import { ChangeEvent, FC } from "react";
import { getItemTitle } from "../../../redux/inputs/itemInputSlice";
import { styles } from "../build/SellItemStyles";
import CategoriesInput from "./CategoriesInput";

const TitleInput: FC = () => {

    const [ , dispatch ] = useRedux()

    const handleTitle: ( e: ChangeEvent<HTMLInputElement> ) => void
    = e => {
        dispatch( getItemTitle( {
            title: e.target.value
        } ) )
    }

    return (
        <div className={ styles.title_input_wrap }>
            <input 
                className={ styles.title_input }
                placeholder={ "item title" }
                onChange={ handleTitle }
            />
            <CategoriesInput/>
        </div>
    )
}

export default TitleInput