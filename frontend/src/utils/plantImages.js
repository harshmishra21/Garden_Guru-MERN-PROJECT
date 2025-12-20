// Utility to get high-quality images for plants
// Using stable Picsum Photos API for consistent, persistent images
// Production Ready: Dynamic API URL enabled
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const plantImageMap = {
    'Rose': `${API_URL}/plants/rose.jpg`,
    'Tulip': `${API_URL}/plants/tulip.jpg`,
    'Sunflower': `${API_URL}/plants/sunflower.jpg`,
    'Orchid': `${API_URL}/plants/orchid.jpg`,
    'Lily': `${API_URL}/plants/lily.jpg`,
    'Daisy': `${API_URL}/plants/daisy.jpg`,
    'Fern': `${API_URL}/plants/fern.jpg`,
    'Cactus': `${API_URL}/plants/cactus.jpg`,
    'Succulent': `${API_URL}/plants/succulent.jpg`,
    'Snake Plant': `${API_URL}/plants/snakeplant.jpg`,
    'Aloe Vera': `${API_URL}/plants/aloevera.jpg`,
    'Monstera': `${API_URL}/plants/monstera.jpg`,
    'Ficus': `${API_URL}/plants/ficus.jpg`,
    'Lavender': `${API_URL}/plants/lavender.jpg`,
    'Basil': `${API_URL}/plants/basil.jpg`,
    'Mint': `${API_URL}/plants/mint.jpg`,
    'Spider Plant': `${API_URL}/plants/spiderplant.jpg`,
    'Peace Lily': `${API_URL}/plants/peacelily.jpg`,
    'General': `${API_URL}/plants/general.jpg`
};

// Cache for storing plant images to prevent changing on refresh
const imageCache = new Map();

export const getPlantImage = (plantName) => {
    if (!plantName) {
        if (!imageCache.has('General')) {
            imageCache.set('General', plantImageMap['General']);
        }
        return imageCache.get('General');
    }

    // Check cache first
    if (imageCache.has(plantName)) {
        return imageCache.get(plantName);
    }

    let imageUrl = null;

    // Exact match
    if (plantImageMap[plantName]) {
        imageUrl = plantImageMap[plantName];
    } else {
        // Partial match (e.g. "Red Rose" -> "Rose")
        const keys = Object.keys(plantImageMap);
        const found = keys.find(key => plantName.toLowerCase().includes(key.toLowerCase()));
        imageUrl = found ? plantImageMap[found] : plantImageMap['General'];
    }

    // Cache the result
    imageCache.set(plantName, imageUrl);
    return imageUrl;
};

export const getHeroImage = () => {
    return 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1600&auto=format&fit=crop'; // Beautiful garden landscape
};

export const getWeatherIcon = (condition) => {
    if (!condition) return '☀️';
    const c = condition.toLowerCase();
    if (c.includes('rain')) return '🌧️';
    if (c.includes('cloud')) return '☁️';
    if (c.includes('storm')) return '⛈️';
    if (c.includes('snow')) return '❄️';
    if (c.includes('clear')) return '☀️';
    return '🌤️';
};
