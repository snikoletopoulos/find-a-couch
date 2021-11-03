import axios from "axios";

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const modeUrl = payload.mode === "login" ? "signInWithPassword" : payload.mode === "signup" ? "signUp" : "";
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${modeUrl}?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
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

    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("userId", response.data.localId);

    context.commit("setUser", {
      token: response.data.idToken,
      userId: response.data.localId,
      tokenExpiration: response.data.expiresIn,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiraton: null,
    });
  },
};
