import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { db } from "../../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
const Tabla = ({
  data,
  Listar = () => {},
  name,
  setName = () => {},
  email,
  setEmail = () => {},
  btn,
  setBtn = () => {},
  setIdUsuario = () => {},
  idUsuario,
}) => {
  const Delete = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
      Listar();
    } catch (e) {
      console.error(e);
    }
  };

  const Edit = async (id) => {
    try {
      const docRef = doc(db, "usuarios", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { name, email } = docSnap.data();
        setName(name);
        setEmail(email);
        setBtn(true);
        setIdUsuario(id);
	console.log(idUsuario)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Tabla de correos </TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>
                <ButtonGroup gap="4">
                  <Button
                    onClick={(id) => {
                      Delete(item.id);
                    }}
                    bg="red"
                    colorScheme="whiteAlpha"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={(id) => {
                      Edit(item.id);
                    }}
                    colorScheme="blackAlpha"
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Id</Th>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Tabla;
