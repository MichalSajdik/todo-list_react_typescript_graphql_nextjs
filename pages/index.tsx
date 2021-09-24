import type, {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useMutation, useQuery} from "@apollo/client";
import QUERY_TODOS from '../graphql/queryTodos/.graphql';
import gql from "graphql-tag";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import * as React from "react";

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $text: String!) {
    updateTodo(id: $id, text: $text)
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

const MaxSizeDiv = styled.div`
  width: 800px;
  height: 60px;
`;

const Home: NextPage = () => {
  const {data, loading, error, refetch} = useQuery(QUERY_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);

  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e: any) => {
    setNewTodo(e.target.value);
  }

  const addTodo = (e: any) => {
    createTodo({variables: {text: newTodo}}).then(() => refetch());
    setNewTodo("");
  }

  // check for errors
  if (error) {
    return <p>:( an error happened: {error.toString()}</p>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>TODO list</title>
      </Head>
      <MaxSizeDiv style={{height: "70px"}}>
        <Button variant="outlined" onClick={addTodo} style={{height: "56px", width: "200px", float: "left"}}>Add
          TODO</Button>
        <TextField id="outlined-basic" label="Todo description" variant="outlined" onChange={handleChange}
                   value={newTodo} style={{height: "56px", width: "600px", float: "right"}}/>
      </MaxSizeDiv>
      {loading && <p>loading...</p>}
      {!loading && (<div>
          {data.todos.map((todo: any) => (
            <TodoItem key={todo.id} todo={todo} refetch={refetch}/>
          ))}
        </div>
      )}
    </div>
  )
}

const TodoItem = (props: any) => {
  let todo = props.todo;
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [changedTodo, setChangedTodo] = useState(todo.text);
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = (e: any) => {
    setChangedTodo(e.target.value);
  }

  const deleteTodoEvent = () => {
    deleteTodo({variables: {id: todo.id}}).then(() => props.refetch());
  }

  const updateTodoEvent = () => {
    updateTodo({variables: {id: todo.id, text: changedTodo}}).then(() => props.refetch());
    setIsDisabled(true)
  }

  return (
    <MaxSizeDiv key={todo.id}>
      <TextField id="outlined-basic" variant="outlined" style={{width: "40px", display: "inline-block"}} value={todo.id}
                 disabled={true}/>
      <TextField id="outlined-basic" variant="outlined" fullWidth style={{display: "inline-block", width: "440px"}}
                 value={changedTodo}
                 onChange={handleChange} disabled={isDisabled}/>

      <TextField id="outlined-basic" variant="outlined" style={{width: "200px", display: "inline-block"}}
                 value={new Date(parseInt(todo.timestamp)).toLocaleString()} disabled={true}/>
      {isDisabled && (
        <IconButton aria-label="edit" style={{display: "inline-block", height: "56px", width:"56px"}}
                    onClick={() => setIsDisabled(false)}>
          <ModeEditIcon/>
        </IconButton>
      )}
      {!isDisabled && (
        <IconButton aria-label="save" style={{display: "inline-block", height: "56px", width:"56px"}} onClick={updateTodoEvent}>
          <SaveIcon/>
        </IconButton>
      )}
      <IconButton aria-label="delete" style={{display: "inline-block", height: "56px", width:"56px"}} onClick={deleteTodoEvent}>
        <DeleteIcon/>
      </IconButton>
    </MaxSizeDiv>
  )
};

export default Home
