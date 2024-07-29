import Lottie from 'react-lottie'
import animationData from '../../../public/src/lottie/fire.json'

export default function StreakFire() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      <Lottie options={defaultOptions} height={36} width={36} />
    </>
  )
}
