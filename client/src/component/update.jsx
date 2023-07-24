import React, { useState } from "react";
import axios from "axios";

const UpdateBlogItem = ({ blog, onUpdate }) => {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImgUrl, setUpdatedImgUrl] = useState("");

  const handleUpdate = () => {
    const updatedData = {
      name: updatedName,
      description: updatedDescription,
      imgUrl: updatedImgUrl,
    };

    axios
      .patch(`http://localhost:5000/api/blogs/${blog.id}`, updatedData)
      .then(response => {
        onUpdate(response.data); // Notify parent component about the update
        // Clear the update input fields after update
        setUpdatedName("");
        setUpdatedDescription("");
        setUpdatedImgUrl("");
      })
      .catch(error => {
        console.error('Error updating blog:', error);
      });
  };

  return (
    <div>
      {blog.isEditing ? (
        <div>
          <input
            type="text"
            placeholder="New name"
            value={updatedName}
            onChange={e => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Description"
            value={updatedDescription}
            onChange={e => setUpdatedDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Image URL"
            value={updatedImgUrl}
            onChange={e => setUpdatedImgUrl(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <button onClick={() => blog.setIsEditing(true)}>Update</button>
      )}
    </div>
  );
};

export default UpdateBlogItem;
