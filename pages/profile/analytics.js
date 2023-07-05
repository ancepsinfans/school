import styled from 'styled-components';
import constants from '../../styles/constants';
import { Loading, MainContainer } from '../../components/meta'
import React from 'react';
import { useSession } from 'next-auth/react';
import { fetchDBStructure, fetchUser } from '../../middleware'
import Image from 'next/image';


const ImageNameBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
`

const Stats = styled.div`
  display: flex;
  justify-content: center;
  
  flex-direction: column;
  max-width: 50vh;
  margin: 5px auto;
  padding: 2vh;
  border: 2px solid var(--blackMain);
`

const ListItem = styled.li`
  list-style-position: inside;
`

const SubHeading = styled.h3`
  text-decoration: underline;
  padding-bottom: 5px;
`

export default function Profile({ ID, paths, studentInfo }) {
  const { data: session, status } = useSession()
  const user = session?.user

  if (status === 'loading') {
    return (
      <Loading />
    )
  }

  const ans = studentInfo.answers
  const progress = studentInfo.progress


  /* Answers logic */
  let numCorrect = 0
  let totalAttempts = 0
  let attemptList = {}
  let questionTypes = {}
  let questionsAnswered = new Set()

  ans.map((e) => {
    totalAttempts += 1;
    questionTypes[e.sphere] = {
      [e.id]: 0,
      'correct': 0,
      'type': [],
      'total_attempts': 0
    }
    attemptList[e.id] = e.attempt
    questionsAnswered.add(e.id)
  })

  ans.map((e) => {
    if (e.answer === e.correct) {
      numCorrect += 1
      questionTypes[e.sphere]['correct'] += 1
    }
    questionTypes[e.sphere]['type'].push(e.type)
    questionTypes[e.sphere]['total_attempts'] += 1
    questionTypes[e.sphere][e.id] += 1
  })

  /* Progress logic */
  let progressSpheres = new Set()
  let progressCourses = new Set()
  let spheresPageCount = {}

  progress.map(e => {
    progressSpheres.add(e.sphere)
    progressCourses.add(e.course)
  })

  progressSpheres.forEach(e => {
    spheresPageCount[e] = {}
    progressCourses.forEach(f => {
      spheresPageCount[e][f] = new Set()
    })
  })

  progress.map(e => {
    spheresPageCount[e.sphere][e.course].add(e.lesson)
  })

  return (
    <>
      <MainContainer
        isProfilePage={true}
        smallTitle={true}
        titleText={
          <>
            <ImageNameBox>
              {user.image ? <Image src={user.image} width={50} height={50} alt="avatar" /> : null}
              <h4>{user.name}</h4>
            </ImageNameBox>
          </>
        }
        noFlex={true}
      >

        <Stats>
          <SubHeading>Answers Statistics</SubHeading>
          <p>Total correct answers: {numCorrect}</p>
          <p>Total questions answered: {questionsAnswered.size}</p>
          <p>Total attempts: {totalAttempts}</p>
          <p>Percent correct: {(numCorrect / totalAttempts * 100).toFixed(2)}%</p>
          <hr style={{ backgroundColor: constants.blackMain, margin: '5px', borderStyle: 'solid' }} />
          <ul>{Object.entries(questionTypes).map(([key, value], idx) => {
            const properName = paths.find(i => i.sphere === key)
            return (
              <ListItem key={idx}>sphere: {properName ? properName.name : key}
                <ul style={{ padding: '0 20px' }}>

                  <ListItem key={`${idx}_1`}>{(questionTypes[key]['correct'] / questionTypes[key]['total_attempts'] * 100).toFixed(1)}% correct</ListItem>
                </ul>
              </ListItem>
            )
          }
          )}</ul>
        </Stats>

        <Stats>
          <SubHeading>Progress</SubHeading>
          <ul>
            {Object.entries(spheresPageCount).map(([key, value], i) => {
              const properName = paths.find(i => i.sphere === key)

              return (
                <ListItem key={i}>
                  {properName ? properName.name : key}
                  <ul style={{ padding: '0 20px' }}>
                    {Object.entries(value).map(([k, v], j) => {

                      const course = paths
                        .find(({ sphere }) => sphere === key)
                        ?.courses
                        .find(({ course }) => course === k)
                      return (

                        <ListItem key={j}>

                          {course?.name}: {(v.size / course?.lessons.length * 100).toFixed(1)}% complete
                        </ListItem>
                      )
                    })}
                  </ul>
                </ListItem>
              )
            })}</ul>
        </Stats>

      </MainContainer>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const studentInfo = await fetchUser( { ID: ctx.query.ID, answers: 'true', progress: 'true' })
  const db = await fetchDBStructure({})


  return {
    props: {
      paths: db,
      studentInfo: JSON.parse(JSON.stringify(studentInfo)),
      ID: ctx.query.ID
    }
  }




};

