import React from "react";

import Page from "../../../components/Page/Page";
import { FaPlus } from "react-icons/fa";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import ProfileInfo from "../../../components/ProfileInfo/ProfileInfo";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
);

function Profile(props) {
    const sidebarOptions = [
        {
            label: "Submit Question",
            highlighted: true,
            icon: <FaPlus />,
            link: "",
        },
        {
            label: "Your Questions",
            link: "",
        },
    ];

    const subjectData = {
        labels: [
            "Maths",
            "English",
            "Hindi",
            "Science",
            "Subject3",
            "Subject4",
        ],
        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Page sidebarOptions={sidebarOptions} heading={"User Profile"}>
            <ProfileInfo />
            <div className={"profile-stats"}>
                <div className={"question-submitted"}>
                    <h3>Total Questions Reviewed: 82</h3>
                    <Pie data={subjectData} />
                </div>
                <div className={"question-submitted"}>
                    <h3>Total Questions Freezed: 12</h3>
                    <Pie data={subjectData} />
                </div>
            </div>
            <div className={"question-submitted"}>
                <h3>Total Questions Freezed: 12</h3>
                <Pie data={subjectData} />
            </div>
        </Page>
    );
}

export default Profile;
