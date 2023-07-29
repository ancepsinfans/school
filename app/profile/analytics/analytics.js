'use client'
import constants from '@/styles/constants';
import React from 'react';
import { Title } from '@/components/layout';
import Image from 'next/image';
import styles from './Analytics.module.css'


export default function Analytics({ paths, user, studentInfo }) {


  const ans = studentInfo.answers
  const progress = studentInfo.progress


  /* Answers logic */
  let numCorrect = 0
  let totalAttempts = 0
  let attemptList = {}
  let questionTypes = {}
  let questionsAnswered = new Set()

  ans.map((e) => {
    totalAttempts += 1;
    questionTypes[e.sphere] = {
      [e.id]: 0,
      'correct': 0,
      'type': [],
      'total_attempts': 0
    }
    attemptList[e.id] = e.attempt
    questionsAnswered.add(e.id)
  })

  ans.map((e) => {
    if (e.answer === e.correct) {
      numCorrect += 1
      questionTypes[e.sphere]['correct'] += 1
    }
    questionTypes[e.sphere]['type'].push(e.type)
    questionTypes[e.sphere]['total_attempts'] += 1
    questionTypes[e.sphere][e.id] += 1
  })

  /* Progress logic */
  // Need to improve mongo query to accomplish this
  let progressSpheres = new Set()
  let progressCourses = new Set()
  let spheresPageCount = {}

  progress.map(e => {
    progressSpheres.add(e.sphere)
    progressCourses.add(e.course)
  })

  progressSpheres.forEach(e => {
    spheresPageCount[e] = {}
    progressCourses.forEach(f => {
      spheresPageCount[e][f] = new Set()
    })
  })

  progress.map(e => {
    spheresPageCount[e.sphere][e.course].add(e.lesson)
  })

  return (
    <>

      <Title smallTitle>
        <div className={styles.image}>
          {user.image ? <Image src={user.image} width={50} height={50} alt="avatar" /> : null}
          <h4>{user.name}</h4>
        </div>
      </Title>


      <div className={styles.stats}>
        <h3 className={styles.subheading}>Answers Statistics</h3>
        <p>Total correct answers: {numCorrect}</p>
        <p>Total questions answered: {questionsAnswered.size}</p>
        <p>Total attempts: {totalAttempts}</p>
        <p>Percent correct: {(numCorrect / totalAttempts * 100).toFixed(2)}%</p>
        <hr style={{ backgroundColor: constants.blackMain, margin: '5px', borderStyle: 'solid' }} />
        <ul>{Object.entries(questionTypes).map(([key, value], idx) => {
          const properName = paths.find(i => i.slug === key)?.sphere
          return (
            <li className={styles.list} key={idx}>{properName ? properName : key}
              <ul style={{ padding: '0 20px' }}>

                <li className={styles.list} key={`${idx}_1`}>{(questionTypes[key]['correct'] / questionTypes[key]['total_attempts'] * 100).toFixed(1)}% correct</li>
              </ul>
            </li>
          )
        }
        )}</ul>
      </div>

      <div className={styles.stats}>
        <h3 className={styles.subheading}>Progress</h3>
        {/* add support for unopened spheres? */}
        <ul>
          {Object.entries(spheresPageCount).map(([key, value], i) => {
            const properName = paths.find(i => i.slug === key).sphere

            return (
              <li className={styles.list} key={i}>
                {properName ? properName : key}
                <ul style={{ padding: '0 20px' }}>
                  {Object.entries(value).map(([k, v], j) => {
                    const course = paths
                      .find(({ slug }) => slug === key)
                      ?.courses
                      .find(({ slug }) => slug === k)
                    return (

                      <li className={styles.list} key={j}>

                        {course?.course}: {(v.size / course?.lessons.length * 100).toFixed(1)}% complete
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}</ul>
      </div>
    </>
  )
}



