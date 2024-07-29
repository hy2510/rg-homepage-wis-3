'use client'

import useTranslation from '@/localization/client/useTranslations'
import React, { ReactNode, useState } from 'react'
import { Button, CheckBox, Margin, Modal, TextField } from '@/ui/common/common-components'
import { useScreenMode } from '@/ui/context/StyleContext'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_payment_history'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'


  return (
    <div className={style.payment_history}>
      <div className={style.t_header}>
        <div className={style.th_item}>내역</div>
        <div className={style.th_item}>반명</div>
        <div className={style.th_item}>결제 금액</div>
        <div className={style.th_item}>결제일</div>
        <div className={style.th_item}>결제 수단</div>
      </div>
      <div className={style.t_body}>
        <div className={style.tr}>
          <div className={style.td_item}>수강료</div>
          <div className={style.td_item}>테스트반</div>
          <div className={style.td_item}>80,000원</div>
          <div className={style.td_item}>2024.12.07</div>
          <div className={style.td_item}>VCard</div>
        </div>
        {/* 구매 내역이 없는 경우 나오는 메세지 */}
        {/* <div className={style.empty_message}>아직 구매 내역이 없습니다.</div> */}
      </div>
    </div>
  )
}
