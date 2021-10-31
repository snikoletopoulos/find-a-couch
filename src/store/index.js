import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index";
import requestsModule from "./modules/requests/index";

export default createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  },
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId(store) {
      return store.userId;
    },
  },
});
