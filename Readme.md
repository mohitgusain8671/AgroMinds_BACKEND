# Agrominds Backend

This is the backend API for the Agrominds project, developed for the Smart India Hackathon (SIH). The project aims to provide sustainable fertilizer usage recommendations based on various environmental variables and crop prediction data.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mohitgusain8671/AgroMinds_BACKEND.git
    cd AgroMinds_BACKEND
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables in a `.env` file. Refer to the [Environment Variables](#environment-variables) section for details.

4. Start the development server:

    ```bash
    npm run dev
    ```

   For production:

    ```bash
    npm start
    ```

## Environment-Variables
Create a `.env` file in the root directory of the project with the following structure:

    ```env
    PORT = 8080
    DATABASE_URL = mongodb://localhost:27017/AgroMindsDB
    ```

## Base URL

The base URL for the API is `http://localhost:8080` for localmachine.
Deployed Url :- [Visit](https://agromindsbackend-production.up.railway.app/)

## API Endpoints

### Fertilizer Prediction

**`POST /agroTech/api/v1/fertilizer-predict`**

Predicts the optimal fertilizer requirements based on weather and soil data.

**Request Body:**

```json
{
  "latitude": 28.716417,
  "longitude": 77.115033,
  "moisture": 10,
  "soilType": "Clayey",
  "cropType": "Wheat",
  "nitrogenContent": 9,
  "potassium": 10,
  "phosphorus": 90
}

```
**Response Body:**

```json
{
    "prediction": 5,
    "fertilizerDetails": {
        "_id": "66e599cba087a57ff6873a18",
        "fertilizerID": 5,
        "name": "DAP",
        "description": [
            "Diammonium Phosphate (DAP) is a widely used phosphorus fertilizer.",
            "Provides a good source of nitrogen and phosphorus.",
            "Suitable for a variety of crops."
        ],
        "organic_methods": [
            "Use rock phosphate for a natural source of phosphorus.",
            "Incorporate composted manure to improve soil fertility.",
            "Apply compost tea for additional nitrogen."
        ],
        "N2_content": 18,
        "Phosphorus_Content": 46,
        "Potassium_content": 0,
        "createdAt": "2024-09-14T14:12:27.112Z",
        "updatedAt": "2024-09-14T14:12:27.112Z"
    }
}
```
**Errors:**

- 500 Internal Server Error - If there is an issue with fetching weather data or calling the FastAPI endpoint.
- 404 (Not Found) if the fertilizer predicted by ML Model is not found in db.

### Crop Prediction

**`POST /agroTech/api/v1/crop-predict`**

Predicts the crop type based on weather and soil parameters.

**Request Body:**

```json
{
    "nitrogenContent": 28,
    "phosphorus": 54,
    "potassium": 46,
    "latitude": 28.716417,
    "phLevel": 5,
    "longitude": 77.115033
}
```
**Response Body:**

```json
{
    "prediction": 3,
    "cropDetails": {
        "_id": "66e5996da087a57ff68739fc",
        "cropID": 3,
        "name": "jute",
        "image": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Jute_field.jpg",
        "optimal_ph_min": 5,
        "optimal_ph_max": 7.5,
        "optimal_temp_min": 24,
        "optimal_temp_max": 37,
        "optimal_moisture_min": 70,
        "optimal_moisture_max": 90,
        "N": 80,
        "P": 40,
        "K": 40,
        "createdAt": "2024-09-14T14:10:53.051Z",
        "updatedAt": "2024-09-14T14:10:53.051Z"
    }
}
```
**Errors:**

- 500 Internal Server Error - If there is an issue with fetching weather data or calling the FastAPI endpoint.
- 404 (Not Found) if the crop predicted by ML Model is not found in db.

### Fertilizer Calculation

**`POST /agroTech/api/v1/calculateFertilizer`**

Predicts the amount of fertilizer based on the fertilizer, crop and soil parameters.

**Request Body:**

```json
{
    "N2": 247,
    "P": 18,
    "k": 108,
    "CropName": "jute",
    "FertilizerName": "DAP"
}
```
**Response Body:**

```json
{
    "FertilizerAmount": "0.478 kg/ha",
    "FertilizerDetail": {
        "_id": "66e599cba087a57ff6873a18",
        "fertilizerID": 5,
        "name": "DAP",
        "description": [
            "Diammonium Phosphate (DAP) is a widely used phosphorus fertilizer.",
            "Provides a good source of nitrogen and phosphorus.",
            "Suitable for a variety of crops."
        ],
        "organic_methods": [
            "Use rock phosphate for a natural source of phosphorus.",
            "Incorporate composted manure to improve soil fertility.",
            "Apply compost tea for additional nitrogen."
        ],
        "N2_content": 18,
        "Phosphorus_Content": 46,
        "Potassium_content": 0,
        "createdAt": "2024-09-14T14:12:27.112Z",
        "updatedAt": "2024-09-14T14:12:27.112Z"
    },
    "CropDetail": {
        "_id": "66e5996da087a57ff68739fc",
        "cropID": 3,
        "name": "jute",
        "image": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Jute_field.jpg",
        "optimal_ph_min": 5,
        "optimal_ph_max": 7.5,
        "optimal_temp_min": 24,
        "optimal_temp_max": 37,
        "optimal_moisture_min": 70,
        "optimal_moisture_max": 90,
        "N": 80,
        "P": 40,
        "K": 40,
        "createdAt": "2024-09-14T14:10:53.051Z",
        "updatedAt": "2024-09-14T14:10:53.051Z"
    }
}
```
**Errors:**

- 404 (Not Found) if the crop or the provided fertilizer is not found in db.
## Notes

- Ensure that the FastAPI microservice is running and accessible at the specified FASTAPI_BASE_URL.
- To Access FastAPI microservice fork this repo : [PYMICROSERVICE REPO](https://github.com/mohitgusain8671/PyMicroServiceForSIH)
- Update the FASTAPI_BASE_URL in controllers/predicter.js if necessary.