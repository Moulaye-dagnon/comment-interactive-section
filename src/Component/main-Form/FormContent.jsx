import { useContext, useState } from "react";
import { FormComponent } from "../Form/Form";
export function FormComment({ currentUser, setDataComments }) {
  const hanldleSubmit = (e) => {
    e.preventDefault();
    setDataComments({
      type: "added",
      value: e.target[0].value,
      currentUser: currentUser,
    });

    e.target.reset();
  };

  return <FormComponent submit={hanldleSubmit} btnName={"Send"} />;
}
