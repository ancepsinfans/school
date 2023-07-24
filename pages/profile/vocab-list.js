import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { Loading, MainContainer, Grid } from '../../components/meta'
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
        >
            <Grid>
                {vocab.map(e => {
                    const sphereName = getSphereName(db, e, undefined, 'sphere')
                    const courseName = getCourseName(db, e, undefined, 'course')
                    const lessonName = getLessonName(db, e, undefined, 'lesson')
                    return (
                        <Grid.GridCard
                            key={e._id}
                            link={`/study/${e.sphere}/${e.course}/${e.lesson}?ID=${ID}`}
                            title={e.term.term}
                            description={e.term.definition}
                            lessonDetails={<aside style={{ color: 'var(--black40)' }}>{`${sphereName} > ${courseName} > ${lessonName}`}</aside>}
                        />

                    );
                })}

            </Grid>


        </MainContainer>
    </>;
}

export const getServerSideProps = async (ctx) => {
    const studentInfo = await fetchUser({ ID: ctx.query.ID, vocab: 'true' })

    const db = await fetchDBStructure({})
    return {
        props: {
            ID: ctx.query.ID,
            vocab: JSON.parse(JSON.stringify(studentInfo)),
            db: db
        }
    }
};

