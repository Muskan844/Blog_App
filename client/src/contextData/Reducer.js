const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false, // on clicking login button, we could show loading bar or some circle etc
      }; // after successfull or failure, isFetching becomes false(stop fetching), then we'll either see any error or update our user and go to homepage
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, //using payload from action.js
        isFetching: false,
        error: false, // on clicking login button, we could show loading bar or some circle etc
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true, // on clicking login button, we could show loading bar or some circle etc
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      }; 
    case "UPDATE_SUCCESS": 
      return {
        user: action.payload, 
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true, 
      };
    default:
      return state;
  }
};
export default Reducer;
