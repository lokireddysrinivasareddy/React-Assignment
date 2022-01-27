import { LOADING, SEARCH_GIF, SUCCESS, FAIL } from "../action-types";

const STATE_INIT = {
  isLoading: false,
  gifDetails: [],
};

export default (state = STATE_INIT, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, ...payload };
    case SEARCH_GIF:
      return { ...state, isLoading: true };
    case `${SEARCH_GIF}_${SUCCESS}`:
      return { ...state, isLoading: false, gifDetails: [...payload] };
    case `${SEARCH_GIF}_${FAIL}`:
      return { ...state, isLoading: false, error: { ...payload } };

    default:
      return state;
  }
};
