import axios from "axios";

export default {
  async login(context, payload) {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );

    if (response.status !== 200) {
      const error = new Error(response.message || "Failed to authenticate.");
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
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );

    if (response.status !== 200) {
      const error = new Error(response.messagesaa || "Failed to authenticate.");
      throw error;
    }

    context.commit("setUser", {
      token: response.data.idToken,
      userId: response.data.localId,
      tokenExpiration: response.data.expiresIn,
    });
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiraton: null,
    });
  },
};
