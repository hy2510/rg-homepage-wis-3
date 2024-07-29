'use client'

import useTranslation from '@/localization/client/useTranslations'
import React, { ReactNode, useState } from 'react'
import { Button, CheckBox, Margin, Modal, TextField } from '@/ui/common/common-components'
import { useScreenMode } from '@/ui/context/StyleContext'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_purchase_school'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'


  return (
    <>
      <div className={style.purchase_school}>
        <div className={style.t_header}>
          <div className={style.th_item}>내역</div>
          <div className={style.th_item}>반명</div>
          <div className={style.th_item}>결제 금액</div>
          <div className={style.th_item}>납입 기한</div>
          <div className={style.th_item}>결제 수단</div>
        </div>
        <div className={style.t_body}>
          <div className={style.tr}>
            <div className={style.td_item}>수강료</div>
            <div className={style.td_item}>테스트반</div>
            <div className={style.td_item}>80,000원</div>
            <div className={style.td_item}>2024.12.07</div>
            <div className={style.td_item}>
              <div className={style.payment_form}>
                <div className={style.select_payment_type}>
                  <div>신용카드</div>
                  <div className={style.select_box}>
                    <div className={style.select_item}>신용카드</div>
                    <div className={style.select_item}>무통장 입금</div>
                    <div className={style.select_item}>실시간 계좌이체</div>
                  </div>
                </div>
                <div className={style.btn_link}>결제</div>
              </div>
            </div>
          </div>
          {/* 구매 내역이 없는 경우 나오는 메세지 */}
          {/* <div className={style.empty_message}>미납 내역이 없습니다.</div> */}
          <div className={style.empty_message}>미납으로 학습이 제한 되었습니다. 결제 후 이용해주세요.</div>
          {/* <div className={style.empty_message}>미납으로 학습이 제한 되었습니다. PC 화면에서 결제 후 이용해주세요.</div> */}
        </div>
      </div>
      {/* 이니시스 실행전 모달 */}
      <Modal compact header title={'결제하기'}>
        <div className='container'>
          <div className={style.purchase_form}>
            <div className={style.comment}>
              <div className={style.txt_1}>결제에 필요한 기본 정보를 입력후 결제하기 버튼을 눌러주세요.</div>
              <div className={style.txt_2}>(입력한 연락처와 이메일 주소는 결제 이외의 다른 용도로 사용되지 않습니다.)</div>
            </div>
            <TextField hint="연락처 ('-' 없이 숫자만 입력)" />
            <TextField hint="이메일 주소" />
          </div>
          <Button shadow>결제하기</Button>

        </div>
      </Modal>
    </>
  )
}
