import React from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";

import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const { state } = React.useContext(BookingContext);
  const { selectedSeatId } = state;

  console.log("SELECTED SEAT NUMBER", selectedSeatId);
  return (
    <Dialog open={selectedSeatId !== null}>
      <Wrapper></Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  background-color: red;
  height: 100px;
  width: 200px;
`;

export default PurchaseModal;
