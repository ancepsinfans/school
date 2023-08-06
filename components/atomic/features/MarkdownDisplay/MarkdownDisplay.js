'use client'
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { useParams } from 'next/navigation';

function MarkdownDisplay({ ID, components, source, qs }) {
  const params = useParams()

  return (
    <MDXRemote
      {...source}
      scope={{
        path: [params.sphere, params.course, params.lesson],
        sphere: params.sphere,
        course: params.course,
        lesson: params.lesson,
        user: ID,
        qs: qs
      }}
      components={components}
    />
  );
}

export default MarkdownDisplay;
