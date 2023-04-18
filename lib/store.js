import create from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(persist((set, get) => ({

    completedPages: new Set,
    addPageVisit: (sphere, course, lesson) =>
        set((state) => (
            { completedPages: state.completedPages.add([sphere, course, lesson].join('/')) }
        ))
})))


export default useProgressStore

