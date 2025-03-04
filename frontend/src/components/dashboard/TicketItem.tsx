import React from "react";
import { Ticket } from "../../types";

interface TicketItemProps {
  ticket: Ticket;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine badge color based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Determine badge color based on priority
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-1">
            {ticket.title}
          </h3>
          <div className="mt-1 flex flex-wrap gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(
                ticket.priority
              )}`}
            >
              {ticket.priority} priority
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              ID: {ticket._id.slice(-6).toUpperCase()}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">
            {ticket.description}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 shrink-0 flex flex-col items-end">
          <p className="text-sm text-gray-500">
            Created: {formatDate(ticket.createdAt)}
          </p>
          {ticket.updatedAt !== ticket.createdAt && (
            <p className="text-sm text-gray-500">
              Updated: {formatDate(ticket.updatedAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
