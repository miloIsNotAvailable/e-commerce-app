import { FC } from "react";
import Block from "../../custom/Block/Block";
import PageLayout from "../../custom/PageLayout";
import DescInput from "../inputs/DescInput";
import ImageInput from "../inputs/ImageInput";
import Submit from "../inputs/Submit";
import TitleInput from "../inputs/TitleInput";
import { styles } from "./SellItemStyles";

const SellItem: FC = () => {

    return (
        <PageLayout title={ "sell item" }>
            <div className={ styles.sell_item_wrap }>
                <div>
                    <ImageInput/>
                    <TitleInput/>
                    <DescInput/>
                    <Submit/>
                </div>
                <Block/>
            </div>
        </PageLayout>
    )
}

export default SellItem