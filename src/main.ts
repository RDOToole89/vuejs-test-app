import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Create a new Vue app passing the root component to the mount method
createApp(App)
.use(createPinia())
.mount('#app')
