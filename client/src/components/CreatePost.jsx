import { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in to post');

    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        { content },
        { headers: { Authorization: token } }
      );
      setContent('');
      onPostCreated(); // Refresh posts in Home
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-2"
            placeholder="What's on your mind?"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100" type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
