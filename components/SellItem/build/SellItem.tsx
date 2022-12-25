import { useRedux } from "@hooks/useRedux";
import { FC } from "react";
import { itemDataState } from "../../../interfaces/reduxInterfaces";
import { useNewItemMutation } from "../../../redux/api/fetchApi";
import Block from "../../custom/Block/Block";
import PageLayout from "../../custom/PageLayout";
import DescInput from "../inputs/DescInput";
import ImageInput from "../inputs/ImageInput";
import Submit from "../inputs/Submit";
import TitleInput from "../inputs/TitleInput";
import { styles } from "./SellItemStyles";

const SellItem: FC = () => {

    const [ { inputData } ] = useRedux<itemDataState>()
    const [ , { error } ] = useNewItemMutation( {
        fixedCacheKey: "created-item",
    } )

    return (
        <PageLayout title={ "sell item" }>
            <div className={ styles.sell_item_wrap }>
                <div>
                    <ImageInput/>
                    <TitleInput/>
                    <DescInput/>
                    <Submit/>
                </div>
                <nav className={ styles.block_preview }>
                    <Block { ...inputData }/>
                    <p className={ styles.block_error }>
                        { error && "unexpected error occured, please try again" }
                    </p>
                </nav>
            </div>
        </PageLayout>
    )
}

export default SellItem