import React from "react";
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard/FormCard";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Inputs/Button";
import Logo from "../../components/Logo/Logo";
import { login } from "../../api";

const footerLinks = [
    /*
    {
        label: "Can’t login?",
        link: "",
    },
    */
    {
        label: "Sign up for a new user?",
        link: "/signup",
    },
];

function Login(props) {
    const goto = useNavigate();
    // TODO: Show error + validations
    const { isError, error, mutate: doLogin } = useMutation(login, {
        onSuccess: () => {
            goto("/");
        },
    });

    return (
        <div className={"login-screen blue-screen"}>
            <Logo />
            <FormCard
                heading={"Login to your account"}
                footerLinks={footerLinks}
                onSubmit={event => {
                    event.preventDefault();
                    doLogin(Object.fromEntries(new FormData(event.target).entries()));
                }}
            >
                <Input name="email" type="email" placeholder="Your email" />
                <Input name="password" type="password" placeholder="Your password" />
                <Button label="Continue" type="submit" />
            </FormCard>
        </div>
    );
}

export default Login;
