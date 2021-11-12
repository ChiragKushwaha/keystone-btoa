import { useEffect, useState } from "react";

export default function useForm(initial = {}) {
  // create a state object for our input
  const [inputs, setInputs] = useState<any>(initial);

  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    // this function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e: any) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }

  return {
    resetForm,
    clearForm,
    inputs,
    handleChange,
  };
}
