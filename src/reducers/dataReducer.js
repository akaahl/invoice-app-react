const initialState = {
  data: [],
  filterModal: false,
  formModal: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, data: action.payload.data };

    case "UPDATE_DATA":
      return { ...state, data: action.payload.data };

    case "OPEN_MODAL":
      return { ...state, formModal: true };

    case "CLOSE_MODAL":
      return { ...state, formModal: false };

    default:
      return { ...state };
  }
};

export default dataReducer;
