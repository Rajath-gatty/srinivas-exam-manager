import { Dashboard, Users, Approval, Courses, Calender, InternalMarks, Attendance, Payment, Indent, Application, Coding, SemMarks } from "../Assets";

export const NavLinks = [
  {
    role: "super admin",
    links: [
      {
        title: "Dashboard",
        path: "/",
        icon: Dashboard,
      },
      {
        title: "Departments",
        path: "/departments",
        icon: Courses,
      },
      {
        title: "Exam Coordinator",
        path: "/examcoordinator",
        icon: Approval,
      },
    ],
  },
  {
    role: "admin",
    links: [
      {
        title: "Dashboard",
        path: "/",
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
            title: "Exam Coordinator",
            path: "/users/examcoordinator",
          },
        ],
      },
      {
        title: "Time Table",
        path: "/timetable",
        icon: Calender,
      },
      {
        title: "Staff Approval",
        path: "approve/staff",
        icon: Approval
      }
    ],
  },
  {
    role: "faculty",
    links: [
      {
        title: "Dashboard",
        path: "/",
        icon: Dashboard,
      },
      {
        title: "Attendance / Marks",
        path: "/attendance",
        icon: InternalMarks
      },
      // {
      //   title: "Internal Marks",
      //   path: "/internal",
      //   icon: InternalMarks
      // },
      // {
      //   title: "Semester Marks",
      //   path: "/semester",
      //   icon: SemMarks
      // }
    ],
  },
  {
    role: "staff",
    links: [
      {
        title: "Dashboard",
        path: "/",
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
      {
        title: "Indent",
        icon: Indent,
        subMenu: [
          {
            title: "Regular",
            path: "/indent/regular",
          },
          {
            title: "Repeater",
            path: "/indent/repeater",
          },
        ],
      },
      {
        title: "Attendance",
        icon: Indent,
        path: "/exam-attendance"
      },
      {
        title: "Payments",
        icon: Payment,
        subMenu: [
          {
            title: "Regular",
            path: "/payments/regular/approved",
          },
          {
            title: "Repeater",
            path: "/payments/repeater/approved",
          },
        ],
      },
      {
        title: "Promote",
        icon: Indent,
        path: "/promote"
      },
    ],
  },
  {
    role: "student",
    links: [
      {
        title: "Dashboard",
        path: "/",
        icon: Dashboard,
      },
      {
        title: "Attendance",
        path: "/attendance",
        icon: Attendance
      },
      {
        title: "Application",
        icon: Application,
        subMenu: [
          {
            title: "Regular",
            path: "/application/regular",
          },
          {
            title: "Repeater",
            path: "/application/repeater",
          },
        ],
      },
      {
        title: "Time Table",
        path: "/studenttimetable",
        icon: Calender,
      }
    ],
  },
  {
    role: "exam coord",
    links: [
      {
        title: "Dashboard",
        path: "/",
        icon: Dashboard,
      },
      {
        title: "Coding Sheet",
        path: "/coding",
        icon: Coding,
      },
      {
        title: "Attendance Statement",
        path: "/attendance-statement",
        icon: Coding,
      },
      {
        title: "Evaluators",
        path: "/evaluators",
        icon: Users,
      },
      {
        title: "Time Table",
        path: "/examcordtimetable",
        icon: Calender,
      },
    ],
  },
];
