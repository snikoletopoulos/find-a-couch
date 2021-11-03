import axios from "axios";

export default {
  async login(context, payload) {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQBmyEqAHib3F39hpMW6pqSvyVnT0wYqo`,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );

    if (response.statusCode !== 200) {
      const error = new Error(response.messagesaa || "Failed to authenticate.");
      throw error;
    }

    context.commit("setUser", {
      token: response.data.idToken,
      userId: response.data.localId,
      tokenExpiration: response.data.expiresIn,
    });
  },
  async signup(context, payload) {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQBmyEqAHib3F39hpMW6pqSvyVnT0wYqo`,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );

    if (response.statusCode !== 200) {
      const error = new Error(response.messagesaa || "Failed to authenticate.");
      throw error;
    }

    context.commit("setUser", {
      token: response.data.idToken,
      userId: response.data.localId,
      tokenExpiration: response.data.expiresIn,
    });
  },
};
