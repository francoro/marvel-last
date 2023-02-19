import { Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { TextFieldCustom } from "./TodoList/AddTodo";

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
  const [errorMessageName, setErrorMessageName] = useState<undefined | string>(
    undefined
  );
  const [errorMessageEmail, setErrorMessageEmail] = useState<
    undefined | string
  >(undefined);
  const [errorMessagePassword, setErrorMessagePassword] = useState<
    undefined | string
  >(undefined);

  const formDataProxy = new Proxy(formData, {
    set(target, prop, value) {
      switch (prop) {
        case "name":
          if (!value.trim()) {
            setErrorMessageName("Name is required");
            return true;
          }
          break;
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            setErrorMessageEmail("Invalid email format");
            return true;
          }
          break;
        case "password":
          if (value.length < 8) {
            setErrorMessagePassword(
              "Password must be at least 8 characters long"
            );
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack mb={1}>
            <TextFieldCustom
              error={!!errorMessageName}
              placeholder="Name"
              value={formDataProxy.name}
              helperText={errorMessageName}
              onChange={(e) => {
                formDataProxy.name = e.target.value;
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </Stack>
          <Stack mb={1}>
            <TextFieldCustom
              error={!!errorMessageEmail}
              helperText={errorMessageEmail}
              placeholder="Email"
              type="email"
              value={formDataProxy.email}
              onChange={(e) => {
                formDataProxy.email = e.target.value;
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </Stack>
          <Stack mb={1}>
            <TextFieldCustom
              error={!!errorMessagePassword}
              helperText={errorMessagePassword}
              placeholder="Password"
              type="password"
              value={formDataProxy.password}
              onChange={(e) => {
                formDataProxy.password = e.target.value;
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </Stack>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
