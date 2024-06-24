import { useRouter } from 'next/navigation'
import { useFetchSignout } from '@/client/store/account/signout/hook'
import { useApplicationType } from '../_context/AppContext'
import SITE_PATH from '../site-path'

export default function useLogout() {
  const appType = useApplicationType()
  const router = useRouter()
  const { fetch: logoutFetch } = useFetchSignout()
  const onLogout = () => {
    logoutFetch({
      callback: (data) => {
        if (data) {
          if (appType === 'app') {
            router.replace(SITE_PATH.ACCOUNT.MAIN)
          } else {
            router.replace(SITE_PATH.HOME.MAIN)
          }
        }
      },
    })
  }

  return onLogout
}
