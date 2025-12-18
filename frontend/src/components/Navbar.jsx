import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaLeaf, FaHome, FaSeedling, FaUsers, FaBell, FaSignOutAlt, FaUserShield, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isOpen, setIsOpen] = useState(false);

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', color: 'var(--primary-green)', textDecoration: 'none' }}>
                    <FaLeaf /> <span style={{ fontFamily: 'var(--header-font)', fontWeight: 'bold' }}>GardenGuru</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        color: 'var(--primary-green)'
                    }}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className={`nav-links ${isOpen ? 'active' : ''}`} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    {user ? (
                        <>
                            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsOpen(false)}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaHome /> Dashboard</span>
                            </Link>
                            <Link to="/plants" className={`nav-link ${isActive('/plants')}`} onClick={() => setIsOpen(false)}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaSeedling /> Plants</span>
                            </Link>
                            <Link to="/community" className={`nav-link ${isActive('/community')}`} onClick={() => setIsOpen(false)}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaUsers /> Community</span>
                            </Link>
                            <Link to="/alerts" className={`nav-link ${isActive('/alerts')}`} onClick={() => setIsOpen(false)}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaBell /> Alerts</span>
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className={`nav-link ${isActive('/admin')}`} style={{ color: 'var(--terracotta)' }} onClick={() => setIsOpen(false)}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaUserShield /> Admin</span>
                                </Link>
                            )}
                            <button className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '20px' }} onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className="btn" onClick={() => setIsOpen(false)}>Get Started</Link>
                        </>
                    )}
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .nav-links {
                        display: none !important;
                        width: 100%;
                        flex-direction: column;
                        position: absolute;
                        top: 80px;
                        left: 0;
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        padding: 30px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                        border-top: 1px solid rgba(0,0,0,0.05);
                    }
                    .nav-links.active {
                        display: flex !important;
                    }
                    .menu-btn {
                        display: block !important;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
