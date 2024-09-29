import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const YourApp = withAuthInfo((props) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage } = useRedirectFunctions();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLoggedIn) {
      // Redirect to the closet page immediately when the user is logged in
      navigate('/closet');
    }
  }, [props.isLoggedIn, navigate]); // Runs whenever props.isLoggedIn changes

  return (
    <div className="user-info-container"> {/* Wrapper div for layout */}
      {props.isLoggedIn ? (
        navigate('/closet')
      ) : (
        redirectToLoginPage()
      )}
    </div>
  );
});

export default YourApp;
