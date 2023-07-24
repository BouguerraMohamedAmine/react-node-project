import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImgUrl, setUpdatedImgUrl] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      name: name,
      description: description,
      imgUrl: imgUrl
    };
  
    axios.post('http://localhost:5000/api/blogs', newBlog) 
      .then(response => {
        setName('');
        setDescription('');
        setImgUrl('');
        fetchBlogs(); 
      })
      .catch(error => {
        console.error('Error adding blog:', error);
      });
  };

  const handleUpdate = (id) => {
    const updatedData = {
      name: updatedName,
      description: updatedDescription,
      imgUrl: updatedImgUrl
    };

    axios.patch(`http://localhost:5000/api/blogs/${id}`, updatedData)
      .then(response => {
        setBlogs(prevBlogs => {
          const updatedBlogs = prevBlogs.map(blog => {
            if (blog.id === id) {
              return {
                ...blog,
                name: updatedData.name,
                description: updatedData.description,
                imgUrl: updatedData.imgUrl
              };
            }
            return blog;
          });
          return updatedBlogs;
        });

        setUpdatedName('');
        setUpdatedDescription('');
        setUpdatedImgUrl('');
        fetchBlogs(); 
      })
      .catch(error => {
        console.error('Error updating blog:', error);
      });
  };
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/blogs/${id}`)
      .then(response => {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        fetchBlogs(); 
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
      });
  };

  return (
    <div>
      <div className="top-bar">
        <h1>🖼️🖼️🖼️🖼️Gallery🖼️🖼️🖼️🖼️</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={e => setImgUrl(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="gallery">
        {blogs.map(blog => (
          <div key={blog.id} className="gallery-item">
            <h2>{blog.name}</h2>
            <p>{blog.description}</p>
            <img src={blog.imgUrl} alt={blog.name} />
            <button onClick={() => handleUpdate(blog.id)}>Update</button>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
