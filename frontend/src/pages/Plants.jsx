import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaSun, FaFlask, FaPlusCircle } from 'react-icons/fa';
import { getPlantImage } from '../utils/plantImages';

const Plants = () => {
    const [plants, setPlants] = useState([]);
    const [search, setSearch] = useState('');
    const [sunlightFilter, setSunlightFilter] = useState('All');

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchPlants = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            try {
                const res = await axios.get('http://localhost:5001/api/plants', config);
                setPlants(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (token) fetchPlants();
    }, [token]);

    const filteredPlants = plants.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(search.toLowerCase());
        const matchesSunlight = sunlightFilter === 'All' || plant.sunlight.includes(sunlightFilter);
        return matchesSearch && matchesSunlight;
    });

    const addToGarden = async (plant) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            await axios.post('http://localhost:5001/api/garden', {
                plantId: plant._id,
                name: plant.name,
                waterReq: plant.instructions,
                sunlight: plant.sunlight,
                fertilizer: plant.fertilizer
            }, config);
            alert(`${plant.name} added to your garden!`);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to add plant');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
            <div className="text-center" style={{ margin: '40px 0' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Plant Database</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Discover the perfect additions to your garden.</p>
            </div>

            {/* Search & Filter Section */}
            <div className="glass-card" style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '40px',
                padding: '24px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white'
            }}>
                <div style={{ position: 'relative', flex: '1', minWidth: '300px', maxWidth: '500px' }}>
                    <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input
                        type="text"
                        placeholder="Search for plants (e.g., Rose, Basil)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '45px' }}
                    />
                </div>

                <div style={{ position: 'relative', flex: '0 0 200px' }}>
                    <FaFilter style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <select
                        value={sunlightFilter}
                        onChange={(e) => setSunlightFilter(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '45px' }}
                    >
                        <option value="All">All Sunlight</option>
                        <option value="Direct">Direct Sun</option>
                        <option value="Indirect">Indirect Sun</option>
                        <option value="Partial">Partial Shade</option>
                    </select>
                </div>
            </div>

            <div className="grid-auto">
                {filteredPlants.map((plant, index) => (
                    <div key={plant._id} className={`glass-card delay-${index % 5 + 1} animate-fade-in`} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={getPlantImage(plant.name ? plant.name.trim() : '')}
                                alt={plant.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1.0)'}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1416879895691-30ada05f4547?q=80&w=600&auto=format&fit=crop';
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(255,255,255,0.9)',
                                padding: '5px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: 'var(--primary-green)'
                            }}>
                                {plant.difficulty || 'Easy'}
                            </div>
                        </div>

                        <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <h2 style={{ marginTop: 0, fontSize: '1.6rem', marginBottom: '5px' }}>{plant.name}</h2>
                            <p style={{ color: '#888', fontStyle: 'italic', marginTop: 0, marginBottom: '20px' }}>{plant.scientificName || 'Botanical Name'}</p>

                            <div style={{ marginBottom: '25px', color: 'var(--text-main)', fontSize: '0.95rem', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <FaSun style={{ color: '#f1c40f', width: '20px' }} />
                                    <span>{plant.sunlight}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FaFlask style={{ color: '#9b59b6', width: '20px' }} />
                                    <span>{plant.fertilizer}</span>
                                </div>
                            </div>

                            <button onClick={() => addToGarden(plant)} className="btn btn-block">
                                <FaPlusCircle /> Add to Garden
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPlants.length === 0 && (
                <div className="text-center" style={{ padding: '60px', color: '#888' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>No plants found 🌱</h3>
                    <p>Try refining your search terms.</p>
                </div>
            )}
        </div>
    );
};

export default Plants;
