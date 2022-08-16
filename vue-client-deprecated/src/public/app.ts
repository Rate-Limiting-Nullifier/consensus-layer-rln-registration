import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Create Vue App
const app = createApp(App);


// Mount Vue App to DOM
app.mount("#app");