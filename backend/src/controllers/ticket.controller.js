const ticketService = require("../services/ticket.service");

// Get all tickets (admin) or user's tickets (user)
exports.getTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getTickets(req.user._id, req.user.role);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const ticketData = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
    };

    const ticket = await ticketService.createTicket(ticketData, req.user._id);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific ticket
exports.getTicket = async (req, res) => {
  try {
    const ticket = await ticketService.getTicket(req.params.id);

    // Check if user has access to this ticket
    const hasAccess = ticketService.checkTicketAccess(
      ticket,
      req.user._id,
      req.user.role
    );
    if (!hasAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(ticket);
  } catch (error) {
    res
      .status(error.message === "Ticket not found" ? 404 : 500)
      .json({ message: error.message });
  }
};

// Update ticket status (admin only)
exports.updateTicketStatus = async (req, res) => {
  try {
    const ticket = await ticketService.updateTicketStatus(
      req.params.id,
      req.body.status
    );
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
