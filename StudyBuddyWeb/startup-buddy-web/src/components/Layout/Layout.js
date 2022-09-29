import React from "react";
import Header from "./Header";
import "./Layout.module.css";
function Layout(props) {
  return (
    <>
      <Header className="header"/>
      <div className="pageWrapper">
        <main>{props.children}</main>
      </div>
    </>
  );
}

export default Layout;
