import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'
import { getAllCompanions, getUserCompanions, getUserSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'

const Page = async () => {
  const { userId } = await auth()

  const popCompanions = await getAllCompanions({ limit: 5 })
  const recentSessionsCompanions = await getUserSessions(userId)

  let myCompanions;
  if (userId) {
    myCompanions = await getUserCompanions(userId)
  }

  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>

      <section className='home-section'>
        {popCompanions?.map((companion) => (
          <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
        ))}
      </section>

      {userId ? (
        <>
          <h1 className='text-2xl underline'>My Companions</h1>

          <section className='home-section'>
            {myCompanions?.map((companion) => (
              <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
            ))}
          </section>
        </>
      ) : (<></>)}

      <section className='home-section'>
        <CompanionsList
          title="Recently Completed Sessions"
          companions={recentSessionsCompanions}
          ClassNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page