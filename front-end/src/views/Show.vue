<template>
    <div>
      <h1>Word View</h1>
 
      <div class="ui labeled input fluid">
        <div class="ui label">English</div>
        <input type="text" readonly  :value="word.english"/>
      </div>
	  <div class="ui labeled input fluid">
        <div class="ui label">German</div>
        <input type="text" readonly  :value="word.german"/>
      </div>
	  <div class="ui labeled input fluid">
        <div class="ui label">Indonesian</div>
        <input type="text" readonly  :value="word.indonesian"/>
      </div>
      <div class="actions">
        <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
          Edit <i class="edit icon"></i>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  
  // This component name "show" is designed to display a single word detail
  
  import { api } from '../helpers/helpers'; // Import the api object from the helpers file

 export default {
   name: 'show', // Name of the component
   data() {
	 return {
	   word: ''
	 };
   },
   async mounted() {
	 this.word = await api.getWord(this.$route.params.id); // Fetch words from the server when the component is mounted
   }
 };
  </script>
  
  <style scoped>
  .actions a {
    display: block;
    margin: 20px 10px;
  }
  </style>