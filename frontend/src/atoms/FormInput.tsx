import React from "react";

export default function FormInput({ type, ...rest }) {
  return <input type={type} {...rest} />;
}
