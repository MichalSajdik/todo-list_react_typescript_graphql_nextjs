# TODO list

![image](https://user-images.githubusercontent.com/30591067/134822293-daafa4f5-1c97-4e4b-b936-7b40ce939d54.png)

- implement a simple **TODO list web application**
- application should be implemented in **Typescript** (**Node.js** on backend and **React** on frontend)

## General

- Provide a README file where you explain how to build and run your application

## Backend

- **Technology stack**
  - **Next.js** framework: [https://nextjs.org/](https://nextjs.org/)
  - **GraphQL server**
  - optional: use **Express server** (otherwise you can use **Next.js API routes**) - this is upon your decision
- Use simple **.json file** for storing your data
  - optionally you can use any database you want, but we need to be able to run the application
- **Data model**
  - list of TODOs, where one TODO can be represented with a string -> you can just use an array of strings
  - optionally you can use more advanced data model (for example you can also store a timestamp when the TODO was created)
- **Implement**
  - **GraphQL Query** which will be used for gathering TODOs
  - **GraphQL Mutations** which will:
    - edit existing TODO
    - create new TODO
    - delete existing TODO

## Frontend

- **Technology stack**
  - **React** (use functional components and hooks)
  - **Apollo Client**
  - Any **React UI framework** (for example Bootstrap, Material-UI or anything else)
- Application should have only one screen with a table, which will show TODOs
  - user should also be able to create new TODOs (you can implement this for example by modal window or have a textbox above the table where the user will specify text of new TODO and a submit button)
  - within the table, user should also be able to edit and delete existing TODOs - you can implement this with icon buttons on each table row


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.