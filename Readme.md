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