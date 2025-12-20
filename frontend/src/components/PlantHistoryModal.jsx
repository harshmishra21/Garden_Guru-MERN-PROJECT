import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { FaTimes, FaTint, FaSeedling, FaCut, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { getPlantImage } from '../utils/plantImages';
import API_URL from '../config/api';

const PlantHistoryModal = ({ plant, onClose }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggingAction, setLoggingAction] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        fetchPlantStats();
    }, [plant._id]);

    const fetchPlantStats = async () => {
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${API_URL}/api/stats/${plant._id}`, config);
            setStats(res.data);
        } catch (error) {
            console.error('Error fetching plant stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickLog = async (actionType) => {
        setLoggingAction(actionType);
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.post(`${API_URL}/api/stats/log`, {
                gardenPlantId: plant._id,
                actionType,
                notes: `Quick ${actionType} logged`
            }, config);
            await fetchPlantStats(); // Refresh stats
        } catch (error) {
            console.error('Error logging action:', error);
        } finally {
            setLoggingAction(null);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const getActionIcon = (type) => {
        switch (type) {
            case 'watering': return <FaTint style={{ color: '#3498db' }} />;
            case 'fertilizing': return <FaSeedling style={{ color: '#27ae60' }} />;
            case 'pruning': return <FaCut style={{ color: '#e67e22' }} />;
            default: return <FaCalendarAlt style={{ color: '#666' }} />;
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }} onClick={onClose}>
            <div
                className="glass-card animate-fade-in"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    background: 'white',
                    padding: 0
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header with Plant Image */}
                <div style={{
                    position: 'relative',
                    height: '150px',
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${getPlantImage(plant.name)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}
                    >
                        <FaTimes />
                    </button>
                    <h2 style={{ color: 'white', margin: 0 }}>{plant.name}</h2>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <p>Loading care history...</p>
                    </div>
                ) : (
                    <div style={{ padding: '25px' }}>
                        {/* Quick Actions */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem' }}>Quick Log Action</h4>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => handleQuickLog('watering')}
                                    disabled={loggingAction === 'watering'}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 20px',
                                        background: loggingAction === 'watering' ? '#ccc' : '#3498db',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <FaTint /> {loggingAction === 'watering' ? 'Logging...' : 'Water'}
                                </button>
                                <button
                                    onClick={() => handleQuickLog('fertilizing')}
                                    disabled={loggingAction === 'fertilizing'}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 20px',
                                        background: loggingAction === 'fertilizing' ? '#ccc' : '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <FaSeedling /> {loggingAction === 'fertilizing' ? 'Logging...' : 'Fertilize'}
                                </button>
                                <button
                                    onClick={() => handleQuickLog('pruning')}
                                    disabled={loggingAction === 'pruning'}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 20px',
                                        background: loggingAction === 'pruning' ? '#ccc' : '#e67e22',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <FaCut /> {loggingAction === 'pruning' ? 'Logging...' : 'Prune'}
                                </button>
                            </div>
                        </div>

                        {/* Stats Summary */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '15px',
                            marginBottom: '25px'
                        }}>
                            <div style={{
                                textAlign: 'center',
                                padding: '15px',
                                background: '#f0f9ff',
                                borderRadius: '12px'
                            }}>
                                <FaTint style={{ color: '#3498db', fontSize: '1.5rem', marginBottom: '5px' }} />
                                <h3 style={{ margin: '0', color: '#3498db' }}>{stats?.actionCounts?.watering || 0}</h3>
                                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>Waterings</p>
                            </div>
                            <div style={{
                                textAlign: 'center',
                                padding: '15px',
                                background: '#f0fff4',
                                borderRadius: '12px'
                            }}>
                                <FaSeedling style={{ color: '#27ae60', fontSize: '1.5rem', marginBottom: '5px' }} />
                                <h3 style={{ margin: '0', color: '#27ae60' }}>{stats?.actionCounts?.fertilizing || 0}</h3>
                                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>Fertilizings</p>
                            </div>
                            <div style={{
                                textAlign: 'center',
                                padding: '15px',
                                background: '#fff9f0',
                                borderRadius: '12px'
                            }}>
                                <FaCut style={{ color: '#e67e22', fontSize: '1.5rem', marginBottom: '5px' }} />
                                <h3 style={{ margin: '0', color: '#e67e22' }}>{stats?.actionCounts?.pruning || 0}</h3>
                                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>Prunings</p>
                            </div>
                        </div>

                        {/* Activity Timeline Chart */}
                        {stats?.timeline && stats.timeline.length > 0 && (
                            <div style={{ marginBottom: '25px' }}>
                                <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem' }}>Activity Timeline (30 Days)</h4>
                                <div style={{ height: '150px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={stats.timeline}>
                                            <XAxis
                                                dataKey="date"
                                                tickFormatter={(date) => formatDate(date)}
                                                tick={{ fontSize: 10 }}
                                            />
                                            <YAxis tick={{ fontSize: 10 }} />
                                            <Tooltip
                                                labelFormatter={(date) => formatDate(date)}
                                                contentStyle={{ borderRadius: '8px' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="watering"
                                                stackId="1"
                                                stroke="#3498db"
                                                fill="#3498db"
                                                fillOpacity={0.6}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="fertilizing"
                                                stackId="1"
                                                stroke="#27ae60"
                                                fill="#27ae60"
                                                fillOpacity={0.6}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="pruning"
                                                stackId="1"
                                                stroke="#e67e22"
                                                fill="#e67e22"
                                                fillOpacity={0.6}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {/* Recent Logs */}
                        <div>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem' }}>Recent Care Logs</h4>
                            {stats?.recentLogs && stats.recentLogs.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {stats.recentLogs.slice(0, 5).map((log, index) => (
                                        <div
                                            key={log._id || index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px',
                                                background: '#f8f9fa',
                                                borderRadius: '10px'
                                            }}
                                        >
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem'
                                            }}>
                                                {getActionIcon(log.actionType)}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: 0, fontWeight: '500', textTransform: 'capitalize' }}>
                                                    {log.actionType}
                                                </p>
                                                <p style={{ margin: '3px 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                                                    {log.notes}
                                                </p>
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#999' }}>
                                                {formatDate(log.date)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '30px',
                                    background: '#f8f9fa',
                                    borderRadius: '10px'
                                }}>
                                    <p style={{ margin: 0, color: '#666' }}>No care logs yet. Use the buttons above to start tracking! 🌱</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlantHistoryModal;
