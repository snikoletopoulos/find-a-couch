import axios from "axios";

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };

    const response = await axios.put(
      `https://find-a-coach-abbee-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      coachData
    );

    if (response.status === 200) {
      context.commit("registerCoach", { ...coachData, id: userId });
    }
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await axios.get(
      `https://find-a-coach-abbee-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    if (response.status === 200) {
      const coaches = [];
      for (const key in response.data) {
        const coach = {
          id: key,
          firstName: response.data[key].firstName,
          lastName: response.data[key].lastName,
          description: response.data[key].description,
          hourlyRate: response.data[key].hourlyRate,
          areas: response.data[key].areas,
        };
        coaches.push(coach);
      }
      context.commit("setCoaches", coaches);
      context.commit("setFetchTimestamp");
    } else {
      const error = new Error(response.message || "Failed to fetch!");
      throw error;
    }
  },
};
