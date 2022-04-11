const express = require('express');
const cors = require('cors');
const editJsonFile = require("edit-json-file");
const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;
let file = editJsonFile('../client/projects.json');

app.get('/test', (req, res) => 
{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    console.log("GET");
    res.send(projects);
});

app.post('/test', (req, res) => 
{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.send(addProject(req.body));
});

app.listen(port);


function addProject(project)
{
    file.append("projects", project);
    file.save();
    return file.toObject();
}