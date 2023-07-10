import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { Loading, MainContainer } from '../../components/meta'
import { getCourseName, getLessonName, getSphereName, fetchDBStructure, fetchUser } from '../../middleware';


const ImageNameBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
`

const ListItem = styled.li`
  list-style-position: inside;
`

export default function Profile({ ID, vocab, db }) {
    const { data: session, status } = useSession()
    const user = session?.user
    if (status === 'loading') {
        return (
            <Loading />
        )
    }



    return <>
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
            <div>
                <ul>
                    {vocab.map(e => {
                        console.log({ e })
                        const sphereName = getSphereName(db, e, undefined, 'sphere')
                        const courseName = getCourseName(db, e, undefined, 'course')
                        const lessonName = getLessonName(db, e, undefined, 'lesson')
                        return (
                            <ListItem key={e._id}>
                                {e.term.term} -- {e.term.definition}
                                <ul style={{ padding: '0 20px' }}>
                                    <ListItem>
                                        <Link
                                            href={`/study/${e.sphere}/${e.course}/${e.lesson}?ID=${ID}`}
                                            legacyBehavior>
                                            {`${sphereName} > ${courseName} > ${lessonName}`}
                                        </Link>
                                    </ListItem>
                                </ul>
                            </ListItem>
                        );
                    })}
                </ul>
            </div>

        </MainContainer>
    </>;
}

export const getServerSideProps = async (ctx) => {
    const studentInfo = await fetchUser({ ID: ctx.query.ID, vocab: 'true' })
    console.log({ studentInfo })

    const db = await fetchDBStructure({})
    return {
        props: {
            ID: ctx.query.ID,
            vocab: JSON.parse(JSON.stringify(studentInfo)),
            db: db
        }
    }
};

