'use client'
import React from "react";
import constants from '@/styles/constants'
import feedbackSender from '@/models/users/feedbackHelper'
import { useImmer } from "use-immer";
import styles from './MCorOther.module.css'

const MCorOther = ({ user, options, desc, path, id, withOther }) => {
  const INIT = {
    otherClicked: false,
    otherValue: '',
    isSumbitted: false,
    response: [],
    color: new Array(options.length).fill(constants.primaryMain)
  }
  const [data, updateData] = useImmer(INIT)
  const concatID = path.join('/') + '_' + id

  return (
    <div className={styles.question}>
      <h2>{(desc ? desc : null)}</h2>
      {!data.isSumbitted ?
        <ol>
          {options.map((ans, i) => {
            return (
              <li key={`${i}_${ans} `} style={{ listStyle: 'none' }}>
                <button
                  className={styles.answer}
                  key={i}
                  style={{ backgroundColor: data.color[i] }}
                  onClick={() => {
                    updateData((draft) => {
                      draft.response = [...data.response, ans]
                      draft.color[i] = constants.accentBrown65
                    })
                  }}
                >
                  {ans}
                </button>

              </li>
            )
          })}
          {withOther ?
            <li key={'other'} style={{ listStyle: 'none' }}>
              {!data.otherClicked ?
                <button
                  className={styles.otherButton}
                  onClick={() => {
                    updateData((draft) => { draft.otherClicked = true })
                  }}
                >
                  other
                </button> :
                <div className={styles.inputContainer}>
                  <input
                    className={styles.inputField}
                    onChange={(e) => { updateData((draft) => { draft.otherValue = e.target.value }) }}
                  />
                  <button
                    className={styles.check}
                    onClick={() => {
                      updateData((draft) => { draft.response.push(data.otherValue); draft.otherValue = '' })
                    }}
                  >✔️</button>
                </div>
              }
            </li> :
            null
          }

        </ol> :
        null
      }
      <ol>
        <li style={{ listStyle: 'none', }}>
          <button
            className={`${styles.answer} ${styles.submit} ${data.isSumbitted ? styles.selected : null}`}
            disabled={data.isSumbitted}
            onClick={
              () => {
                updateData((draft) => {
                  draft.isSumbitted = true
                })
                feedbackSender(
                  user,
                  data.response,
                  concatID,
                  path
                );
              }
            }
          >
            {!data.isSumbitted ? 'Submit' : 'thanks!'}
          </button>
        </li>
      </ol>
    </div >
  )
}

export default MCorOther;

