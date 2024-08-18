<template>
  <div>
    <h1>New Word</h1>
    <word-form @createOrUpdate="createOrUpdate"></word-form>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue'; // Import the WordForm component
import { api } from '../helpers/helpers'; // Import the api object from the helpers file

export default {
  name: 'new-word', // Name of the component
  components: {
    'word-form': WordForm // Register the WordForm component
  },
  methods: {
	async createOrUpdate(word) {
    try {
      const res = await api.createWord(word); // Call the createWord API function to create a new word
      this.flash('Word created', 'success'); // Display a flash message indicating success
      this.$router.push(`/words/${res._id}`); // Redirect to the page showing the new word
    } catch (error) {
      console.error('Error creating word:', error.response ? error.response.data : error); // Log the error to the console as an error message
      if (error.response && error.response.data.message.includes('Duplicate words found')) {
        this.flash(error.response.data.message, 'error'); // Display the specific duplicate word message
      } else {
        this.flash('Error creating word', 'error'); // Display a generic error flash message
      }
    }
  }
  }
};
</script>
