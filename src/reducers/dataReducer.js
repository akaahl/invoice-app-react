const invoiceStorage = JSON.parse(localStorage.getItem('invoiceStorage'));

const initialState = {
  data: invoiceStorage ?? [],
  formModal: false,
  invoiceId: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, data: action.payload.data };

    case 'UPDATE_DATA':
      return { ...state, data: action.payload.data };

    case 'OPEN_MODAL':
      return {
        ...state,
        formModal: true,
        invoiceId: action.payload.id,
      };

    case 'CLOSE_MODAL':
      return { ...state, formModal: false, invoiceId: null };

    default:
      return { ...state };
  }
};

export default dataReducer;
