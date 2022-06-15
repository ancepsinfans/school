import Question from '../models/questions/Questions'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function useQuestion(sphere, id) {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {

            await axios.get(`/api/questions`, { params: { sphere: sphere, id: id } })
                .then(function (response) {
                    setData(response.data.data)

                })
                .catch(function (error) {
                    console.log(error)
                })

        }
        fetchData()
    }, [])
    return data
}

