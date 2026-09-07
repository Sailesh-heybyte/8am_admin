import { useState } from "react";
import "./AddStudentModal.scss";

const AddStudentModal = ({ isOpen, onClose, onSave, schools = [], buses = [] }) => {
  const initialFormData = {
    studentName: "",
    studentId: "",
    school: "",
    className: "",
    section: "",
    rollNumber: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    bus: "",
    route: "",
    cardId: "",
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

  const handleNumericChange = (e) => {
    const { name, value } = e.target;

    const numericValue = value.replace(/\D/g, "");

    let finalValue = numericValue;

    if (name === "parentPhone") {
      finalValue = numericValue.slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName.trim()) {
      alert("Please enter the student name.");
      return;
    }

    if (!formData.studentId.trim()) {
      alert("Please enter the student ID.");
      return;
    }

    if (!formData.school) {
      alert("Please select a school.");
      return;
    }

    if (formData.parentPhone && formData.parentPhone.length !== 10) {
      alert("Parent phone number must be exactly 10 digits.");
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
    <div className="add-student-overlay" onMouseDown={onClose}>
      <div
        className="add-student-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="add-student-header">
          <div>
            <h2>Add Student</h2>
            <p>Add a new student and assign transport details.</p>
          </div>

          <button type="button" className="add-student-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-student-body">
            {/* Student Information */}
            <div className="form-section">
              <h3 className="form-section-title">Student Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Student Name</label>

                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Student ID</label>

                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. STU1256"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="form-section">
              <h3 className="form-section-title">Academic Information</h3>

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
                    {schools.map((s) => (
                      <option key={s.id || s.schoolName} value={s.schoolName}>
                        {s.schoolName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Class</label>

                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                  >
                    <option value="">Select class</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Section</label>

                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                  >
                    <option value="">Select section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>

              <div className="form-row student-second-row">
                <div className="form-field">
                  <label>Roll Number</label>

                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleNumericChange}
                    placeholder="Enter roll number"
                  />
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="form-section">
              <h3 className="form-section-title">
                Parent / Guardian Information
              </h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Parent Name</label>

                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Enter parent name"
                  />
                </div>

                <div className="form-field">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleNumericChange}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                </div>

                <div className="form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Transport Information */}
            <div className="form-section">
              <h3 className="form-section-title">Transport Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Assigned Bus</label>

                  <select
                    name="bus"
                    value={formData.bus}
                    onChange={handleChange}
                  >
                    <option value="">Select bus</option>
                    {buses.map((b) => (
                      <option key={b.id || b.busNumber} value={b.busNumber}>
                        {b.busNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Route</label>

                  <select
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                  >
                    <option value="">Select route</option>
                    <option value="Route 1">Route 1</option>
                    <option value="Route 2">Route 2</option>
                    <option value="Route 3">Route 3</option>
                    <option value="Route 4">Route 4</option>
                    <option value="Route 5">Route 5</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Smart Card ID</label>

                  <input
                    type="text"
                    name="cardId"
                    value={formData.cardId}
                    onChange={handleChange}
                    placeholder="e.g. ST1256"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="add-student-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="modal-save">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
