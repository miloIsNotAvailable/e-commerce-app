import { rootType } from "../../interfaces/graphqlInterfaces/schemaInterfaces";

export const root: rootType = {
    Query: {
        async hello() {
            try {
                return "Hey"
            } catch( e ) { 
                console.log( e ) 
            }
        },
        
        books: () => [
            {
              title: 'The Awakening',
              author: 'Kate Chopin',
            },
          
            {
              title: 'City of Glass',
              author: 'Paul Auster',
          
            },
        ]
    }
}