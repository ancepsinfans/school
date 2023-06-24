import styled from '@emotion/styled';
import connectMongo from "../../middleware/connectMongo";
import { StudentSchema } from '../../models/users/User';
import { Grid, GridCard, MainContainer } from '../../components/infrastructureComponents'
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


const ImageNameBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
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

                <Grid>
                    <GridCard
                        link={`/profile/vocab-list?ID=${ID}`}
                        title='Vocabulary List'
                        description="Here are all the words you've marked"
                    />
                    <GridCard
                        link={`/profile/analytics?ID=${ID}`}
                        title='Your Analytics'
                        description='Here you can find data about your study history'
                    />
                    {/* <GridCard
                        isDisabled={true}
                        link={`/profile/advice`}
                        title='Advice'
                        description='Under construction'
                    /> */}

                </Grid>

            </MainContainer>
        </>
    )
}

export const getServerSideProps = async (ctx) => {

    await connectMongo()
    const studentInfo = await StudentSchema.findOne({ user: ctx.query.ID })

    return {
        props: {
            ID: ctx.query.ID
        }
    }




};

