## Getting Started with the Weather App

First, install dependencies by running `npm i` or `yarn install`.<br/>

Next, create a `.env` file and add keys from the `.env.example` file.<br/>

Finally, start the development server with `npm run dev` or `yarn dev`.

Open [http://localhost:3000/home](http://localhost:3000/home) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page will auto-update as you make changes.

This project uses [OpenWeatherMap](https://openweathermap.org/api) to retrieve weather data.<br/>
Get the weather for a city by using [this API](https://openweathermap.org/current#name).

## Tech Stack
- Next.js and TypeScript
- i18next for multi-language support
- Axios for API calls
- Prettier, Husky, ESLint, Commitlint

## Code Formatting Before Pushing to GitHub
After coding, please run `yarn prettier` to format the code and check the Commitlint conventions before committing & pushing to GitHub.  
Refer to [Commitlint Conventional](https://www.npmjs.com/package/@commitlint/config-conventional).

## Vercel Link
[Weather App on Vercel](https://weather-app-openweathermap.vercel.app/home)
