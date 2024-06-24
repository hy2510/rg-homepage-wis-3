'use client'

// @Deprecate('Not Used')
import './course-list.scss'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'course_list'

// 코스 리스트
export function CourseList({
  passedNum,
  totalNum,
  children,
  introVideoSrc,
  outroVideoSrc,
  introBgUrl1,
  introBgUrl2,
  introBgUrl3,
  introBg,
  outroBg,
  outroBgUrl,
  courseBgUrl,
}: {
  passedNum: number
  totalNum: number
  children?: ReactNode
  introVideoSrc?: string
  outroVideoSrc?: string
  introBgUrl1?: string
  introBgUrl2?: string
  introBgUrl3?: string
  introBg?: string
  outroBg?: string
  outroBgUrl?: string
  courseBgUrl?: string
}) {
  const style = useStyle(STYLE_ID)

  const IntroVideoBox = () => {
    return (
      <div className={style.video_wraper}>
        <video controls>
          <source src={introVideoSrc} type="video/mp4" />
        </video>
      </div>
    )
  }

  const OutroVidioBox = () => {
    return (
      <div className={style.video_wraper}>
        <video controls>
          <source src={outroVideoSrc} type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <>
      <div className={style.row_a}>
        <div className={style.row_a_container}>
          <div className={style.txt_h}>완료한 학습</div>
          <div className={style.completed_status}>
            <div className={style.txt_l1}>{passedNum}</div>
            <div className={style.txt_l2}>/{totalNum}</div>
          </div>
        </div>
      </div>
      <div className={style.intro_movie}>
        <div className={`intro_bg ${introBg}`}></div>
        {introVideoSrc && <IntroVideoBox />}
      </div>
      <div className={style.course_list}>{children}</div>
      {outroVideoSrc && (
        <div className={style.outro_movie}>
          <OutroVidioBox />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Button color={'gray'} width={'400'} shadow>
              Go to Next!
            </Button>
          </div>
          <div className={`outro_bg ${outroBg}`}></div>
        </div>
      )}
      {/* <div
        className={style.course_bg}
        style={{
          backgroundImage: `url(${courseBgUrl})`,
        }}
      ></div> */}
    </>
  )
}

// 코스 아이템
export function CourseItem({
  prevNum,
  currentNum,
  imgSrc,
  title,
  vocaSrc,
  passCount,
  bookCode,
  studyData,
}: {
  prevNum: number
  currentNum: number
  imgSrc: string
  title: string
  vocaSrc?: string
  passCount: number
  bookCode: string
  studyData: any[]
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.course_item}>
      <div className={style.col_a}>
        <div className={style.check_study}>
          <div className={style.status}>
            <div
              className={`${style.streak_front} ${
                prevNum == -1
                  ? undefined
                  : studyData[prevNum].passed === 'Y' && style.prev_passed
              }`}></div>
            {studyData[currentNum].passed === 'Y' ? (
              <Image
                alt=""
                src="/src/images/@course-list/study_passed.svg"
                width={50}
                height={50}
              />
            ) : (
              <Image
                alt=""
                src="/src/images/@course-list/study_ready.svg"
                width={50}
                height={50}
              />
            )}

            <div
              className={`${style.streak_back} ${
                studyData[currentNum].passed === 'Y' && style.passed
              }`}></div>
          </div>
        </div>
        <div
          className={`${style.cover} ${
            prevNum == -1
              ? undefined
              : studyData[prevNum].passed === 'Y' &&
                  studyData[currentNum].passed === 'N'
                ? style.heartbeat
                : undefined
          } ${
            currentNum == 0
              ? studyData[currentNum].passed === 'N' && style.heartbeat
              : undefined
          }`}>
          <Image
            alt=""
            src={imgSrc}
            layout="intrinsic"
            width={300}
            height={170}
            className={`${
              prevNum == -1
                ? undefined
                : studyData[prevNum].passed === 'Y' &&
                    studyData[currentNum].passed === 'N'
                  ? style.done
                  : style.ready
            } ${studyData[currentNum].passed === 'Y' && style.done}`}
          />
        </div>
        <div className={style.txt_h}>{title}</div>
      </div>
      <div className={style.col_b}>
        <div
          className={`${style.button} ${
            prevNum == -1
              ? undefined
              : studyData[prevNum].passed === 'Y' &&
                  studyData[currentNum].passed === 'N'
                ? style.voca_download
                : style.voca_download_ready
          } ${
            currentNum == 0
              ? studyData[currentNum].passed === 'N'
                ? style.voca_download
                : style.voca_download_ready
              : undefined
          }`}>
          <Image
            alt=""
            src="/src/images/@course-list/download.svg"
            width={20}
            height={20}
          />
        </div>
        <div
          className={`${style.button} ${
            prevNum == -1
              ? undefined
              : studyData[prevNum].passed === 'Y' &&
                  studyData[currentNum].passed === 'N'
                ? style.start
                : style.start_ready
          } ${studyData[currentNum].passed === 'Y' && style.review} ${
            currentNum == 0
              ? studyData[currentNum].passed === 'N' && style.start
              : undefined
          }`}>
          {studyData[currentNum].passed === 'Y' ? '복습' : '시작'}
        </div>
      </div>
    </div>
  )
}
