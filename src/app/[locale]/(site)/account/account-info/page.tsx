'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  useFetchChnagePassword,
  useFetchModifySmsReceive,
  useFetchUpdateStudentName,
} from '@/client/store/student/info/hook'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { CheckBox, TextField } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import {
  isValidatePassword,
  isValidatePasswordVn,
  isValidateStudentName,
} from '../sign-up/_component/Signup'

const STYLE_ID = 'page_account_info'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()
  const countryCode = customer.countryCode
  const student = useStudentInfo().payload

  const { fetch: fetchUpdateStudentName } = useFetchUpdateStudentName()
  const [newStudentName, setNewStudentName] = useState<{
    isEdit: boolean
    value: string
  }>({ isEdit: false, value: '' })
  const onChangeStudentName = (name: string) => {
    if (name.length === 0) {
      alert(t('t176'))
      return
    }
    if (!isValidateStudentName(name)) {
      alert(t('t177'))
      return
    }
    setNewStudentName({ isEdit: false, value: name })
    fetchUpdateStudentName({
      studentName: name,
      callback: (success) => {
        if (!success) {
          alert(t('t178'))
          setNewStudentName({ isEdit: true, value: name })
        } else {
          alert(t('t179'))
        }
      },
    })
  }

  const { fetch: fetchChangePassword } = useFetchChnagePassword()
  const [newPassword, setNewPassword] = useState<{
    isEdit: boolean
    oldValue: string
    newValue: string
  }>({ isEdit: false, oldValue: '', newValue: '' })
  const onChangePassword = (oldPassword: string, newPassword: string) => {
    if (oldPassword.length === 0) {
      alert(t('t180'))
      return
    }
    if (newPassword.length === 0) {
      alert(t('t181'))
      return
    }
    if (oldPassword === newPassword) {
      alert(t('t182'))
      return
    }
    if (countryCode === 'KR' && !isValidatePassword(newPassword)) {
      alert(t('t183', { num1: 8, num2: 20 }))
      return
    } else if (countryCode === 'VN' && !isValidatePasswordVn(newPassword)) {
      alert(t('t184', { num1: 8, num2: 20 }))
      return
    }
    setNewPassword({
      isEdit: false,
      oldValue: oldPassword,
      newValue: newPassword,
    })
    fetchChangePassword({
      oldPassword,
      newPassword,
      callback: (success) => {
        if (!success) {
          alert(t('t178'))
          setNewPassword({
            isEdit: true,
            oldValue: oldPassword,
            newValue: newPassword,
          })
        } else {
          alert(t('t185'))
          setNewPassword({ isEdit: false, oldValue: '', newValue: '' })
        }
      },
    })
  }

  const userName = student.name
  const userLoginId = student.loginId
  let userEmail = ''
  if (student.parentEmail) {
    userEmail = student.parentEmail
  } else if (student.studentEmail) {
    userEmail = student.studentEmail
  }
  let userPhone = ''
  if (student.parentCellPhone) {
    userPhone = student.parentCellPhone
  } else if (student.studentCellPhone) {
    userPhone = student.studentCellPhone
  }

  const isSmsReceive = student.smsReceiveYN
  const { fetch: fetchModifySmsAgree } = useFetchModifySmsReceive()
  const onChangeSmsReceive = (isReceive: boolean) => {
    if (!userPhone) {
      alert(t('t186'))
      return
    }
    fetchModifySmsAgree({
      isReceive,
      callback: (success) => {
        if (!success) {
          alert(t('t178'))
        } else {
          if (isReceive) {
            alert(t('t187'))
          } else {
            alert(t('t188'))
          }
        }
      },
    })
  }

  return (
    <main className={`${style.account_info} container compact`}>
      <div className={style.heading}>{t('t189')}</div>
      <div className={style.contents}>
        {/* 회원 & 결제 정보 */}
        <div className={style.sub_title}>{t('t190')}</div>
        <div className={`${style.description} ${style.include_link}`}>
          <div className={style.lable_text}>
            {t('t191', { num: student.studyEndDay })}
          </div>
          <div className={style.lable_text}>
            {t('t192', { txt: student.studyEndDate })}
          </div>
          <Link
            href="https://www.readinggate.com/Payment/Price"
            target="_blank"
            className={style.link_text}>
            {t('t193')}
          </Link>
        </div>
        <div className={style.form_box}>
          <EditTextField
            hint={t('t080')}
            value={newStudentName.isEdit ? newStudentName.value : userName}
            editMessage={t('t194')}
            saveMessage={t('t195')}
            isEdit={newStudentName.isEdit}
            onTextChange={(text) => {
              if (newStudentName.isEdit) {
                setNewStudentName({ isEdit: true, value: text })
              }
            }}
            onConfirmEdit={(isEdit, text) => {
              if (!isEdit) {
                setNewStudentName({ isEdit: true, value: userName })
              } else {
                onChangeStudentName(text)
              }
            }}
          />
          {userLoginId === userEmail ? (
            <div>
              <TextField hint={'ID(E-Mail)'} value={userEmail} disabled />
            </div>
          ) : (
            <>
              <div>
                <TextField hint={'ID'} value={userLoginId} disabled />
              </div>
              <div>
                <TextField hint={'E-Mail'} value={userEmail} disabled />
              </div>
            </>
          )}
          <EditChangePassword
            oldPassword={newPassword.oldValue}
            newPassword={newPassword.newValue}
            isEdit={newPassword.isEdit}
            onTextChange={(oldValue, newValue) => {
              setNewPassword({ ...newPassword, oldValue, newValue })
            }}
            onConfirmEdit={(oldValue, newValue) => {
              onChangePassword(oldValue, newValue)
            }}
            onModeChange={(isEdit) =>
              setNewPassword({ isEdit, oldValue: '', newValue: '' })
            }
          />

          {/* 전화번호가 있는 경우 */}
          <EditTextField
            hint={t('t196')}
            value={userPhone}
            editMessage={t('t194')}
            saveMessage={t('t197')}
          />
          {/* 전화번호가 없는 경우 */}

          {/* 전화번호를 변경할 경우 */}
          <div className={style.edit_phone_number}>
            <div className={style.row_1}>
              <div className={style.btn_edit}>
                <div className={style.text_blue}>
                  인증번호 받기
                </div>
              </div>
              <TextField
                hint={'변경할 전화번호 (- 없이 입력)'}
                password
              />
            </div>
            <div className={style.txt_message}>* 입력한 전화번호로 인증번호를 발송했습니다.</div>
            <div className={style.row_2}>
              <div className={style.btn_edit}>
                <div className={style.text_blue}>입력</div>
              </div>
              <TextField hint={'인증번호 입력 (10:00)'} />
            </div>
            <div className={style.txt_message}>* 입력한 인증번호가 정확하지 않습니다. 올바른 인증번호를 입력해 주세요.</div>
          </div>
        </div>
        <div className={style.check}>
          {/* 전화번호가 없는 경우 체크박스를 눌렀을 때 경고창 출력: 학습 리포트, 소식 등 알림을 받으려면 수신할 휴대전화번호가 필요합니다. 연락처 칸에서 휴대전화번호를 등록해 주세요. [확인] */}
          <CheckBox
            check={isSmsReceive}
            onClick={() => {
              onChangeSmsReceive(!isSmsReceive)
            }}
          />
          <span
            onClick={() => {
              onChangeSmsReceive(!isSmsReceive)
            }}>
            {t('t198')}
          </span>
        </div>
        <div className={style.accordion_box}>
          {/* <AccordionItem headerContents={t('t199')} bodyContents={'-'} /> */}
          <AccordionItem headerContents={t('t200')} bodyContents={<PauseSubscription />} />
          <AccordionItem headerContents={t('t201')} bodyContents={<AccountTermination />} />
        </div>

        <div>
          <Link href={SITE_PATH.ACCOUNT.PURCHASE_ANDROID}>
            Android 결제 테스트
          </Link>
          <br />
          <Link href={SITE_PATH.ACCOUNT.PURCHASE_IOS}>iOS 결제 테스트</Link>
        </div>
      </div>
    </main>
  )
}

