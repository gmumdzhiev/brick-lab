import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Global } from "@emotion/react";
import { TopBar } from "../common/components/Toolbar/Toolbar";
import { Home } from "./screens/Home/Home";

export const App = () => {
  return (
    <>
      <Global styles={{ body: { background: "#f0ece4" } }} />
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};
