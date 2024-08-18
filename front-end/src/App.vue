<template>
  <div id="app">
    <!-- Navigation Bar -->
    <div class="ui secondary menu">
      <div class="header item">
        Vocab Learner
      </div>
      <router-link to="/words" exact class="item custom-item">
        <i class="list icon"></i> Words
      </router-link>
      <router-link to="/words/new" class="item custom-item">
        <i class="plus circle icon"></i> New
      </router-link>
    </div>

	<!-- Main Content Container -->
    <div class="ui text container">
	<flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
		  <!-- This is where the routed components will be displayed -->
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style>
.header {
  font-size: 18px; 
}
.custom-item {
  font-size: 18px;
}
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>