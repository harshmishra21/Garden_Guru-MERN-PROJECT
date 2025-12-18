import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaLeaf, FaTint, FaSun, FaSeedling, FaArrowLeft } from 'react-icons/fa';

const AddPlant = () => {
    const [formData, setFormData] = useState({
        name: '',
        waterReq: '',
        sunlight: '',
        fertilizer: '',
    });

    const { name, waterReq, sunlight, fertilizer } = formData;
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/garden`, formData, config);
            navigate('/');
        } catch (error) {
            alert('Failed to add plant');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'url(/hero-new.png) no-repeat center center/cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            marginTop: '-80px',
            paddingTop: '120px'
        }}>
            <div className="glass-card animate-fade-in" style={{
                width: '100%',
                maxWidth: '600px',
                padding: '50px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', marginBottom: '30px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    <FaArrowLeft /> Back to Dashboard
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1b4332', marginBottom: '10px' }}>Grow Something New</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Add a custom plant to your digital garden.</p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 'bold', color: '#2d6a4f', marginBottom: '10px' }}>
                            <FaLeaf /> Plant Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="e.g. Grandma's Fern"
                            style={{
                                padding: '15px 20px',
                                borderRadius: '15px',
                                border: '2px solid #e8f5e9',
                                background: 'white',
                                fontSize: '1rem',
                                width: '100%',
                                transition: 'all 0.3s ease'
                            }}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 'bold', color: '#2d6a4f', marginBottom: '10px' }}>
                            <FaTint /> Watering Schedule
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="waterReq"
                            value={waterReq}
                            onChange={onChange}
                            placeholder="e.g. Every 2-3 days"
                            style={{
                                padding: '15px 20px',
                                borderRadius: '15px',
                                border: '2px solid #e8f5e9',
                                background: 'white',
                                fontSize: '1rem',
                                width: '100%'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="form-group" style={{ marginBottom: '25px', flex: 1 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 'bold', color: '#2d6a4f', marginBottom: '10px' }}>
                                <FaSun /> Sunlight
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="sunlight"
                                value={sunlight}
                                onChange={onChange}
                                placeholder="e.g. Bright Indirect"
                                style={{
                                    padding: '15px 20px',
                                    borderRadius: '15px',
                                    border: '2px solid #e8f5e9',
                                    background: 'white',
                                    fontSize: '1rem',
                                    width: '100%'
                                }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '25px', flex: 1 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 'bold', color: '#2d6a4f', marginBottom: '10px' }}>
                                <FaSeedling /> Fertilizer
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="fertilizer"
                                value={fertilizer}
                                onChange={onChange}
                                placeholder="e.g. Monthly"
                                style={{
                                    padding: '15px 20px',
                                    borderRadius: '15px',
                                    border: '2px solid #e8f5e9',
                                    background: 'white',
                                    fontSize: '1rem',
                                    width: '100%'
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-block hover-scale" style={{
                        background: '#00b862',
                        color: 'white',
                        padding: '18px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        marginTop: '20px',
                        boxShadow: '0 10px 25px rgba(0, 184, 98, 0.4)'
                    }}>
                        Add to Garden
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
                        Using AI suggestions? Try the <Link to="/plants" style={{ color: '#00b862', fontWeight: 'bold' }}>Plant Library</Link> instead.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AddPlant;
