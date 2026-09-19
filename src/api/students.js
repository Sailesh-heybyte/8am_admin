import { apiCall } from "./client.js";

function toUiStudent(student) {
  return {
    id: student.student_id,
    schoolId: student.school_id,
    branchId: student.branch_id,
    branchName: student.branch_name,
    fullName: student.full_name,
    admissionNumber: student.admission_number,
  };
}

export const getStudentsBySchool = async (schoolId) => {
  const data = await apiCall(`/people/schools/${schoolId}/students`);
  return data.map(toUiStudent);
};
