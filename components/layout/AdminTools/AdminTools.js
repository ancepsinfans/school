'use client'
import React from 'react';
import { Grid, GridCard } from '@/components/layout'
import { useSession } from 'next-auth/react'

function AdminTools() {
  const { data: session } = useSession()

  const user = (!!session ? session.user : undefined)
  const isAdmin =
    (
      user && user.email == 'zachary.r.bullard@gmail.com' ? true : false
    )

  if (!isAdmin) {
    return (<></>)
  }

  return (
    <>
      <Grid>
        <GridCard
          isAdmin={isAdmin}
          isRestricted={true}
          link='/admin/add_q'
          title='Add questions'
        />

        <GridCard
          isAdmin={isAdmin}
          isRestricted={true}
          link='/admin/add_lesson'
          title='Add lesson text'
        />

      </Grid>
      <hr style={{ margin: '5px', borderStyle: 'solid', width: '100%' }} hidden={!isAdmin} />
    </>
  );
}

export default AdminTools;
