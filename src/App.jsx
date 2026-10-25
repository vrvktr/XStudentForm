import React, { useState } from "react";

const initialFormData = {
  name: "",
  username: "",
  college: "",
  email: "",
  password: "",
  address: "",
};

function validateForm(values) {
  const nextErrors = {};
  const normalizedValues = {
    name: values.name ?? "",
    username: values.username ?? "",
    college: values.college ?? "",
    email: values.email ?? "",
    password: values.password ?? "",
    address: values.address ?? "",
  };

  if (!normalizedValues.name.trim()) {
    nextErrors.name = "Name is required";
  }

  if (/[A-Z]/.test(normalizedValues.username)) {
    nextErrors.username = "Username must be lowercase only";
  }

  if (!normalizedValues.college.trim()) {
    nextErrors.college = "College is required";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(normalizedValues.email.trim())) {
    nextErrors.email = "Enter a valid email address";
  }

  if (normalizedValues.password.length < 8) {
    nextErrors.password = "Password must be at least 8 characters";
  }

  if (!normalizedValues.address.trim()) {
    nextErrors.address = "Address is required";
  }

  return nextErrors;
}

const fields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "username",
    label: "Username",
    placeholder: "Enter username",
    type: "text",
    autoComplete: "username",
  },
  {
    name: "college",
    label: "College",
    placeholder: "Enter college",
    type: "text",
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    type: "text",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter address",
    type: "text",
    autoComplete: "street-address",
  },
];

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
    setIsRegistered(false);

    if (hasSubmitted) {
      setErrors(validateForm(nextFormData));
      return;
    }

    const nextFieldError = validateForm(nextFormData)[name];

    setErrors((currentErrors) => {
      if (!nextFieldError) {
        const { [name]: _removedError, ...remainingErrors } = currentErrors;
        return remainingErrors;
      }

      return {
        ...currentErrors,
        [name]: nextFieldError,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  }

  return (
    <main className="registration-page container-fluid d-flex align-items-center justify-content-center">
      <section
        className="registration-card card"
        aria-labelledby="registration-title"
      >
        <h1 id="registration-title" className="registration-title">
          Student
          <br />
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          {fields.map((field) => {
            const errorId = `${field.name}-error`;
            const hasError = Boolean(errors[field.name]);

            return (
              <div className="field-group" key={field.name}>
                <label className="form-label" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  className={`form-control${hasError ? " is-invalid-field" : ""}`}
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : undefined}
                />
                {hasError && (
                  <div className="validation-error" id={errorId} role="alert">
                    {errors[field.name]}
                  </div>
                )}
              </div>
            );
          })}

          <button
            className="btn btn-primary register-button w-100"
            type="submit"
          >
            Register
          </button>

          {isRegistered && (
            <p className="registration-success mb-0" role="status">
              Registration successful!
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
