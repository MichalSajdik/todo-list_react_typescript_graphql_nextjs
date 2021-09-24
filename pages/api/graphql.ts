import {ApolloServer, gql} from 'apollo-server-micro'
import {NextApiRequest, NextApiResponse} from "next";

const typeDefs = gql`
  type Query {
    todos: [Todo!]!
  }
  type Todo {
    id: String
    text: String
    timestamp: String
  }
  type Mutation {
    createTodo(text: String!):String
    updateTodo(id: String!, text: String!):String
    deleteTodo(id: String!):String
  }
`;

let todos = [{id: "1", text: 'Default Todo', timestamp: "0"}];

let id = 1;

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (parent: any, args: any) => {
      id++;
      let idString = id.toString()
      todos.push({
        id: idString,
        text: args.text,
        timestamp: Date.now().toString()
      });
      return idString;
    },
    updateTodo: (parent: any, args: any) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos[i].text = args.text;
          todos[i].timestamp = Date.now().toString();
          return todos[i].text;
        }
      }
    },
    deleteTodo: (parent: any, args: any) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos.splice(parseInt(i), 1);
        }
      }
      return args.id;
    }
  }
};

const apolloServer = new ApolloServer({typeDefs, resolvers});

const startServer = apolloServer.start();

type Data = {
  id: string,
  text: string,
  timestamp: string
}[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
};