<template>
  <div>
    <h1>All Words</h1>
	<div class="search-sort-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a word..."
        @input="fetchWords(1)"
		class="rounded-search"
      />
	  <div class="sort-options">
        <label for="sort">Sort by: </label>
        <select id="sort" v-model="sortField" @change="fetchWords(1)">
		  <option value="createdAt">Default</option>
          <option value="english">Alphabet</option>
        </select>
    </div>
	</div>
    <table id="words" class="ui celled compact table" v-if="words.length > 0">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
		  <th>Indonesian</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tr v-for="(word, i) in words" :key="i">
        <td>
		  <router-link :to="{ name: 'show', params: { id: word._id }}">{{ word.english }}</router-link>
		</td>
		<td>
		  <router-link :to="{ name: 'show', params: { id: word._id }}">{{ word.german }}</router-link>
		</td>
		<td>
		  <router-link :to="{ name: 'show', params: { id: word._id }}">{{ word.indonesian }}</router-link>
		</td>
      
        <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id}}" class="edit-icon">
              <i class="blue edit icon"></i>
            </router-link>
        </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
            <a :href="`/words/${word._id}`" class="trash-icon">
              <i class="red trash icon"></i>
            </a>
        </td>
      </tr>
    </table>
	<p v-else>No words found.</p> <!-- Display message when no words are found -->
	<div class="pagination" v-if="words.length > 0">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>

// This component named "words" is designed to fetch and display a list of words from a server.

import { api } from '../helpers/helpers'; // Import the api object from the helpers file

export default {
  name: 'words', // Name of the component
  data() {
    return {
      words: [], // Initialise an empty array that later populated with data fetched from server 
	  currentPage: 1,
      totalPages: 1,
	  sortField: 'createdAt', // Default sort field
	  sortOrder: 'asc', // Default sort order
	  searchQuery: '' // Search query
    };
  },
  async mounted() {
    // Fetch words from the server when the component is mounted
	await this.fetchWords();
  },
  methods: {
	async fetchWords(page = 1) {
	  let sort = this.sortField;
      let order = this.sortOrder;
      if (this.sortField === 'createdAt-desc') {
		 sort = 'createdAt';
         order = 'desc';
      }
	  else if (this.sortField === 'createdAt') {
		 sort = 'createdAt';
         order = 'asc';
      }
	  else {
		 sort = 'english';
		 order = 'asc';
	  }
      const response = await api.getWords(page, sort, order, this.searchQuery);
      this.words = response.words;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchWords(this.currentPage);
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchWords(this.currentPage);
      }
    },
	async onDestroy(id) {
	  const sure = window.confirm('Are you sure?');
	  if (!sure) return;
	  await api.deleteWord(id);
	  this.flash('Word deleted sucessfully!', 'success');

	  // Check if the current page is empty after deletion
      const response = await api.getWords(this.currentPage, this.sortField, this.sortOrder, this.searchQuery);
      if (response.words.length === 0 && this.currentPage > 1) {
        this.currentPage--; // Move back to the previous page if the current page is empty
      }
      await this.fetchWords(this.currentPage);
	  }
  }
};
</script>

<style scoped>
.search-sort-container {
  display: flex;
  justify-content: space-between; /* Align search bar to the left and sort options to the right */
  margin-bottom: 10px;
}

.rounded-search {
  border-radius: 20px; /* Make the search bar rounded */
  padding: 8px 12px; 
  border: 1px solid #ccc; 
}

/* Larger font size for normal text */
body, .ui.container, .ui.table, .ui.form, .pagination, .ui.label, .ui.button {
  font-size: 18px; 
}

.edit-icon i,
.trash-icon i {
  text-decoration: none; /* Remove underline */
}

.edit-icon i {
  color: blue !important; 
}

.trash-icon i {
  color: red !important; 
}

.search-bar {
  margin-bottom: 10px;
}

.sort-options {
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.pagination span {
  margin: 0 10px;
}
</style>
