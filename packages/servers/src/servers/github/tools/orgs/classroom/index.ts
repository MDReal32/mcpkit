import { orgsClassroomGetAClassroom } from './get-a-classroom';
import { orgsClassroomGetAnAssignment } from './get-an-assignment';
import { orgsClassroomGetAssignmentGrades } from './get-assignment-grades';
import { orgsClassroomListAcceptedAssignmentsForAnAssignment } from './list-accepted-assignments-for-an-assignment';
import { orgsClassroomListAssignmentsForAClassroom } from './list-assignments-for-a-classroom';
import { orgsClassroomListClassrooms } from './list-classrooms';

export const orgsClassroomTools = [
  orgsClassroomGetAClassroom,
  orgsClassroomGetAnAssignment,
  orgsClassroomGetAssignmentGrades,
  orgsClassroomListAcceptedAssignmentsForAnAssignment,
  orgsClassroomListAssignmentsForAClassroom,
  orgsClassroomListClassrooms,
];
