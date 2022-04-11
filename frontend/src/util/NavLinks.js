import { Dashboard, Register, Courses } from "../Assets";

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
        title: "Create",
        path: "/create",
        icon: Courses,
      },
      {
        title: "Register",
        path: "/register",
        icon: Register,
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
