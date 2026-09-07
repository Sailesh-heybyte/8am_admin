import { apiCall } from "./client.js";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

function toUiCard(card = {}) {
  return {
    id: card.id,
    cardNumber: card.card_number || "",
    studentId: card.student_id,
    isActive: Boolean(card.is_active),
    createdAt: formatDate(card.created_at),
  };
}

function toApiCard(card = {}) {
  return {
    card_number: card.cardNumber,
  };
}

// GET /api/v1/rfid-cards
// Note: RFID cards are top-level, not nested under a school.
export const getRfidCards = async () => {
  const data = await apiCall("/rfid-cards");
  return Array.isArray(data) ? data.map(toUiCard) : [];
};

// POST /api/v1/rfid-cards
// Note: RFID cards are top-level, not nested under a school.
export const createRfidCard = (data) =>
  apiCall("/rfid-cards", {
    method: "POST",
    body: toApiCard(data),
  });
