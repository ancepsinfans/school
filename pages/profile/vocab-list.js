import styled from '@emotion/styled';
import { MainContainer } from '../../components/infrastructureComponents'
import React from 'react';
import { useSession } from 'next-auth/react';
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

export default function Profile({ ID }) {
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


            </MainContainer>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    // const studentInfo = await StudentSchema.findOne({ user: ctx.query.ID })
    return {
        props: {
            ID: ctx.query.ID
        }
    }
};

