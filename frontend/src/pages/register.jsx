import { useState } from "react";
import './Register.css'
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const Upload = async (data) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        await fetch("http://localhost:8000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        reset();
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="reg-card">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(Upload)}>
        <input
          type="text"
          placeholder="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <br />

        <input
          type="email"
          placeholder="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />

        <input
          type="number"
          placeholder="number"
          {...register("number", { required: "Number is required" })}
        />
        {errors.number && <p>{errors.number.message}</p>}
        <br />

        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />

        {loading ? (
          <h4>registered</h4>
        ) : (
          <button type="submit">SUBMIT</button>
        )}
      </form>
    </div>
  );
}

export default Register;
