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

let fs = require('fs');

const resolvers = {
  Query: {
    todos: () => {
      let todos = [];
      try {
        let rawdata = fs.readFileSync('data.json');
        todos = JSON.parse(rawdata);
      } catch (err) {
      }

      return todos
    },
  },
  Mutation: {
    createTodo: (parent: any, args: any) => {
      let id = "0";
      let todos = [];
      try {
        let rawdata = fs.readFileSync('data.json');
        todos = JSON.parse(rawdata);
        id = todos[todos.length - 1].id;
      } catch (err) {
      }
      let idString = (parseInt(id) + 1).toString()
      todos.push({
        id: idString,
        text: args.text,
        timestamp: Date.now().toString()
      });

      fs.writeFileSync("data.json", JSON.stringify(todos));
      console.log(todos);
      return idString;
    },
    updateTodo: (parent: any, args: any) => {
      let todos = [];
      try {
        let rawdata = fs.readFileSync('data.json');
        todos = JSON.parse(rawdata);
      } catch (err) {
      }

      let tmpTodoText = "Not found";
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos[i].text = args.text;
          todos[i].timestamp = Date.now().toString();
          tmpTodoText = todos[i].text;
        }
      }

      fs.writeFileSync("data.json", JSON.stringify(todos));
      return tmpTodoText;

    },
    deleteTodo: (parent: any, args: any) => {
      let todos = [];
      try {
        let rawdata = fs.readFileSync('data.json');
        todos = JSON.parse(rawdata);
      } catch (err) {
      }

      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos.splice(parseInt(i), 1);
        }
      }

      fs.writeFileSync("data.json", JSON.stringify(todos));
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