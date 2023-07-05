import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from 'next/dynamic';

const MDEditor = dynamic(
  ()=> import('@uiw/react-md-editor'), {ssr: false}
)


const MarkdownEditor = ({value, change}) => {
  
  return (
    <div data-color-mode="light" className='container' style={{width: '75vw'}}>
      <MDEditor
        height={400}
        autofocus={false}
//        hideToolbar={true}
        value={value}
        onChange={change}
      />
    </div>
  )
}

export default MarkdownEditor