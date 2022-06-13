import React from "react";
import progressSender from '../../models/users/progressHelper'
import BlueButton from "../BlueButton";

function NextLessonButton({ link, text, user, sphere, course, page }) {
  console.log(sphere)
  console.log(course)
  console.log(page)
  return (
    <BlueButton link={link}
      onClick={() => progressSender(
        user,
        sphere,
        course,
        page
      )}
    >
      {text} &rarr;
    </BlueButton>
  );
}

export default NextLessonButton;
