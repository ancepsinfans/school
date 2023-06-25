import React from "react";
import progressSender from '../../../../models/users/progressHelper'
import ButtonMechanics from "../ButtonMechanics";
import LinkyButton from "../LinkyButton/LinkyButton";

function NextLessonButton({ link, text, user, location }) {
  return (
    <LinkyButton link={link}>
      <ButtonMechanics
        onClick={() => {
          progressSender(
            user,
            location
          );
        }}
      >
        {text} &rarr;
      </ButtonMechanics>
    </LinkyButton>
  );
}

export default NextLessonButton;
