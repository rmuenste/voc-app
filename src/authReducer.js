const initialState = {
    loggedIn: false 
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
      case 'auth/login':
        console.log("Handling auth/login");
        return {
            ...state,
            loggedIn: action.payload
        };
      case 'auth/logout':
        console.log("Handling auth/logout");
        return {
            ...state,
            loggedIn: action.payload
        };
        default:
            return state;
    }

};

export default authReducer;