import React from "react";
import progressSender from '../../../models/users/progressHelper'
import BlueButton from "../BlueButton";

function NextLessonButton({ link, text, user, sphere, course, lesson }) {

  return (
    <BlueButton link={link}
      onClick={() => progressSender(
        user,
        sphere,
        course,
        lesson
      )}
    >
      {text} &rarr;
    </BlueButton>
  );
}

export default NextLessonButton;
