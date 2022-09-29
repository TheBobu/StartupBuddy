import React from "react";


export default function Form(props) {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
