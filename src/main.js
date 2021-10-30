import { createApp } from "vue";
import router from "./router.js";
import store from "./store/index";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(store);

// Vue components
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);

app.mount("#app");
