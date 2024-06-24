'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { AlertBox, Button, Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'review_assessment_report'

export const ReviewAssessmentReport = ({
  onClickDelete,
  onClickLightbox,
  bookImgSrc,
  title,
  author,
  addedToDo = false,
  addedFavorite = false,
  bookCode,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  earnPoints,
  _viewAssessment,
}: {
  onClickDelete?: () => void
  onClickLightbox?: () => void
  bookImgSrc: string
  title: string
  author?: string
  addedToDo?: boolean
  addedFavorite?: boolean
  bookCode: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  earnPoints: number
  _viewAssessment?: (isView: boolean) => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [isFavoriteOn, _isFavoriteOn] = useState(addedFavorite)
  const [isFavoriteCheck, _isFavoriteCheck] = useState(false)
  const [isToDoOn, _isToDoOn] = useState(addedToDo)
  const [isToDoCheck, _isToDoCheck] = useState(false)

  const SubTitle = ({ children }: { children?: ReactNode }) => {
    return <div className={style.sub_title}>{children}</div>
  }

  const AddAssignment = ({ children }: { children?: ReactNode }) => {
    return (
      <div className={style.add_assignment}>
        <div className={style.add_assignment_container}>{children}</div>
      </div>
    )
  }

  const AddFavorite = () => {
    return (
      <div className={style.add_favorite}>
        <div
          className={style.add_favorite_icon}
          onClick={() => {
            _isFavoriteCheck(true)
            _isToDoCheck(false)
          }}>
          {isFavoriteOn ? (
            <Image
              alt=""
              src="/src/images/@book-info/add_favorite_on.svg"
              width={24}
              height={24}
            />
          ) : (
            <Image
              alt=""
              src="/src/images/@book-info/add_favorite_off.svg"
              width={24}
              height={24}
            />
          )}
        </div>
        {isFavoriteOn ? (
          isFavoriteCheck ? (
            <div className={style.alert}>
              <AlertBox
                toolTipRight
                text={t('t478')}
                onClickY={() => {
                  _isFavoriteOn(false)
                  _isFavoriteCheck(false)
                }}
                onClickN={() => {
                  _isFavoriteCheck(false)
                }}
              />
            </div>
          ) : (
            <></>
          )
        ) : isFavoriteCheck ? (
          <div className={style.alert}>
            <AlertBox
              toolTipRight
              text={t('t479')}
              onClickY={() => {
                _isFavoriteOn(true)
                _isFavoriteCheck(false)
              }}
              onClickN={() => {
                _isFavoriteCheck(false)
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }

  const AddTodo = () => {
    return (
      <div className={style.add_todo}>
        <div
          className={style.add_todo_icon}
          onClick={() => {
            _isFavoriteCheck(false)
            _isToDoCheck(true)
          }}>
          {isToDoOn ? (
            <Image
              alt=""
              src="/src/images/@book-info/add_to_do_on.svg"
              width={24}
              height={24}
            />
          ) : (
            <Image
              alt=""
              src="/src/images/@book-info/add_to_do_off.svg"
              width={24}
              height={24}
            />
          )}
        </div>
        {isToDoOn ? (
          isToDoCheck ? (
            <div className={style.alert}>
              <AlertBox
                toolTipRight={true}
                text={t('t480')}
                onClickY={() => {
                  _isToDoOn(false)
                  _isToDoCheck(false)
                }}
                onClickN={() => {
                  _isToDoCheck(false)
                }}
              />
            </div>
          ) : (
            <></>
          )
        ) : isToDoCheck ? (
          <div className={style.alert}>
            <AlertBox
              toolTipRight={true}
              text={t('t481')}
              onClickY={() => {
                _isToDoOn(true)
                _isToDoCheck(false)
              }}
              onClickN={() => {
                _isToDoCheck(false)
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }

  const Book = () => {
    return (
      <div className={style.book}>
        <div className={style.book_container}>
          <div className={style.book_image}>
            <Image
              alt=""
              src={bookImgSrc}
              layout="intrinsic"
              width={200}
              height={200}
            />
          </div>
          <div className={style.txt_h}>{title}</div>
          <div className={style.txt_l}>{author}</div>
        </div>
        <div className={style.download}>
          <div className={style.download_voca}>
            <span>{t('t534')}</span>
            <Image
              alt=""
              src="/src/images/@book-info/download.svg"
              width={14}
              height={14}
            />
          </div>
          <div className={style.download_worksheet}>
            <span>{t('t535')}</span>
            <Image
              alt=""
              src="/src/images/@book-info/download.svg"
              width={14}
              height={14}
            />
          </div>
        </div>
      </div>
    )
  }

  const Review = () => {
    return (
      <div className={style.review}>
        <Button width="100%" color={'dark'}>
          {t('t536')}
        </Button>
        <Button width="100%" color={isPassed ? 'blue' : 'red'}>
          {t('t542')}
        </Button>
      </div>
    )
  }

  // (북코드, 학습 완료일, 총점, 통과했는가, 학습 모드 - 1st or full, 획득포인트 )
  const StudyInfo = ({
    bookCode,
    studyDate,
    totalScore,
    isPassed,
    completedInfo,
    earnPoints,
  }: {
    bookCode: string
    studyDate: string
    totalScore: number
    isPassed: boolean
    completedInfo: string
    earnPoints: number
  }) => {
    return (
      <div className={style.study_info}>
        <div className={style.detaild}>
          <div className={style.detaild_item}>{t('t470')}</div>
          <div className={style.detaild_item}>{bookCode}</div>
          <div className={style.detaild_item}>{t('t539')}</div>
          <div className={style.detaild_item}>{studyDate}</div>
          <div className={style.detaild_item}>{t('t540')}</div>
          <div className={style.detaild_item}>{totalScore}</div>
          <div className={style.detaild_item}>{t('t140')}</div>
          <div className={style.detaild_item}>
            <span style={{ color: isPassed ? '#15b5f1' : '#ff274f' }}>
              {isPassed ? 'PASS' : 'FAILD'}{' '}
              {isPassed &&
                '/ ' + completedInfo + ' (' + '+' + earnPoints + 'P' + ')'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const StepInfo = ({
    scoreStep1,
    scoreStep2,
    scoreStep3,
    scoreStep4,
    scoreStep5,
  }: {
    scoreStep1: number | '-'
    scoreStep2: number | '-'
    scoreStep3: number | '-'
    scoreStep4: number | '-'
    scoreStep5: number | '-'
  }) => {
    return (
      <div className={style.step_info}>
        <div className={style.label}>step1</div>
        <div className={style.label}>step2</div>
        <div className={style.label}>step3</div>
        <div className={style.label}>step4</div>
        <div className={style.label}>step5</div>
        <div className={style.score}>{scoreStep1}</div>
        <div className={style.score}>{scoreStep2}</div>
        <div className={style.score}>{scoreStep3}</div>
        <div className={style.score}>{scoreStep4}</div>
        <div className={style.score}>{scoreStep5}</div>
      </div>
    )
  }

  const MoreActivities = () => {
    return (
      <div className={style.book_resource}>
        <div className={style.book_resource_container}>
          <SubTitle>{t('t477')}</SubTitle>
          <div className={style.buttons}>
            <div className={style.speak_button}>{t('t541')}</div>
            <div className={style.movie_button}>{t('t543')}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal
      onClickLightbox={() => {
        _viewAssessment && _viewAssessment(false)
      }}>
      <div className={style.review_assessment_report}>
        <div
          className={style.col_a}
          style={{ backgroundImage: `url(${bookImgSrc})` }}>
          <div className={style.col_a_container}>
            <AddAssignment>
              <AddFavorite />
              <AddTodo />
            </AddAssignment>
            <Book />
            <Review />
          </div>
          <div className={style.light_box}></div>
        </div>
        <div className={style.col_b}>
          <div className={style.col_b_header}>
            <div className={style.txt_h}>{t('t537')}</div>
            <div
              className={style.delete_button}
              onClick={(e) => {
                e.stopPropagation()
                onClickDelete && onClickDelete()
              }}></div>
          </div>
          <div className={style.col_b_body}>
            <SubTitle>{t('t468')}</SubTitle>
            <StudyInfo
              bookCode={bookCode}
              studyDate={studyDate}
              totalScore={totalScore}
              isPassed={isPassed}
              completedInfo={completedInfo}
              earnPoints={earnPoints}
            />
            <SubTitle>{t('t538')}</SubTitle>
            <StepInfo
              scoreStep1={70}
              scoreStep2={70}
              scoreStep3={70}
              scoreStep4={70}
              scoreStep5={'-'}
            />

            <MoreActivities />
          </div>
        </div>
      </div>
    </Modal>
  )
}
