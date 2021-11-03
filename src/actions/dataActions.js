export const fetchData = url => async dispatch => {
  const res = await fetch(url);
  const data = await res.json();

  localStorage.setItem('invoiceStorage', JSON.stringify(data));

  dispatch({
    type: 'FETCH_DATA',
    payload: {
      data,
    },
  });
};

export const updateData = data => async dispatch => {
  dispatch({
    type: 'UPDATE_DATA',
    payload: {
      data,
    },
  });
};

export const openModal = invoiceId => async dispatch => {
  dispatch({
    type: 'OPEN_MODAL',
    payload: {
      id: invoiceId ? invoiceId : null,
    },
  });
};

export const closeModal = () => async dispatch => {
  dispatch({
    type: 'CLOSE_MODAL',
  });
};
