import { FC, useEffect } from "react";
import Bg from "../components/home/bg/Bg";
import Title from "../components/home/title";
import Navbar from "../components/navbar/build/Navbar";
import { useGetHelloQuery } from "../redux/api/fetchApi";

const HELLO_QUERY = `
query Hey {
    hello
}
`

const Home: FC = () => {

    const { data, isFetching } = useGetHelloQuery( {
        body: HELLO_QUERY,
        variables: {}
    } );
    
    useEffect( () => {
        if( !data ) return
        console.log( process.env.NODE_ENV )
    }, [ isFetching ] )

    return (
        <div className="page">
            <Navbar/>
            <div>
                <Title/>
                <Bg/>
            </div>
        </div>
    )
}

export default Home