import { FC, useEffect } from "react";
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
        <div>
            <Navbar/>
            {/* <div onClick={ console.log }>{ data?.hello || "no data" }</div> */}
        </div>
    )
}

export default Home