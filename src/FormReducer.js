const initialState = {
    formData: {
      words: []
    }
};

const formReducer = (state = initialState, action) => {

    switch (action.type) {
      case 'formData/update':
        return {
            ...state,
            formData: {
                ...state.formData,
                ...action.payload
            },
        };
        default:
            return state;
    }

};

export default formReducer;