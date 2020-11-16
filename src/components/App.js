import React from "react";

import GlobalStyles from "./GlobalStyles";

import { SeatContext } from "./SeatContext";

import TicketWidget from "./TicketWidget";

import styled from "styled-components";

import PurchaseModal from "./PurchaseModal";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        receiveSeatInfoFromServer(data);
      });
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      <TicketWidget />
      <PurchaseModal />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export default App;
