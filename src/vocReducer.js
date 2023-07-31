const initialState = {
    vocData: {
      words: []
    }
};

const vocReducer = (state = initialState, action) => {

    switch (action.type) {
      case 'voc/words':
        console.log("voc/words");
        console.log(action.payload)
        return {
            ...state,
            vocData: {
                ...state.vocData,
                words: action.payload
            },
        };
        default:
            return state;
    }

};

export default vocReducer;