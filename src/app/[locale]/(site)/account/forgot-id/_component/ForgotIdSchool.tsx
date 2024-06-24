'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  useFetchClassList,
  useOnLoadClassGroup,
} from '@/client/store/account/class/hook'
import { useFetchForgotIdWithClassAndStudentName } from '@/client/store/account/forgot/hook'
import { ClassGroupResponse } from '@/repository/client/account/class-group'
import { ClassListResponse } from '@/repository/client/account/class-list'
import {
  BackLink,
  Button,
  FormDropDown,
  TextField,
} from '@/ui/common/common-components'
import BoxUserInfo from '@/ui/modules/account-components/box-user-info'

export default function ForgotIdSchool({
  style,
}: {
  style: Record<string, string>
}) {
  // @language 'common'
  const { t } = useTranslation()

  const classGroupFetch = useOnLoadClassGroup()
  const [step, setStep] = useState<1 | 2>(1)

  const [findResult, setFindResult] = useState<{
    loginId: string
    className: string
    studentName: string
  }>({ loginId: '', className: '', studentName: '' })

  const forgotId = useFetchForgotIdWithClassAndStudentName()
  const onFindId = (
    classId: string,
    className: string,
    studentName: string,
  ) => {
    forgotId.fetch({
      classId,
      studentName,
      callback: (data) => {
        if (data.success && data.payload) {
          if (data.payload.code === 0) {
            setFindResult({
              loginId: data.payload.loginId,
              studentName,
              className,
            })
            setStep(2)
          } else {
            alert(t('t235'))
          }
        }
      },
    })
  }

  const onClickLogin = () => {
    router.push(SITE_PATH.ACCOUNT.SIGN_IN)
  }

  const router = useRouter()

  return (
    <main className={style.forgot_id}>
      <BackLink
        onClick={() => {
          if (step === 1) {
            router.back()
          } else {
            setStep(1)
          }
        }}>
        {t('t225')}
      </BackLink>

      {step === 1 && (
        <Step1ForgotIdInput
          style={style}
          groupList={classGroupFetch.payload}
          onFindId={onFindId}
        />
      )}
      {step === 2 && <Step2FindIdResult style={style} result={findResult} />}
    </main>
  )
}

function Step1ForgotIdInput({
  style,
  groupList,
  onFindId,
}: {
  style: Record<string, string>
  groupList: ClassGroupResponse
  onFindId: (classId: string, className: string, studentName: string) => void
}) {
  const { t } = useTranslation()

  const [uesrName, setUserName] = useState<string>('')
  const [classGroup, setClassGroup] = useState<string>('')
  const [classOne, setClassOne] = useState<string>('')

  const [classList, setClassList] = useState<ClassListResponse>([])
  const classListFetch = useFetchClassList()

  const onChangeClassGroup = (classGroupId: string) => {
    if (!classGroupId) {
      return
    }
    setClassGroup(classGroupId)
    classListFetch.fetch({
      classGroupId,
      callback: (data) => {
        if (data.success && data.payload) {
          setClassOne(data.payload[0].classId)
          setClassList(data.payload)
        }
      },
    })
  }

  //   if (!classGroup && groupList && groupList.length >= 1) {
  //     const classGroupId = groupList[0].classGroupId
  //     onChangeClassGroup(classGroupId)
  //   }

  const groupName =
    groupList.find((item) => item.classGroupId === classGroup)?.name ||
    t('t081')
  const className =
    classList?.find((item) => item.classId === classOne)?.name || t('t236')

  return (
    <div className={style.forgot_id_form}>
      <div className={style.txt_heading}>정보 입력</div>
      <div className={style.group_select_grade}>
        <FormDropDown
          label={t('t081')}
          select={groupList.map((item) => ({
            key: item.classGroupId,
            label: item.name,
          }))}
          onChange={(key) => {
            onChangeClassGroup(key)
          }}
          value={groupName}
        />
        <FormDropDown
          label={t('t237')}
          select={classList.map((item) => ({
            key: item.classId,
            label: item.name,
          }))}
          onChange={(key) => {
            setClassOne(key)
          }}
          value={className}
        />
      </div>
      <TextField
        hint={t('t232')}
        value={uesrName}
        onTextChange={(text) => setUserName(text)}
      />
      <Button
        shadow
        onClick={() => {
          const className =
            classList.find((item) => item.classId === classOne)?.name || ''
          onFindId(classOne, className, uesrName)
        }}>
        {t('t231')}
      </Button>
    </div>
  )
}

function Step2FindIdResult({
  style,
  result,
}: {
  style: Record<string, string>
  result: { loginId: string; className: string; studentName: string }
}) {
  //@language 'common'
  const { t } = useTranslation()

  const { loginId, className, studentName } = result
  return (
    <div className={style.forgot_id_find_result}>
      <div className={style.txt_heading}>아이디 찾기 결과</div>
      <BoxUserInfo
        datas={[
          { label: t('t232'), value: studentName },
          { label: t('t233'), value: loginId },
          { label: t('t237'), value: className },
        ]}
      />
    </div>
  )
}
