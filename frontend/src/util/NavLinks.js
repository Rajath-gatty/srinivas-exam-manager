import {Dashboard,Register,Courses} from"../Assets";

export const NavLinks = [
    {
        role: "admin",
        links: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: Dashboard
            },
            {
                title: "create",
                path: "/create",
                icon: Courses
            },
            {
                title: "register",
                path: "/register",
                icon: Register
            }
        ]
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
                title: "register",
                path: "/register",
                icon: Register
            }
        ]
    }
]