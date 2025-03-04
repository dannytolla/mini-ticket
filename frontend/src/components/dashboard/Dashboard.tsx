import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../redux/store";
import TicketForm from "./TicketForm";
import TicketItem from "./TicketItem";
import { getTickets } from "../../redux/slices/ticketSlice";
import Header from "../Header";
import { Ticket } from "../../types";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { tickets, loading } = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const userTickets = tickets.filter((ticket: Ticket) => {
    if (typeof ticket.user === "string") {
      return ticket.user === user?._id || ticket.user === user?.id;
    }
    return ticket.user._id === user?._id || ticket.user._id === user?.id;
  });

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 ">
          <Header
            title="My Support Tickets"
            description="Manage and track your support requests"
          />
          <div className="mt-6 md:mt-0">
            <button
              onClick={() => setShowForm(!showForm)}
              className="group relative inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-base font-semibold text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-all duration-300"
            >
              <svg
                className="mr-2 h-6 w-6 group-hover:rotate-90 transition-transform duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              {showForm ? "Cancel" : "New Ticket"}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Create New Support Ticket
              </h3>
              <TicketForm setShowForm={setShowForm} />
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
          </div>
        ) : userTickets.length === 0 ? (
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
                Get started by creating a new support ticket.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <svg
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  New Ticket
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200 space-y-4">
              {userTickets.map((ticket) => (
                <li
                  key={ticket._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TicketItem ticket={ticket} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
