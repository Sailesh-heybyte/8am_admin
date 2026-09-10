import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import RfidCardModal from "../popups/RfidCardModal.jsx";
import AccessRestricted, {
  isPermissionDenied,
} from "../../../components/AccessRestricted.jsx";
import { getRfidCards, createRfidCard } from "../../../api/rfidCards.js";

export default function RfidCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GET /rfid-cards
  const loadCards = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getRfidCards();
      setCards(data);
    } catch (err) {
      setError(err.message || "Failed to load RFID cards.");
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

  const filteredCards = useMemo(
    () =>
      cards.filter((card) =>
        (card.cardNumber || "").toLowerCase().includes(query.toLowerCase()),
      ),
    [cards, query],
  );

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
        headers={["Card Number", "Status", "Created"]}
        rows={filteredCards.map((card) => [
          <code key={`${card.id}-number`} className="device-serial-cell">
            {card.cardNumber}
          </code>,
          <StatusBadge
            key={`${card.id}-status`}
            status={card.isActive ? "Active" : "Inactive"}
          />,
          card.createdAt || "-",
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
        <input
          type="search"
          placeholder="Search by card number..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {error && <p className="branch-error">{error}</p>}

      {renderTable()}

      <RfidCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (card) => {
          await handleSaveCard(card);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
