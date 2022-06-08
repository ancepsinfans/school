import styled from '@emotion/styled';
import constants from '../styles/constants';
import NavBar from '../components/NavBar'
import Image from 'next/image';
import connectMongo from "../middleware/connectMongo";
import QuizAnswer from "../models/answer/quizAnswer";
import StudentProgress from '../models/progress/Progress'
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from '@auth0/nextjs-auth0'


const Main = styled.div`
  margin: 5% 5%;
`

const ImageNameBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
`

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50vh;
  margin: 5px;
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


export default function Profile({ user, ans, progress, subs }) {
  /* Answers logic */
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

  /* Progress logic */
  let progressSpheres = new Set()

  progress.map((e, idx) => {
    progressSpheres.add(e.sphere)
  })

  progressSpheres = Array.from(progressSpheres)



  return (
    <>
      <NavBar />
      <Main>
        <ImageNameBox>
          <Image src={user.picture} width={50} height={50} alt="avatar" />
          <h2>{user.name}</h2>
        </ImageNameBox>
        <h3>{user['email']}</h3>
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
          <ul>{subs.map((e, idx) => {
            return (
              <ListItem key={idx}>
                {e.split('/')[1].slice(0, -3)}
              </ListItem>
            )
          })}</ul>
        </Stats>
        <Stats>
          <SubHeading>Progress</SubHeading>
          {/* <p>{progressSpheres}</p> */}
          <ul>
            {progressSpheres.map((e, idx) => {
              return (
                <ListItem key={idx}>{e}
                  <ul style={{ padding: '0 20px' }}>
                    {progress.map((e, idx) => {
                      let d = new Date(e.timestamp)
                      return (
                        <ListItem key={idx}>{e.page.split('/')[2]}: {d.toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: '2-digit'
                          }
                        )}</ListItem>
                      )
                    })}
                  </ul>
                </ListItem>
              )
            })}
          </ul>

        </Stats>
      </Main>
    </>
  )
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
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
    console.log(auth0user.user)

    try {
      await connectMongo()

      const ans = await QuizAnswer.find({ user: auth0user.user.email })
      const progress = await StudentProgress.find({ user: auth0user.user.email })

      return {
        props: {
          ans: JSON.parse(JSON.stringify(ans)),
          progress: JSON.parse(JSON.stringify(progress)),
          subs: dirs
        }
      }
    } catch (error) {
      console.log(error)
      return {
        notFound: true
      }
    }
  }
});

