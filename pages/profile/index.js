import styled from 'styled-components';
import { Grid, Loading, MainContainer } from '../../components/meta'
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


const ImageNameBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
`

export default function Profile({ ID }) {
    const { data: session, status } = useSession()
    const user = session?.user

    if (status === 'loading') {
        return (
            <Loading />
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
            >

                <Grid>
                    <Grid.GridCard
                        link={`/profile/vocab-list?ID=${ID}`}
                        title='Vocabulary List'
                        description="Here are all the words you've marked"
                    />
                    <Grid.GridCard
                        link={`/profile/analytics?ID=${ID}`}
                        title='Your Analytics'
                        description='Here you can find data about your study history'
                    />


                </Grid>

            </MainContainer>
        </>
    )
}

export const getServerSideProps = async (ctx) => {

    return {
        props: {
            ID: ctx.query.ID
        }
    }




};

