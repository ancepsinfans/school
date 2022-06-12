import styled from '@emotion/styled';
import constants from '../styles/constants';
import NavBar from '../components/NavBar'
import Image from 'next/image';
import connectMongo from "../middleware/connectMongo";
import { StudentSchema, StudentAnswers, StudentProgress } from '../models/users/User'
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import MainContainer from '../components/MainContainer'


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

export default function Profile({ user, studentInfo, subs }) {
  const ans = studentInfo.answers
  const progress = studentInfo.progress

  // /* Answers logic */
  let numCorrect = 0
  let totalAttempts = 0
  let attemptList = {}
  let questionTypes = {}
  let questionsAnswered = new Set()



  ans.map((e, idx) => {
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

  ans.map((e, idx) => {
    if (e.answer === e.correct) {
      numCorrect += 1
      questionTypes[e.sphere]['correct'] += 1
    }
    questionTypes[e.sphere]['type'].push(e.type)
    questionTypes[e.sphere]['total_attempts'] += 1
    questionTypes[e.sphere][e.id] += 1
  })

  // /* Progress logic */
  let progressSpheres = new Set()
  let spheresPageCount = {}
  let masterPageCount = {}

  progress.map((e, idx) => {
    progressSpheres.add(e.sphere)
  })

  progressSpheres.forEach((e, idx) => {
    spheresPageCount[e] = []
    progress.map((f, id) => {
      if (f.sphere === e) {
        spheresPageCount[e].push(f.page)
      }
    })
  })

  subs.map((e, idx) => {
    const [a, b] = e.split('/')
    masterPageCount[a] = []
  })
  subs.map((e, idx) => {
    const [a, b] = e.split('/')
    masterPageCount[a].push(b.slice(0, -3))
  })

  console.log(subs)

  return (
    <>
      <MainContainer
        isProfilePage={true}
        smallTitle={true}
        titleText={
          <>
            <ImageNameBox>
              <Image src={user.picture} width={50} height={50} alt="avatar" />
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
            return (
              <ListItem key={idx}>sphere: {key}
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
              return (
                <ListItem key={i}>
                  {key}: {(value.length / masterPageCount[key].length * 100).toFixed(1)}% completed
                </ListItem>
              )
            })}</ul>


        </Stats>
      </MainContainer>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({

  getServerSideProps: async ({ req, res }) => {
    const fs = require('fs');
    const path = require('path')
    const dir = './pages'
    const dirs = []

    fs.readdir(dir, (err, files) => {
      if (err) {
        throw err;
      }

      files.forEach(file => {
        if (!file.includes('.') && file !== 'api') {
          console.log(file)
          fs.readdir(path.join(dir, file), (err, files_sub) => {
            if (err) {
              throw err;
            }

            files_sub.forEach(file_sub => {
              dirs.push(path.join(file, file_sub))
            })
          })
        }
      })

    })


    const auth0user = getSession(req, res)

    await connectMongo()

    const studentInfo = await StudentSchema.findOne({ user: auth0user.user.email })

    return {
      props: {
        user: auth0user,
        subs: dirs,
        studentInfo: JSON.parse(JSON.stringify(studentInfo))
      }
    }

  }
});

