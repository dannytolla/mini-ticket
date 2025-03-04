const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const { auth, isAdmin } = require("../middleware/auth.middleware");

router
  .route("/")
  .get(auth, ticketController.getTickets)
  .post(auth, ticketController.createTicket);

router
  .route("/:id")
  .get(auth, ticketController.getTicket)
  .put([auth, isAdmin], ticketController.updateTicketStatus);

module.exports = router;
