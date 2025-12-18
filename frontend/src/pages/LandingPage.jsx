import { Link } from 'react-router-dom';
import { FaUserCircle, FaCheck } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="landing-page" style={{ fontFamily: "'Outfit', sans-serif", width: '100%', overflowX: 'hidden' }}>

            {/* 1. Hero Section - Full Width & Height */}
            <section style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                backgroundImage: `url(/hero-new.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px',
                marginTop: '-80px', // Pull up behind transparent navbar if needed, or just 0
                paddingTop: '80px' // Compensate
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(3px)'
                }}></div>

                <div className="animate-fade-in" style={{ maxWidth: '900px', zIndex: 2, padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)' }}>
                    <h1 style={{
                        fontSize: '4.5rem',
                        fontWeight: '800',
                        marginBottom: '25px',
                        lineHeight: '1.1',
                        textShadow: '0 4px 20px rgba(0,0,0,0.4)',
                        letterSpacing: '-1px',
                        color: 'white'
                    }}>
                        Grow Your Dream Garden<br />With AI Confidence
                    </h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '50px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 50px auto', opacity: 0.95, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        Your personal botanical expert is here. Diagnose issues, track growth, and get daily care tips instantly.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/login" className="btn hover-scale" style={{
                            background: '#00b862',
                            color: 'white',
                            fontSize: '1.2rem',
                            padding: '18px 45px',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            border: 'none',
                            boxShadow: '0 10px 30px rgba(0, 184, 98, 0.4)',
                        }}>
                            Get Started Free
                        </Link>
                        <Link to="/login" className="btn hover-scale" style={{
                            background: 'white',
                            color: '#00b862',
                            fontSize: '1.2rem',
                            padding: '18px 45px',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            border: 'none',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}>
                            Log In
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Who We Are Section */}
            <section style={{ padding: '100px 0', background: 'white' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <div style={{ color: '#00b862', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>Who We Are</div>
                            <h2 style={{ fontSize: '3rem', marginBottom: '25px', color: '#1a1a1a', fontWeight: '800', lineHeight: '1.2' }}>
                                Cultivating Passion for <br /> <span style={{ color: '#00b862' }}>Green Spaces</span>
                            </h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
                                At GardenGuru, we believe that everyone deserves a thriving garden, regardless of their experience level. We combine advanced AI technology with the timeless joy of gardening to bring you expert advice right at your fingertips.
                            </p>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '30px' }}>
                                Whether you're tending to a single succulent or managing a backyard oasis, our mission is to help you grow with confidence.
                            </p>
                            <Link to="/register" className="btn" style={{ background: '#1a1a1a', color: 'white', padding: '15px 35px', borderRadius: '50px', fontSize: '1rem' }}>Read Our Story</Link>
                        </div>
                        <div style={{ flex: '1 1 500px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: '#e8f5e9', borderRadius: '50%', zIndex: 0 }}></div>
                            <img
                                src="/gardener.png"
                                alt="Person gardening"
                                className="hover-scale"
                                style={{
                                    width: '100%',
                                    borderRadius: '30px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    position: 'relative',
                                    zIndex: 1,
                                    transform: 'rotate(2deg)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Steps Section */}
            <section style={{ padding: '100px 0', background: 'linear-gradient(to bottom, #f0f7f4, #ffffff)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '20px', color: '#1a1a1a', fontWeight: 'bold' }}>How It Works</h2>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>Your journey to a lush garden is simpler than you think.</p>
                    </div>

                    <div className="grid-auto">
                        {/* Step 1 */}
                        <div className="glass-card hover-scale" style={{ background: 'white', padding: '50px 30px', borderRadius: '30px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', background: '#e8f5e9', color: '#00b862', fontSize: '2.5rem', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>1</div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Sign Up</h3>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>Create your free account to access your personal dashboard.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="glass-card hover-scale" style={{ background: 'white', padding: '50px 30px', borderRadius: '30px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', background: '#e8f5e9', color: '#00b862', fontSize: '2.5rem', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>2</div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Add Plants</h3>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>Snap a photo or search our database to build your virtual garden.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="glass-card hover-scale" style={{ background: 'white', padding: '50px 30px', borderRadius: '30px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', background: '#e8f5e9', color: '#00b862', fontSize: '2.5rem', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>3</div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Grow</h3>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>Receive smart reminders and AI advice to keep your plants thriving.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Plant Gallery Section */}
            <section style={{ padding: '100px 0', background: 'white' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '15px', color: '#1a1a1a', fontWeight: '800' }}>Explore Nature's Beauty</h2>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>See what's growing in our community.</p>
                    </div>
                    {/* Display user's uploaded collage as a feature image */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <img src="/ai-plant-1.png" className="hover-scale" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} alt="Hands carefuly planting seeds" />
                        <img src="/ai-seed-2.png" className="hover-scale" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} alt="Artistic arrangement of seeds" />
                        <img src="/gallery-new-3.png" className="hover-scale" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} alt="Exotic floral detail" />
                        <img src="/gallery-4.png" className="hover-scale" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} alt="Lush blooming garden foliage" />
                    </div>
                </div>
            </section>

            {/* 5. Green Banner */}
            <section style={{ padding: '120px 0', backgroundImage: 'url(https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundAttachment: 'fixed', color: 'white', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 184, 98, 0.85)' }}></div>
                <div className="container" style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', padding: '0 24px', zIndex: 1 }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '25px', color: 'white', fontWeight: '800' }}>Ready to Flourish?</h2>
                    <p style={{ fontSize: '1.4rem', marginBottom: '50px', opacity: 0.9 }}>Join thousands of happy gardeners today.</p>
                    <Link to="/login" className="btn" style={{
                        background: 'white',
                        color: '#00b862',
                        fontSize: '1.3rem',
                        padding: '20px 60px',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }}>
                        Get Started Now
                    </Link>
                </div>
            </section>

            {/* 6. Pricing Plans (Visual Only) */}
            <section style={{ padding: '120px 0', background: '#fcfcfc' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <h2 className="text-center" style={{ fontSize: '3rem', marginBottom: '80px', color: '#1a1a1a', fontWeight: 'bold' }}>Simple Pricing</h2>
                    <div className="grid-auto">
                        {/* Plan 1 */}
                        <div style={{ border: '2px solid #f0f0f0', borderRadius: '30px', padding: '50px 40px', textAlign: 'center' }}>
                            <h3 style={{ color: '#00b862', marginBottom: '10px', fontSize: '1.5rem' }}>Sprout</h3>
                            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '5px', color: '#1a1a1a' }}>Free</div>
                            <p style={{ color: '#888', marginBottom: '40px' }}>Forever</p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '40px', fontSize: '1.1rem' }}>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}><FaCheck color="#00b862" /> 5 AI Questions/mo</li>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}><FaCheck color="#00b862" /> Basic Tracking</li>
                            </ul>
                            <Link to="/register" className="btn btn-secondary btn-block" style={{ borderRadius: '12px', padding: '16px' }}>Start Free</Link>
                        </div>

                        {/* Plan 2 (Highlighted) */}
                        <div style={{ background: '#1a1a1a', color: 'white', borderRadius: '30px', padding: '50px 40px', textAlign: 'center', transform: 'scale(1.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#00b862', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold' }}>MOST POPULAR</div>
                            <h3 style={{ color: '#00b862', marginBottom: '10px', fontSize: '1.5rem' }}>Bloom</h3>
                            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '5px' }}>$9.99</div>
                            <p style={{ color: '#888', marginBottom: '40px' }}>Per Month</p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '40px', fontSize: '1.1rem' }}>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}><FaCheck /> Unlimited AI</li>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}><FaCheck /> Care Schedules</li>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}><FaCheck /> Community Access</li>
                            </ul>
                            <Link to="/register" className="btn btn-block" style={{ background: '#00b862', color: 'white', border: 'none', borderRadius: '12px', padding: '16px' }}>Get Bloom</Link>
                        </div>

                        {/* Plan 3 */}
                        <div style={{ border: '2px solid #f0f0f0', borderRadius: '30px', padding: '50px 40px', textAlign: 'center' }}>
                            <h3 style={{ color: '#00b862', marginBottom: '10px', fontSize: '1.5rem' }}>Garden</h3>
                            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '5px', color: '#1a1a1a' }}>$99</div>
                            <p style={{ color: '#888', marginBottom: '40px' }}>Per Year</p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '40px', fontSize: '1.1rem' }}>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}><FaCheck color="#00b862" /> All Bloom Features</li>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}><FaCheck color="#00b862" /> Priority Support</li>
                            </ul>
                            <Link to="/register" className="btn btn-block" style={{ background: '#f0f0f0', color: '#1a1a1a', border: 'none', borderRadius: '12px', padding: '16px' }}>Get Yearly</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1b4332', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
                <div className="container">
                    <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>GardenGuru</h3>
                    <p style={{ opacity: 0.7, marginBottom: '40px' }}>Cultivating a greener world, one garden at a time.</p>
                    <p style={{ opacity: 0.5 }}>&copy; 2025 GardenGuru AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
