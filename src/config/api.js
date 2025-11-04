// API Configuration for third-party services

// OpenWeatherMap API configuration
export const WEATHER_API = {
  baseURL: 'https://api.openweathermap.org/data/2.5',
  apiKey: 'your-openweathermap-api-key-here', // Replace with your actual API key
};

// Fake Store API configuration (for hotel data simulation)
export const FAKE_STORE_API = {
  baseURL: 'https://fakestoreapi.com',
};

// API endpoints
export const ENDPOINTS = {
  weather: {
    current: '/weather',
    forecast: '/forecast',
  },
  fakeStore: {
    products: '/products',
    users: '/users',
  },
};

// API helper functions
export const getWeatherURL = (lat, lon) => 
  `${WEATHER_API.baseURL}${ENDPOINTS.weather.current}?lat=${lat}&lon=${lon}&appid=${WEATHER_API.apiKey}&units=metric`;

export const getHotelsURL = () => 
  `${FAKE_STORE_API.baseURL}${ENDPOINTS.fakeStore.products}`;

export const getUsersURL = () => 
  `${FAKE_STORE_API.baseURL}${ENDPOINTS.fakeStore.users}`;