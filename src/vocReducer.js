const initialState = {
    vocData: {
      words: [],
      numWords: 0
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
      case 'voc/num_words':
        console.log("voc/num_words");
        console.log(action.payload)
        return {
            ...state,
            vocData: {
                ...state.vocData,
                numWords: action.payload
            },
        };
        default:
            return state;
    }

};

export default vocReducer;