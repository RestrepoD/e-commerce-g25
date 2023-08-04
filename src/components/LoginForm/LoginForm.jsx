import { useId, useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const emailId = useId();
  const passwordId = useId();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    onLogin(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="login_form">
      <div className="login_input_conts">
        <label htmlFor={emailId}>Email</label>
        <div className="login_input_box">
          <input
            className="login_form_inputs"
            type="email"
            id={emailId}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="login_input_conts">
        <label htmlFor={passwordId}>Password</label>
        <div className="login_input_box">
          <input
            className="login_form_inputs"
            type={visiblePassword ? "text" : "password"}
            id={passwordId}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setVisiblePassword(!visiblePassword)}
          >
            <i className="bx bx-low-vision"></i>
          </button>
        </div>
      </div>
      <button type="submit" className="login_btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
