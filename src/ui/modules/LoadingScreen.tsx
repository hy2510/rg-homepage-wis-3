import useTranslation from '@/localization/client/useTranslations'
import Lottie from 'react-lottie'
import animationData from '../../../public/src/lottie/loading.json'

export default function LoadingScreen() {
  // @Language 'common'
  const { t } = useTranslation()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div
        style={{
          width: '130px',
          height: '130px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.8em',
          fontWeight: '500',
          color: '#000',
          paddingTop: '10px',
        }}>
        <Lottie options={defaultOptions} height={60} width={90} />
        <div>{t('t450')}</div>
      </div>
    </div>
  )
}
