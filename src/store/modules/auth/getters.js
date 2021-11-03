export default {
  userId(store) {
    return store.userId;
  },
  token(store) {
    return store.token;
  },
  isAuthenticated(store) {
    return !!store.token
  }
};
