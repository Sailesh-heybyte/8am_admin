import { apiCall } from "./client.js";

function toUiBus(bus) {
  return {
    id: bus.bus_id,
    schoolId: bus.school_id,
    branchId: bus.branch_id,
    branchName: bus.branch_name,
    name: bus.bus_name,
    registrationNumber: bus.registration_number,
  };
}

export const getBusesBySchool = async (schoolId) => {
  const data = await apiCall(`/fleet/schools/${schoolId}/buses`);
  return data.map(toUiBus);
};
