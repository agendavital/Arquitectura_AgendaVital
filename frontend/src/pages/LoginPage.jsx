import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { ROUTES } from "../constants/routes";
import { loginWithCredentials } from "../services/authService";

export default function LoginPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? ROUTES.dashboard;

  async function handleLogin(values) {
    setStatus("loading");
    setError(null);
    setSuccess("");

    try {
      await loginWithCredentials(values);
      setStatus("authenticated");

      if (redirectTo === ROUTES.dashboard) {
        setSuccess(
          "Inicio de sesion correcto. El panel se habilitara en una etapa posterior."
        );
      } else {
        navigate(redirectTo, { replace: true });
      }
    } catch (loginError) {
      setStatus("error");
      setError(loginError.message);
    }
  }

  return (
    <div className="auth-card">
      <Link className="auth-home-link" to="/">
        ← Volver al inicio
      </Link>
      <h2>Inicio de sesion</h2>
      <p>Acceso seguro por usuario, contrasena y rol.</p>
      <LoginForm
        onSubmit={handleLogin}
        error={error}
        loading={status === "loading"}
      />
      {success ? <div className="alert alert-success">{success}</div> : null}
    </div>
  );
}
