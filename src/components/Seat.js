import React from "react";
import styled from "styled-components";

import seatImage from "../assets/seat-available.svg";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import { BookingContext } from "./BookingContext";

const Seat = ({ seat, seatId, rowIndex, seatIndex, tippyContent }) => {
  const { actions } = React.useContext(BookingContext);
  const { beginBookingProcess } = actions;
  //   console.log(seatId);

  return (
    <Tippy content={tippyContent}>
      <Wrapper>
        <Button
          disabled={seat.isBooked}
          onClick={() => {
            beginBookingProcess({ seatId, price: seat.price });
          }}
        >
          <SeatImg
            alt="seat"
            className={seat.isBooked ? "isBooked" : ""}
            key={seatId}
            rowIndex={rowIndex}
            seatIndex={seatIndex}
            src={seatImage}
          />
        </Button>
      </Wrapper>
    </Tippy>
  );
};

const Wrapper = styled.div`
  background: #eee;
  padding: 5px;
`;

const Button = styled.button`
  all: unset;
`;

const SeatImg = styled.img`
  &:hover {
    cursor: pointer;
  }

  &.isBooked {
    filter: grayscale(100%);
  }
`;

export default Seat;
