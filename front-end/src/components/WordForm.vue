<template>
  <!-- The form element -->
  <form action="#" @submit.prevent="onSubmit">
	 <!-- Error message that appears if there are errors -->
     <p v-if="errorsPresent" class="error">{{ errorMessage }}</p>
 
     <!-- English word Input field -->
     <div class="ui labeled input fluid">
       <div class="ui label">English</div>
       <input type="text" placeholder="Enter word..." v-model="word.english"  />
     </div>
	 
	 <!-- German word Input field  -->
	 <div class="ui labeled input fluid">
       <div class="ui label">German</div>
       <input type="text" placeholder="Enter word..." v-model="word.german"  /> <!-- Refer to this component word object's property --> 
     </div>
	 
	 <!-- Indonesian word Input field -->
     <div class="ui labeled input fluid">
       <div class="ui label">Indonesian</div>
       <input type="text" placeholder="Enter word..." v-model="word.indonesian"  />
     </div>
 
     <!-- Submit button -->
	 <button class="positive ui button">Add</button>
   </form>
 </template>
 
 <script>
 export default {
   name: 'word-form',
   props: {
     word: {
       type: Object,
       required: false,
	   default: () => {
		   return {
			   english: '',
			   german: '',
			   indonesian: ''
			   };
			}
     }
   },
   data() {
     return {
       errorsPresent: false,
	   errorMessage: ''
     };
   },
   methods: {
	 onSubmit: function() {
      // Validation for alphabet characters only
      const alphabetRegex = /^[A-Za-z\s]+$/;
	  const fields = ['english', 'german', 'indonesian'];
      const filledFields = [];

      // Check each field for valid characters and count filled fields
      for (const field of fields) {
        const value = this.word[field];
        if (value) {
          if (!alphabetRegex.test(value)) {
            this.errorsPresent = true;
            this.errorMessage = 'Only alphabet characters are allowed';
            return;
          }
          filledFields.push(field);
        }
      }
	
      // Check if two out of three fields are filled
	  if (filledFields.length < 2) {
        this.errorsPresent = true;
        this.errorMessage = 'Missing Fields';
        return;
      }

      this.errorsPresent = false;
      this.$emit('createOrUpdate', this.word);
    }
 }
 };
 </script>
 
 <style scoped>
 .error {
   color: red;
 }
 </style>