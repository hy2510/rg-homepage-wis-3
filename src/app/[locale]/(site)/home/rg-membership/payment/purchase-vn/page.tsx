'use client'

import useTranslation from '@/localization/client/useTranslations'
import React, { ReactNode, useState } from 'react'
import { Button, CheckBox, Margin, Modal, TextField } from '@/ui/common/common-components'
import { useScreenMode } from '@/ui/context/StyleContext'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_purchase_vn'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const userPhoneNumber = '01077070799'

  return (
    <div className={style.purchase_vn}>
      <div className={style.user_info_bar}>
        <div className={style.user_name}>퐁</div>
        <div className={style.period}>남은 학습기간 182일</div>
        <div className={style.end_date}>2024.12.01까지</div>
      </div>
      <div className={style.page_container}>
        <div className={style.col_left}>
          <div className={style.product_list}>
            <div className={style.section_title}>상품 선택</div>
            <div className={style.cards}>
              <ProductCard active={false} tag={365} title='12개월 이용권' originalPrice={4300000} finalPrice={4300000} />
              <ProductCard active={true} tag={180} title='6개월 이용권' originalPrice={2800000} finalPrice={2800000} />
              <ProductCard active={false} tag={30} title='1개월 이용권' originalPrice={500000} finalPrice={500000} />
            </div>
          </div>
          <div className={style.pay_info}>
            <div className={style.section_title}>구매자 정보</div>
            <div className={style.user_id}>
              <div className={style.txt_label}>회원 ID</div>
              <div className={style.text_field}>hy2510@naver.com</div>
            </div>
          </div>
          <div className={style.payment_method}>
            <div className={style.section_title}>결제 수단</div>
            <div className={style.payment_items}>
              <PaymentMethodItem name='VN PAY' active={true} />
              <PaymentMethodItem name='PayPal' active={false} />
            </div>
          </div>
        </div>
        <div className={style.col_right}>
          <div className={style.process_payment}>
            <div className={style.row}>
              <div className={style.col_1}>상품명</div>
              <div className={style.col_2}>6개월 이용권</div>
            </div>
            <div className={style.row}>
              <div className={style.col_1}>학습기간</div>
              <div className={style.col_2}>180일</div>
            </div>
            {/* <div className={style.row}>
              <div className={style.col_1}>정가</div>
              <div className={style.col_2}>180,000</div>
            </div> */}
            {/* <div className={style.row}>
              <div className={style.col_1}>기본 할인 (33.3%)</div>
              <div className={style.col_2}>-30,000</div>
            </div> */}
            <div className={style.line}></div>
            <div className={style.final_row}>
              <div className={style.col_1}>최종 결제 금액</div>
              <div className={style.col_2}>2,800,000</div>
            </div>
            <Button shadow>결제하기</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProductCardProps {
  active: boolean;
  tag: number;
  title: string;
  originalPrice: number;
  finalPrice: number;
}

const ProductCard: React.FC<ProductCardProps> = ({active, tag, title, originalPrice, finalPrice}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.product_card} ${active && style.active}`}>
      <div className={style.tag}>{tag}ngày</div>
      <div className={style.title}>{title}</div>
      <div className={style.original_price} style={{opacity: originalPrice == finalPrice ? 0 : 1}}>{originalPrice.toLocaleString()}VND</div>
      <div className={style.final_price}>{finalPrice.toLocaleString()}VND</div>
    </div>
  )
}

interface PaymentMethodItemProps {
  active: boolean;
  name: string
}


const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({active, name}) => {
  const style = useStyle(STYLE_ID)

  return <div className={`${style.payment_method_item} ${active && style.active}`}>{name}</div>
}