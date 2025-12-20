import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCloudSun, FaTemperatureHigh, FaTint, FaPlus, FaExclamationTriangle, FaLeaf, FaWater, FaSun } from 'react-icons/fa';
import { getPlantImage, getHeroImage, getWeatherIcon } from '../utils/plantImages';
import PlantStatsOverview from '../components/PlantStatsOverview';
import API_URL from '../config/api';

const COLORS = ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7'];

const Dashboard = () => {
    const [garden, setGarden] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [weather, setWeather] = useState({ temp: 24, condition: 'Sunny', humidity: 65 }); // Nakli (Simulated) data
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchGarden = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const res = await axios.get(`${API_URL}/api/garden`, config);
                setGarden(res.data);
            } catch (error) { console.error(error); }
        };

        const fetchReminders = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const res = await axios.get(`${API_URL}/api/reminders`, config);
                setReminders(res.data);
            } catch (error) { console.error(error); }
        };

        if (token) {
            fetchGarden();
            fetchReminders();
        }
    }, [token]);

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
            {/* Hero Section (Top Banner) */}
            <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${getHeroImage()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                padding: '100px 40px',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '40px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '15px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    Welcome back, {user?.name} 🌿
                </h1>
                <p style={{ fontSize: '1.4rem', maxWidth: '600px', margin: '0 0 30px 0', textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>
                    "To plant a garden is to believe in tomorrow."
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/plants" className="btn" style={{ background: 'white', color: 'var(--primary-green)', padding: '12px 32px' }}>
                        Browse Plants
                    </Link>
                    <Link to="/add-plant" className="btn" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', border: '1px solid white' }}>
                        + Add Plant
                    </Link>
                </div>
            </div>

            <div className="dashboard-layout">
                {/* Main Content */}
                <div className="dashboard-main">
                    {/* Weather ka dabba */}
                    <div className="glass-card" style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white',
                        border: 'none',
                        marginBottom: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '30px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ fontSize: '4rem' }}>{getWeatherIcon(weather.condition)}</div>
                            <div>
                                <h2 style={{ margin: 0, color: 'white', fontSize: '2.5rem' }}>{weather.temp}°C</h2>
                                <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>{weather.condition}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '30px', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '30px' }}>
                            <div className="text-center">
                                <FaTint size={24} />
                                <p style={{ margin: '5px 0 0 0' }}>Humidity</p>
                                <strong>{weather.humidity}%</strong>
                            </div>
                            <div className="text-center">
                                <FaCloudSun size={24} />
                                <p style={{ margin: '5px 0 0 0' }}>UV Index</p>
                                <strong>High</strong>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h2 style={{ fontSize: '2rem' }}>My Garden 🌻</h2>
                        <Link to="/add-plant" className="btn btn-secondary">
                            <FaPlus /> Add Plant
                        </Link>
                    </div>

                    {garden.length === 0 ? (
                        <div>
                            <div className="glass-card text-center" style={{ padding: '40px', marginBottom: '30px' }}>
                                <FaLeaf size={50} color="var(--light-green)" style={{ marginBottom: '15px' }} />
                                <h3>Your garden is waiting to bloom! 🌻</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                                    You haven't added any plants yet. Here are some great ones to start with:
                                </p>
                            </div>

                            <h3 style={{ marginBottom: '20px' }}>Recommended for New Gardeners</h3>
                            <div className="grid-auto">
                                {[
                                    { name: 'Snake Plant', water: 'Low', sun: 'Indirect', desc: 'Perfect for beginners, indestructible.' },
                                    { name: 'Monstera', water: 'Weekly', sun: 'Bright Indirect', desc: 'The iconic "Swiss Cheese" plant.' },
                                    { name: 'Basil', water: 'Frequent', sun: 'Direct Sun', desc: 'Fresh herbs for your kitchen.' }
                                ].map((plant, index) => (
                                    <div key={index} className="glass-card">
                                        <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                                            <img
                                                src={getPlantImage(plant.name)}
                                                alt={plant.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>
                                                Top Pick
                                            </div>
                                        </div>
                                        <div style={{ padding: '20px' }}>
                                            <h3 style={{ marginTop: 0 }}>{plant.name}</h3>
                                            <p style={{ fontSize: '0.9rem', color: '#666', height: '40px' }}>{plant.desc}</p>
                                            <Link to="/plants" className="btn btn-block">
                                                <FaPlus /> Add to Garden
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid-auto">
                            {garden.map((plant, index) => (
                                <div key={plant._id} className={`glass-card delay-${index % 3 + 1} animate-fade-in`}>
                                    <div style={{
                                        height: '200px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        <img
                                            src={getPlantImage(plant.name)}
                                            alt={plant.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                            padding: '20px',
                                            color: 'white'
                                        }}>
                                            <h3 style={{ color: 'white', margin: 0, fontSize: '1.4rem' }}>{plant.name}</h3>
                                        </div>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                                <FaWater style={{ color: '#3498db' }} />
                                                <span style={{ fontSize: '0.9rem' }}>{plant.waterReq}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                                <FaSun style={{ color: '#f1c40f' }} />
                                                <span style={{ fontSize: '0.9rem' }}>{plant.sunlight}</span>
                                            </div>
                                        </div>
                                        <Link to={`/plant/${plant._id}`} className="btn btn-block btn-secondary" style={{ borderRadius: '12px' }}>
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="dashboard-sidebar">
                    <h2 style={{ marginBottom: '20px' }}>Overview 📊</h2>
                    <PlantStatsOverview garden={garden} />

                    <h2 style={{ marginBottom: '20px' }}>Tasks ⏰</h2>
                    <div className="glass-card" style={{ padding: '25px', background: 'white' }}>
                        {reminders.length === 0 ? (
                            <div className="text-center" style={{ padding: '30px 0', opacity: 0.6 }}>
                                <FaLeaf size={40} style={{ marginBottom: '10px' }} />
                                <p>No pending tasks.</p>
                                <small>Enjoy your day!</small>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {reminders.map((reminder) => (
                                    <div key={reminder._id} style={{
                                        borderLeft: '4px solid var(--terracotta)',
                                        padding: '12px 15px',
                                        backgroundColor: '#fff8f6',
                                        borderRadius: '0 8px 8px 0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '700', color: 'var(--terracotta)' }}>{reminder.type}</p>
                                            <p style={{ margin: 0, fontSize: '0.85rem' }}>{reminder.gardenPlant?.name || 'Plant'}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#999' }}>
                                            {new Date(reminder.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{ marginTop: '25px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <Link to="/alerts" className="btn btn-block" style={{ background: '#e76f51', border: 'none' }}>
                                <FaExclamationTriangle /> Check Pest Alerts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
