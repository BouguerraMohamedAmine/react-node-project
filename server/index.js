const handle = require('./handler');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let blogs = [];


app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

app.post('/api/blogs', (req, res) => {
  try {
    const newBlog = req.body;
    newBlog.id = blogs.length + 1;
    blogs.push(newBlog);
    res.json(newBlog);
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(400).json({ message: 'Invalid JSON data' });
  }
});


app.patch('/api/blogs/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    const blogIndex = blogs.findIndex(blog => blog.id === id);

    if (blogIndex !== -1) {
      blogs[blogIndex] = {
        ...blogs[blogIndex],
        ...updatedData
      };
      res.json(blogs[blogIndex]);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(400).json({ message: 'Invalid JSON data' });
  }
});

app.delete('/api/blogs/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const blogIndex = blogs.findIndex(blog => blog.id === id);

    if (blogIndex !== -1) {
      const deletedBlog = blogs.splice(blogIndex, 1)[0];
      res.json(deletedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(400).json({ message: 'Invalid JSON data' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
