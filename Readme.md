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

The base URL for the API is `http://localhost:8080`.

## API Endpoints

### Fertilizer Prediction

**`POST /agroTech/api/v1/fertilizer-predict`**

Predicts the optimal fertilizer requirements based on weather and soil data.

**Request Body:**

```json
{
  "latitude": 28.716417,
  "longitude": 77.115033,
  "Moisture": [10],
  "Soil_Type": ["Clayey"],
  "Crop_Type": ["Wheat"],
  "Nitrogen": [0],
  "Potassium": [0],
  "Phosphorous": [0]
}
```
**Response Body:**

```json
{
    "prediction": [
        3
    ]
}
```
**Errors:**

- 500 Internal Server Error - If there is an issue with fetching weather data or calling the FastAPI endpoint.

### Crop Prediction

**`POST /agroTech/api/v1/crop-predict`**

Predicts the crop type based on weather and soil parameters.

**Request Body:**

```json
{
    "N": [28],
    "P": [54],
    "K": [46],
    "latitude": 28.716417,
    "PH": [5],
    "longitude": 77.115033
}
```
**Response Body:**

```json
{
    "prediction": [
        3
    ]
}
```
**Errors:**

- 500 Internal Server Error - If there is an issue with fetching weather data or calling the FastAPI endpoint.


## Notes

- Ensure that the FastAPI microservice is running and accessible at the specified FASTAPI_BASE_URL.
- To Access FastAPI microservice fork this repo : [PYMICROSERVICE REPO](https://github.com/mohitgusain8671/PyMicroServiceForSIH)
- Update the FASTAPI_BASE_URL in controllers/predicter.js if necessary.