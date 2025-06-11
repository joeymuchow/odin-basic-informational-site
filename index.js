import express from 'express';
import path from 'path';

const app = express();

const __dirname = import.meta.dirname;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes', 'about.html'));
});

app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes', 'contact-me.html'));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'routes', '404.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => `Server running on ${PORT}`);