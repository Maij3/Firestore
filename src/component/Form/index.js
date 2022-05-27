import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { addDoc, collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
const Form = ({
  Listar = () => {},
  name,
  setName = () => {},
  email,
  setEmail = () => {},
  btn,
  setBtn = () =>{},
  idUsuario = () => {},
}) => {
  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
    };
    try {
      const docRef = await addDoc(collection(db, "usuarios"), user);
      console.log(docRef.id);
      Listar();
    } catch (e) {
      console.error(e);
    }
    setName("");
    setEmail("");
  };

  const editUser = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name: name,
        email: email,
      };
      await setDoc(doc(db, "usuarios", idUsuario), user);
      Listar();
    } catch (error) {
      console.error(error);
    }
    setName("");
    setEmail("");
    setBtn(null)
  };
  return (
    <form>
      <FormControl isRequired>
        <FormLabel htmlFor="first-name">First name</FormLabel>
        <Input
          id="first-name"
          placeholder="First name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <Button
        onClick={btn != null  ?  editUser  : addUser }
        mt="20px"
        colorScheme="blue"
      >
        {btn != null ? "Edit" : "Send"}
      </Button>
    </form>
  );
};

export default Form;
