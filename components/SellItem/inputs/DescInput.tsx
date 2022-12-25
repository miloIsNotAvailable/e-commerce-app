import { useRedux } from "@hooks/useRedux";
import { ChangeEvent, FC } from "react";
import { getItemDesc } from "../../../redux/inputs/itemInputSlice";
import { styles } from "../build/SellItemStyles";

const DescInput: FC = () => {

    const [ , dispatch ] = useRedux()

    const handleDesc: ( e: ChangeEvent<HTMLTextAreaElement> ) => void
    = e => {
        dispatch( getItemDesc( {
            desc: e.target.value
        } ) )
    }

    return <textarea 
        className={ styles.desc_input }
        placeholder={ "item description" }
        onChange={ handleDesc }
    />
}

export default DescInput