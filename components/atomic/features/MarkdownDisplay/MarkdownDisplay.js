'use client'
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { useParams } from 'next/navigation';
import { IdContext } from '@/components/providers/IdProvider';

function MarkdownDisplay({ components, source, qs }) {
  const params = useParams()
  const { id } = React.useContext(IdContext)

  return (
    <MDXRemote
      {...source}
      scope={{
        path: [params.sphere, params.course, params.lesson],
        sphere: params.sphere,
        course: params.course,
        lesson: params.lesson,
        user: id,
        qs: qs
      }}
      components={components}
    />
  );
}

export default MarkdownDisplay;
