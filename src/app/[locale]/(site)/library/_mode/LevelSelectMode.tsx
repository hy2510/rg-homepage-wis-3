'use client'

import { useFetchSetStudentDailyLearningLevel } from '@/client/store/student/daily-learning/hook'
import { IntroChooseLevel } from '@/ui/modules/library-intro-choose-level/intro-choose-level'

export default function LevelSelectMode() {
  const { loading: isLevelChangeLoading, fetch: fetchLevelChange } =
    useFetchSetStudentDailyLearningLevel()

  const onLevelSelect = (level: string) => {
    if (!isLevelChangeLoading) {
      fetchLevelChange(level)
    }
  }

  return <IntroChooseLevel onChooseLevel={onLevelSelect} />
}
