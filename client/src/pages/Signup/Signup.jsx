import React from "react";
import FormCard from "../../components/FormCard/FormCard";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Inputs/Button";
import Logo from "../../components/Logo/Logo";
import { useState } from "react";

import { useMutation } from "react-query";
import { signup } from "../../api";
import { useNavigate } from "react-router-dom";

const footerLinks = [
    {
        label: "Already have an account? Log in",
        link: "/login",
    },
];

function Signup(props) {
    const goto = useNavigate();
    // TODO: Show error + validations
    const { isError, error, mutate: doSignup } = useMutation(signup, {
        onSuccess: () => {
            // TODO: auto login on signup
            goto("/login");
        },
    });
    const [same, setSame] = useState(true);

    return (
        <div className="signup-screen blue-screen">
            <Logo />
            <FormCard
                heading="Signup to create account"
                footerLinks={footerLinks}
                onSubmit={event => {
                    event.preventDefault();
                    if(event.target.password != event.target.confirmPassword){

                        setSame(false)
                        // return;
                    }
                    doSignup(Object.fromEntries(new FormData(event.target)));
                }}
                isError={!same ? true : false}
            >
                <Input name="email" type="email" placeholder="Your email" />
                <Input name="username" placeholder="Your username" />
                <Input name="password" type="password" placeholder="Your password" />
                <Input name="confirmPassword" type="text" placeholder="Confirm password" />
                <Input name="phone" placeholder="Your phone" />
                <Button label="Sign up" type="submit" />
            </FormCard>
        </div>
    );
}

export default Signup;
