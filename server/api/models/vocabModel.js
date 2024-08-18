/*  
	This file defines a blueprint for vocabulary words.
	This blueprint helps ensure that all vocabulary entries
	in the database have the same structure.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Get the Schema constructor from Mongoose

// Create a new schema for vocabulary
const VocabSchema = new Schema(
  {
    english: {
      type: String, 
      required: false 
    },
    german: {
      type: String, 
      required: false
    },
	indonesian: {
	  type: String,
	  required: false
	}
  },
  { 
	collection: 'vocab3', // Specify the collection name in the database
	timestamps: true // Add createdAt and updatedAt fields automatically
  } 
);

// Export the model so it can be used in other parts of the app
module.exports = mongoose.model('Vocab', VocabSchema);
