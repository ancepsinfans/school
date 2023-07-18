import React from "react";
import progressSender from '../../../../models/users/progressHelper'
import ButtonMechanics from "../ButtonMechanics";
import { useRouter } from "next/navigation";

function NextLessonButton({ link, text, user, location }) {
  const router = useRouter()
  return (
    <ButtonMechanics
      onClick={() => {
        progressSender(
          user,
          location
        );
        router.push(link)
      }}
    >
      {text} &rarr;
    </ButtonMechanics>
  );
}

export default NextLessonButton;
