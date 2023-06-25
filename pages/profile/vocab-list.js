import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { Loading, MainContainer } from '../../components/meta'
import { StudentSchema } from '../../models/users/User'
import getStructure from '../../middleware/fetchStructure';
import { courseNamer, lessonNamer, sphereNamer } from '../../middleware/getNames';


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

    const uniqueVocab = vocab.reduce((result, current) => {
        const existing = result.find(item =>
            item.term.term === current.term.term &&
            item.term.definition === current.term.definition
        );

        if (!existing) {
            result.push(current);
        } else if (current.timestamp > existing.timestamp) {
            result[result.indexOf(existing)] = current;
        }

        return result;
    }, []);


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
                    {uniqueVocab.map(e => {
                        const sphereName = sphereNamer(db, e)
                        const courseName = courseNamer(db, e)
                        const lessonName = lessonNamer(db, e)
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

