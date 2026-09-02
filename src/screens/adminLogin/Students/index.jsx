import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AddStudentModal from "../popups/AddStudentModal.jsx";
export default function Students() {
  const students = [
    [
      "Krishna Sharma",
      "STU1256",
      "6-A",
      "Greenwood International",
      "Bus 12 / Route 1",
      "ST1256",
      "Active",
    ],
    [
      "Ananya Reddy",
      "STU1288",
      "3-B",
      "Greenwood International",
      "Bus 08 / Route 2",
      "ST1288",
      "Active",
    ],
    [
      "Rohan Mehta",
      "STU1291",
      "5-A",
      "Delhi Public School",
      "Bus 12 / Route 1",
      "ST1291",
      "Active",
    ],
    [
      "Siya Patel",
      "STU1295",
      "4-C",
      "Delhi Public School",
      "Bus 09 / Route 3",
      "ST1295",
      "Active",
    ],
    [
      "Arjun Nair",
      "STU1301",
      "6-B",
      "St. Mary's School",
      "Bus 14 / Route 4",
      "ST1301",
      "Active",
    ],
    [
      "Diya Kapoor",
      "STU1308",
      "2-A",
      "Ryan International",
      "Bus 07 / Route 5",
      "ST1308",
      "Inactive",
    ],
    [
      "Vivan Singh",
      "STU1310",
      "7-A",
      "Ryan International",
      "Bus 14 / Route 4",
      "ST1310",
      "Active",
    ],
  ];
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  return (
    <>
      <PageTitle
        title="Students"
        description="Manage students, smart cards and school transport assignments."
        button="+ Add Student"
        onButtonClick={() => setIsAddStudentOpen(true)}
      />
      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="filter-group">
            <label>Filter by Class:</label>
            <select>
              <option>All Classes</option>
              <option>Class 1</option>
              <option>Class 6</option>
              <option>Class 10</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Filter by School:</label>
            <select>
              <option>All Schools</option>
              <option>Greenwood International</option>
              <option>Delhi Public School</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select>
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <input placeholder="Search students..." />
      </div>
      <DataTable
        headers={[
          "Student",
          "Class",
          "School",
          "Bus / Route",
          "Card ID",
          "Status",
          "Actions",
        ]}
        rows={students.map((s) => [
          <div className="student-cell">
            <div className="student-avatar">{s[0].charAt(0)}</div>
            <div>
              <strong>{s[0]}</strong>
              <span>{s[1]}</span>
            </div>
          </div>,
          s[2],
          s[3],
          s[4],
          s[5],
          <StatusBadge status={s[6]} />,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="edit"
              onClick={() => setIsAddStudentOpen(true)}
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button
              className="action-icon"
              title="Delete"
              onClick={() => setIsDeleteOpen(true)}
            >
              <i class="bi bi-trash3"></i>
            </button>
          </div>,
        ])}
        withoutFilter={false}
        footer="Showing 1–7 of 12,840 students"
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        // onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSave={(student) => {
          console.log("New Student:", student);
        }}
      />
    </>
  );
}
