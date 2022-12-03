import { FC, lazy, Suspense } from "react";
import LazyLoad from "../components/custom/LazyLoad/Load/LazyLoad";
import Mainscreen from "../components/home/build/Home";
// import Bg from "../components/home/bg/Bg";
import Title from "../components/home/title";
import Navbar from "../components/navbar/build/Navbar";

const Bg = lazy( () => import("../components/home/bg" ) )

const Home: FC = () => {

    return (
        <Mainscreen/>
    )
}

export default Home