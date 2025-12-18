import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSun, FaWater, FaSeedling, FaCalendarAlt, FaCamera, FaTrash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { getPlantImage } from '../utils/plantImages';

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [logs, setLogs] = useState([]);
    const [newLog, setNewLog] = useState('');
    const [logImage, setLogImage] = useState(null);
    const [reminderDate, setReminderDate] = useState('');
    const [reminderType, setReminderType] = useState('watering');
    const [activeTab, setActiveTab] = useState('care'); // 'care' or 'logs'

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchData = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                // Fetch garden plants and find current one
                const resGarden = await axios.get('http://localhost:5001/api/garden', config);
                const foundPlant = resGarden.data.find(p => p._id === id);
                setPlant(foundPlant);

                // Fetch logs
                const resLogs = await axios.get(`http://localhost:5001/api/logs/${id}`, config);
                setLogs(resLogs.data.reverse()); // Show newest first
            } catch (error) { console.error(error); }
        };
        if (token) fetchData();
    }, [id, token]);

    const addLog = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
        const formData = new FormData();
        formData.append('gardenPlantId', id);
        formData.append('notes', newLog);
        if (logImage) formData.append('photo', logImage);

        try {
            const res = await axios.post('http://localhost:5001/api/logs', formData, config);
            setLogs([res.data, ...logs]);
            setNewLog('');
            setLogImage(null);
            alert('Growth log added! 📸');
        } catch (error) { alert('Failed to add log'); }
    };

    const addReminder = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.post('http://localhost:5001/api/reminders', {
                gardenPlantId: id,
                type: reminderType,
                date: reminderDate
            }, config);
            alert('Reminder set successfully! ⏰');
            setReminderDate('');
        } catch (error) { alert('Failed to set reminder'); }
    };

    const deletePlant = async () => {
        if (!window.confirm('Are you sure you want to remove this plant from your garden?')) return;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.delete(`http://localhost:5001/api/garden/${id}`, config);
            navigate('/');
        } catch (error) { alert('Failed to delete'); }
    }

    if (!plant) return <div className="container" style={{ padding: '50px', textAlign: 'center' }}>Loading plant details...</div>;

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '50px' }}>
            <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ marginBottom: '20px', padding: '8px 16px' }}>
                <FaArrowLeft /> Back to Garden
            </button>

            <div className="dashboard-layout">
                {/* Left Side: Plant Info */}
                <div style={{ flex: 1 }}>
                    <div className="glass-card" style={{ padding: '30px', textAlign: 'center', position: 'relative' }}>
                        <div style={{
                            width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px',
                            border: '4px solid white', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        }}>
                            <img
                                src={getPlantImage(plant.name)}
                                alt={plant.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1416879895691-30ada05f4547?q=80&w=600&auto=format&fit=crop';
                                }}
                            />
                        </div>
                        <h1 style={{ marginBottom: '10px' }}>{plant.name}</h1>
                        <p style={{ color: '#666', fontStyle: 'italic' }}>From your garden</p>

                        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '30px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '20px 0' }}>
                            <div className="text-center">
                                <FaWater size={24} color="#3498db" style={{ marginBottom: '5px' }} />
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Water</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{plant.waterReq}</div>
                            </div>
                            <div className="text-center">
                                <FaSun size={24} color="#f1c40f" style={{ marginBottom: '5px' }} />
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Sunlight</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{plant.sunlight}</div>
                            </div>
                            <div className="text-center">
                                <FaSeedling size={24} color="#27ae60" style={{ marginBottom: '5px' }} />
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Fertilizer</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{plant.fertilizer || 'Quarterly'}</div>
                            </div>
                        </div>

                        <button onClick={deletePlant} className="btn btn-danger" style={{ width: '100%' }}>
                            <FaTrash /> Remove Plant
                        </button>
                    </div>

                    {/* Set Reminder Card */}
                    <div className="glass-card" style={{ padding: '25px', marginTop: '30px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0 }}>
                            <FaCalendarAlt color="var(--terracotta)" /> Set Reminder
                        </h3>
                        <form onSubmit={addReminder}>
                            <div className="form-group">
                                <label className="form-label">Reminder Type</label>
                                <select className="form-input" value={reminderType} onChange={e => setReminderType(e.target.value)}>
                                    <option value="watering">💧 Watering</option>
                                    <option value="pruning">✂️ Pruning</option>
                                    <option value="harvesting">🧺 Harvesting</option>
                                    <option value="fertilizing">🧪 Fertilizing</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ margin: '15px 0' }}>
                                <label className="form-label">Due Date</label>
                                <input type="date" className="form-input" value={reminderDate} onChange={e => setReminderDate(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-block">Set Reminder</button>
                        </form>
                    </div>
                </div>

                {/* Right Side: Logs */}
                <div style={{ flex: 2 }}>
                    <div className="glass-card" style={{ padding: '30px', minHeight: '500px' }}>
                        <h2 style={{ marginTop: 0, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaCamera color="var(--primary-green)" /> Growth Journal
                        </h2>

                        <div className="glass-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.5)', marginBottom: '30px', border: '1px dashed var(--primary-green)' }}>
                            <h4 style={{ marginTop: 0 }}>Add New Entry</h4>
                            <form onSubmit={addLog}>
                                <textarea
                                    className="form-input"
                                    rows="3"
                                    placeholder="How is the plant doing today? (New leaves, blooming, etc.)"
                                    value={newLog}
                                    onChange={e => setNewLog(e.target.value)}
                                    required
                                    style={{ marginBottom: '15px' }}
                                ></textarea>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        onChange={e => setLogImage(e.target.files[0])}
                                        accept="image/*"
                                        style={{ fontSize: '0.9rem' }}
                                    />
                                    <button type="submit" className="btn">Add Entry</button>
                                </div>
                            </form>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {logs.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>No logs yet. Start tracking your plant's journey!</p>
                            ) : logs.map((log) => (
                                <div key={log._id} style={{ display: 'flex', gap: '20px', padding: '20px', background: 'white', borderRadius: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                    <div style={{ flex: '0 0 120px', height: '120px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {log.photo ? (
                                            <img src={`http://localhost:5001/${log.photo}`} alt="Log" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <FaSeedling size={30} color="#ccc" />
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ fontWeight: 'bold', color: 'var(--primary-green)' }}>Growth Update</span>
                                            <span style={{ fontSize: '0.85rem', color: '#999' }}>{new Date(log.date).toLocaleDateString()}</span>
                                        </div>
                                        <p style={{ margin: 0, lineHeight: '1.5', color: '#444' }}>{log.notes}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantDetails;
