import { apiCall } from "./client.js";
import { formatDate } from "../utils/formatDate.js";

function toUiCard(card = {}) {
  return {
    id: card.id,
    cardNumber: card.card_number || "",
    studentId: card.student_id,
    isActive: Boolean(card.is_active),
    createdAt: formatDate(card.created_at),
    createdAtIso: card.created_at,
  };
}

function toApiCard(card = {}) {
  return {
    card_number: card.cardNumber,
  };
}

export const getRfidCards = async () => {
  const data = await apiCall("/rfid-cards");
  return Array.isArray(data) ? data.map(toUiCard) : [];
};

export const createRfidCard = (data) =>
  apiCall("/rfid-cards", {
    method: "POST",
    body: toApiCard(data),
  });

export const mapCardToStudent = (cardId, studentId) =>
  apiCall(`/rfid-cards/${cardId}/map-to-student`, {
    method: "POST",
    body: { student_id: studentId },
  });

export const unmapCard = (cardId) =>
  apiCall(`/rfid-cards/${cardId}/unmap`, {
    method: "POST",
  });

