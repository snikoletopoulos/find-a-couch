import axios from "axios";

let timer;

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

    const timeToExpire = +response.data.expiresIn * 1000;
    const expirationDate = new Date().getTime() + timeToExpire;

    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("userId", response.data.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, timeToExpire);

    context.commit("setUser", {
      token: response.data.idToken,
      userId: response.data.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const timeToExpire = +tokenExpiration - new Date().getTime();

    if (timeToExpire < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, timeToExpire);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit('setAutoLogout')
  }
};
