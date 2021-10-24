export const fetchData = (url) => async (dispatch) => {
  const res = await fetch(url);
  const data = await res.json();

  localStorage.setItem("invoiceStorage", JSON.stringify(data));

  dispatch({
    type: "FETCH_DATA",
    payload: {
      data,
    },
  });
};
