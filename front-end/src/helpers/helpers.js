/*
	This file set up the fucntions to interact with the server
*/

import axios from 'axios'; // Import the Axios library for making HTTP requests
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

// Use Vue Flash Message to display messages on the website
 Vue.use(VueFlashMessage,{
	messageOptions:{
		timeout: 3000, // Timeout in milliseconds
		pauseOnInteract: true
	}
});

// Create new Vue instance to show flash messages
const vueMessage = new Vue(); 
const baseURL = 'http://localhost:3000/words/'; // URL as starting point for all requests

// Function to handle errors
const handleError = asyncFunction => async (...parameters) => {
  try {
    return await asyncFunction(...parameters);
  } catch (error) {
    console.error('API error: ', error.response ? error.response.data : error);
    throw error; // Ensure the error is re-thrown so it can be caught by the caller
  }
};

// Export an API object with functions to interact with the server
export const api = {
	
  // Function to get a single word by ID
  getWord: handleError(async id => {
    const response = await axios.get(baseURL + id); // Make a GET request to fetch the word by ID
    return response.data;
  }),
  
  // Function to get all words with pagination and sorting
  getWords: handleError(async (page = 1, sort = 'createdAt', order = 'asc', search = '') => {
    // Make a GET request to fetch all words with pagination and sorting, and search
	const response = await axios.get(baseURL, { params: { page, sort, order, search } });
    return response.data;
  }),


  // Function to delete a word by ID
  deleteWord: handleError(async id => {
    const response = await axios.delete(baseURL + id); // Make a DELETE request to delete the word by ID
    return response.data;
  }),

  // Function to create a new word
  createWord: handleError(async payload => {
    const response = await axios.post(baseURL, payload); // Make a POST request to create a new word
    return response.data;
  }),

  // Function to update an existing word
  updateWord: handleError(async payload => {
    const response = await axios.put(baseURL + payload._id, payload); // Make a PUT request to update the word by ID
    return response.data;
  })
};
