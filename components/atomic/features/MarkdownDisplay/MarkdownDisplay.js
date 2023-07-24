'use client'
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';

function MarkdownDisplay({ params, searchParams, components, source, qs }) {
  return (
    <MDXRemote
      {...source}
      scope={{
        path: [params.sphere, params.course, params.lesson],
        sphere: params.sphere,
        course: params.course,
        lesson: params.lesson,
        user: searchParams.ID,
        qs: qs
      }}
      components={components}
    />
  );
}

export default MarkdownDisplay;
