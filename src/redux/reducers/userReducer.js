import actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  email: null,
  auth: null,
  isLogging: null,
  token: null,
  msg: null,
  isError: null,
//   {
//     account: {
//       email: "
//       token:"
//       auth
//     }
//     isLoading
//     isError
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogging: true,
      };

    case actionTypes.LOGGIN_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        auth: action.data.auth,
        token: action.token,
        isLogging: false,
        msg: `Welcome ${action.data.email}`,
      };
    case actionTypes.LOGGIN_FAILURE:
      return {
        ...state,
        auth: false,
        isLogging: false,
        msg: action.msg,
        isError: true,
      };
    case actionTypes.LOGOUT:
        return {
            ...state,
            email: "",
            auth: false,
            token: "",
            isLogging: false,
            msg: "Logout success",
            isError: false,
        };
    case actionTypes.GET_USER:
        return state;
        
    default:
      return state;
  }
};

export default userReducer;
