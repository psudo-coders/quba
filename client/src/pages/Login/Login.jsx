import React from "react";
import FormCard from "../../components/FormCard/FormCard";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Inputs/Button";
import Logo from "../../components/Logo/Logo";

const footerLinks = [
    {
        label: "Already have an account? Log in",
        link: "",
    },
];

function Login(props) {
    return (
        <div className={"login-screen blue-screen"}>
            <Logo />
            <FormCard
                heading={"Login to your account"}
                footerLinks={footerLinks}
            >
                <Input placeholder={"Your email"} />
                <Input placeholder={"Your password"} />
                <Button label={"Continue"} />
            </FormCard>
        </div>
    );
}

export default Login;
