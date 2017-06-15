const initialState = {
  data: null,
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default: {
      console.log(type, payload);
      return state;
    }
  }
};
