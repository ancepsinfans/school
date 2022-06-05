import styled from '@emotion/styled';
import NavBar from '../components/NavBar'
import Image from 'next/image';
import connectMongo from "../middleware/connectMongo";
import QuizAnswer from "../models/answer/quizAnswer";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";


const Main = styled.div`
  margin: 5% 5%;
`

const ImageNameBox = styled.div`
  display: flex;
  width: 225px;
  justify-content: space-between;
  align-items: center;
`



export default function Profile({ user, ans }) {
  let numCorrect = 0
  let totalAttempts = 0
  let attemptList = {}
  let questionTypes = {}

  ans.map((e, idx) => {
    totalAttempts += 1;
    questionTypes[e.sphere] = {
      [e.id]: e.attempt,
      'correct': 0
    }
    attemptList[e.id] = e.attempt
  })

  ans.map((e, idx) => {
    if (e.answer === e.correct) {
      numCorrect += 1
      questionTypes[e.sphere]['correct'] += 1
    }
  })

  return (
    <>
      <NavBar />
      <Main>
        <ImageNameBox>
          <Image src={user.picture} width={50} height={50} />
          <h2>{user.name}</h2>
        </ImageNameBox>
        <h3>{user['email']}</h3>

        <p>Total correct answers: {numCorrect}</p>
        <p>Total questions answered: {Object.keys(questionTypes).length}</p>
        <p>Total attempts: {totalAttempts}</p>
        <p>Percent correct: {(numCorrect / totalAttempts * 100).toFixed(2)}%</p>
        <ul>{Object.entries(questionTypes).map(([key, value], idx) => {

          return (
            <li key={idx}>question: {key}
              <ol>
                {Object.entries(value).map(([k, v],idx) => {
                  return (
                    <li key={idx}>{k} -- {v}</li>
                  )
                })}
              </ol>
            </li>
          )
        }


        )}</ul>
      </Main>
    </>
  )
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0user = getSession(req, res)

    try {
      await connectMongo()

      const ans = await QuizAnswer.find({ where: { user: auth0user.user.email } })

      return {
        props: {
          ans: JSON.parse(JSON.stringify(ans))
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
