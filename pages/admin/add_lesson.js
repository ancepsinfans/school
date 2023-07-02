import React from "react";
import constants from "../../styles/constants";
import sphereSender from "../../models/spheres/sphereHelper";
import styled from "styled-components";
import { MainContainer } from "../../components/meta";
import { useRouter } from "next/router";
import { fetchDBStructure, fetchFileTreeStructure, getAnyName, hasElement } from "../../middleware";
import { useImmer } from "use-immer";
import { TextInput, SubmitButton, SelectInput } from "../../components/atomic";


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
        desc: '',
        show: true,
        disable: false,
        linear: true,

    }
    const [data, updateData] = useImmer(INIT)

    const router = useRouter()
    const lessonsAll = Object.keys(paths).map(e=>{return  Object.keys(paths[e]).map(f=>{return [e, f, paths[e][f]['files']]})})
    const lessonLevel1 = [].concat.apply([],lessonsAll)

    
    console.log(lessonLevel1[1])
    
    const level = !!data.sphere + !!data.course + !!data.lesson

    return (
        <MainContainer MainContainer
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
            
                <SelectInput
                    disabled={level!==2}
                    value={data.lesson}
                    onChange={event => {
                        updateData((draft) => { draft.lesson = event.target.value })
                    }}
                    optionsLogic={
                        <>
                            
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </>
                    }
                    label='Course linear'
                />
            
            
            
                <TextInput value={data.desc} onChange={(e) => { updateData((draft) => { draft.desc = e.target.value }) }} label={'Description'} />
                <p>Currently: {getAnyName(db, data, level)?.description}</p>

                <TextInput value={data.name} onChange={(e) => { updateData((draft) => { draft.name = e.target.value }) }} label={'Proper Name'} />
                <p>Currently: {getAnyName(db, data, level)?.name}</p>
                <br />

                <SubmitButton
                    disabled={level===0}
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
    console.log(pageStructure)
    return {
        props: {
            paths: pageStructure,
            db: dbData,
        }
    }
};