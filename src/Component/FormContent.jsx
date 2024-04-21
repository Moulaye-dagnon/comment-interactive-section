import { useContext, useState } from "react";
import { FormComponent } from "./Form";
export function FormComment({ currentUser, setDataComments, dataComments }) {
  const hanldleSubmit = (e) => {
    e.preventDefault();
    let value = e.target[0].value;
    const id = Math.random().toString(36).substring(2, 9);
    const currentTime = new Date();
    let newRecors = {
      id: id,
      content: value,
      createdAt: "now",
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      replies: [],
    };
    let updateData = [...dataComments, newRecors];
    setDataComments(updateData);
	e.target.reset();
  };

  return (
	<FormComponent submit={hanldleSubmit} btnName={'Send'}/>
 );
}
