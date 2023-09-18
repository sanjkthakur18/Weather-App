import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

const Chart = () => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    // Fetch the API data
    fetch('API_ENDPOINT_URL')
      .then((response) => response.json())
      .then((data) => {
        // Extract necessary information from the API response
        const dailyForecastData = extractDailyForecastData(data);
        setForecastData(dailyForecastData);
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  }, []);

  useEffect(() => {
    // Render the chart once forecastData is updated
    renderChart();
  }, [forecastData]);

  const extractDailyForecastData = (apiData) => {
    // Extract the necessary information from the API data
    // and return an array of daily forecast data objects
    const dailyData = apiData.list.map((item) => {
      return {
        date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
        temperature: item.main.temp,
        weather: item.weather[0].description,
      };
    });

    return dailyData;
  };

  const renderChart = () => {
    // Use chart.js or any other charting library to render the chart
    // Initialize the chart canvas
    const ctx = document.getElementById('forecastChart').getContext('2d');

    // Create a new chart instance
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: forecastData.map((data) => data.date),
        datasets: [
          {
            label: 'Temperature (°C)',
            data: forecastData.map((data) => data.temperature),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        // Configure chart options as per your requirement
      },
    });
  };

  return <canvas id="forecastChart" />;
};

export default Chart;