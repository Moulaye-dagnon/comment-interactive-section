import { useContext, useState } from "react";
import { FormComponent } from "../Form/Form";
import { currentUserContext, setdataCommentsContext } from "../../utils/contex";
export function FormComment() {
	const setDataComments = useContext(setdataCommentsContext)
	const currentUser = useContext(currentUserContext)
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
