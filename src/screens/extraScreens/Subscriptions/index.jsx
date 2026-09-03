import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import StatCard from "../../../components/StatCard.jsx";
import CreateSubscriptionModal from "../../adminLogin/popups/CreateSubscriptionModal.jsx";
import DeleteConfirmationModal from "../../adminLogin/popups/DeleteConfirmationModal.jsx";

export default function Subscriptions() {
  const subscriptions = [
    [
      "Greenwood International School",
      "Premium",
      "1,240",
      "10 Apr 2024",
      "09 Apr 2025",
      "₹75,000",
      "Active",
    ],
    [
      "Delhi Public School",
      "Enterprise",
      "2,180",
      "10 Apr 2024",
      "09 Apr 2025",
      "₹1,40,000",
      "Active",
    ],
    [
      "St. Mary's School",
      "Premium",
      "1,560",
      "05 May 2024",
      "04 May 2025",
      "₹95,000",
      "Active",
    ],
    [
      "Ryan International School",
      "Enterprise",
      "2,320",
      "15 Apr 2024",
      "14 Apr 2025",
      "₹1,60,000",
      "Active",
    ],
    [
      "Narayana School",
      "Basic",
      "1,110",
      "20 May 2024",
      "19 May 2025",
      "₹55,000",
      "Expiring Soon",
    ],
    [
      "Global World School",
      "Premium",
      "980",
      "12 Apr 2024",
      "11 Apr 2025",
      "₹70,000",
      "Expired",
    ],
  ];

  const [isCreateSubscriptionOpen, setIsCreateSubscriptionOpen] =
    useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <PageTitle
        title="Subscriptions"
        description="Manage plans, renewals and billing for every school."
        button="+ Create Subscription"
        onButtonClick={() => setIsCreateSubscriptionOpen(true)}
      />
      <div className="stats-grid four">
        <StatCard
          title="Monthly Revenue"
          value="₹48,75,230"
          footer="+6.2% last month"
          icon={<i className="bi bi-currency-rupee"></i>}
          type="green"
        />
        <StatCard
          title="Active Subscriptions"
          value="210"
          icon={<i className="bi bi-check-circle"></i>}
          type="blue"
        />
        <StatCard
          title="Expiring Soon"
          value="25"
          icon={<i className="bi bi-clock"></i>}
          type="purple"
        />
        <StatCard
          title="Expired"
          value="13"
          icon={<i className="bi bi-exclamation-triangle"></i>}
          type="red"
        />
      </div>
      <DataTable
        headers={[
          "School",
          "Plan",
          "Students",
          "Start Date",
          "End Date",
          "Amount",
          "Status",
          "Actions",
        ]}
        rows={subscriptions.map((s) => [
          <strong>{s[0]}</strong>,
          s[1],
          s[2],
          s[3],
          s[4],
          s[5],
          <StatusBadge status={s[6]} />,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="edit"
              onClick={() => setIsCreateSubscriptionOpen(true)}
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
            <button
              className="action-icon"
              title="Renew Subscription"
              onClick={() => console.log("Renew subscription:", s)}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>,
        ])}
        footer="Showing 1–6 of 248 subscriptions"
      />
      <CreateSubscriptionModal
        isOpen={isCreateSubscriptionOpen}
        onClose={() => setIsCreateSubscriptionOpen(false)}
        onSave={(subscription) => {
          console.log("New Subscription:", subscription);
        }}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedStudent(null);
        }}
        // onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this student? This action cannot be undone."
      />
    </>
  );
}
