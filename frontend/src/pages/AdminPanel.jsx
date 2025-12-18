import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [plants, setPlants] = useState([]);
    const [alerts, setAlerts] = useState([]);

    // Plant Form
    const [plantData, setPlantData] = useState({ name: '', instructions: '', sunlight: '', fertilizer: '' });

    // Alert Form
    const [alertData, setAlertData] = useState({ title: '', description: '', remedy: '' });

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchData = async () => {
        try {
            const resPlants = await axios.get('http://localhost:5001/api/plants', config);
            setPlants(resPlants.data);
            const resAlerts = await axios.get('http://localhost:5001/api/alerts', config);
            setAlerts(resAlerts.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) fetchData();
    }, [token]);

    const addPlant = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/plants', plantData, config);
            fetchData();
            setPlantData({ name: '', instructions: '', sunlight: '', fertilizer: '' });
            alert('Plant added');
        } catch (error) {
            alert('Failed to add plant');
        }
    };

    const deletePlant = async (id) => {
        if (!window.confirm('Delete this plant from master DB?')) return;
        try {
            await axios.delete(`http://localhost:5001/api/plants/${id}`, config);
            fetchData(); // Simplest way to refresh
        } catch (error) {
            alert('Failed to delete plant');
        }
    };

    const addAlert = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/alerts', alertData, config);
            fetchData();
            setAlertData({ title: '', description: '', remedy: '' });
            alert('Alert added');
        } catch (error) {
            alert('Failed to add alert');
        }
    };

    const deleteAlert = async (id) => {
        if (!window.confirm('Delete this alert?')) return;
        try {
            await axios.delete('http://localhost:5001/api/alerts/${id}', config);
            fetchData();
        } catch (error) {
            alert('Failed to delete alert');
        }
    };

    return (
        <div className="container">
            <h1>Admin Panel 🛠️</h1>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Plants Manager */}
                <div style={{ flex: 1 }}>
                    <div className="card">
                        <h2>Manage Master Plants</h2>
                        <form onSubmit={addPlant}>
                            <input className="form-control" style={{ marginBottom: '5px' }} placeholder="Name" value={plantData.name} onChange={e => setPlantData({ ...plantData, name: e.target.value })} required />
                            <input className="form-control" style={{ marginBottom: '5px' }} placeholder="Water Instructions" value={plantData.instructions} onChange={e => setPlantData({ ...plantData, instructions: e.target.value })} required />
                            <input className="form-control" style={{ marginBottom: '5px' }} placeholder="Sunlight" value={plantData.sunlight} onChange={e => setPlantData({ ...plantData, sunlight: e.target.value })} required />
                            <input className="form-control" style={{ marginBottom: '5px' }} placeholder="Fertilizer" value={plantData.fertilizer} onChange={e => setPlantData({ ...plantData, fertilizer: e.target.value })} required />
                            <button type="submit" className="btn">Add Plant</button>
                        </form>

                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                            {plants.map(plant => (
                                <li key={plant._id} style={{ borderBottom: '1px solid #eee', padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{plant.name}</span>
                                    <button onClick={() => deletePlant(plant._id)} className="btn" style={{ backgroundColor: '#D32F2F', padding: '2px 5px', fontSize: '12px' }}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Alerts Manager */}
                <div style={{ flex: 1 }}>
                    <div className="card">
                        <h2>Manage Alerts</h2>
                        <form onSubmit={addAlert}>
                            <input className="form-control" style={{ marginBottom: '5px' }} placeholder="Title" value={alertData.title} onChange={e => setAlertData({ ...alertData, title: e.target.value })} required />
                            <input className="form-control" style={{ marginBottom: '5px' }} placeholder="Description" value={alertData.description} onChange={e => setAlertData({ ...alertData, description: e.target.value })} required />
                            <input className="form-control" style={{ marginBottom: '5px' }} placeholder="Remedy" value={alertData.remedy} onChange={e => setAlertData({ ...alertData, remedy: e.target.value })} required />
                            <button type="submit" className="btn">Add Alert</button>
                        </form>

                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                            {alerts.map(alert => (
                                <li key={alert._id} style={{ borderBottom: '1px solid #eee', padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{alert.title}</span>
                                    <button onClick={() => deleteAlert(alert._id)} className="btn" style={{ backgroundColor: '#D32F2F', padding: '2px 5px', fontSize: '12px' }}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
