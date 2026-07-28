import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import RecipeForm from "../components/submit/RecipeForm.jsx";
import { getSupabaseClient, signInWithGoogle } from "../utils/supabase.js";

export default function SubmitPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState("");
  const [hasRequestedLogin, setHasRequestedLogin] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
        }
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (isMounted) {
        setIsAuthenticated(Boolean(session));
        setIsCheckingAuth(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isCheckingAuth || isAuthenticated || hasRequestedLogin) {
      return;
    }

    setHasRequestedLogin(true);
    signInWithGoogle().catch((error) => {
      console.error(error);
      setAuthError("Unable to start Google sign-in right now. Please try again.");
    });
  }, [hasRequestedLogin, isAuthenticated, isCheckingAuth]);

  if (isCheckingAuth) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <h1 className="text-center mb-2">Sign in to Submit</h1>
        <p className="text-center text-muted mb-4">
          Recipe submissions require an authenticated account.
        </p>
        <p className="text-center text-muted">
          You will be redirected to Google to continue.
        </p>
        {authError && <p className="text-center text-danger mt-4">{authError}</p>}
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-2">Submit Your Recipe</h1>
      <p className="text-center text-muted mb-5">
        Share your favorite morsel or mix with the community.
      </p>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <RecipeForm />
        </Col>
      </Row>
    </Container>
  );
}
