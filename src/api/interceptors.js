import { API } from "./index";

const setup = (store) => {
  const { dispatch } = store;
  console.log(dispatch);
  API.interceptors.response.use(
    (res) => res,
    async (err) => {
      console.log(err.config);
      const originalConfig = err.config;
      if (
        originalConfig.url !== "/auth/admin/signin" &&
        originalConfig.url !== "/auth/admin/token" &&
        err.response
      ) {
        if (err.response.status === 401 && !originalConfig._retry) {
          console.log("attempting to post again");
          originalConfig._retry = true;
          try {
            const { data } = await API.post("/auth/admin/token");
            dispatch({ type: "SIGN_IN", payload: data.admin });
            return API(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
