import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

import { SeatContext } from "./SeatContext";

import Seat from "./Seat";

const TicketWidget = () => {
  // TODO: use values from Context
  // const numOfRows = 6;
  // const seatsPerRow = 6;
  const {
    state: { seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  if (numOfRows && seatsPerRow) {
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];
                const tippyContent = `Row ${rowName}, Seat ${
                  seatIndex + 1
                } - $${seat.price}`;
                return (
                  <Seat
                    seat={seat}
                    key={seatId}
                    rowIndex={rowIndex}
                    seatId={seatId}
                    seatIndex={seatIndex}
                    tippyContent={tippyContent}
                  />
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  /* background: #eee; */
  /* border: 1px solid #ccc; */
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  /* &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  } */
`;

const RowLabel = styled.div`
  font-weight: bold;
  padding-right: 20px;
`;

export default TicketWidget;
