import { useEffect, useState } from 'react'
import axios from 'axios'


export default function useQuestion(sphere, id) {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            if (sphere && id) {
                await axios.get(`/api/questions`, { params: { sphere: sphere, id: id } })
                    .then(function (response) {
                        setData(response.data.data)

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else if (!sphere) {
                await axios.get(`/api/questions`, { params: { id: id } })
                    .then(function (response) {
                        setData(response.data.data)

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else if (!id) {
                await axios.get(`/api/questions`, { params: { sphere: sphere } })
                    .then(function (response) {
                        setData(response.data.data)

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                await axios.get(`/api/questions`)
                    .then(function (response) {
                        setData(response.data.data)

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }



        }
        fetchData()
    }, [sphere, id])
    return data
}

