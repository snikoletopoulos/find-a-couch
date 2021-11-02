import axios from "axios";

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await axios.post(
      `https://find-a-coach-abbee-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      newRequest
    );

    if (response.status === 200) {
      newRequest.id = response.data.id;
      newRequest.coachId = payload.coachId;

      context.commit("addRequest", newRequest);
    } else {
      const error = new Error(response.message || "Failed to send request.");
      throw error;
    }
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await axios.get(
      `https://find-a-coach-abbee-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
    );

    if (response.status === 200) {
      const requests = [];
      for (const key in response.data) {
        const request = {
          id: key,
          coachId: coachId,
          userEmail: response.data[key].userEmail,
          message: response.data[key].message,
        };
        requests.push(request);
      }
      context.commit("setRequests", requests);
    } else {
      const error = new Error(response.message || "Failed to fetch request.");
      throw error;
    }
  },
};
