import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const requestOptions = {
  method: 'POST',
};

function App() {
  const [numero, setNumero] = useState('');

  const buttonHandle = () => {
    if(numero !== '') {
      console.info('Agregando el número: ', numero, ' a la base de datos...');
      fetch(`http://localhost:3000/core/bills?amount=${numero}&date=${Date()}`, requestOptions)
        .then(response => response.json())
        .then(data => console.info('Respuesta: ', data))
    } else console.info('Ingrese un numero para agregar!');
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        backgroundColor: '#efefef',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Prata ($)"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        variant="outlined"
        type="number"
        sx={{
          backgroundColor: 'white',
        }}
      />
      <Button
        onClick={buttonHandle}
        variant="contained"
      >
        Agregar
      </Button>
    </Box>
  );
}

export default App;
