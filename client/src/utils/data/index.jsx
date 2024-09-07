import React from "react";

export const menu = [
    {
        id: 1,
        title: "main",
        listItems: [
            {
                id: 1,
                title: "Trang chủ",
                url: "/admin",
                icon: "/home.svg",
            },
        ],
    },
    {
        id: 2,
        title: "danh sách",
        listItems: [
            {
                id: 1,
                title: "Danh sách tài khoản",
                url: "/admin/user/danh-sach",
                icon: "/user.svg",
            },
            {
                id: 2,
                title: "Danh sách đề thi",
                url: "/admin/exam/danh-sach",
                icon: "/product.svg",
            },
            {
                id: 3,
                title: "Danh sách câu hỏi",
                url: "/admin/question/danh-sach",
                icon: "/order.svg",
            },
        ],
    },
    // {
    //     id: 4,
    //     title: "Maintenance",
    //     listItems: [
    //         {
    //             id: 1,
    //             title: "Settings",
    //             url: "/",
    //             icon: "/setting.svg",
    //         },
    //         {
    //             id: 2,
    //             title: "Backups",
    //             url: "/",
    //             icon: "/backup.svg",
    //         },
    //     ],
    // },
    // {
    //     id: 5,
    //     title: "analytics",
    //     listItems: [
    //         {
    //             id: 1,
    //             title: "Charts",
    //             url: "/",
    //             icon: "/chart.svg",
    //         },
    //         {
    //             id: 2,
    //             title: "Logs",
    //             url: "/",
    //             icon: "/log.svg",
    //         },
    //     ],
    // },
];
export const classData = [
    {
        id: 1,
        name: "Lớp 1",
    },
    {
        id: 2,
        name: "Lớp 2",
    },
    {
        id: 3,
        name: "Lớp 3",
    },
    {
        id: 4,
        name: "Lớp 4",
    },
    {
        id: 5,
        name: "Lớp 5",
    },
    {
        id: 6,
        name: "Lớp 6",
    },
    {
        id: 7,
        name: "Lớp 7",
    },
    {
        id: 8,
        name: "Lớp 8",
    },
    {
        id: 9,
        name: "Lớp 9",
    },
    {
        id: 10,
        name: "Lớp 10",
    },
    {
        id: 11,
        name: "Lớp 11",
    },
    {
        id: 12,
        name: "Lớp 12",
    },
]
export const subjectData = [
    {
        id: 1,
        name: "Toán",
    },
    {
        id: 2,
        name: "Lý",
    },
    {
        id: 3,
        name: "Hóa",
    },
    {
        id: 4,
        name: "Sinh",
    },
    {
        id: 5,
        name: "Văn",
    },
    {
        id: 6,
        name: "Anh",
    },
    {
        id: 7,
        name: "Sử",
    },
    {
        id: 8,
        name: "Địa",
    },
    {
        id: 9,
        name: "GDCD",
    },
]
export const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Tổng số user",
    link: "/admin/user/danh-sach",
    number: "11.238",
    dataKey: "users",
    percentage: 45,
    chartData: [
        {name: "Sun", users: 400},
        {name: "Mon", users: 600},
        {name: "Tue", users: 500},
        {name: "Wed", users: 700},
        {name: "Thu", users: 400},
        {name: "Fri", users: 500},
        {name: "Sat", users: 450},
    ],
};

export const chartBoxExam = {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Tổng số đề thi",
    link: "/admin/exam/danh-sach",
    number: "238",
    dataKey: "products",
    percentage: 21,
    chartData: [
        {name: "Sun", products: 400},
        {name: "Mon", products: 600},
        {name: "Tue", products: 500},
        {name: "Wed", products: 700},
        {name: "Thu", products: 400},
        {name: "Fri", products: 500},
        {name: "Sat", products: 450},
    ],
};
export const chartBoxRevenue = {
    color: "teal",
    icon: "/revenueIcon.svg",
    title: "Tổng số câu hỏi",
    number: "$56.432",
    dataKey: "revenue",
    percentage: -12,
    chartData: [
        {name: "Sun", revenue: 400},
        {name: "Mon", revenue: 600},
        {name: "Tue", revenue: 500},
        {name: "Wed", revenue: 700},
        {name: "Thu", revenue: 400},
        {name: "Fri", revenue: 500},
        {name: "Sat", revenue: 450},
    ],
};
export const chartBoxConversion = {
    color: "gold",
    icon: "/conversionIcon.svg",
    title: "Total Ratio",
    number: "2.6",
    dataKey: "ratio",
    percentage: 12,
    chartData: [
        {name: "Sun", ratio: 400},
        {name: "Mon", ratio: 600},
        {name: "Tue", ratio: 500},
        {name: "Wed", ratio: 700},
        {name: "Thu", ratio: 400},
        {name: "Fri", ratio: 500},
        {name: "Sat", ratio: 450},
    ],
};

export const barChartBoxRevenue = {
    title: "Profit Earned",
    color: "#8884d8",
    dataKey: "profit",
    chartData: [
        {
            name: "Sun",
            profit: 4000,
        },
        {
            name: "Mon",
            profit: 3000,
        },
        {
            name: "Tue",
            profit: 2000,
        },
        {
            name: "Wed",
            profit: 2780,
        },
        {
            name: "Thu",
            profit: 1890,
        },
        {
            name: "Fri",
            profit: 2390,
        },
        {
            name: "Sat",
            profit: 3490,
        },
    ],
};

export const barChartBoxVisit = {
    title: "Total Visit",
    color: "#FF8042",
    dataKey: "visit",
    chartData: [
        {
            name: "Sun",
            visit: 4000,
        },
        {
            name: "Mon",
            visit: 3000,
        },
        {
            name: "Tue",
            visit: 2000,
        },
        {
            name: "Wed",
            visit: 2780,
        },
        {
            name: "Thu",
            visit: 1890,
        },
        {
            name: "Fri",
            visit: 2390,
        },
        {
            name: "Sat",
            visit: 3490,
        },
    ],
};
export const iconArrow = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="#003E9C" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="#003E9C" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
</svg>