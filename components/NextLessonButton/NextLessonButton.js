import React from "react";
import progressSender from '../../models/users/progressHelper'
import BlueButton from "../BlueButton";

function NextLessonButton({ link, text, user, sphere, path }) {
  return (
    <BlueButton link={link}
      onClick={() => progressSender(
        user,
        sphere,
        path.split('/')[2]
      )}
    >
      {text} &rarr;
    </BlueButton>
  );
}

export default NextLessonButton;
