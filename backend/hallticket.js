module.exports = ({regno,first_name,last_name,dept_name,course_name,semester,image_path,timetable}) => {
    const rows = timetable.map((item,i) => {
        return `
        <tr>
            <td>${i+1}</td>
            <td>${item.subj_code}</td>
            <td class="width">${item.subj_name}</td>
            <td>${item.exam_date}</td>
            <td>${item.exam_time}</td>
        </tr>
        `;
    })
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .hallticket-main {
            max-width: 800px;
            margin: auto;
            padding: 1em;
            border: 1px solid #333;
        }

        .hallticket-main .main-hdng img {
            width: 50px;
            margin: auto;
        }

        .hallticket-main .main-hdng {
            text-align: center;
            margin-bottom: 2em;
        }

        .hallticket-main .main-hdng span {
            font-weight: bold;
            font-size: 1.3em;
        }

        .hallticket-main .hallticket-meta {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            border: 1px solid #333;
        }

        .hallticket-main .hallticket-meta th,td {
            border: 1px solid #333;
            padding: 0.25em;
        }

        .hallticket-main .info {
            margin: 2em 0em;
            font-size: 1.1em;
        }

        .hallticket-main .timetable {
            width: 530px;
            border-collapse: collapse;
            /* display: inline; */
        }

        .hallticket-main .timetable th,
        .hallticket-main .timetable td {
            padding: 0.5em;
        }

        .hallticket-main .timetable th {
            border: 1px solid #333;
        }

        .avatar {
            position: absolute;
            top: 320px;
            right: 10px;
            margin: 0 1em;
        }

        .avatar img{
            width: 120px;
        }

        .width {
            width: 150px;
            text-align: center;
        }

        .sig {
            float: right;
        }

        .mr-1 { margin-right: 0.5em;}
        .ml-1 { margin-left: 0.5em;}
        .mb-1 {margin-bottom: 1em;}
        .mt-1 {margin-top: 1em;}

    </style>
</head>
<body>
    <div class="hallticket-main">
        <div class="main-hdng">
            <span class="mr-1">SRINIVAS</span>
            <img src="https://upload.wikimedia.org/wikipedia/en/e/e1/Srinivas_University_logo.gif" alt="logo">
            <span class="ml-1">UNIVERSITY</span>
        </div>
        <table class="hallticket-meta">
            <thead>
                <tr>
                    <th>USN</th>
                    <th>College Code</th>
                    <th>Name of Examination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${regno}</td>
                    <td>CCIS</td>
                    <td><p>${course_name}-Semester ${semester}</p><p>Examination 2022-2023</p></td>
                </tr>
            </tbody>
        </table>
        <div class="info">
            <p class="mb-1"><span style="font-weight: bold;">Candidate Name</span> &nbsp;: &nbsp;${first_name+' '+last_name}</p>
            <p><span style="font-weight: bold;">Examination Center</span> &nbsp;: &nbsp;${dept_name}</p>
        </div>
        <table class="timetable">
            <thead>
                <tr>
                    <th>sl#</th>
                    <th>Subject code</th>
                    <th class="width">Subject Name</th>
                    <th>Exam Date</th>
                    <th>Exam Time</th>
                </tr>
            </thead>
            <tbody>
            ${rows}
            </tbody>
        </table>
        <div class="avatar">
            <img src="${'http://localhost:8080'+image_path}" alt="avatar">
            <p style="text-align:center;font-weight:bold; margin-top: 2em;">Candidate's <br> Signature</p>
        </div>
        <p style="font-weight:bold; font-size: 1.1em; margin-top: 3em;margin-bottom:10em;">The candidate is permitted to appear for the examination</p>
        <span style="font-weight:bold; margin-top: 2em;">Sd/-<br>Dean</span>
        <span style="font-weight: bold;float:right;margin-top: -1em;">Sd/- <br> Registrar(E)</span>
    </div>
</body>
</html>
    `
}