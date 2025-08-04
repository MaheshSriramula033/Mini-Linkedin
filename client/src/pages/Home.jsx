import { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';

const Home = () => {
  const [posts, setPosts] = useState([]);

const fetchPosts = () => {
  axios.get('http://localhost:5000/api/posts')
    .then((res) => {
      const data = res.data;
      if (Array.isArray(data)) {
        setPosts(data); // ✅ Safe assignment
      } else {
        console.warn('Unexpected response:', data);
        setPosts([]); // ✅ Prevent crash
      }
    })
    .catch((err) => {
      console.error('Error fetching posts:', err);
      setPosts([]); // ✅ Prevent crash on error
    });
};


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Public Posts</h2>

      {/* Show create post form only if logged in */}
      {localStorage.getItem('token') && <CreatePost onPostCreated={fetchPosts} />}

{posts.length === 0 ? (
  <div className="alert alert-info">No posts yet. Be the first to create one!</div>
) : (
  posts.map(post => (
    <div key={post._id} className="card mb-3">
      <div className="card-body">
        <p className="card-text">{post.content}</p>
        <small className="text-muted">
           @{<a href={`/profile/${post.author._id}`}>{post.author.name}</a> || 'Anonymous'}, {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Just now'}
        </small>
      </div>
    </div>
  ))
)}
    </div>
  );
};

export default Home;

