/*
	This file sets up a basic Vue.js application
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'semantic-ui-css/semantic.css'

Vue.config.productionTip = false

new Vue({
	router,
    render: function (h) { return h(App) }, // Create and display the App component
}).$mount('#app') // Put the Vue application to the HTML element with ID 'app'
