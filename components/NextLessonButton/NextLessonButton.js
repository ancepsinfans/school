import React from "react";
import Link from "next/link";
import progressSender from '../../models/progress/helpers'
import BlueButton from "../BlueButton";

function NextLessonButton({ link, text, user, sphere, path }) {
  return (
    <BlueButton link={link}
      onClick={() => progressSender(
        user,
        sphere,
        path
      )}
    >
      {text} &rarr;
    </BlueButton>
  );
}

export default NextLessonButton;
