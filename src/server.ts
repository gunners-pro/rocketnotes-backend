import express from 'express';

const app = express();

app.get('/', (_, response) => response.json({ message: 'Olá mundo' }));

app.listen(3333, () => console.log('Server started...'));
