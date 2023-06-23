import React from "react";
import constants from "../styles/constants";
import sphereSender from "../models/spheres/sphereHelper";
import styled from "@emotion/styled";
import { getAllLessons } from "../lib/fetchAllLessons";
import { MainContainer } from "../components/infrastructureComponents";
import axios from "axios";
import { useRouter } from "next/router";
import getStructure from "../lib/fetchStructure";

const ListItem = styled.li`
  list-style-position: inside;
`

const Input = styled.div`
    padding: 5px 5px;
    margin: 0%;
    text-align: center;
`

const AnswerButton = styled.button`
& {
    width: 50%;
    border: 1px solid var(--blackMain);
    border-radius: 12px;
    color: var(--blackMain);
    border-radius: 5px;
    margin: 5px;
    height: 25px;
}

&:hover {
    border: none;
    width: calc(50% + 2px);
    height: calc(25px + 0px);
}
`




const AddDesc = ({ paths, db }) => {
    const hasElement = (db, data) => {
        let sphereName = data.sphere
        let courseName = data.course
        let lessonName = data.lesson

        const sphere = db.find((item) => item.sphere == sphereName);

        if (!!courseName) {
            if (!!sphere) {
                const course = sphere.courses.find((item) => item.course === courseName);
                if (!!lessonName) {
                    if (!!course) {

                        const lesson = course.lessons.find((item) => item.lesson === lessonName);

                        if (!!lesson) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                } else {
                    return !!course
                }
            } else {
                return false
            }
        } else {

            return !!sphere
        }

    };

    const [data, setData] = React.useState({})
    const [active, setActive] = React.useState('none')
    const [desc, setDesc] = React.useState('')
    const [name, setName] = React.useState('')

    const router = useRouter()

    const splitter = (data) => {
        return data.split(', ')
    }

    const clearAll = () => {
        setData({})
        setActive('none')
        setDesc('')
        setName('')

        setTimeout(() => {
            router.reload();
        }, 500);
    }
    return (
        <MainContainer>

            <h2>Lesson structure</h2>
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
                                        setActive(e)
                                        setData({
                                            sphere: e,
                                            course: undefined,
                                            lesson: undefined
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
                                                            setActive(f)
                                                            setData({
                                                                sphere: e,
                                                                course: f,
                                                                lesson: undefined
                                                            })
                                                        }}
                                                    >

                                                        {f}
                                                    </button>
                                                    <ul style={{ padding: '0 20px' }}>
                                                        {
                                                            paths[e][f].map((g, idx) => {
                                                                return (
                                                                    <ListItem
                                                                        key={idx}
                                                                    >
                                                                        <button
                                                                            style={{ backgroundColor: hasElement(db, { sphere: e, course: f, lesson: g }) ? constants.alertGreen65 : constants.alertRed65 }}
                                                                            disabled={!hasElement(db, { sphere: e, course: f, lesson: undefined })}
                                                                            onClick={() => {
                                                                                setActive(g)
                                                                                setData({
                                                                                    sphere: e,
                                                                                    course: f,
                                                                                    lesson: g
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

            <h2>{active}</h2>

            <Input>
                <h4>Description</h4>
                <input
                    style={{ backgroundColor: constants.accentWhite }}
                    onChange={(e) => { setDesc(e.target.value) }}
                />
                <h4>Proper Name</h4>
                <input
                    style={{ backgroundColor: constants.accentWhite }}
                    onChange={(e) => { setName(e.target.value) }}
                />

                <br />

                <AnswerButton
                    disabled={active === 'none'}
                    style={{ backgroundColor: constants.accentPurple85, }}
                    onClick={() => {
                        sphereSender(
                            data,
                            name,
                            desc,
                            !hasElement(db, data)
                        );
                        clearAll()
                    }}
                >
                    submit
                </AnswerButton>


            </Input>
        </MainContainer>
    );
};






export default AddDesc

export const getServerSideProps = async () => {
    const allLessons = getAllLessons(false)

    const db = await getStructure()

    return {
        props: {
            paths: allLessons,
            db: db
        }
    }
};