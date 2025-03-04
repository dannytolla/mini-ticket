import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../../redux/slices/ticketSlice";
import { Ticket } from "../../types";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-hot-toast";

interface AdminTicketItemProps {
  ticket: Ticket;
}

const AdminTicketItem: React.FC<AdminTicketItemProps> = ({ ticket }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const dispatch = useDispatch<AppDispatch>();

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

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800 ring-1 ring-blue-200";
      case "in progress":
        return "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200";
      case "closed":
        return "bg-green-100 text-green-800 ring-1 ring-green-200";
      default:
        return "bg-gray-100 text-gray-800 ring-1 ring-gray-200";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 ring-1 ring-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 ring-1 ring-green-200";
      default:
        return "bg-gray-100 text-gray-800 ring-1 ring-gray-200";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(updateTicket({ id: ticket._id, ticketData: { status } }));
    toast.success("Ticket status updated successfully");
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {ticket.title}
            </h3>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 ring-1 ring-gray-200 shrink-0">
              ID: {ticket._id.slice(-6).toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadgeClass(
                ticket.priority
              )}`}
            >
              {ticket.priority} priority
            </span>
            {ticket.user && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 ring-1 ring-purple-200">
                User:{" "}
                {typeof ticket.user === "object"
                  ? (ticket.user as { name: string }).name
                  : ticket.user}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {ticket.description}
          </p>

          <div className="text-xs text-gray-500 space-y-1">
            <p>Created: {formatDate(ticket.createdAt)}</p>
            {ticket.updatedAt !== ticket.createdAt && (
              <p>Updated: {formatDate(ticket.updatedAt)}</p>
            )}
          </div>
        </div>

        {/* Right Column: Status Controls */}
        <div className="md:col-span-1 flex items-start justify-end">
          {isEditing ? (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[200px] space-y-4"
            >
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as "open" | "in-progress" | "closed"
                    )
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 focus:border-primary-500 transition-all duration-200"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTicketItem;
