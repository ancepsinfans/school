import { Title, Intro, Grid, GridCard, AdminTools } from '@/components/layout'
import { fetchDBStructure } from '../middleware'

export default async function Page() {
    const db = await fetchDBStructure({})
    return (
        <>
            <Title>
                Welcome to <span className="school" >school</span>!
            </Title>
            <Intro>
                <div>
                    <p>Knowledge should be accessible.</p>
                    <p>Here you'll find a collection of interesting things.</p>
                    <p>The topics will vary, but the through-line is that these things are meant to spark curiosity.</p>
                </div>
            </Intro>
            <AdminTools />

            <Grid>
                {
                    db.map((e) => {
                        return (
                            <GridCard
                                hidden={!e.show}
                                isDisabled={e.disable}
                                key={e._id}
                                link={`/study/${e.slug}`}
                                title={e.sphere}
                                description={e.description}
                            />
                        )
                    })
                }
            </Grid>

        </>
    )
}

