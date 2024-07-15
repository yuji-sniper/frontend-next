"use client";

import { useState } from 'react';
import { Container, TextField, Button, TextareaAutosize, Typography } from '@mui/material';

export default function Home() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_HELLOWORLD_API_URL
    const JSONdata = {
      text: text
    };

    if (!url) {
      setResponse('API URLが設定されていません。');
      return;
    }

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
      console.log('Success:', data);
    } catch (error) {
      setResponse(JSON.stringify(error));
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h3">
        API Gateway
      </Typography>
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
