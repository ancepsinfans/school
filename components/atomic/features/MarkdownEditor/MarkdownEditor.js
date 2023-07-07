import React from "react";
import 'bytemd/dist/index.css'
import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import { Editor } from '@bytemd/react'



const MarkdownEditor = ({ value, change }) => {

  return (
    <div style={{ width: '80vw', textAlign: 'left' }}>
      <Editor
        plugins={[
          gfm(),
          breaks(),
          frontmatter(),
          gemoji()
        ]}
        mode='auto'
        value={value}
        onChange={change}
      />
    </div>
  )
}

export default MarkdownEditor