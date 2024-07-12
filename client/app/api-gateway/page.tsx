"use client";

import { useState } from 'react';
import { Container, TextField, Button, TextareaAutosize, Typography } from '@mui/material';

export default function Home() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const url = "https://xxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev";
    const JSONdata = {
      text: text
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSONdata)
      });

      const data = await res.json();
      setResponse(JSON.stringify(data));
      alert('Success');
    } catch (error) {
      setResponse(JSON.stringify(error));
      alert('Error');
    }
  };

  return (
    <Container>
      <Typography variant="h3">テスト</Typography>
      <TextField
        label="入力テキスト"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        送信
      </Button>
      <TextareaAutosize
        minRows={10}
        cols={120}
        value={response}
        disabled
        style={{ width: '100%', marginTop: '20px' }}
      />
    </Container>
  );
}
