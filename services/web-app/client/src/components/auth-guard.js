import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from 'react';

export const AuthGuard = ({ page }) => {
    // Creates a new component that requires the user to be authenticated to render
    const GuardedComponent = withAuthenticationRequired(page, {
        // If the user is not authenticated, the user will be redirected to the login page
        onRedirecting: () => (
            // While the user wait this page will be shown
            <div>Loading...</div>
            ),
    });
    return <GuardedComponent />;
}
export default AuthGuard;