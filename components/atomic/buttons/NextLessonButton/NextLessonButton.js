
'use client'
import React from "react";
import progressSender from '@/models/users/progressHelper'
import ButtonMechanics from "../ButtonMechanics";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

function NextLessonButton({ link, text, user }) {
  const params = useParams()
  const router = useRouter()
  return (
    <ButtonMechanics
      onClick={() => {
        progressSender(
          user,
          { sphere: params.sphere, course: params.course, lesson: params.lesson }
        );
        router.push(link)
      }}
    >
      {text} &rarr;
    </ButtonMechanics>
  );
}

export default NextLessonButton;
