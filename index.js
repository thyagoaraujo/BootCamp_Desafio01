//importa o modulo do express
const express = require('express');

//cria a instância do servidor
const app = express();

//permite que o express aceite json
app.use(express.json());

//constante para armazenar os projetos
const projects = [];

//middlewares global
//variável que armazena a quantidade de requisições
let requests = 0;

//middleware contagem de requisições realizadas no app
function logRequests(req, res, next) {
  requests++;
  console.log(`Requisições realizadas:${requests};`);
  return next();
}

//middleware checking route parameters
function checkIdParams(req, res, next) {
  const { id } = req.params;
  if (!projects[id]) {
    return res.status(400).json({ error: 'id project not found' });
  }

  return next();
}

//Add middlewares de logs
app.use(logRequests);

//rota criar projeto

app.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title });
  return res.json(projects);
});

//rota listar projetos
app.get('/projects/', (req, res) => {
  return res.json(projects);
});

//rota editar projeto
app.put('/projects/:id', checkIdParams, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
});

//rota deletar projeto
app.delete('/projects/:id', checkIdParams, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  return res.json({ message: 'Projeto deletado' });
});

//rota criar uma task para o projeto
app.post('/projects/:id/tasks', checkIdParams, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { tasks } = req.body;

  projects[id].title = title;
  projects[id].tasks = [tasks];
  return res.json(projects);
});

//Faz a aplicação ouvir a porta 3000
app.listen(3000);
