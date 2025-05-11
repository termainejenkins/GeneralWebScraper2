// src/frontend/jobBoardScraper.vue

<template>
    <div>
      <h2>Job Board Scraper</h2>
      <label for="websites">Websites:</label>
      <!-- <input v-model="websites" type="text" id="websites" placeholder="Enter job board websites" /> -->
      <select v-model="selectedWebsite" id="websites">
      <option value="">Select a job board website</option>
      <option v-for="website in websiteOptions" :key="website" :value="website">
        {{ website }}
      </option>
    </select>
  
      <label for="jobTitles">Job Titles:</label>
      <input v-model="jobTitles" type="text" id="jobTitles" placeholder="Enter job titles" />
  
      <label for="locations">Locations:</label>
      <input v-model="locations" type="text" id="locations" placeholder="Enter locations" />
  
      <!-- Add checkbox for headless mode -->
      <label for="headless">Headless:</label>
      <input v-model="headless" type="checkbox" id="headless" />
  
      <button @click="scrapeJobBoard">Scrape Job Board</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { websiteOptions } from '../backend/jobBoardOptions';

  
  // Define selectedWebsite
  const selectedWebsite = ref('');
  const websites = selectedWebsite;
  const jobTitles = ref('');
  const locations = ref('');
  const headless = ref(true);
  

  const scrapeJobBoard = async () => {
    console.log('JOBBOARDSCRAPER.VUE: Starting Job Board scraping...');
  
    try {
      // HTTP requests to the backend for job board scraping
      console.log('JOBBOARDSCRAPER.VUE: Sending request to the backend...');
      const requestarray =[selectedWebsite, websites, jobTitles, locations, headless]; 
      console.log('JOBBOARDSCRAPER.VUE: requestarray: ', requestarray);   
  
      const response = await fetch('http://localhost:3001/api/jobBoard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websites: websites.value,
          jobTitles: jobTitles.value,
          locations: locations.value,
          headless: headless.value, 
        }),
        mode: 'cors',
      });
  
      if (!response.ok) {
      throw new Error(`JOBBOARDSCRAPER.VUE: Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('JOBBOARDSCRAPER.VUE: Received response from the backend:', data);

    // Handle the scraped data
    console.log('JOBBOARDSCRAPER.VUE: Scraped Data:', 'Replace this with actual scraped data');
  } catch (error) {
    console.error('JOBBOARDSCRAPER.VUE: Error during scraping:', error.message || error);
    // Handle or display the error in UI if needed
  }
};
  </script>
  
  <style scoped>

  </style>
  ../backend/jobBoardOptions