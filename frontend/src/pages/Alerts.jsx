import { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchAlerts = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const res = await axios.get('http://localhost:5001/api/alerts', config);
                setAlerts(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (token) fetchAlerts();
    }, [token]);

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <h1 style={{ color: '#D32F2F' }}>Pest & Disease Alerts ⚠️</h1>

            {alerts.length === 0 ? (
                <p>No active alerts. Your garden is safe!</p>
            ) : (
                alerts.map((alert) => (
                    <div key={alert._id} className="card" style={{ borderLeft: '5px solid #D32F2F' }}>
                        <h2 style={{ color: '#D32F2F' }}>{alert.title}</h2>
                        <p><strong>Description:</strong> {alert.description}</p>
                        <p><strong>Remedy:</strong> {alert.remedy}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Alerts;
