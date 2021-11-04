import React, { useEffect } from "react";
import Search from "Components/Search.js";
import { hadToken } from "Utils/index.js";
import { useHistory } from "react-router";

export default function Home() {
  const history = useHistory();
  useEffect(() => {
    console.log("token check");
    if (!hadToken()) {
      history.replace("/login");
    }
  }, []);
  return <Search />;
}
