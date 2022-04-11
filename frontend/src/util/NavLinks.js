import { Dashboard, Register, Courses, Users, Calender } from "../Assets";

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
        path: "/users",
        icon: Users,
        subMenu: [{
            title:  "Student",
            path: "/users/student"
          },
          {
            title:  "Faculty",
            path: "/users/faculty"
          },
          {
            title:  "Staff",
            path: "/users/staff"
          },
          {
            title:  "Evaluator",
            path: "/users/evaluator"
          }]
      },
      {
        title: "Time Table",
        path: "/timetable",
        icon: Calender,
      },
    ],
  },
  {
    role: "student",
    links: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: Dashboard,
      },
      {
        title: "Register",
        path: "/register",
        icon: Register,
      },
    ],
  },
];
