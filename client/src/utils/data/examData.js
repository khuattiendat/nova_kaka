export const inputDataExam = [
    {
        field: "title",
        type: "string",
        headerName: "Tên đề thi",
        required: true,
    },
    {
        field: "date",
        type: "date",
        headerName: "Ngày thi",
        required: true,
    },
    {
        field: "startTime",
        type: "time",
        headerName: "Thời gian bắt đầu",
        required: true,
    },
    {
        field: "endTime",
        type: "time",
        headerName: "Thời gian kết thúc",
        required: true,
    },
    {
        field: "numberOfQuestions",
        type: "number",
        headerName: "Số câu hỏi",
        required: true,
    },

]
export const examColumns = [
    {
        field: "_id",
        type: "string",
        headerName: "ID",
        width: 250,
    },
    {
        field: "title",
        type: "string",
        headerName: "Tên đề thi",
        width: 250,
    },
    {
        field: "members",
        type: "string",
        headerName: "Thành viên",
        width: 150,
    },
    {
        field: "startTime",
        type: "string",
        headerName: "Thời gian bắt đầu",
        width: 200,
    },
    {
        field: "endTime",
        headerName: "Thời gian kết thúc",
        type: "string",
        width: 200,
    },
    {
        field: "date",
        headerName: "Ngày thi",
        width: 200,
        type: "string",
    },
    {
        field: "numberOfQuestions",
        headerName: "Số câu hỏi",
        width: 150,
        type: "number",
    },
    {
        field: "createdBy",
        headerName: "Người tạo",
        width: 150,
        type: "string",
    }
];