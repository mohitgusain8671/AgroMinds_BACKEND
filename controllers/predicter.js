const axios = require('axios');

// Replace these URLs with the actual URLs of your FastAPI microservice
const FASTAPI_BASE_URL = 'http://localhost:8000';  // Adjust this to the correct address if necessary
const OPEN_METEO_URL = 'https://archive-api.open-meteo.com/v1/archive';


// Helper function to fetch weather data from Open-Meteo API
const fetchWeatherData = async (LATITUDE,LONGITUDE) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 12); // 12 days before
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate())

    const start_date = startDate.toISOString().split('T')[0];  // Format: YYYY-MM-DD
    const end_date = endDate.toISOString().split('T')[0];      // Format: YYYY-MM-DD

    try {
        const weatherResponse = await axios.get(OPEN_METEO_URL, {
            params: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                start_date,
                end_date,
                hourly: 'temperature_2m,relative_humidity_2m,rain'
            },
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(weatherResponse)
        const weatherData = weatherResponse.data;
        const avgTemperature = calculateAverage(weatherData.hourly.temperature_2m);
        const avgHumidity = calculateAverage(weatherData.hourly.relative_humidity_2m);
        const avgRainfall = calculateAverage(weatherData.hourly.rain);

        return { temperature: [avgTemperature], humidity: [avgHumidity], rainfall: [avgRainfall] };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to retrieve weather data');
    }
};

// Helper function to calculate the average of an array
const calculateAverage = (dataArray) => {
    if (dataArray.length === 0) return 0;
    const sum = dataArray.reduce((acc, value) => acc + value, 0);
    return sum / dataArray.length;
};

exports.fertilizerPrediction = async (req, res) => {
    try {
        // Fetch weather data for the location
        const lat = req.body.latitude;
        const long = req.body.longitude;
        console.log(lat,long)
        const weatherData = await fetchWeatherData(lat,long);

        const inputData = {
            "Moisture": req.body.Moisture,
            "Soil_Type": req.body.Soil_Type,
            "Crop_Type": req.body.Crop_Type,
            "Nitrogen": req.body.Nitrogen,
            "Potassium": req.body.Potassium,
            "Phosphorous": req.body.Phosphorous,
            "Temperature": weatherData.temperature,
            "Humidity": weatherData.humidity
        };

        // Call FastAPI's /predict-fertilizer endpoint
        const response = await axios.post(`${FASTAPI_BASE_URL}/predict-fertilizer`, inputData, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.json({ prediction: response.data.predictions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.cropPrediction = async (req, res) => {
    try {
        // Fetch weather data for the location
        const lat = req.body.latitude;
        const long = req.body.longitude;
        console.log(lat,long)
        const weatherData = await fetchWeatherData(lat,long);

        const inputData = {
            "N": req.body.N,
            "P": req.body.P,
            "K": req.body.K,
            "Temperature": weatherData.temperature,
            "Humidity": weatherData.humidity,
            "PH": req.body.PH,
            "Rainfall": weatherData.rainfall
        };

        // Call FastAPI's /predict-crop endpoint
        const response = await axios.post(`${FASTAPI_BASE_URL}/predict-crop`, inputData, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.json({ prediction: response.data.predictions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
