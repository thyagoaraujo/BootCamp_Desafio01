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

//função que retorna o id do projeto
function getProjects(req, res, next) {
  const { id } = req.params;
  var index = projects.map(e => e.id).indexOf(id);

  if (index == -1) {
    return res.status(400).json({ error: 'Project not found' });
  }
  req.projects = index;
  return next();
}

//função que evita criar projetos com mesmo nome
function checkProjectsExists(req, res, next) {
  const { id } = req.body;
  var index = project.map(e => e.id).indexOf(id);

  if (index != -1) {
    return res.status(400).json({ error: 'Project already exists' });
  }
  return next();
}

//Add middlewares de logs
app.use(logRequests);

//rota criar projeto

app.post('/projects', checkProjectsExists, (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  return res.json(projects);
});

//rota listar projetos
app.get('/projects/', (req, res) => {
  return res.json(projects);
});

//rota editar projeto
app.put('/projects/:id', getProjects, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
});

//rota deletar projeto
app.delete('/projects/:id', getProjects, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  return res.json({ message: 'Projeto deletado' });
});

//Faz a aplicação ouvir a porta 3000
app.listen(3000);
