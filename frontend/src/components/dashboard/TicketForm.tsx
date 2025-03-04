import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createTicket } from "../../redux/slices/ticketSlice";
import { AppDispatch } from "../../redux/store";

interface TicketFormProps {
  setShowForm?: (show: boolean) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch<AppDispatch>();
  const { title, description, priority } = formData;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(createTicket(formData));
    setFormData({ title: "", description: "", priority: "low" });
    if (setShowForm) setShowForm(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.title
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-primary-500 focus:ring-primary-500"
          } bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out`}
          placeholder="Brief summary of the issue"
        />
        {errors.title && (
          <p className="text-sm text-red-600 animate-fade-in">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={description}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.description
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-primary-500 focus:ring-primary-500"
          } bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-opacity-50 resize-y transition-all duration-200 ease-in-out`}
          placeholder="Detailed description of the issue"
        />
        {errors.description && (
          <p className="text-sm text-red-600 animate-fade-in">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 focus:border-primary-500 appearance-none bg-right bg-no-repeat transition-all duration-200 ease-in-out"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-2">
        {setShowForm && (
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 font-medium text-sm transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 font-medium text-sm transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
