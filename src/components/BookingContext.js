import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

// idle
// seat-selected
// awaiting-response
// error
// purchased

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    case "cancel-booking-process": {
      return {
        ...initialState,
      };
    }
    case "purchase-ticket-request":
      return {
        ...state,
        status: "awaiting-response",
      };
    case "purchase-ticket-success":
      return {
        ...initialState,
        status: "purchased",
      };
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: "Please provide credit card information!",
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };

  const purchaseTicketFailure = () => {
    dispatch({
      type: "purchase-ticket-failure",
    });
  };

  console.log(state);

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketSuccess,
          purchaseTicketFailure,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
