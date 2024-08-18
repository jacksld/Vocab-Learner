/*
	This code defines different paths (or routes) that the app can navigate to
	and display different components based on the URL.
*/

import Vue from 'vue'; 
import Router from 'vue-router';
import Words from './views/Words.vue'; // Import the Words component
import New from './views/New.vue'; 
import Show from './views/Show.vue'; 
import Edit from './views/Edit.vue'; 

Vue.use(Router); // Tell Vue to use the Router

// Export a new Router instance
export default new Router({
  mode: 'history', // Use the history mode for navigation
  base: process.env.BASE_URL, // Base URL for the app
  linkActiveClass: 'active', // Class to apply to the active link
  routes: [
    {
      path: '/', // Path for the home page
      redirect: '/words' // Redirect to the /words path
    },
    {
      path: '/words', // Path for the words page
      name: 'words', // Name of the route
      component: Words // Component to render for this route
    },
    {
      path: '/words/new', 
      name: 'new-word', 
      component: New 
    },
    {
      path: '/words/:id', 
      name: 'show', 
      component: Show 
    },
    {
      path: '/words/:id/edit', 
      name: 'edit', 
      component: Edit 
    } 
  ]
});
