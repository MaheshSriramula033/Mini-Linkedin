import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/profile/${id}`)
      .then((res) => setProfile(res.data))
      .catch(() => alert('Failed to load profile'));
  }, [id]);

  if (!profile) return <div className="text-center mt-5">Loading profile...</div>;

  return (
    <div className="container mt-4">
      <div className="card p-4 mb-4">
        <h3>{profile.user.name}</h3>
        <p className="text-muted">{profile.user.email}</p>
        <p>{profile.user.bio}</p>
      </div>

      <h5>{profile.user.name}'s Posts</h5>
      {profile.posts.map(post => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            <p>{post.content}</p>
            <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
