import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import RfidCardModal from "../popups/RfidCardModal.jsx";
import CardMapModal from "../popups/CardMapModal.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AccessRestricted from "../../../components/AccessRestricted.jsx";
import { isPermissionDenied } from "../../../utils/errors.js";
import {
  getRfidCards,
  createRfidCard,
  mapCardToStudent,
  unmapCard,
} from "../../../api/rfidCards.js";

export default function RfidCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardToMap, setCardToMap] = useState(null);
  const [cardToUnmap, setCardToUnmap] = useState(null);

  // GET /rfid-cards
  const loadCards = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getRfidCards();
      setCards(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleSaveCard = async (card) => {
    await createRfidCard(card);
    await loadCards();
  };

  const handleMapCard = async (studentId) => {
    await mapCardToStudent(cardToMap.id, studentId);
    await loadCards();
    setCardToMap(null);
  };

  const handleUnmapCard = async () => {
    await unmapCard(cardToUnmap.id);
    await loadCards();
    setCardToUnmap(null);
  };

  const isFilterActive =
    query.trim() !== "" ||
    assignmentFilter !== "All" ||
    statusFilter !== "All";

  const handleClear = () => {
    setQuery("");
    setAssignmentFilter("All");
    setStatusFilter("All");
  };

  const filteredCards = useMemo(() => {
    const search = query.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesSearch =
        search === "" ||
        card.cardNumber.toLowerCase().includes(search) ||
        (card.admissionNumber || "").toLowerCase().includes(search);

      const matchesAssignment =
        assignmentFilter === "All" ||
        (assignmentFilter === "Assigned"
          ? Boolean(card.studentId)
          : !card.studentId);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" ? card.isActive : !card.isActive);

      return matchesSearch && matchesAssignment && matchesStatus;
    });
  }, [cards, query, assignmentFilter, statusFilter]);

  const renderTable = () => {
    if (loading) {
      return (
        <div className="branch-empty-card">
          <p>Loading RFID cards...</p>
        </div>
      );
    }

    if (cards.length === 0) {
      return (
        <div className="branch-empty-card">
          <i className="bi bi-credit-card-2-front"></i>
          <h3>No RFID cards yet</h3>
          <p>
            Register a card to add it to the platform inventory. Cards are
            assigned to students later.
          </p>
          <button
            className="branch-empty-action"
            onClick={() => setIsModalOpen(true)}
          >
            + Register the first card
          </button>
        </div>
      );
    }

    return (
      <DataTable
        className="rfid-table-card"
        headers={[
          { label: "Card Number", sortKey: "cardNumber" },
          { label: "Student", sortKey: "studentName" },
          { label: "Status", sortKey: "isActive" },
          { label: "Created", sortKey: "createdAtIso" },
          "Actions",
        ]}
        rows={filteredCards.map((card) => [
          <code key={`${card.id}-number`} className="device-serial-cell">
            {card.cardNumber}
          </code>,
          card.studentId ? (
            <div key={`${card.id}-student`}>
              <div>{card.studentName}</div>
              <div className="text-muted">{card.admissionNumber}</div>
            </div>
          ) : (
            <span key={`${card.id}-student`} className="device-unassigned">
              Not assigned
            </span>
          ),
          <StatusBadge
            key={`${card.id}-status`}
            status={card.isActive ? "Active" : "Inactive"}
          />,
          card.createdAt || "-",
          card.studentId ? (
            <button
              key={`${card.id}-action`}
              type="button"
              className="table-action table-action-danger"
              onClick={() => setCardToUnmap(card)}
            >
              Unmap
            </button>
          ) : (
            <button
              key={`${card.id}-action`}
              type="button"
              className="table-action"
              onClick={() => setCardToMap(card)}
            >
              Map to Student
            </button>
          ),
        ])}
        sortValues={filteredCards.map((card) => [
          card.cardNumber,
          card.studentName,
          card.isActive,
          card.createdAtIso,
          null,
        ])}
        withoutFilter={false}
        footer={`Showing ${filteredCards.length} of ${cards.length} cards`}
      />
    );
  };

  if (isPermissionDenied(error)) {
    return (
      <>
        <PageTitle
          title="RFID Cards"
          description="Register RFID cards in the platform inventory."
        />
        <AccessRestricted resource="RFID cards" onRetry={loadCards} />
      </>
    );
  }

  return (
    <>
      <PageTitle
        title="RFID Cards"
        description="Register RFID cards in the platform inventory."
        button="+ Register Card"
        onButtonClick={() => setIsModalOpen(true)}
      />

      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div className="filter-group">
            <label>Assignment:</label>
            <select
              value={assignmentFilter}
              onChange={(event) => setAssignmentFilter(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Assigned">Assigned</option>
              <option value="Unassigned">Unassigned</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {isFilterActive && (
            <button
              type="button"
              className="secondary-button"
              style={{ height: "2.3rem" }}
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>

        <input
          type="search"
          placeholder="Search by card number..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {error && <p className="branch-error">{error.message}</p>}

      {renderTable()}

      <RfidCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (card) => {
          await handleSaveCard(card);
          setIsModalOpen(false);
        }}
      />

      <CardMapModal
        key={cardToMap?.id || "none"}
        isOpen={Boolean(cardToMap)}
        card={cardToMap}
        onClose={() => setCardToMap(null)}
        onMap={handleMapCard}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(cardToUnmap)}
        onClose={() => setCardToUnmap(null)}
        onConfirm={handleUnmapCard}
        title="Unmap card?"
        message={`Are you sure you want to unmap ${cardToUnmap?.cardNumber}? It will be disconnected from its student.`}
        confirmLabel="Unmap"
      />
    </>
  );
}
