import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaLeaf } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', formData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.href = '/';
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(https://images.unsplash.com/photo-1518531933037-91b2f5fe8e7d?q=80&w=1600&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '-80px',
            paddingTop: '80px'
        }}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(3px)'
            }}></div>

            <div className="glass-card animate-fade-in" style={{
                width: '100%',
                maxWidth: '420px',
                padding: '40px',
                position: 'relative',
                zIndex: 2,
                background: 'rgba(255, 255, 255, 0.85)'
            }}>
                <div className="text-center" style={{ marginBottom: '30px' }}>
                    <div style={{
                        background: 'var(--primary-green)',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 15px auto',
                        boxShadow: '0 5px 15px rgba(45, 106, 79, 0.3)'
                    }}>
                        <FaLeaf size={30} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '5px' }}>Welcome Back</h1>
                    <p style={{ color: '#666' }}>Sign in to tend to your digital garden</p>
                </div>

                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{ position: 'absolute', left: '15px', top: '15px', color: '#888' }} />
                            <input
                                type="email"
                                className="form-input"
                                name="email"
                                value={email}
                                onChange={onChange}
                                style={{ paddingLeft: '45px' }}
                                placeholder="gardener@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '30px', position: 'relative' }}>
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '15px', top: '15px', color: '#888' }} />
                            <input
                                type="password"
                                className="form-input"
                                name="password"
                                value={password}
                                onChange={onChange}
                                style={{ paddingLeft: '45px' }}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-block" style={{ marginBottom: '20px' }}>Sign In</button>

                    <div className="text-center">
                        <p style={{ fontSize: '0.9rem' }}>
                            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Register here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
