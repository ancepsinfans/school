import React from "react";
import progressSender from '../../../models/users/progressHelper'
import BlueButton from "../BlueButton";
import ButtonMechanics from "../ButtonMechanics";

function NextLessonButton({ link, text, user, sphere, course, lesson }) {
  return (
    <ButtonMechanics link={link}
      onClick={() => {
        progressSender(
          user,
          sphere,
          course,
          lesson
        );
      }}
    >
      {text} &rarr;
    </ButtonMechanics>
  );
}

export default NextLessonButton;
