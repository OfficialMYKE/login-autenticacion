import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      setMessage(data.message);
      setToken(data.verificationToken);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <section className="card">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>
      {token && <textarea readOnly value={token} placeholder="Token de verificación"></textarea>}
    </section>
  );
}

export default Register;