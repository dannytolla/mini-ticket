import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../redux/slices/ticketSlice";
import { AppDispatch, RootState } from "../../redux/store";
import AdminTicketItem from "./AdminTicketItem";
import { Navigate } from "react-router-dom";
import { Ticket } from "../../types";
import Header from "../Header";
const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets, loading } = useSelector((state: RootState) => state.tickets);
  const { user } = useSelector((state: RootState) => state.auth);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  const filteredTickets =
    statusFilter === "all"
      ? tickets
      : tickets.filter(
          (ticket: Ticket) =>
            ticket.status.toLowerCase() === statusFilter.toLowerCase()
        );

  return (
    <div className=" min-h-[calc(100vh-64px)]">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <Header
            title="Admin Dashboard"
            description="Manage and track all support tickets"
          />
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="status-filter"
                className="text-sm font-medium text-gray-700"
              >
                Filter by status:
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-hidden focus:ring-primary-500"
              >
                <option value="all">All Tickets</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="px-4 py-12 sm:px-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No tickets found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {statusFilter === "all"
                  ? "There are no tickets in the system."
                  : `There are no ${statusFilter} tickets.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {statusFilter === "all"
                    ? "All Tickets"
                    : `${
                        statusFilter.charAt(0).toUpperCase() +
                        statusFilter.slice(1)
                      } Tickets`}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {filteredTickets.length}{" "}
                  {filteredTickets.length === 1 ? "ticket" : "tickets"}
                </span>
              </div>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <li
                  key={ticket._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <AdminTicketItem ticket={ticket} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
