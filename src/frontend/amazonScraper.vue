// src/frontend/amazonScraper.vue
<template>
    <div>
      <h2>Amazon Scraper</h2>
      <!-- Add Amazon-specific UI elements and logic here -->
      <div class="scraper-controls">
        <input v-model="searchQuery" type="text" placeholder="Enter product name" />
        <button @click="scrapeAmazon">Search</button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const scrapeAmazon = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/amazon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: searchQuery.value,
        headless: true
      })
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()
    console.log('Amazon scraping results:', data)
  } catch (error) {
    console.error('Error during Amazon scraping:', error)
  }
}
</script>

<style scoped>
.scraper-controls {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 300px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>