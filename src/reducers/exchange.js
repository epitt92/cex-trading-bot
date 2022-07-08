import { SET_EXCHANGE } from "../actions/type";

const initialState = {exchangeId:-1};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
	case SET_EXCHANGE:
      return {
        ...state,
        exchangeId: payload.exchangeId,
      };

    default:
      return state;
  }
}