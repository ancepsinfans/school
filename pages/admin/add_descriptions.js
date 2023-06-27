import React from "react";
import constants from "../../styles/constants";
import sphereSender from "../../models/spheres/sphereHelper";
import styled from "styled-components";
import { MainContainer } from "../../components/meta";
import { useRouter } from "next/router";
import { fetchDBStructure, fetchFileTreeStructure, hasElement } from "../../middleware";
import { useImmer } from "use-immer";
import { TextInput, SubmitButton } from "../../components/atomic";


const ListItem = styled.li`
  list-style-position: inside;
`

const Input = styled.form`
    padding: 5px 5px;
    margin: 0%;
    text-align: center;
`

const AddDesc = ({ paths, db }) => {
    const INIT = {
        sphere: undefined,
        course: undefined,
        lesson: undefined,
        active: 'none',
        name: '',
        desc: ''
    }

    const [data, updateData] = useImmer(INIT)

    const router = useRouter()

    return (
        <MainContainer
            titleText={"Lesson structure"}
            smallTitle={true}
        >

            <br />
            <ul style={{ padding: '0 20px' }}>
                {
                    Object.keys(paths).map((e, idx) => {
                        return (
                            <ListItem
                                key={idx}
                            >
                                <button
                                    style={{ backgroundColor: hasElement(db, { sphere: e, course: undefined, lesson: undefined }) ? constants.alertGreenMain : constants.alertRedMain }}
                                    onClick={() => {
                                        updateData((draft) => {
                                            draft.active = e
                                            draft.sphere = e
                                            draft.course = undefined
                                            draft.lesson = undefined
                                        })
                                    }}
                                >

                                    {e}
                                </button>

                                <ul style={{ padding: '0 20px' }}>
                                    {
                                        Object.keys(paths[e]).map((f, idx) => {

                                            return (
                                                <ListItem
                                                    key={idx}
                                                >
                                                    <button
                                                        style={{ backgroundColor: hasElement(db, { sphere: e, course: f, lesson: undefined }) ? constants.alertGreenMain : constants.alertRed65 }}
                                                        disabled={!hasElement(db, { sphere: e, course: undefined, lesson: undefined })}
                                                        onClick={() => {
                                                            updateData((draft) => {
                                                                draft.active = f
                                                                draft.sphere = e
                                                                draft.course = f
                                                                draft.lesson = undefined
                                                            })
                                                        }}
                                                    >

                                                        {f}
                                                    </button>
                                                    <ul style={{ padding: '0 20px' }}>
                                                        {
                                                            paths[e][f].files.map((g, idx) => {
                                                                return (
                                                                    <ListItem
                                                                        key={idx}
                                                                    >
                                                                        <button
                                                                            style={{ backgroundColor: hasElement(db, { sphere: e, course: f, lesson: g }) ? constants.alertGreen65 : constants.alertRed65 }}
                                                                            disabled={!hasElement(db, { sphere: e, course: f, lesson: undefined })}
                                                                            onClick={() => {
                                                                                updateData((draft) => {
                                                                                    draft.active = g
                                                                                    draft.sphere = e
                                                                                    draft.course = f
                                                                                    draft.lesson = g
                                                                                })
                                                                            }}
                                                                        >

                                                                            {g}
                                                                        </button>
                                                                    </ListItem>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </ListItem>
                                            )
                                        })}
                                </ul>
                            </ListItem>
                        )
                    })
                }
            </ul>

            <br />

            <h2>{data.active}</h2>

            <Input onSubmit={e => {
                e.preventDefault();
                sphereSender(
                    data,
                    !hasElement(db, data)
                );
                updateData((draft) => { draft = INIT })
                setTimeout(() => {
                    router.reload();
                }, 500);
            }}>
                <TextInput value={data.desc} onChange={(e) => { updateData((draft) => { draft.desc = e.target.value }) }} label={'Description'} />
                <TextInput value={data.name} onChange={(e) => { updateData((draft) => { draft.name = e.target.value }) }} label={'Proper Name'} />


                <br />

                <SubmitButton
                    disabled={data.active === 'none'}
                >
                    Submit
                </SubmitButton>


            </Input>
        </MainContainer>
    );
};


export default AddDesc

export const getServerSideProps = async () => {

    const dbData = await fetchDBStructure()
    const pageStructure = await fetchFileTreeStructure()
    return {
        props: {
            paths: pageStructure,
            db: dbData,
        }
    }
};