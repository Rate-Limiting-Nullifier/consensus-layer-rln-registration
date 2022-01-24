import { createApp } from "vue";
import { store, key } from './store'
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Create Vue App
const app = createApp(App);

// Register Vuex store
app.use(store, key);

// Mount Vue App to DOM
app.mount("#app");