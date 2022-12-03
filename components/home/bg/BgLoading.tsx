import { FC } from "react";
import Loader from "../../custom/Loader";
import { styles } from "../build/HomeStyles";

const BgLoading: FC = () => {

    return (
        <div className={ styles.loading }>
            <Loader/>
        </div>
    )
}

export default BgLoading