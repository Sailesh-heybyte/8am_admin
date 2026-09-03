import { useState } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../../adminLogin/popups/DeleteConfirmationModal.jsx";
import AddStudentModal from "../../adminLogin/popups/AddStudentModal.jsx";

export default function Students() {
  const [students, setStudents] = useState([
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
  ]);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSchool, setSelectedSchool] = useState("All Schools");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter((student) => {
    const [name, studentId, studentClass, school, busRoute, cardId, status] =
      student;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      name.toLowerCase().includes(search) ||
      studentId.toLowerCase().includes(search) ||
      studentClass.toLowerCase().includes(search) ||
      school.toLowerCase().includes(search) ||
      busRoute.toLowerCase().includes(search) ||
      cardId.toLowerCase().includes(search) ||
      status.toLowerCase().includes(search);

    const matchesClass =
      selectedClass === "All Classes" || studentClass === selectedClass;

    const matchesSchool =
      selectedSchool === "All Schools" || school === selectedSchool;

    const matchesStatus =
      selectedStatus === "All Status" || status === selectedStatus;

    return matchesSearch && matchesClass && matchesSchool && matchesStatus;
  });

  const handleEdit = (student) => {
    console.log("Edit Student:", student);

    setSelectedStudent(student);
    setIsAddStudentOpen(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    if (!selectedStudent) return;

    setStudents((prevStudents) =>
      prevStudents.filter((student) => student !== selectedStudent),
    );

    setIsDeleteOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveStudent = (student) => {
    console.log("Student Data:", student);

    // Add your API call here

    setIsAddStudentOpen(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <PageTitle
        title="Students"
        description="Manage students, smart cards and school transport assignments."
        button="+ Add Student"
        onButtonClick={() => {
          setSelectedStudent(null);
          setIsAddStudentOpen(true);
        }}
      />

      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Class Filter */}
          <div className="filter-group">
            <label>Filter by Class:</label>

            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
            >
              <option>All Classes</option>

              <option value="2-A">2-A</option>
              <option value="3-B">3-B</option>
              <option value="4-C">4-C</option>
              <option value="5-A">5-A</option>
              <option value="6-A">6-A</option>
              <option value="6-B">6-B</option>
              <option value="7-A">7-A</option>
            </select>
          </div>

          {/* School Filter */}
          <div className="filter-group">
            <label>Filter by School:</label>

            <select
              value={selectedSchool}
              onChange={(event) => setSelectedSchool(event.target.value)}
            >
              <option>All Schools</option>

              <option>Greenwood International</option>
              <option>Delhi Public School</option>
              <option>St. Mary's School</option>
              <option>Ryan International</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <label>Filter by Status:</label>

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
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
        rows={filteredStudents.map((student) => [
          <div className="student-cell" key={student[1]}>
            <div className="student-avatar">{student[0].charAt(0)}</div>

            <div>
              <strong>{student[0]}</strong>
              <span>{student[1]}</span>
            </div>
          </div>,

          student[2],

          student[3],

          student[4],

          student[5],

          <StatusBadge status={student[6]} />,

          <div className="action-buttons">
            <button
              className="action-icon"
              title="Edit"
              onClick={() => handleEdit(student)}
            >
              <i className="bi bi-pencil"></i>
            </button>

            <button
              className="action-icon"
              title="Delete"
              onClick={() => handleDeleteClick(student)}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>,
        ])}
        withoutFilter={false}
        footer={`Showing ${filteredStudents.length} of ${students.length} students`}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this student? This action cannot be undone."
      />

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => {
          setIsAddStudentOpen(false);
          setSelectedStudent(null);
        }}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />
    </>
  );
}
