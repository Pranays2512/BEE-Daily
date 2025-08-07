var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var PORT = 3000;

app.use(express.json());


var todoFile = path.join(__dirname, 'todo.json');
var usersFile = path.join(__dirname, 'users.json');

function readJSON(file, fallback, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) return cb(err);
    var value;
    try {
      value = data ? JSON.parse(data) : fallback;
    } catch (e) {
      value = fallback;
    }
    cb(null, value);
  });
}

function writeJSON(file, data, cb) {
  fs.writeFile(file, JSON.stringify(data, null, 2), cb);
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use(express.static('public'));

app.post('/signup', function(req, res) {
  readJSON(usersFile, [], function(err, users) {
    if (err) return res.send(err);
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
     return res.send(err);
    }
    for (var i=0; i<users.length; i++) {
      if (users[i].email === email) {
       return res.send("user exists");
      }
    }
    var newUser = { id: Date.now(), email: email, password: password };
    users.push(newUser);
    writeJSON(usersFile, users, function(err) {
      if (err) return res.send(err);
      res.send("user created");
    
    });
  });
});

app.post('/login', function(req, res) {
  readJSON(usersFile, [], function(err, users) {
    if (err) return res.send(err);
    var email = req.body.email;
    var password = req.body.password;
    var userFound = null;
    for (var i=0; i<users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        userFound = users[i];
        break;
      }
    }
    if (userFound) {
      res.send("login successful")
    } else {
      res.send("login failed")
    }
  });
});

app.get('/api/todos', function(req, res) {
  readJSON(todoFile, [], function(err, todos) {
    if (err) return res.send(err);
    res.json(todos);
  });
});

app.post('/api/todos', function(req, res) {
  var task = req.body.task;
  if (!task) return res.status(400).json({ error: 'Task required' });
  readJSON(todoFile, [], function(err, todos) {
    if (err) return res.status(500).json({ error: err.message });
    var newTodo = { id: Date.now(), task: task, completed: false };
    todos.push(newTodo);
    writeJSON(todoFile, todos, function(err) {
      if (err) return res.status(500).json({ error: 'Failed to save todo.' });
      res.json(newTodo);
    });
  });
});

app.put('/api/todos/:id', function(req, res) {
  readJSON(todoFile, [], function(err, todos) {
    if (err) return res.send(err);
    var id = req.params.id;
    var completed = req.body.completed;
    var index = -1;
    for (var i=0; i<todos.length; i++) {
      if (todos[i].id == id) {
        index = i;
        break;
      }
    }
    if (index === -1) return res.send("todo not found");
    todos[index].completed = completed;
    writeJSON(todoFile, todos, function(err) {
      if (err) return res.send("error updating")
      res.json(todos[index]);
    });
  });
});

app.delete('/api/todos/:id', function(req, res) {
  readJSON(todoFile, [], function(err, todos) {
    if (err) return res.send(err);
    var id = req.params.id;
    var updated = [];
    for (var i=0; i<todos.length; i++) {
      if (todos[i].id != id) {
        updated.push(todos[i]);
      }
    }
    writeJSON(todoFile, updated, function(err) {
      if (err) return res.send("error deleting")
      res.send("todo deleted");
    });
  });
});

app.listen(PORT, function() {
  console.log('Server running: http://localhost:' + PORT);
});
