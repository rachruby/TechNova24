import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react';

const YourApp = withAuthInfo((props) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();

  if (props.isLoggedIn) {
    return (
      <div>
        <p>You are logged in as {props.user.email}</p>
        <button onClick={() => redirectToAccountPage()}>Account</button>
        <button onClick={() => logoutFunction(true)}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => redirectToLoginPage()}>Login</button>
        <button onClick={() => redirectToSignupPage()}>Signup</button>
      </div>
    );
  }
});

export default YourApp;
