import React, { useState } from "react";

interface IInitialState {
  name: string;
  email: string;
  password: string;
}

const initialState: IInitialState = {
  name: "",
  email: "",
  password: "",
};

export const Form = () => {
  const [formData, setFormData] = useState(initialState);

  const formDataProxy = new Proxy(formData, {
    set(target, prop, value) {
      console.log(4);
      switch (prop) {
        case "name":
          if (!value.trim()) {
            console.error("Name is required");
            return true;
          }
          break;
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            console.error("Invalid email format");
            return true;
          }
          break;
        case "password":
          if (value.length < 8) {
            console.error("Password must be at least 8 characters long");
            return true;
          }
          break;
        default:
          break;
      }
      return Reflect.set(target, prop, value);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formDataProxy);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={formDataProxy.name}
          onChange={(e) => {
            formDataProxy.name = e.target.value;
            setFormData({ ...formData, name: e.target.value });
          }}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={formDataProxy.email}
          onChange={(e) => {
            formDataProxy.email = e.target.value;
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={formDataProxy.password}
          onChange={(e) => {
            formDataProxy.password = e.target.value;
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
