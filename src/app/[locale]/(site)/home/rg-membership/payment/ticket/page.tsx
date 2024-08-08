'use client'

import useTranslation from '@/localization/client/useTranslations'
import React from 'react'
import { Button, CheckBox, Margin, Modal, TextField } from '@/ui/common/common-components'
import { useScreenMode } from '@/ui/context/StyleContext'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_ticket'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const userPhoneNumber = '01077070799'

  return (
    <div className={style.ticket}>
      <div className={style.user_info_bar}>
        <div className={style.user_name}>김리딩</div>
        <div className={style.period}>남은 학습기간 182일</div>
        <div className={style.end_date}>2024.12.01까지</div>
      </div>
      <div className={style.page_container}>
        <div className={style.col_left}>
          <div className={style.ticket_input_field}>
            <div className={style.section_title}>티켓 등록</div>
            <div className={style.txt_comment}>티켓번호를 가지고 있는 경우, 입력해 주세요.</div>
            <div className={style.blanks}>
              <div className={style.text_field}>
                <input type="text" placeholder={``} />
              </div>
              <div className={style.text_field}>
                <input type="text" placeholder={``} />
              </div>
              <div className={style.text_field}>
                <input type="text" placeholder={``} />
              </div>
              <div className={style.text_field}>
                <input type="text" placeholder={``} />
              </div>
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
            <Button shadow>티켓 등록하기</Button>
          </div>
        </div>
        <div className={style.col_right}>
          <div className={style.ticket_comment}>
            <div>•</div>
            <div><b>티켓 등록이 완료되면 즉시 남은 학습 기간에 구매한 날수만큼 합산 됩니다.</b></div>
            <div>•</div>
            <div>티켓 문자 내 표시된 유효기간을 확인해주시고, 반드시 유효기간 만료 전에 티켓을 등록해 주세요.</div>
            <div>•</div>
            <div>유효기간 내 등록 또는 사용하지 않은 티켓은 전액 환불이 불가능합니다.</div>
            <div>•</div>
            <div>사용한 티켓이나 유효기간이 지난 티켓은 (주)리딩게이트 환불 규정에 따라 부분 환불만 가능합니다.</div>
          </div>
        </div>
      </div>
    </div>
  )
}