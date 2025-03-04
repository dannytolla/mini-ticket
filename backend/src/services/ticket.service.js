const Ticket = require("../models/ticket.model");

// Get tickets based on user role
exports.getTickets = async (userId, userRole) => {
  try {
    let tickets;
    if (userRole === "admin") {
      tickets = await Ticket.find()
        .populate("user", "name email")
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ user: userId })
        .populate("user", "name email")
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });
    }
    return tickets;
  } catch (error) {
    throw new Error(`Error fetching tickets: ${error.message}`);
  }
};

// Create a new ticket
exports.createTicket = async (ticketData, userId) => {
  try {
    const ticket = new Ticket({
      ...ticketData,
      user: userId,
    });

    await ticket.save();
    return ticket.populate("user", "name email");
  } catch (error) {
    throw new Error(`Error creating ticket: ${error.message}`);
  }
};

// Get a specific ticket
exports.getTicket = async (ticketId) => {
  try {
    const ticket = await Ticket.findById(ticketId)
      .populate("user", "name email")
      .populate("assignedTo", "name email");

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    return ticket;
  } catch (error) {
    throw new Error(`Error fetching ticket: ${error.message}`);
  }
};

// Update ticket status (admin only)
exports.updateTicketStatus = async (ticketId, status) => {
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.status = status;
    await ticket.save();

    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error(`Error updating ticket status: ${error.message}`);
  }
};

// Check if user has access to a ticket
exports.checkTicketAccess = (ticket, userId, userRole) => {
  if (userRole === "admin" || ticket.user.toString() === userId.toString()) {
    return true;
  }
  return false;
};
