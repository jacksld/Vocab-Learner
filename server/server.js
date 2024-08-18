/*
	This code sets up a web server using Express, connects to a MongoDB database using Mongoose
*/

const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const Vocab = require('./api/models/vocabModel'); // Import the Vocab model
const routes = require('./api/routes/vocabRoutes'); // Import the routes for the vocab

mongoose.Promise = global.Promise; // Use global promises to handle asynchronous operations	
mongoose.connect('mongodb://localhost/vocab-builder', { useNewUrlParser: true });

const port = process.env.PORT || 3000; // Set the port to the environment variable PORT, or 3000 if not set
const app = express(); 
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.urlencoded({ extended: true })); // Use built-in middleware to parse URL-encoded bodies
app.use(express.json()); // Use built-in middleware to parse JSON bodies

routes(app); // Register the routes with the app

app.listen(port); // Make the app listen for incoming requests on the specified port
app.use((request, response) => {
  response.status(404).send({ url: `${request.originalUrl} not found` }); // Handle 404 errors (page not found)
});

console.log(`Server started on port ${port}`); // Log a message to the console to indicate the server is running
