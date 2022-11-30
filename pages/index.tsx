import { FC, useEffect } from "react";
import { useGetHelloQuery } from "../redux/api/fetchApi";

const HELLO_QUERY = `
query Hey {
    hello
}
`

const Home: FC = () => {

    const { data } = useGetHelloQuery( {
        body: HELLO_QUERY,
        variables: {}
    } );
    console.log( data )

    return (
        <>
            <div onClick={ console.log }>click me</div>
        </>
    )
}

export default Home