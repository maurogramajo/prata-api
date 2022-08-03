import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

function App() {
  const [numero, setNumero] = useState('');
  const buttonHandle = () => {
    console.info('Manu anda a tu casha');
  };

  return (
    <Box
      component="form"
      method='POST'
      action={`/?prata=${numero}`}
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
    </Box>
  );
}

export default App;
