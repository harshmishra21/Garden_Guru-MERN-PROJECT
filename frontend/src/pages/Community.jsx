import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaComment, FaShare, FaLeaf, FaImage, FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import API_URL from '../config/api';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [image, setImage] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchPosts = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const res = await axios.get(`${API_URL}/api/posts`, config);
                setPosts(res.data);
            } catch (error) { console.error(error); }
        };
        if (token) fetchPosts();
    }, [token]);

    const addPost = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
        const formData = new FormData();
        formData.append('content', newPost);
        if (image) formData.append('image', image);

        try {
            const res = await axios.post(`${API_URL}/api/posts`, formData, config);
            setPosts([res.data, ...posts]);
            setNewPost('');
            setImage(null);
        } catch (error) { alert('Failed to post'); }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
            {/* Header */}
            <div className="text-center" style={{ margin: '40px 0' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Community Garden 🌻</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Share your progress, ask questions, and grow together.</p>
            </div>

            <div className="dashboard-layout" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Main Feed */}
                <div style={{ flex: 2 }}>
                    {/* Create Post Widget */}
                    <div className="glass-card" style={{ padding: '25px', marginBottom: '30px', background: 'white' }}>
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                            <div style={{ fontSize: '2.5rem', color: '#ccc' }}><FaUserCircle /></div>
                            <textarea
                                className="form-input"
                                placeholder={`What's growing in your garden, ${user?.name}?`}
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                rows="2"
                                style={{ resize: 'none', border: 'none', background: '#f8f9fa', padding: '15px' }}
                            ></textarea>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            <label className="btn btn-secondary" style={{ padding: '8px 15px', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '20px' }}>
                                <FaImage /> Add Photo
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ display: 'none' }} accept="image/*" />
                            </label>
                            {image && <span style={{ fontSize: '0.9rem', color: 'var(--primary-green)' }}>Image selected: {image.name}</span>}
                            <button onClick={addPost} className="btn" disabled={!newPost} style={{ padding: '8px 25px', borderRadius: '20px' }}>
                                <FaPaperPlane /> Post
                            </button>
                        </div>
                    </div>

                    {/* Feed */}
                    {posts.map((post) => (
                        <div key={post._id} className="glass-card" style={{ padding: '0', marginBottom: '30px', background: 'white' }}>
                            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '45px', height: '45px', borderRadius: '50%', background: '#e0f2f1',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-green)'
                                }}>
                                    <FaLeaf size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{post.user?.name}</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>

                            <div style={{ padding: '0 25px 15px 25px' }}>
                                <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{post.content}</p>
                            </div>

                            {post.image && (
                                <div style={{ width: '100%', maxHeight: '400px', overflow: 'hidden', background: '#f0f0f0' }}>
                                    <img src={`${API_URL}/${post.image}`} alt="Post content" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            )}

                            <div style={{ padding: '15px 25px', borderTop: '1px solid #eee', display: 'flex', gap: '30px' }}>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                                    <FaHeart /> Like
                                </button>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                                    <FaComment /> Comment
                                </button>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                                    <FaShare /> Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div style={{ flex: 1 }}>
                    <div className="glass-card" style={{ padding: '20px', background: 'white', position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginTop: 0, borderBottom: '2px solid var(--accent-lime)', paddingBottom: '10px', display: 'inline-block' }}>Trending Topics 📈</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                            {['#OrganicGardening', '#SucculentLove', '#PestControlTips', '#UrbanJungle', '#MyFirstHarvest'].map(tag => (
                                <li key={tag} style={{ marginBottom: '12px' }}>
                                    <a href="#" style={{ color: 'var(--primary-green)', fontWeight: '600', display: 'block', padding: '8px', borderRadius: '8px', transition: 'background 0.2s' }}
                                        onMouseOver={e => e.target.style.background = 'var(--accent-lime)'}
                                        onMouseOut={e => e.target.style.background = 'transparent'}>
                                        {tag}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: '30px', padding: '15px', background: 'var(--accent-lime)', borderRadius: '15px' }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>💡 Gardener's Tip</h4>
                            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                                "Water your plants early in the morning to reduce evaporation and prevent fungal diseases."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
