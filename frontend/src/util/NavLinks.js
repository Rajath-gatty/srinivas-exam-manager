import { Dashboard, Users, Approval,Courses,Calender,InternalMarks,Attendance } from "../Assets";

export const NavLinks = [
  {
    role: "admin",
    links: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: Dashboard,
      },
      {
        title: "Courses",
        path: "/courses",
        icon: Courses,
      },
      {
        title: "Users",
        icon: Users,
        subMenu: [
          {
            title: "Student",
            path: "/users/student",
          },
          {
            title: "Faculty",
            path: "/users/faculty",
          },
          {
            title: "Staff",
            path: "/users/staff",
          },
          {
            title: "Evaluator",
            path: "/users/evaluator",
          },
        ],
      },
      {
        title: "Time Table",
        path: "/timetable",
        icon: Calender,
      },
    ],
  },
  {
    role: "faculty",
    links: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: Dashboard,
      },
      {
        title: "Attendance",
        path: "/attendance",
        icon: Attendance
      },
      {
        title: "Internal Marks",
        path: "/internal",
        icon: InternalMarks
      }
    ],
  },
  {
    role: "staff",
    links: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: Dashboard,
      },
      {
        title: "Users",
        icon: Users,
        subMenu: [
          {
            title: "Student",
            path: "/users/student",
          },
          {
            title: "Faculty",
            path: "/users/faculty",
          },
          {
            title: "Staff",
            path: "/users/staff",
          },
          {
            title: "Evaluator",
            path: "/users/evaluator",
          },
        ],
      },
      {
        title: "Approval",
        icon: Approval,
        subMenu: [
          {
            title: "Student",
            path: "/approve/student",
          },
          {
            title: "Faculty",
            path: "/approve/faculty",
          },
        ],
      },
    ],
  },
];
