const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Chat with AI Gardener
// @route   POST /api/chat
// @access  Private
const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Please provide a message' });
        }

        // Get the Gemini model - try multiple models in order of preference
        let model;
        const modelOptions = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        
        for (const modelName of modelOptions) {
            try {
                model = genAI.getGenerativeModel({ model: modelName });
                console.log(`Using model: ${modelName}`);
                break;
            } catch (e) {
                console.log(`Model ${modelName} not available, trying next...`);
            }
        }
        
        if (!model) {
            return res.status(500).json({
                message: 'No available Gemini models. Please check your API key.',
                error: 'API configuration error'
            });
        }

        // Create a gardening-focused prompt
        const systemContext = `You are a friendly and knowledgeable AI gardening assistant called "Garden Guru". 
You help users with:
- Plant care tips (watering, sunlight, fertilizing)
- Pest and disease identification
- Seasonal gardening advice
- Indoor and outdoor gardening tips
- Composting and soil health

Keep your responses concise (2-3 sentences max), friendly, and practical. 
Use relevant plant emojis occasionally (🌱🌿🌻🌷💧☀️).
If the question is not related to gardening, politely redirect to gardening topics.`;

        const prompt = `${systemContext}\n\nUser question: ${message}`;

        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            response: text,
            success: true
        });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            message: 'AI service temporarily unavailable. Please try again.',
            error: error.message
        });
    }
};

module.exports = { chatWithAI };
