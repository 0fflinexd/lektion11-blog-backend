const dbDriver = require ('better-sqlite3');

const db = dbDriver('blog.sqlite3');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static('frontend'));

/*Setup all routes */
// GET 

app.get('/api/posts',(req,res)=> {
    const statment = db.prepare('SELECT * FROM posts');
    const post = statment.all();
    res.json(post);
});

// GET 1
app.get('/api/posts/:id', (req,res)=>{
    const statement = db.prepare('SELECT * FROM posts WHERE id = ?');
    const post = statement.get(req.params.id);
    res.json(post);
});

//POST
app.post('/api/posts', (req,res)=> {
    const post = req.body;
    const statement = db.prepare('INSERT INTO posts (title, content) VALUES (?,?)');
    const result = statement.run(post.title, post.content);
    res.json({ id: result.lastInsertRowid, success: true});
});

/*Start the server */
app.listen(3000, console.log('Server started on port 3000'));