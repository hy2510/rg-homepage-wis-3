'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import {
  Button,
  Modal,
  SelectBox,
  SelectBoxItem,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

type StudentHistorySelectProps = {
  studentHistoryList: {
    studentHistoryId: string
    classId: string
    className: string
  }[]
  defaultStudentHistoryId: string
  onCloseModal?: () => void
  onSelectStudentHistoryId?: (studentHistoryId: string) => void
}
export default function StudentHistorySelectModal({
  studentHistoryList,
  defaultStudentHistoryId,
  onCloseModal,
  onSelectStudentHistoryId,
}: StudentHistorySelectProps) {
  const styleModal = useStyle('global_option_my_rg')

  // @Language 'common'
  const { t } = useTranslation()

  const [studentHistoryId, setStudentHistoryId] = useState(
    defaultStudentHistoryId,
  )

  return (
    <Modal
      compact
      header
      title={t('t338')}
      onClickDelete={() => {
        onCloseModal && onCloseModal()
      }}
      onClickLightbox={() => {
        onCloseModal && onCloseModal()
      }}>
      <div className={styleModal.my_rg_modal}>
        <div className={styleModal.set_study_mode}>
          <div className={styleModal.row_a}>
            <SelectBox
              value={studentHistoryId}
              onChange={(e) => {
                const stdHistoryId = e.target.value
                setStudentHistoryId(stdHistoryId)
              }}>
              {studentHistoryList.map((stdHistory) => {
                return (
                  <SelectBoxItem
                    key={stdHistory.studentHistoryId}
                    value={stdHistory.studentHistoryId}>
                    {stdHistory.className}
                  </SelectBoxItem>
                )
              })}
            </SelectBox>
            <Button
              onClick={() => {
                onSelectStudentHistoryId &&
                  onSelectStudentHistoryId(studentHistoryId)
              }}>
              {t('t339')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
