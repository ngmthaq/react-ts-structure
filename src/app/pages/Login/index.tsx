import React, { useState } from "react";
import { useNavigate } from "react-router";
import KEY_CONST from "app/const/key.const";
import { setLocalStorage } from "app/utils";
import PATH_CONST from "app/const/path.const";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const onChange = (e: any) => {
    let value = e.target.value || "";
    setInput(value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLocalStorage(KEY_CONST.LOCAL_STORAGE.auth, input);
    navigate(PATH_CONST.homepage.path);
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={input} onChange={onChange} placeholder="Enter your username" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
