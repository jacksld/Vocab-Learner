/*
	This file sets up routes to handle different types of requests for
	the application
*/

const vocabBuilder = require('../controllers/vocabController');

module.exports = app => { // Export this function to set up routes
  // Define the route for '/words'
  app.route('/words')
    .get(vocabBuilder.list_all_words) // When a GET request is made to '/words', call the list_all_words function
    .post(vocabBuilder.create_a_word); // When a POST request is made to '/words', call the create_a_word function

  // Define the route for '/words/:wordId'
  app.route('/words/:wordId')
    .get(vocabBuilder.read_a_word) // When a GET request is made to '/words/:wordId', call the read_a_word function
    .put(vocabBuilder.update_a_word) // When a PUT request is made to '/words/:wordId', call the update_a_word function
    .delete(vocabBuilder.delete_a_word); // When a DELETE request is made to '/words/:wordId', call the delete_a_word function
};
