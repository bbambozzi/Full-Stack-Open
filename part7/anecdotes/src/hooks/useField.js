import { useState } from "react";
export const useField = (type) => {
  // we want to create a reuseable field
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [
    {
      value,
      onChange,
      type,
    },
    reset,
  ];
};
