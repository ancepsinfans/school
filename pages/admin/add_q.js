import React from "react";
import questionSender from "../../models/questions/helpers";
import { useImmer } from "use-immer";
import styled from "@emotion/styled";
import getStructure from "../../lib/fetchStructure";
import { SelectInput, TextInput, SubmitButton } from "../../components/atomic";

const Input = styled.form`
    padding: 5px 5px;
    margin: 0%;
    text-align: center;
`



const AddQ = ({ spheres, courses, lessons }) => {
  const INIT = {
    sphere: '',
    course: '',
    lesson: '',
    desc: '',
    options: [],
    correct: '',
    good: '',
    bad: ''
  }
  const [data, updateData] = useImmer(INIT)

  return (
    <>
      <Input onSubmit={e => {
        e.preventDefault();
        questionSender(data);
        updateData((draft) => { draft = INIT })
      }}>
        <TextInput value={data.desc} onChange={(event) => { updateData((draft) => { draft.desc = event.target.value }) }} label={'Description'} />
        <TextInput value={data.options} onChange={(event) => { updateData((draft) => { draft.options = event.target.value }) }} label={'Options'} />
        <TextInput value={data.correct} onChange={(event) => { updateData((draft) => { draft.correct = event.target.value }) }} label={'Correct'} />
        <TextInput value={data.good} onChange={(event) => { updateData((draft) => { draft.good = event.target.value }) }} label={'Good'} />
        <TextInput value={data.bad} onChange={(event) => { updateData((draft) => { draft.bad = event.target.value }) }} label={'Bad'} />

        <SelectInput
          value={data.sphere}
          label='Sphere'
          optionsLogic={spheres.map((e) => {
            return (
              <option key={e[0]} value={e[0]}>{e[1]}</option>
            )
          })}
          onChange={event => {
            updateData((draft) => { draft.sphere = event.target.value })
          }}
        />
        <SelectInput
          value={data.course}
          label='Course'
          optionsLogic={!!data.sphere ? courses[data.sphere]?.map((e) => {
            return (
              <option key={e.course} value={e.course}>{e.name}</option>
            )
          }) : null}
          onChange={event => {
            updateData((draft) => { draft.course = event.target.value })
          }}
        />
        <SelectInput
          value={data.lesson}
          label='Course'
          optionsLogic={!!data.course ? lessons[data.course]?.map((e) => {
            return (
              <option key={e.lesson} value={e.lesson}>{e.name}</option>
            )
          }) : null}
          onChange={event => {
            updateData((draft) => { draft.lesson = event.target.value })
          }}
        />

        <SubmitButton>
          Submit
        </SubmitButton>
      </Input>
    </>
  );
};

export default AddQ

export const getServerSideProps = async () => {
  const db = await getStructure()
  const spheres = db.map(({ sphere, name }) => [sphere, name]);

  const courses = db.reduce((acc, { sphere, courses }) => {
    if (!acc[sphere]) {
      acc[sphere] = [];
    }
    const courseNames = courses.map(({ course, name }) => ({ course, name }));
    acc[sphere].push(...courseNames);
    return acc;
  }, {});

  const lessons = db.reduce((acc, { courses }) => {
    courses.forEach(({ course, lessons }) => {
      if (!acc[course]) {
        acc[course] = [];
      }
      const lessonNames = lessons.map(({ lesson, name }) => ({ lesson, name }));
      acc[course].push(...lessonNames);
    });
    return acc;
  }, {});

  return {
    props: {
      spheres: spheres,
      courses: courses,
      lessons: lessons
    }
  }
}