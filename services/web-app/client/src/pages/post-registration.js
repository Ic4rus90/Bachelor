import { LoginButton } from "../components/header-not-authenticated";

const PostRegistration = () => {

    return (
        <div>
            <h2>Thank you for signing up!</h2>
            <p>Please check your email inbox for a verification link to complete your registration process.</p>
            <p>After you have verified your email, you can log in to your account.</p>
            <LoginButton />
        </div>
    );
};


export default PostRegistration;
