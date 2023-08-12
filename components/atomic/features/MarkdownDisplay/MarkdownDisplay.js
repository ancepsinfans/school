'use client'
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { useParams } from 'next/navigation';
import { IdContext } from '@/components/providers/IdProvider';

function MarkdownDisplay({ components, source, qs, isPlaceholder = false }) {
  const params = useParams()
  const { id } = React.useContext(IdContext)
  if (isPlaceholder) {
    return (
      <>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ligula ullamcorper malesuada proin. Lectus nulla at volutpat diam ut. Purus sit amet luctus venenatis lectus magna fringilla urna. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Vestibulum lorem sed risus ultricies. Faucibus a pellentesque sit amet. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Fermentum odio eu feugiat pretium nibh ipsum. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Justo laoreet sit amet cursus sit. Vel fringilla est ullamcorper eget nulla facilisi. Tempus quam pellentesque nec nam aliquam. Dignissim cras tincidunt lobortis feugiat vivamus at. Mauris cursus mattis molestie a iaculis at.</p>

        <p>Aliquam ut porttitor leo a diam sollicitudin.Quam viverra orci sagittis eu volutpat odio facilisis mauris.Quam viverra orci sagittis eu volutpat odio facilisis mauris.Tincidunt praesent semper feugiat nibh sed.Mattis pellentesque id nibh tortor id.Faucibus et molestie ac feugiat sed.Nulla porttitor massa id neque.Posuere morbi leo urna molestie at.Gravida cum sociis natoque penatibus et magnis dis parturient montes.Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat.Elementum nisi quis eleifend quam adipiscing vitae proin.Amet commodo nulla facilisi nullam vehicula ipsum a.Magna sit amet purus gravida quis blandit turpis.Aliquet nec ullamcorper sit amet risus nullam eget.Dictumst vestibulum rhoncus est pellentesque elit.Adipiscing elit pellentesque habitant morbi tristique senectus et netus et.Vel facilisis volutpat est velit egestas dui id.Nunc eget lorem dolor sed viverra.</p>


        <p>Eu facilisis sed odio morbi quis commodo odio aenean. Gravida quis blandit turpis cursus in hac. Erat velit scelerisque in dictum non consectetur a. Nulla porttitor massa id neque aliquam vestibulum. Dignissim enim sit amet venenatis urna cursus eget nunc. Tincidunt praesent semper feugiat nibh. Lacus sed viverra tellus in hac habitasse. Facilisis volutpat est velit egestas dui. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Curabitur vitae nunc sed velit dignissim sodales ut eu. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Volutpat consequat mauris nunc congue nisi vitae. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Quisque id diam vel quam elementum pulvinar etiam.</p>

        <p>Mi ipsum faucibus vitae aliquet. Maecenas volutpat blandit aliquam etiam erat. Euismod elementum nisi quis eleifend quam adipiscing vitae. Tortor posuere ac ut consequat. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Sit amet consectetur adipiscing elit. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Est velit egestas dui id ornare arcu. Adipiscing elit ut aliquam purus. Lorem ipsum dolor sit amet consectetur. Aliquam etiam erat velit scelerisque in dictum. Interdum velit euismod in pellentesque. Nibh praesent tristique magna sit amet purus gravida quis.</p>

        <p>Lorem mollis aliquam ut porttitor leo a diam. Ut faucibus pulvinar elementum integer. Venenatis urna cursus eget nunc. Eu non diam phasellus vestibulum lorem sed. Velit scelerisque in dictum non. Risus pretium quam vulputate dignissim suspendisse in est. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Est velit egestas dui id ornare arcu odio ut. Urna condimentum mattis pellentesque id. Phasellus faucibus scelerisque eleifend donec pretium. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Tincidunt tortor aliquam nulla facilisi cras. Neque ornare aenean euismod elementum nisi quis eleifend quam. Nunc lobortis mattis aliquam faucibus purus in massa tempor. Nunc consequat interdum varius sit amet mattis vulputate. Eleifend mi in nulla posuere sollicitudin aliquam.</p>
      </>
    )
  }
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
