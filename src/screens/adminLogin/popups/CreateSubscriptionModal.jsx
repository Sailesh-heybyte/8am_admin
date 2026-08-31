import { useState } from "react";
import "./CreateSubscriptionModal.scss";

const CreateSubscriptionModal = ({ isOpen, onClose, onSave }) => {
  const initialFormData = {
    school: "",
    plan: "",
    students: "",
    startDate: "",
    endDate: "",
    amount: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.school) {
      alert("Please select a school.");
      return;
    }

    if (!formData.plan) {
      alert("Please select a plan.");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert("Please select subscription dates.");
      return;
    }

    onSave?.(formData);

    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="create-subscription-overlay" onMouseDown={onClose}>
      <div
        className="create-subscription-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="create-subscription-header">
          <div>
            <h2>Create Subscription</h2>
            <p>Create a new subscription plan for a school.</p>
          </div>

          <button
            type="button"
            className="create-subscription-close"
            onClick={onClose}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="create-subscription-body">
            {/* Subscription Information */}
            <div className="form-section">
              <h3 className="form-section-title">Subscription Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>School</label>

                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select school</option>
                    <option value="Greenwood International School">
                      Greenwood International School
                    </option>
                    <option value="Delhi Public School">
                      Delhi Public School
                    </option>
                    <option value="St. Mary's School">St. Mary's School</option>
                    <option value="Ryan International School">
                      Ryan International School
                    </option>
                    <option value="Narayana School">Narayana School</option>
                    <option value="Global World School">
                      Global World School
                    </option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Subscription Plan</label>

                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select plan</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Plan Details */}
            <div className="form-section">
              <h3 className="form-section-title">Plan Details</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Number of Students</label>

                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleChange}
                    placeholder="e.g. 1200"
                    min="1"
                  />
                </div>

                <div className="form-field">
                  <label>Subscription Amount (₹)</label>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g. 75000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Period */}
            <div className="form-section">
              <h3 className="form-section-title">Subscription Period</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Start Date</label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>End Date</label>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-subscription-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="modal-save">
              Create Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscriptionModal;
