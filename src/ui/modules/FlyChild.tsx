import Lottie from 'react-lottie'
import animationData from '../../../public/src/lottie/fly_child.json'

export default function FlyChild() {
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
      <Lottie options={defaultOptions} height={210} width={190} />
    </>
  )
}
