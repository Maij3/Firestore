import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase/firebaseConfig";
import Form from "./component/Form";
import { Box } from "@chakra-ui/react";
import Tabla from "./component/List";
import { addDoc, collection, getDocs } from "firebase/firestore";
function App() {
  const [data, setdata] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [btn, setBtn] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const Listar = async () => {
    const { docs } = await getDocs(collection(db, "usuarios"));
    const nuevaArray = docs.map((item) => ({ id: item.id, ...item.data() }));
    setdata(nuevaArray);
  };

  useEffect(() => {
    Listar();
  }, []);

  return (
    <div className="App">
      <Box w="400px" m="auto">
        <Form
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          Listar={Listar}
          btn={btn}
          setBtn={setBtn}
          idUsuario={idUsuario}
          setIdUsuario={setIdUsuario}
        />
      </Box>
      <Box w="90%" m="20px auto">
        <Tabla
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          data={data}
          Listar={Listar}
          btn={btn}
          setBtn={setBtn}
          idUsuario={idUsuario}
          setIdUsuario={setIdUsuario}
        />
      </Box>
    </div>
  );
}

export default App;