// 수정하기 기능이 있는 텍스트 필드
const EditTextField = ({
  hint,
  value,
  editMessage,
  saveMessage,
  password,
  email,
  isEdit,
  onTextChange,
  onConfirmEdit,
}: {
  hint?: string
  value?: string
  editMessage?: string
  saveMessage?: string
  password?: boolean
  email?: boolean
  isEdit?: boolean
  onTextChange?: (text: string) => void
  onConfirmEdit?: (isEdit: boolean, text: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.edit_text_field}>
      <div
        className={style.btn_edit}
        onClick={() => {
          onConfirmEdit && onConfirmEdit(!!isEdit, value || '')
        }}>
        {!isEdit ? (
          editMessage
        ) : (
          <span className={style.text_blue}>{saveMessage}</span>
        )}
      </div>
      <TextField
        hint={hint}
        value={value}
        disabled={!isEdit}
        password={password}
        email={email}
        onTextChange={onTextChange}
      />
    </div>
  )
}

// 비밀번호 변경하기
const EditChangePassword = ({
  oldPassword,
  newPassword,
  isEdit,
  onTextChange,
  onConfirmEdit,
  onModeChange,
}: {
  oldPassword?: string
  newPassword?: string
  isEdit?: boolean
  onTextChange?: (oldValue: string, newValue: string) => void
  onConfirmEdit?: (oldPassword: string, newPassword: string) => void
  onModeChange?: (isEdit: boolean) => void
}) => {
  const style = useStyle(STYLE_ID)

  //@language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.edit_change_password}>
      {!isEdit ? (
        <>
          <div
            className={style.btn_edit}
            onClick={() => {
              onModeChange && onModeChange(true)
            }}>
            {t('t194')}
          </div>
          <TextField
            hint={t('t202')}
            value={'************'}
            disabled
            password
          />
        </>
      ) : (
        <div className={style.input_password}>
          <div className={style.row_1}>
            <TextField
              hint={t('t203')}
              password
              value={oldPassword}
              onTextChange={(text) => {
                onTextChange && onTextChange(text, newPassword || '')
              }}
            />
          </div>
          <div className={style.row_2}>
            <div className={style.btn_edit}>
              <div
                className={style.text_blue}
                onClick={() => {
                  onModeChange && onModeChange(false)
                }}>
                {t('t204')}
              </div>
              <div
                className={style.text_blue}
                onClick={() => {
                  onConfirmEdit &&
                    onConfirmEdit(oldPassword || '', newPassword || '')
                }}>
                {t('t097')}
              </div>
            </div>
            <TextField
              hint={t('t205')}
              password
              value={newPassword}
              onTextChange={(text) => {
                onTextChange && onTextChange(oldPassword || '', text)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// 아코디언 아이템
const AccordionItem = ({
  headerContents,
  bodyContents,
}: {
  headerContents?: string
  bodyContents?: any
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.accordion_item}>
      <div className={style.header}>
        <div className={style.header_text}>{headerContents}</div>
        <div className={style.btn_toggle}>
          <Image
            alt=""
            src="/src/images/arrow-icons/chv_down.svg"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className={style.body_contents}>{bodyContents}</div>
    </div>
  )
}

// 학습 일시중지
const PauseSubscription = () => {
  const style = useStyle(STYLE_ID)
  
  return <>
    <div className={style.pause_subscription}>
      <div className={style.row}>
        <div className={style.txt_1}>학습 상태</div>
        <div className={style.txt_2}>Study in progress</div>
      </div>
      <div className={style.row}>
        <div className={style.txt_1}>일시중지 횟수</div>
        <div className={style.txt_2}>0/3</div>
      </div>
      <div className={style.row}>
        <div className={style.txt_1}>일시중지 기간</div>
        <div className={style.txt_2}>-</div>
      </div>
      <div className={style.txt_p}>학습 일시 중지는 연 3회까지 사용할 수 있습니다(신청 당일은 해지 불가) 1회 신청 시 30일간 잔여 학습일 수 차감을 막을 수 있으며, 일시 중지 기간 안에 해지할 수도 있습니다. (단, 학습 일시 중지 신청 당일은 해지가 안 됩니다)</div>
      <div className={style.btn_link}>30일 일시중지 신청</div>
    </div>
  </>
}

// 회원 탈퇴
const AccountTermination = () => {
  const style = useStyle(STYLE_ID)

  return <>
    <div className={style.account_termination}>
      <div className={style.txt_p}>회원 탈퇴를 하면 계정이 완전히 삭제되어 학습 기록이 모두 사라지니 주의해 주세요. 결제 기간이 남아 있는 경우에는 회원 탈퇴가 불가능하니, 탈퇴를 진행하려면 고객센터에 문의해 주세요.</div>
      <div className={style.btn_link} onClick={() => {alert('결제한 기간이 남아있습니다.')}}>회원 탈퇴</div>
    </div>
  </>
}