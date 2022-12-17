import { FC, lazy, Suspense } from "react";
import Layout from "../../custom/Layout";
import Navbar from "../../navbar/build/Navbar";
import BgLoading from "../bg/BgLoading";
import Title from "../title";
import { styles } from "./HomeStyles";
const Bg = lazy( () => new Promise(
    resolve => setTimeout(resolve, 2000 )
    ) 
    .then( () => import("../bg" ) )
)

const Mainscreen: FC = () => {

    return (
        <Layout>
            <Navbar/>
            <div className={ styles.home_wrap }>
                <Title/>
                <Suspense
                    fallback={ <BgLoading/> }
                >
                    <Bg/>
                </Suspense>
            </div>
        </Layout>
    )
}

export default Mainscreen