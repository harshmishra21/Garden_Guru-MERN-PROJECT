import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FaLeaf, FaTint, FaSeedling, FaCut, FaChartLine } from 'react-icons/fa';
import PlantHistoryModal from './PlantHistoryModal';
import { getPlantImage } from '../utils/plantImages';

const COLORS = ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7', '#d8f3dc'];

const PlantStatsOverview = ({ garden }) => {
    const [stats, setStats] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        fetchOverviewStats();
    }, [garden]);

    const fetchOverviewStats = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/stats/overview`, config);
            setStats(res.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlantClick = (plant) => {
        setSelectedPlant(plant);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlant(null);
        fetchOverviewStats(); // Refresh stats after modal closes
    };

    if (loading) {
        return (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                <FaChartLine size={40} style={{ opacity: 0.3, marginBottom: '10px' }} />
                <p>Loading stats...</p>
            </div>
        );
    }

    if (!stats || garden.length === 0) {
        return (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                <FaLeaf size={40} style={{ opacity: 0.3, marginBottom: '10px' }} />
                <p style={{ color: '#666' }}>Add plants to see your garden stats!</p>
            </div>
        );
    }

    return (
        <>
            {/* Summary Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: 'linear-gradient(135deg, #2d6a4f, #40916c)' }}>
                    <FaLeaf size={24} style={{ color: 'white', marginBottom: '8px' }} />
                    <h3 style={{ color: 'white', margin: '0', fontSize: '2rem' }}>{stats.totalPlants}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', margin: '5px 0 0 0', fontSize: '0.85rem' }}>Total Plants</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: 'linear-gradient(135deg, #3498db, #2980b9)' }}>
                    <FaTint size={24} style={{ color: 'white', marginBottom: '8px' }} />
                    <h3 style={{ color: 'white', margin: '0', fontSize: '2rem' }}>{stats.totalActionsThisWeek}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', margin: '5px 0 0 0', fontSize: '0.85rem' }}>Actions This Week</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: stats.plantsNeedingAttention > 0 ? 'linear-gradient(135deg, #e76f51, #f4a261)' : 'linear-gradient(135deg, #52b788, #74c69d)' }}>
                    <FaSeedling size={24} style={{ color: 'white', marginBottom: '8px' }} />
                    <h3 style={{ color: 'white', margin: '0', fontSize: '2rem' }}>{stats.plantsNeedingAttention}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', margin: '5px 0 0 0', fontSize: '0.85rem' }}>Need Attention</p>
                </div>
            </div>

            {/* Plant Activity Chart */}
            <div className="glass-card" style={{ padding: '25px', background: 'white' }}>
                <h4 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaChartLine style={{ color: 'var(--primary-green)' }} />
                    Plant Activity (Last 7 Days)
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
                    Click on any plant to see detailed care history
                </p>

                <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={stats.plantActivity}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
                        >
                            <XAxis type="number" />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={75}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div style={{
                                                background: 'white',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                border: '1px solid #eee'
                                            }}>
                                                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{data.name}</p>
                                                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: '#3498db' }}>💧 Watering: {data.watering}</p>
                                                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: '#27ae60' }}>🌱 Fertilizing: {data.fertilizing}</p>
                                                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: '#e67e22' }}>✂️ Pruning: {data.pruning}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="totalActions"
                                radius={[0, 8, 8, 0]}
                                cursor="pointer"
                                onClick={(data) => handlePlantClick(data)}
                            >
                                {stats.plantActivity.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.totalActions === 0 ? '#e0e0e0' : COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Legend */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#2d6a4f', borderRadius: '3px', marginRight: '5px' }}></span>
                        Active
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#e0e0e0', borderRadius: '3px', marginRight: '5px' }}></span>
                        No recent activity
                    </span>
                </div>
            </div>

            {/* Plant History Modal */}
            {isModalOpen && selectedPlant && (
                <PlantHistoryModal
                    plant={selectedPlant}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default PlantStatsOverview;
