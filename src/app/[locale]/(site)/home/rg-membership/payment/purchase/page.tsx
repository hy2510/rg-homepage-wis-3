'use client'

import useTranslation from '@/localization/client/useTranslations'
import React, { ReactNode, useState } from 'react'
import { Button, CheckBox, Margin, Modal, TextField } from '@/ui/common/common-components'
import { useScreenMode } from '@/ui/context/StyleContext'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_purchase'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const userPhoneNumber = '01077070799'

  return (
    <div className={style.purchase}>
      <div className={style.user_info_bar}>
        <div className={style.user_name}>김리딩</div>
        <div className={style.period}>남은 학습기간 182일</div>
        <div className={style.end_date}>2024.12.01까지</div>
      </div>
      <div className={style.page_container}>
        <div className={style.col_left}>
          <div className={style.product_list}>
            <div className={style.section_title}>상품 선택</div>
            <div className={style.cards}>
              <ProductCard active={true} tag={365} title='12개월 이용권' originalPrice={360000} finalPrice={240000} />
              <ProductCard active={false} tag={180} title='6개월 이용권' originalPrice={180000} finalPrice={150000} />
              <ProductCard active={false} tag={90} title='3개월 이용권' originalPrice={90000} finalPrice={80000} />
              <ProductCard active={false} tag={30} title='1개월 이용권' originalPrice={30000} finalPrice={30000} />
            </div>
          </div>
          <div className={style.pay_info}>
            <div className={style.section_title}>구매자 정보</div>
            <div className={style.user_id}>
              <div className={style.txt_label}>회원 ID</div>
              <div className={style.text_field}>hy2510@naver.com</div>
            </div>
            <div className={style.contact_info}>
              <div className={style.txt_label}>구매자 연락처</div>
              <div className={style.text_field}>
                {/* <div className={style.select_front_number}>010<span className={style.arrow}></span></div> */}
                <div className={style.user_phone_number}>{userPhoneNumber ? userPhoneNumber : '구매자의 연락처를 등록해 주세요.'}</div>
                {/* <input type="phone" placeholder="'-' 없이 숫자만 입력" /> */}
                <div className={style.btn_link}>{userPhoneNumber ? '변경' : '등록'}</div>
              </div>
            </div>

            {/* 전화번호가 없는 경우 등록할 때 */}
            <div className={style.contact_info}>
              <div className={style.empty_space}></div>
              <div className={style.edit_space}>
                <div className={style.text_field}>
                  {/* <div className={style.select_front_number}>010<span className={style.arrow}></span></div> */}
                  <input type="phone" placeholder={`연락받을 전화번호 (- 없이 입력)`} />
                  <div className={style.btn_link}>인증번호 받기</div>
                </div>
                <div className={style.txt_message}>* 입력한 전화번호로 인증번호를 발송했습니다.</div>
              </div>
            </div>

            {/* 전화번호가 있는 경우 변경할 때 */}
            <div className={style.contact_info}>
              <div className={style.empty_space}></div>
              <div className={style.edit_space}>
                <div className={style.text_field}>
                  {/* <div className={style.select_front_number}>010<span className={style.arrow}></span></div> */}
                  <input type="phone" placeholder={`변경할 전화번호 (- 없이 입력)`} />
                  <div className={style.btn_link}>인증번호 받기</div>
                </div>
                <div className={style.txt_message}>* 입력한 인증번호가 정확하지 않습니다. 올바른 인증번호를 입력해 주세요.</div>
              </div>
            </div>

            {/* 인증번호 입력 */}
            <div className={style.contact_info}>
              <div className={style.empty_space}></div>
              <div className={style.edit_space}>
                <div className={style.text_field}>
                  {/* <div className={style.select_front_number}>010<span className={style.arrow}></span></div> */}
                  <input type="phone" placeholder={`인증번호 입력 ${'(10:00)'}`} />
                  <div className={style.btn_link}>입력</div>
                </div>
                <div className={style.txt_message}>* 입력한 인증번호가 정확하지 않습니다. 올바른 인증번호를 입력해 주세요.</div>
              </div>
            </div>
            <div className={style.check_box}>
              <div className={style.empty_space}></div>
              <div className={style.check_item}><CheckBox check={true} />  결제 정보 확인용 개인정보 수집 동의 (필수)</div>
            </div>
            <div className={style.check_box}>
              <div className={style.empty_space}></div>
              <div className={style.check_item}><CheckBox check={false} /> 학습 리포트 및 소식 알림 동의 (선택)</div>
            </div>
          </div>
          <div className={style.payment_method}>
            <div className={style.section_title}>결제 수단</div>
            <div className={style.payment_items}>
              <PaymentMethodItem name='카카오 페이' active={true} />
              <PaymentMethodItem name='신용카드' active={false} />
              <PaymentMethodItem name='무통장 입금' active={false} />
              <PaymentMethodItem name='실시간 계좌이체' active={false} />
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
            <div className={style.row}>
              <div className={style.col_1}>정가</div>
              <div className={style.col_2}>180,000</div>
            </div>
            <div className={style.row}>
              <div className={style.col_1}>기본 할인 (33.3%)</div>
              <div className={style.col_2}>-30,000</div>
            </div>
            <div className={style.row}>
              <div className={style.col_1}>기간 연장 추가 할인 (25%)</div>
              <div className={style.col_2}>-38,000</div>
            </div>
            <div className={style.line}></div>
            <div className={style.final_row}>
              <div className={style.col_1}>최종 결제 금액</div>
              <div className={style.col_2}>380,000</div>
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
      <div className={style.tag}>{tag}일</div>
      <div className={style.title}>{title}</div>
      <div className={style.original_price} style={{opacity: originalPrice == finalPrice ? 0 : 1}}>{originalPrice.toLocaleString()}원</div>
      <div className={style.final_price}>{finalPrice.toLocaleString()}원</div>
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