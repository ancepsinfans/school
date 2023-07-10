import React from "react";
import sphereSender from "../../models/spheres/sphereHelper";
import styled from "styled-components";
import { MainContainer } from "../../components/meta";
import { useRouter } from "next/router";
import { fetchDBStructure, getAnyName, hasElement, slugify } from "../../middleware";
import { useImmer } from "use-immer";
import { TextInput, SelectWithTextInput, SubmitButton, SelectInput, MarkdownEditor, NumberPicker } from "../../components/atomic";

const Input = styled.form`
    padding: 5px 5px;
    margin: 0%;
    text-align: center;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    min-height: 300px;
`


const Field = styled.fieldset`
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const AddDesc = ({ db }) => {
    const INIT = {
        sphere: '',
        course: '',
        lesson: '',
        active: 'none',
        slug: '',
        desc: '',
        show: true,
        disable: false,
        linear: true,
        number: '',
        sphereWriteIn: false,
        courseWriteIn: false,
        lessonWriteIn: false,
        text: `---
title: xxx
intro: xxx
next: ""
difficulty: xxx
words: xxx
readability: xxx
---
`,
    }
    const [data, updateData] = useImmer(INIT)
    const router = useRouter()
    const level = !!data.sphere + !!data.course + !!data.lesson
    function newEntryHandler(v, level, isNewParent) {
        if (v === '' || isNewParent) {
            return null
        }

        switch (level) {
            case 1: {
                return (
                    <>
                        <option value={INIT.course} >{INIT.course}</option>
                        {
                            db.find(i => i.sphere === data.sphere).courses.map(e => {
                                return (
                                    <option value={e.course} key={e._id}>{e.course}</option>
                                )
                            })
                        }
                    </>
                )
            }
            case 2: {
                return (
                    <>
                        <option value={INIT.lesson} >{INIT.lesson}</option>
                        {data.course === '' ? null :
                            db.find(i => i.sphere === data.sphere).courses.find(j => j.course === data.course).lessons.map(e => {
                                return (
                                    <option value={e.lesson} key={e._id}>{e.lesson}</option>
                                )
                            })
                        }
                    </>
                )
            }
            default:
                return
        }
    }

    const active = (level) => {
        switch (level) {
            case 1: {
                return 'sphere'
            }
            case 2: {
                return 'course'
            }
            case 3: {
                return 'lesson'
            }
            default: {
                return null
            }
        }
    }

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
                    <Field >
                        <SelectWithTextInput
                            style={{ width: '215px' }}
                            condition={!data.sphereWriteIn}
                            setCondition={() => {
                                updateData((draft) => {
                                    draft.sphereWriteIn = !data.sphereWriteIn
                                    draft.courseWriteIn = !data.courseWriteIn
                                })
                            }}
                            value={data.sphere}
                            onChange={(e) => {
                                updateData((draft) => {
                                    draft.sphere = e.target.value
                                    draft.course = INIT.course
                                    draft.lesson = INIT.lesson
                                    draft.desc = getAnyName(db, { sphere: slugify(e.target.value) }, 1)?.description
                                })
                            }}
                            optionsLogic={
                                <>
                                    <option value={INIT.sphere} >{INIT.sphere}</option>
                                    {
                                        db.map(e => {
                                            return (
                                                <option value={e.sphere} key={e._id}>{e.sphere}</option>
                                            )
                                        })
                                    }


                                </>
                            }
                            label={'Sphere'}
                        />
                        <SelectWithTextInput
                            style={{ width: '215px' }}
                            disabled={!data.sphere}
                            condition={(!data.sphereWriteIn && !data.courseWriteIn)}
                            setCondition={() => {
                                if (data.sphereWriteIn) {
                                    return
                                }
                                updateData((draft) => { draft.courseWriteIn = !data.courseWriteIn })
                            }}
                            value={data.course}
                            onChange={(e) => {
                                updateData((draft) => {
                                    draft.course = e.target.value
                                    draft.lesson = INIT.lesson
                                    draft.desc = getAnyName(db, { sphere: slugify(data.sphere), course: slugify(e.target.value) }, 2)?.description

                                })

                            }
                            }
                            optionsLogic={newEntryHandler(data.sphere, 1, data.sphereWriteIn)}
                            label={'Course'}
                        />

                        <Field style={{ flexDirection: 'row' }}>

                            <NumberPicker
                                disabled={!data.course}
                                value={parseInt(data.number) || 0}
                                range={[1, 20, 1]}
                                label="#"
                                onChange={(e) => {
                                    updateData((draft) => {
                                        const temp = e.target.value < 10 ? '0' + e.target.value : e.target.value
                                        draft.number = temp
                                        draft.slug = slugify(data.lesson, temp)
                                    })
                                }}
                            />

                            <SelectWithTextInput
                                disabled={!data.course}
                                setCondition={() => {
                                    if (data.sphereWriteIn || data.courseWriteIn) {
                                        return
                                    }
                                    updateData((draft) => { draft.lessonWriteIn = !data.lessonWriteIn })
                                }}

                                condition={(!data.sphereWriteIn && !data.courseWriteIn && !data.lessonWriteIn)}
                                value={data.lesson}
                                onChange={(e) => {
                                    updateData((draft) => {
                                        draft.lesson = e.target.value
                                        const lessonObj = getAnyName(db, { sphere: slugify(data.sphere), course: slugify(data.course) }, 2).lessons.find(({ lesson }) => lesson === e.target.value)

                                        draft.text = lessonObj?.text || INIT.text
                                        draft.desc = lessonObj?.description
                                        draft.number = lessonObj?.number
                                    })
                                }}
                                optionsLogic={newEntryHandler(data.course, 2, data.courseWriteIn)}
                                label={'Lesson'}
                            />


                        </Field>

                    </Field>

                    <Field style={{ maxWidth: '150px' }}>

                        <Field>
                            <h3>Slug</h3>
                            <p>DB: {getAnyName(db, { sphere: slugify(data.sphere), course: slugify(data.course), lesson: slugify(data.lesson, data.number) }, level)?.slug}</p>
                        </Field>
                        <Field>
                            <TextInput value={data.desc} onChange={(e) => { updateData((draft) => { draft.desc = e.target.value }) }} label={'Description'} />
                            <p>Currently: {getAnyName(db, { sphere: slugify(data.sphere), course: slugify(data.course), lesson: slugify(data.lesson, data.number) }, level)?.description}</p>
                        </Field>

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
                <br />
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

    return {
        props: {
            db: dbData,
        }
    }
};