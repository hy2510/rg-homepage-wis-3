import SITE_PATH from '@/app/site-path'
import { redirect } from 'next/navigation'

export default function Page() {
  redirect(`${SITE_PATH.HOME.EVENT_READING_CAMPAIN}/2023`)
}
