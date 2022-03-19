import React from "react";
import FormCard from "../../components/FormCard/FormCard";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Inputs/Button";
import Logo from "../../components/Logo/Logo";

const footerLinks = [
    {
        label: "Can’t login?",
        link: "",
    },
    {
        label: "Sign up for a new user?",
        link: "",
    },
];

function Signup(props) {
    return (
        <div className={"signup-screen blue-screen"}>
            <Logo />
            <FormCard
                heading={"Signup to create account"}
                footerLinks={footerLinks}
            >
                <Input placeholder={"Your email"} />
                <Input placeholder={"Your username"} />
                <Input placeholder={"Your password"} />
                <Button label={"Sign up"} />
            </FormCard>
        </div>
    );
}

export default Signup;
