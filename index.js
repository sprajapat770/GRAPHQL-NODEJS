import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//types
import { typeDefs } from "./schema.js";

//import db
import db from "./_db.js";
//resolver
const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        authors() {
            return db.authors;
        },
        reviews() {
            return db.reviews;
        },
        review(_, args, context) {
            return db.reviews.find(review => review.id === args.id);
        },
        game(_, args, context) {
            return db.games.find(game => game.id === args.id);
        },
        author(_, args, context) {
            return db.authors.find(author => author.id === args.id);
        }
    }
}

/*
games {
    title
}
*/

//server setup
const server = new ApolloServer({
    //typeDefs - type definitions // description of datatypes & relations with all the data types 
    typeDefs,
    //resolvers - how to respond to query for different data
    resolvers
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log('server ready at port ', 4000);

//schema is something that describes the shape of the graph and the data available