const initialState = {
  data: [],
  filterModal: false,
  formModal: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, data: action.payload.data };

    default:
      return { ...state };
  }
};

export default dataReducer;
