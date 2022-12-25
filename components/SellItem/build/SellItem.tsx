import { FC } from "react";
import PageLayout from "../../custom/PageLayout";
import ImageInput from "../inputs/ImageInput";
import { styles } from "./SellItemStyles";

const SellItem: FC = () => {

    return (
        <PageLayout title={ "sell item" }>
            <div className={ styles.sell_item_wrap }>
                <ImageInput/>
            </div>
        </PageLayout>
    )
}

export default SellItem