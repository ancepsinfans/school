import React from "react";
import constants from "../../styles/constants";
import questionSender from "../../models/questions/helpers";
import { useImmer } from "use-immer";
import styled from "@emotion/styled";
import getStructure from "../../lib/fetchStructure";


const Input = styled.form`
    padding: 5px 5px;
    margin: 0%;
    text-align: center;
`

const Select = styled.select`
    width: 20%;
`
const FieldUnit = styled.div`
    padding: 10px 0;
`

const AnswerButton = styled.button`
    background-color: ${constants.accentPurple85};
& {
    width: 15%;
    border: 1px solid var(--blackMain);
    border-radius: 12px;
    color: var(--blackMain);
    border-radius: 5px;
    margin: 5px;
    height: 25px;
}

&:hover {
    border: none;
    width: calc(15% + 2px);
    height: calc(25px + 0px);
}
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
        <FieldUnit>
          <label htmlFor="description">Description</label>
          <br />
          <input
            type="text"
            id="description"
            value={data.desc}
            onChange={(event) => {
              updateData((draft) => { draft.desc = event.target.value })
            }}
          />
        </FieldUnit>
        <FieldUnit>
          <label htmlFor="options">Options</label>
          <br />
          <input
            type="text"
            id="options"
            value={data.options}
            onChange={(event) => {
              updateData((draft) => { draft.options = event.target.value })
            }}
          />
        </FieldUnit>
        <FieldUnit>
          <label htmlFor="correct">Correct</label>
          <br />
          <input
            type="text"
            id="correct"
            value={data.correct}
            onChange={(event) => {
              updateData((draft) => { draft.correct = event.target.value })
            }}
          />
        </FieldUnit>
        <FieldUnit>
          <label htmlFor="good">Good</label>
          <br />
          <input
            type="text"
            id="good"
            value={data.good}
            onChange={(event) => {
              updateData((draft) => { draft.good = event.target.value })
            }}
          />
        </FieldUnit>
        <FieldUnit>
          <label htmlFor="bad">Bad</label>
          <br />
          <input
            type="text"
            id="bad"
            value={data.bad}
            onChange={(event) => {
              updateData((draft) => { draft.bad = event.target.value })
            }}
          />
        </FieldUnit>
        <FieldUnit>
          <label htmlFor="sphere-select">
            Sphere
          </label>
          <br />
          <Select
            id="sphere-select"
            value={data.sphere}
            onChange={event => {
              updateData((draft) => { draft.sphere = event.target.value })
            }}
          >
            {spheres.map((e) => {
              return (
                <option key={e[0]} value={e[0]}>{e[1]}</option>
              )
            })}
          </Select>
        </FieldUnit>
        <FieldUnit>
          <label htmlFor="course-select">
            Course
          </label>
          <br />
          <Select
            id="course-select"
            disabled={data.sphere === ''}
            value={data.course}
            onChange={event => {
              updateData((draft) => { draft.course = event.target.value })
            }}
          >
            <option></option>
            {!!data.sphere ? courses[data.sphere]?.map((e) => {
              return (
                <option key={e.course} value={e.course}>{e.name}</option>
              )
            }) : null}
          </Select>
        </FieldUnit>
        <FieldUnit>
          <label htmlFor="lesson-select">
            Lesson
          </label>
          <br />
          <Select
            id="lesson-select"
            disabled={data.course === ''}
            value={data.lesson}
            onChange={event => {
              updateData((draft) => { draft.lesson = event.target.value })
            }}
          >
            <option></option>
            {!!data.course ? lessons[data.course]?.map((e) => {
              return (
                <option key={e.lesson} value={e.lesson}>{e.name}</option>
              )
            }) : null}
          </Select>
        </FieldUnit>

        <AnswerButton>
          submit
        </AnswerButton>

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