import { FC } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar/build/Navbar";
import Footer from "../footer/Footer";
import HeaderDesc from "../header/HeaderDesc";
import HeaderImage from "../header/HeaderImage";
import Rating from "../rating/Rating";
import { styles } from "./ItemStyles";

const Item: FC = () => {

    const { id } = useParams()

    return (
        <div className={ styles.page_wrap }>
            <Navbar/>
            <div className={ styles.item_header_wrap }>
                <HeaderImage/>
                <HeaderDesc/>
                <Rating/>
            </div>
            <Footer/>
        </div>
    )
}

export default Item