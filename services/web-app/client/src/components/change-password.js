const GenerateChangePasswordEmail = async (token) => { 
    try {
        const response = await fetch('http://127.0.0.1:3000/changePassword', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            console.log("Response is OK");
            // TODO: Implement user feedback when email is generated.
        } else {
            console.error("Error changing password")
        }
    } catch (error) {
        console.error(error);
    }
};

export default GenerateChangePasswordEmail;