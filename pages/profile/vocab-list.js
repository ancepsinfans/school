import styled from '@emotion/styled';
import { MainContainer } from '../../components/infrastructureComponents'
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { StudentSchema } from '../../models/users/User'
import connectMongo from "../../middleware/connectMongo";
import Link from 'next/link';
import getStructure from '../../lib/fetchStructure';


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

export default function Profile({ ID, vocab, db }) {
    const { data: session, status } = useSession()
    const user = session?.user

    if (status === 'loading') {
        return (
            <MainContainer
                navType='other'
                titleText="Loading..."
            >

            </MainContainer>
        )
    }

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
                noFlex={false}
            >
                <Stats>
                    <ul>
                        {vocab.map(e => {
                            const sphereName = db
                                .find(({ sphere }) => sphere === e.sphere)
                                ?.name

                            const courseName = db
                                .find(({ sphere }) => sphere === e.sphere)
                                ?.courses
                                .find(({ course }) => course === e.course)
                                ?.name

                            const lessonName = db
                                .find(({ sphere }) => sphere === e.sphere)
                                ?.courses
                                .find(({ course }) => course === e.course)
                                ?.lessons
                                .find(({ lesson }) => lesson === e.lesson)
                                ?.name;

                            return (
                                <ListItem key={e._id}>
                                    {e.term.term} -- {e.term.definition}
                                    <ul style={{ padding: '0 20px' }}>
                                        <ListItem><Link href={`/study/${e.sphere}/${e.course}/${e.lesson}?ID=${ID}`}>{`${sphereName} > ${courseName} > ${lessonName}`}</Link></ListItem>
                                    </ul>
                                </ListItem>

                            )

                        })}
                    </ul>
                </Stats>

            </MainContainer >
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    await connectMongo()
    const studentInfo = await StudentSchema.find({ user: ctx.query.ID }, { vocab: 1 })
    const db = await getStructure()
    return {
        props: {
            ID: ctx.query.ID,
            vocab: JSON.parse(JSON.stringify(studentInfo[0].vocab)),
            db: db
        }
    }
};

