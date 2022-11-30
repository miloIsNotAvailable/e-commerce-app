import { rootType } from "../../interfaces/graphqlInterfaces/schemaInterfaces";

export const root: rootType = {
    async hello() {
        try {
            return "Hey"
        } catch( e ) { 
            console.log( e ) 
        }
    }
}