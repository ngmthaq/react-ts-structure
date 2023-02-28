import React, { useState } from "react";
import { useNavigate } from "react-router";
import KEY_CONST from "const/key.const";
import { setLocalStorage } from "utils";
import PATH_CONST from "const/path.const";

const Login: React.FC<Props> = () => {
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
      <small>Type anything and submit form for login</small>
      <form onSubmit={onSubmit}>
        <input type="text" value={input} onChange={onChange} placeholder="Enter your username" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

interface Props {}
