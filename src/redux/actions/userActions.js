import actionTypes from "../actions/actionTypes";
import { loginApi } from "../../services/UserServices";

export const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
};

export const handleLoginRedux = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.LOGIN,
      isLogging: true,
    });
    const res = await loginApi(payload);

    if (res && res.token) {
      //   console.log(">>> res success", res);

      dispatch({
        type: actionTypes.LOGGIN_SUCCESS,
        data: {
          email: payload.email,
          auth: true,
        },
        token: res.token,
        isLogging: false,
      });
    } else {
      //   console.log(">>> res", res);

      dispatch({
        type: actionTypes.LOGGIN_FAILURE,
        data: {
          email: "",
          auth: false,
        },
        isLogging: false,
        msg: res.data.error,
      });
    }
  } catch (error) {
    // console.log(">>> error", error);
    dispatch({
      type: actionTypes.LOGGIN_FAILURE,
      msg: error,
      // data : err.response.data,
    });
  }
};

export const handleGetUserRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GET_USER,
    });
  };
};
