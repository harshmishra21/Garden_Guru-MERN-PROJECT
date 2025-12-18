// Utility to get high-quality images for plants
// Using stable Picsum Photos API for consistent, persistent images

const plantImageMap = {
    'Rose': 'http://localhost:5001/plants/rose.jpg',
    'Tulip': 'http://localhost:5001/plants/tulip.jpg',
    'Sunflower': 'http://localhost:5001/plants/sunflower.jpg',
    'Orchid': 'http://localhost:5001/plants/orchid.jpg',
    'Lily': 'http://localhost:5001/plants/lily.jpg',
    'Daisy': 'http://localhost:5001/plants/daisy.jpg',
    'Fern': 'http://localhost:5001/plants/fern.jpg',
    'Cactus': 'http://localhost:5001/plants/cactus.jpg',
    'Succulent': 'http://localhost:5001/plants/succulent.jpg',
    'Snake Plant': 'http://localhost:5001/plants/snakeplant.jpg',
    'Aloe Vera': 'http://localhost:5001/plants/aloevera.jpg',
    'Monstera': 'http://localhost:5001/plants/monstera.jpg',
    'Ficus': 'http://localhost:5001/plants/ficus.jpg',
    'Lavender': 'http://localhost:5001/plants/lavender.jpg',
    'Basil': 'http://localhost:5001/plants/basil.jpg',
    'Mint': 'http://localhost:5001/plants/mint.jpg',
    'Spider Plant': 'http://localhost:5001/plants/spiderplant.jpg',
    'Peace Lily': 'http://localhost:5001/plants/peacelily.jpg',
    'General': 'http://localhost:5001/plants/general.jpg'
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
