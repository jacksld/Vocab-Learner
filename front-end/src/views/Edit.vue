<template>
  <div>
    <h1>Edit Word</h1>
	<!--
		Listen for the createOrUpdate event emitted by WordForm component
	    and handle the event with createOrUpdate method 
	-->
    <word-form @createOrUpdate="createOrUpdate" :word=this.word></word-form>
  </div>
</template>

<script>
/*
	This component allow the user to edit the added words
*/

import WordForm from '../components/WordForm.vue'; // Import the WordForm component
import { api } from '../helpers/helpers'; // Import the api object from the helpers file

export default {
  name: 'edit', // Name of the component
  components: {
    'word-form': WordForm // Register the WordForm component
  },
  data: function() {
    return {
      word: {} // Initialize word as an empty object
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id); // Fetch the word data when the component is mounted
  },
  methods:
  {
	  async createOrUpdate(word) {
      try {
        await api.updateWord(word);
        this.flash('Word updated successfully!', 'success');
        this.$router.push(`/words/${word._id}`);
      } catch (error) {
        console.error('Error updating word:', error.response ? error.response.data : error);
        if (error.response && error.response.data.message.includes('Duplicate words found')) {
          this.flash(error.response.data.message, 'error');
        } else {
          this.flash('Error updating word', 'error');
        }
      }
    }
  }
};
</script>

