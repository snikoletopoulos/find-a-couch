import { createStore } from "vuex";
import coachesModule from './modules/coaches/index';

export default createStore({
  modules: {
    coaches: coachesModule
  },
});
