const express = require('express');

const server = express();

server.use(express.json());

const projects = ['Projeto01', 'Projeto02'];
//rota criar projeto

server.post('/projects', (req, res) => {
  const { title } = req.body;
  projects.push(title);
  return res.json(projects);
});

//rota listar projetos
server.get('/projects/', (req, res) => {
  return res.json(projects);
});

//rota editar titulo projeto
server.put('/projects/:index', (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index] = title;

  return res.json(projects);
});

//rota deletar projeto
server.delete('/projects/:index', (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);
  return res.json({ message: 'Projeto deletado' });
});

server.listen(3000);
