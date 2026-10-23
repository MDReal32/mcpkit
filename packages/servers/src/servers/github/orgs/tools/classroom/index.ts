import { classroomGetAClassroom } from './get-a-classroom';
import { classroomGetAnAssignment } from './get-an-assignment';
import { classroomGetAssignmentGrades } from './get-assignment-grades';
import { classroomListAcceptedAssignmentsForAnAssignment } from './list-accepted-assignments-for-an-assignment';
import { classroomListAssignmentsForAClassroom } from './list-assignments-for-a-classroom';
import { classroomListClassrooms } from './list-classrooms';

export const classroomTools = [
  classroomGetAClassroom,
  classroomGetAnAssignment,
  classroomGetAssignmentGrades,
  classroomListAcceptedAssignmentsForAnAssignment,
  classroomListAssignmentsForAClassroom,
  classroomListClassrooms,
];
