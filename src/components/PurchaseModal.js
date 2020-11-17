import React from "react";
import styled from "styled-components";

import { BookingContext } from "./BookingContext";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";

const PurchaseModal = () => {
  const { actions, state } = React.useContext(BookingContext);
  const { selectedSeatId, price } = state;
  const {
    cancelBookingProcess,
    purchaseTicketRequest,
    purchaseTicketSuccess,
    purchaseTicketFailure,
  } = actions;
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const handleClose = () => {
    cancelBookingProcess();
  };

  const handlePurchase = () => {
    purchaseTicketRequest();
    fetch(`/api/book-seat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seatId: selectedSeatId,
        creditCard: creditCard,
        expiration: expiration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 500) {
          purchaseTicketFailure();
        } else if (data.status === 200) {
          purchaseTicketSuccess();
        } else {
          cancelBookingProcess();
        }
      });
  };

  return (
    <Dialog open={selectedSeatId !== null} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Purchase Ticket</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You're purchasing 1 ticket for the price of ${price}.
        </DialogContentText>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seat</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
            <TableCell>{selectedSeatId}</TableCell>
            <TableCell>${price}</TableCell>
          </TableHead>
        </Table>
        <DialogContentText> </DialogContentText>
        <DialogContentText>Enter payment details</DialogContentText>
        <TextField
          autoFocus
          value={creditCard}
          onChange={(e) => {
            setCreditCard(e.target.value);
          }}
          id="creditCard"
          label="Credit Card"
          type="text"
        />
        <TextField
          autoFocus
          value={expiration}
          onChange={(e) => {
            setExpiration(e.target.value);
          }}
          id="expDate"
          label="Expiration"
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePurchase} color="primary">
          Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Wrapper = styled.div`
  background-color: red;
  height: 100px;
  width: 200px;
`;

export default PurchaseModal;
