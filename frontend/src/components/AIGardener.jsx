import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaLeaf } from 'react-icons/fa';

const AIGardener = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your AI Garden Assistant powered by Gemini. Ask me anything about your plants! 🌿", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        const userInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;

            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: userInput })
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: data.response,
                    sender: 'ai'
                }]);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Sorry, I'm having trouble connecting. Please try again! 🌱",
                    sender: 'ai'
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Oops! Something went wrong. Please check your connection and try again. 🌿",
                sender: 'ai'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--primary-green)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'transform 0.3s'
                }}
                onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'}
            >
                {isOpen ? <FaTimes /> : <FaRobot />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="glass-card animate-fade-in" style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '30px',
                    width: '350px',
                    height: '500px',
                    background: 'white',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid #eee'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '15px',
                        background: 'var(--primary-green)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <FaLeaf />
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>Garden Assistant</h3>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        padding: '15px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        background: '#f9f9f9'
                    }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                padding: '10px 15px',
                                borderRadius: '15px',
                                borderBottomLeftRadius: msg.sender === 'ai' ? '2px' : '15px',
                                borderBottomRightRadius: msg.sender === 'user' ? '2px' : '15px',
                                background: msg.sender === 'user' ? 'var(--primary-green)' : 'white',
                                color: msg.sender === 'user' ? 'white' : '#333',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                fontSize: '0.95rem'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{
                                alignSelf: 'flex-start',
                                padding: '10px 15px',
                                borderRadius: '15px',
                                background: 'white',
                                color: '#666',
                                fontSize: '0.95rem'
                            }}>
                                <span style={{ animation: 'pulse 1.5s infinite' }}>Thinking... 🌱</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} style={{
                        padding: '15px',
                        borderTop: '1px solid #eee',
                        display: 'flex',
                        gap: '10px',
                        background: 'white'
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about watering, pests..."
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '20px',
                                border: '1px solid #ddd',
                                outline: 'none'
                            }}
                        />
                        <button type="submit" style={{
                            background: 'var(--terracotta)',
                            color: 'white',
                            border: 'none',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AIGardener;
