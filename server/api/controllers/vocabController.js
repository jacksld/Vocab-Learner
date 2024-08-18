const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

// Centralized error handling function
const handleError = (response, error, message = 'Error') => {
  console.error(message, error);

  if (error.name === 'ValidationError') {
    const errorMessages = Object.values(error.errors).map(err => err.message);
    response.status(400).send({ message: 'Validation Error', errors: errorMessages });
  } else {
    response.status(500).send({ message, error: error.message });
  }
};

// Function to check for duplicate words
const checkForDuplicate = async (word, id = null) => {
  const query = {
    $or: []
  };
  if (word.english && word.english.trim() !== '') query.$or.push({ english: new RegExp(`^${word.english}$`, 'i') });
  if (word.german && word.german.trim() !== '') query.$or.push({ german: new RegExp(`^${word.german}$`, 'i') });
  if (word.indonesian && word.indonesian.trim() !== '') query.$or.push({ indonesian: new RegExp(`^${word.indonesian}$`, 'i') });

  if (query.$or.length === 0) {
    return []; // No fields to check for duplication
  }

  const duplicates = await Vocab.find({
    _id: { $ne: id },
    $or: query.$or
  });

  return duplicates;
};

// Function to list all words
exports.list_all_words = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1; // Default to page 1
    const limit = parseInt(request.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;
	const sortField = request.query.sort || 'createdAt'; // Default to sorting by createdAt
	const sortOrder = request.query.order === 'desc' ? -1 : 1; // Ascending order by default
	
	// Search query parameter
    const searchQuery = request.query.search || '';
    const searchCondition = searchQuery
      ? {
          $or: [
            { english: new RegExp(`^${searchQuery}`, 'i') }, // Match words starting with the search term
            { german: new RegExp(`^${searchQuery}`, 'i') },  
            { indonesian: new RegExp(`^${searchQuery}`, 'i') } 
          ]
        }
      : {};

    const words = await Vocab.find(searchCondition)
	  .sort({ [sortField]: sortOrder }) // Sort by the specified field in ascending order
      .skip(skip)
      .limit(limit);
    const totalWords = await Vocab.countDocuments(searchCondition);

    response.json({
      words,
      totalPages: Math.ceil(totalWords / limit),
      currentPage: page
    });
  } catch (error) {
    handleError(response, error, 'Error listing words');
  }
};

// Function to create a new word
exports.create_a_word = async (request, response) => {
  const newWord = new Vocab(request.body);

  try {
    const duplicates = await checkForDuplicate(request.body);
    if (duplicates.length > 0) {
      const duplicateFields = [];
      duplicates.forEach(duplicate => {
        if (duplicate.english && request.body.english && duplicate.english.toLowerCase() === request.body.english.toLowerCase()) {
          duplicateFields.push(`English: ${request.body.english}`);
        }
        if (duplicate.german && request.body.german && duplicate.german.toLowerCase() === request.body.german.toLowerCase()) {
          duplicateFields.push(`German: ${request.body.german}`);
        }
        if (duplicate.indonesian && request.body.indonesian && duplicate.indonesian.toLowerCase() === request.body.indonesian.toLowerCase()) {
          duplicateFields.push(`Indonesian: ${request.body.indonesian}`);
        }
      });
      return response.status(400).send({ message: `Duplicate words found: ${duplicateFields.join(', ')}` });
    }
    const word = await newWord.save();
    response.json(word);
  } catch (error) {
    handleError(response, error, 'Error creating word');
  }
};

// Function to read a word by ID
exports.read_a_word = async (request, response) => {
  try {
    const word = await Vocab.findById(request.params.wordId);
    response.json(word);
  } catch (error) {
    handleError(response, error, 'Error reading word');
  }
};

// Function to update a word
exports.update_a_word = async (request, response) => {
  try {
    const duplicates = await checkForDuplicate(request.body, request.params.wordId);
    if (duplicates.length > 0) {
      const duplicateFields = [];
      duplicates.forEach(duplicate => {
        if (duplicate.english && request.body.english && duplicate.english.toLowerCase() === request.body.english.toLowerCase()) {
          duplicateFields.push(`English: ${request.body.english}`);
        }
        if (duplicate.german && request.body.german && duplicate.german.toLowerCase() === request.body.german.toLowerCase()) {
          duplicateFields.push(`German: ${request.body.german}`);
        }
        if (duplicate.indonesian && request.body.indonesian && duplicate.indonesian.toLowerCase() === request.body.indonesian.toLowerCase()) {
          duplicateFields.push(`Indonesian: ${request.body.indonesian}`);
        }
      });
      return response.status(400).send({ message: `Duplicate words found: ${duplicateFields.join(', ')}` });
    }

    const word = await Vocab.findOneAndUpdate(
      { _id: request.params.wordId },
      request.body,
      { new: true }
    );
    response.json(word);
  } catch (error) {
    handleError(response, error, 'Error updating word');
  }
};

// Function to delete a word
exports.delete_a_word = async (request, response) => {
  try {
    await Vocab.deleteOne({ _id: request.params.wordId });
    response.json({ message: 'Word successfully deleted', _id: request.params.wordId });
  } catch (error) {
    handleError(response, error, 'Error deleting word');
  }
};
