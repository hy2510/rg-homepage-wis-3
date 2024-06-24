const LEVELS = [
  'PK',
  'KA',
  'KB',
  'KC',
  '1A',
  '1B',
  '1C',
  '2A',
  '2B',
  '2C',
  '3A',
  '3B',
  '3C',
  '4A',
  '4B',
  '4C',
  '5A',
  '5B',
  '5C',
  '6A',
  '6B',
  '6C',
]

function nextLevel(level: string): string | undefined {
  let myLevel = level.toUpperCase()
  if (
    myLevel === 'PRE K' ||
    myLevel === 'PREK' ||
    myLevel === 'DODO ABC' ||
    myLevel === 'DODOABC'
  ) {
    myLevel = 'PK'
  }

  const myLevelIndex = LEVELS.findIndex((lv) => lv === myLevel)
  if (myLevelIndex === LEVELS.length - 1) {
    return
  }
  return LEVELS[myLevelIndex + 1]
}

function previousLevel(level: string): string | undefined {
  let myLevel = level.toUpperCase()
  if (
    myLevel === 'PRE K' ||
    myLevel === 'PREK' ||
    myLevel === 'DODO ABC' ||
    myLevel === 'DODOABC'
  ) {
    myLevel = 'PK'
  }

  const myLevelIndex = LEVELS.findIndex((lv) => lv === myLevel)
  if (myLevelIndex <= 0) {
    return
  }
  return LEVELS[myLevelIndex - 1]
}

const LevelUtils = {
  nextLevel,
  previousLevel,
}
export default LevelUtils
