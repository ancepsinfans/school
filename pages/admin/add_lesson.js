import React from "react";
import sphereSender from "../../models/spheres/sphereHelper";
import styled from "styled-components";
import { MainContainer } from "../../components/meta";
import { useRouter } from "next/router";
import { fetchDBStructure, fetchFileTreeStructure, getAnyName, hasElement } from "../../middleware";
import { useImmer } from "use-immer";
import { TextInput, SubmitButton, SelectInput, MarkdownEditor } from "../../components/atomic";

const Input = styled.form`
    padding: 5px 5px;
    margin: 0%;
    text-align: center;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    
`


const Field = styled.fieldset`
    border: none;
`

const AddDesc = ({ paths, db }) => {
    const INIT = {
        sphere: '',
        course: '',
        lesson: '',
        active: 'none',
        name: '',
        desc: '',
        show: true,
        disable: false,
        text: `---
title: xxx
intro: xxx
next: ""
difficulty: xxx
words: xxx
readability: xxx
---
`,
        linear: true,

    }
    const [data, updateData] = useImmer(INIT)
    const router = useRouter()
    const level = !!data.sphere + !!data.course + !!data.lesson

    return (
        <MainContainer
            titleText={"Lesson structure"}
            smallTitle={true}
        >

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
                <Flex>

                    <Field>

                        <SelectInput
                            value={data.sphere}
                            onChange={event => {
                                updateData((draft) => { draft.sphere = event.target.value })
                            }}
                            optionsLogic={
                                <>
                                    <option value={INIT.sphere} >{INIT.sphere}</option>
                                    {
                                        db.map(e => {
                                            return (
                                                <option value={e.sphere} key={e._id}>{e.name}</option>
                                            )
                                        })
                                    }


                                </>
                            }
                            label='Sphere'
                        />

                        <SelectInput
                            disabled={!data.sphere}
                            value={data.course}
                            onChange={event => {
                                updateData((draft) => { draft.course = event.target.value })
                            }}
                            optionsLogic={
                                <>
                                    <option value={INIT.course} >{INIT.course}</option>
                                    {data.sphere === '' ? null :
                                        db.find(i => i.sphere === data.sphere).courses.map(e => {
                                            return (
                                                <option value={e.course} key={e._id}>{e.name}</option>
                                            )
                                        })

                                    }



                                </>
                            }
                            label='Course'
                        />

                        <SelectInput
                            disabled={!data.course}
                            value={data.lesson}
                            onChange={event => {
                                updateData((draft) => { draft.lesson = event.target.value })
                            }}
                            optionsLogic={
                                <>
                                    <option value={INIT.lesson} >{INIT.lesson}</option>
                                    {data.course === '' ? null :
                                        db.find(i => i.sphere === data.sphere).courses.find(j => j.course === data.course).lessons.map(e => {
                                            return (
                                                <option value={e.lesson} key={e._id}>{e.name}</option>
                                            )
                                        })

                                    }



                                </>
                            }
                            label='Lesson'
                        />
                    </Field>
                    <Field>

                        <TextInput value={data.desc} onChange={(e) => { updateData((draft) => { draft.desc = e.target.value }) }} label={'Description'} />
                        <p>Currently: {getAnyName(db, data, level)?.description}</p>

                        <TextInput value={data.name} onChange={(e) => { updateData((draft) => { draft.name = e.target.value }) }} label={'Proper Name'} />
                        <p>Currently: {getAnyName(db, data, level)?.name}</p>

                    </Field>
                    <Field>

                        <SelectInput
                            disabled={level !== 1}
                            value={data.show}
                            onChange={event => {
                                updateData((draft) => { draft.show = event.target.value })
                            }}
                            optionsLogic={
                                <>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </>
                            }
                            label='Show sphere'
                        />

                        <SelectInput
                            disabled={level !== 1}
                            value={data.disable}
                            onChange={event => {
                                updateData((draft) => { draft.disable = event.target.value })
                            }}
                            optionsLogic={
                                <>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </>
                            }
                            label='Disabled sphere'
                        />

                        <SelectInput
                            disabled={level !== 2}
                            value={data.linear}
                            onChange={event => {
                                updateData((draft) => { draft.linear = event.target.value })
                            }}
                            optionsLogic={
                                <>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </>
                            }
                            label='Course linear'
                        />
                    </Field>
                </Flex>
                <br />


                <MarkdownEditor
                    value={data.text}
                    change={(val) => { updateData((draft) => { draft.text = val }) }}
                />

                <br />

                <SubmitButton
                    disabled={level === 0}
                >
                    Submit
                </SubmitButton>



            </Input>



        </MainContainer>
    );
};


export default AddDesc

export const getServerSideProps = async () => {

    const dbData = await fetchDBStructure({})
    const pageStructure = await fetchFileTreeStructure()

    return {
        props: {
            paths: pageStructure,
            db: dbData,
        }
    }
};