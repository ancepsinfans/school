
'use client'
import React from "react";
import progressSender from '@/models/users/progressHelper'
import ButtonMechanics from "../ButtonMechanics";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { IdContext } from "@/components/providers/IdProvider";

function NextLessonButton({ link, text }) {
  const params = useParams()
  const router = useRouter()
  const { id } = React.useContext(IdContext)

  return (
    <ButtonMechanics
      onClick={() => {
        progressSender(
          id,
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
