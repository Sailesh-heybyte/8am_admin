import { useState } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import StatCard from "../../../components/StatCard.jsx";

import AddSchoolGroupModal from "../popups/AddSchoolGroupModal.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";

export default function SchoolGroups() {
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [schoolGroups, setSchoolGroups] = useState([
    ["Greenfield Education Group", "12", "6,280", "Active"],
    ["Delhi Public School Society", "15", "8,450", "Active"],
    ["Ryan International Group", "20", "10,320", "Active"],
    ["Narayana Education Group", "18", "9,540", "Active"],
    ["Vijaya Group of Schools", "10", "4,130", "Active"],
    ["Greenfield Education Group", "12", "6,280", "Active"],
    ["Delhi Public School Society", "15", "8,450", "Active"],
    ["Ryan International Group", "20", "10,320", "Active"],
    ["Narayana Education Group", "18", "9,540", "Active"],
    ["Vijaya Group of Schools", "10", "4,130", "Active"],
  ]);

  const handleAddGroup = (groupData) => {
    const newGroup = [groupData.groupName, "0", "0", groupData.status];

    setSchoolGroups((prev) => [...prev, newGroup]);

    console.log("New school group:", groupData);
  };

  return (
    <>
      <PageTitle
        title="School Groups"
        description="Manage school chains and education groups."
        button="+ Add Group"
        onButtonClick={() => setIsAddGroupOpen(true)}
      />

      <div className="stats-grid four">
        <StatCard
          title="Total Groups"
          value="25"
          icon={<i class="bi bi-buildings"></i>}
          type="blue"
        />
        <StatCard title="Schools Managed" value="75" icon="🏫" type="green" />
        <StatCard
          title="Students"
          value="38,720"
          icon={<i class="bi bi-people"></i>}
          type="purple"
        />
        <StatCard
          title="Active Groups"
          value="23"
          icon={<i class="bi bi-activity"></i>}
          type="red"
        />
      </div>

      <DataTable
        headers={["Group Name", "Schools", "Students", "Status", "Actions"]}
        rows={schoolGroups.map((g) => [
          <strong key={g[0]}>{g[0]}</strong>,
          g[1],
          g[2],
          <StatusBadge status={g[3]} />,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="edit"
              onClick={() => setIsAddGroupOpen(true)}
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
        footer={`Showing 1–${schoolGroups.length} of ${schoolGroups.length} groups`}
      />

      <AddSchoolGroupModal
        isOpen={isAddGroupOpen}
        onClose={() => setIsAddGroupOpen(false)}
        onSave={handleAddGroup}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        // onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
}
