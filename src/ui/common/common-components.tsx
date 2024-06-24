'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import {
  CSSProperties,
  ChangeEvent,
  ForwardedRef,
  KeyboardEventHandler,
  MouseEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { useStyle } from '../context/StyleContext'

const STYLE_ID = 'common_components'

// 기본버튼
export function Button({
  color,
  shadow,
  roundFull,
  width,
  onClick,
  children,
  completed,
}: {
  color?: 'red' | 'blue' | 'gray' | 'dark' | 'blue'
  shadow?: boolean
  roundFull?: boolean
  width?: string
  onClick?: (e?: MouseEvent) => void
  children?: ReactNode
  completed?: boolean
}) {
  const style = useStyle(STYLE_ID)

  let buttonColor
  switch (color) {
    case 'red':
      buttonColor = style.red
      break
    case 'blue':
      buttonColor = style.blue
      break
    case 'gray':
      buttonColor = style.gray
      break
    case 'dark':
      buttonColor = style.dark
      break
    default:
      buttonColor = style.blue
      break
  }

  return (
    <div
      className={`${style.bs_button} ${buttonColor} ${shadow && style.shadow} ${
        roundFull && style.round_full
      } ${completed && style.completed}`}
      onClick={onClick}
      style={{ width: width }}>
      {children}
    </div>
  )
}

// 뒤로가기
export function BackLink({
  href,
  largeFont,
  children,
  onClick,
  colorWhite,
}: {
  href?: string
  largeFont?: boolean
  children?: ReactNode
  onClick?: () => void
  colorWhite?: boolean
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.back_link}>
      <Link
        href={href ? href : ''}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault()
            onClick()
          }
        }}>
        <div className={style.back_link}>
          {colorWhite ? (
            <Image
              alt=""
              src="/src/images/arrow-icons/chv_left_white.svg"
              width={26}
              height={26}
            />
          ) : (
            <div className={style.arrow_icon}></div>
          )}
          <div
            className={`${largeFont ? style.txt_d2 : style.txt_d1}`}
            style={{ color: colorWhite ? '#fff' : '' }}>
            {children}
          </div>
        </div>
      </Link>
    </div>
  )
}

// 얼럿바
export function AlertBar({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.alert_bar}>
      {children}
      {/* <div className={style.delete_button}>
        
          * FIXME: 2024-03-14 결정사항: AlertBar 보이기 관리 기능 부제로 인하여 X 버튼 숨김 처리
        <Image
          alt=""
          src="/src/images/delete-icons/x_orange.svg"
          width={24}
          height={24}></Image> 
         
      </div> */}
    </div>
  )
}

// 얼럿박스
export function AlertBox({
  toolTipRight,
  toolTipLeft,
  text,
  onClickY,
  onClickN,
}: {
  toolTipRight?: boolean
  toolTipLeft?: boolean
  text?: string
  onClickY?: () => void
  onClickN?: () => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div
      className={`${style.alert_box} ${
        toolTipRight
          ? style.tool_tip_right_arrow
          : toolTipLeft
            ? style.tool_tip_left_arrow
            : undefined
      }`}>
      <div className={style.txt_l}>{text}</div>
      <div className={style.buttons}>
        <div className={style.button} onClick={onClickY}>
          {t('t130')}
        </div>
        <div className={style.button} onClick={onClickN}>
          {t('t131')}
        </div>
      </div>
    </div>
  )
}

// 텍스트필드
export function TextFiled(props: {
  border: string
  disabled?: boolean
  width: string
  label?: string
  type?: string
  placeholder?: string
  value?: string
  name: string
}) {
  return (
    <div
      className={`text-field ${props.border} ${
        props.disabled ? 'disabled' : undefined
      }`}
      style={{ width: props.width }}>
      <div className="label">{props.label}</div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        style={{ width: props.width }}
        value={props.value}
        disabled={props.disabled}
        name={props.name}></input>
    </div>
  )
}

// 네브
export function Nav({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return <div className={style.nav_container}>{children}</div>
}

// 네브 아이템
export function NavItem({
  active,
  onClick,
  width,
  children,
  toolTip,
}: {
  active: boolean
  onClick?: () => void
  width?: string
  children?: ReactNode
  toolTip?: string
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.nav_item} ${active && style.on}`}
      onClick={onClick}
      style={{ width: width }}>
      <div className={style.nav_contents}>
        <span>
          {children}
          {toolTip == undefined ? undefined : (
            <div className={style.tool_tip}>{toolTip}</div>
          )}
        </span>
      </div>
    </div>
  )
}

// 필 네브
export function Pills({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return <div className={style.pill_container}>{children}</div>
}

// 필 네브 아이템
export function PillItem({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick?: () => void
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.pill_item} ${active && style.on}`}
      onClick={onClick}>
      {children}
    </div>
  )
}

// 페이지네이션
export function Pagination({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return (
    <nav aria-label="Page navigation">
      <ul className={style.pagination}>{children}</ul>
    </nav>
  )
}

// 페이지네이션 아이템
export function PaginationItem({
  active = false,
  isHidden,
  onClick,
  children,
}: {
  active?: boolean
  isHidden?: boolean
  onClick?: () => void
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  return (
    <li className={`${style.pagination_item} ${active && style.on}`}>
      {!isHidden && (
        <button onClick={onClick ? onClick : undefined}>{children}</button>
      )}
    </li>
  )
}

// 프로그레스바 (width: 프로그레스 길이 -> %로 표시, check: 체크포인트가 있는 경우, toolTip: 체크 포인트의 툴팁)
export function ProgressBar({
  width,
  check,
  slim,
  toolTip,
}: {
  width: string
  check?: string
  slim?: boolean
  toolTip?: string
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.progress_bar} ${slim && style.slim}`}>
      <div
        className={`${style.progress} ${slim && style.slim}`}
        style={{ width: width }}>
        {!slim && <div className={style.pointer}>{width}</div>}
      </div>
      {check && (
        <div className={style.check} style={{ width: check }}>
          <div className={style.tool_tip}>{toolTip}</div>
        </div>
      )}
    </div>
  )
}

// 드랍다운
export function Dropdown({
  inlineStyle,
  fontSizeM,
  title,
  children,
}: {
  inlineStyle?: CSSProperties
  fontSizeM?: string
  title?: string
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  const [check, _check] = useState(false)

  return (
    <div className="flex">
      <div
        className={`${style.dropdown} ${!children && style.no_cursor}`}
        onClick={() => {
          check ? _check(false) : _check(true)
        }}
        style={inlineStyle}>
        <div className={`${style.title} ${fontSizeM && style.txt_h}`}>
          {title}
        </div>
        {children && <div className={style.chev_down}></div>}
        {children && check && <div className={style.menu}>{children}</div>}
      </div>
      {children && check && (
        <div
          className={style.transparent_box}
          onClick={() => {
            check ? _check(false) : _check(true)
          }}></div>
      )}
    </div>
  )
}

// 드랍다운 아이템
export function DropdownItem({
  onClick,
  children,
}: {
  onClick?: () => void
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.dropdown_item} onClick={onClick && onClick}>
      {children}
    </div>
  )
}

// 폼 드랍다운
export const FormDropDown = ({
  label,
  select,
  value,
  onChange,
}: {
  label: string
  value?: string
  select: { key: string; label: string }[]
  onChange?: (key: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  const [selectedOption, _selectedOption] = useState(value || '')
  const [viewOptions, _viewOptions] = useState(false)
  const menuOpen = () => {
    viewOptions ? _viewOptions(false) : _viewOptions(true)
  }
  useEffect(() => {
    _selectedOption(value || '')
  }, [value])

  return (
    <>
      <div className={style.form_drop_down}>
        <div className={style.group_selected_info} onClick={menuOpen}>
          <div className={style.txt_label}>{label}</div>
          <div className={style.txt_selected}>{selectedOption}</div>
        </div>
        <div className={style.ico_chev_down}></div>
        {viewOptions && (
          <div className={style.box_drop_down_items}>
            {select &&
              select.map((a, i) => {
                return (
                  <FormDropDownItem
                    key={a.key}
                    option={a}
                    onClick={() => {
                      onChange && onChange(a.key)
                      _selectedOption(select[i].label)
                      _viewOptions(false)
                    }}
                  />
                )
              })}
          </div>
        )}
      </div>
      {viewOptions && (
        <div className={style.screen_block} onClick={menuOpen}></div>
      )}
    </>
  )
}

// 폼 드랍다운 아이템
const FormDropDownItem = ({
  option,
  onClick,
}: {
  option: { key: string; label: string }
  onClick?: (key: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={style.form_drop_down_item}
      onClick={() => {
        onClick && onClick(option.key)
      }}>
      {option.label}
    </div>
  )
}

// 텍스트필드
export const TextField = forwardRef(
  (
    {
      id = '',
      hint = '',
      password = false,
      email = false,
      value = '',
      disabled = false,
      maxLength,
      onTextChange,
      onFocusIn,
      onFocusOut,
      onKeyDown,
    }: {
      id?: string
      hint?: string
      password?: boolean
      email?: boolean
      value?: string
      disabled?: boolean
      maxLength?: number
      onTextChange?: (text: string) => void
      onFocusIn?: (text: string) => void
      onFocusOut?: (text: string) => void
      onKeyDown?: KeyboardEventHandler<HTMLInputElement>
    },
    ref: ForwardedRef<HTMLInputElement | null>,
  ) => {
    const style = useStyle(STYLE_ID)

    const [inputValue, _inputValue] = useState(value)
    if (value !== inputValue) {
      _inputValue(value)
    }

    return (
      <div className={`${style.text_field} ${disabled && style.val}`}>
        <div className={style.txt_l}>{inputValue && hint}</div>
        <input
          ref={ref}
          id={id}
          type={password ? 'password' : email ? 'email' : 'text'}
          value={inputValue}
          onChange={(e) => {
            _inputValue(e.target.value)
            onTextChange && onTextChange(e.target.value)
          }}
          onFocus={(e) => onFocusIn && onFocusIn(e.target.value)}
          onBlur={(e) => onFocusOut && onFocusOut(e.target.value)}
          disabled={disabled}
          placeholder={inputValue ? '' : hint}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
        />
      </div>
    )
  },
)
TextField.displayName = 'TextField'

// export function TextField({
//   id = '',
//   hint = '',
//   password = false,
//   email = false,
//   value = '',
//   disabled = false,
//   maxLength,
//   onTextChange,
//   onFocusIn,
//   onFocusOut,
//   onKeyDown,
// }: {
//   id?: string
//   hint?: string
//   password?: boolean
//   email?: boolean
//   value?: string
//   disabled?: boolean
//   maxLength?: number
//   onTextChange?: (text: string) => void
//   onFocusIn?: (text: string) => void
//   onFocusOut?: (text: string) => void
//   onKeyDown?: KeyboardEventHandler<HTMLInputElement>
// }) {
//   const [inputValue, _inputValue] = useState(value)
//   if (value !== inputValue) {
//     _inputValue(value)
//   }

//   return (
//     <div className={`${style.text_field} ${disabled && style.val}`}>
//       <div className={style.txt_l}>{inputValue && hint}</div>
//       <input
//         id={id}
//         type={password ? 'password' : email ? 'email' : 'text'}
//         value={inputValue}
//         onChange={(e) => {
//           _inputValue(e.target.value)
//           onTextChange && onTextChange(e.target.value)
//         }}
//         onFocus={(e) => onFocusIn && onFocusIn(e.target.value)}
//         onBlur={(e) => onFocusOut && onFocusOut(e.target.value)}
//         disabled={disabled}
//         placeholder={inputValue ? '' : hint}
//         maxLength={maxLength}
//         onKeyDown={onKeyDown}
//       />
//     </div>
//   )
// }

// 셀렉트박스
export function SelectBox({
  id,
  hint,
  value,
  onChange,
  children,
}: {
  id?: string
  hint?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.select_box}>
      <div className={style.txt_l}>{hint}</div>
      <select id={id} onChange={onChange} value={value}>
        {children}
      </select>
    </div>
  )
}

// 셀렉트박스 아이템
export const SelectBoxItem = ({
  value,
  children,
}: {
  value?: string
  children?: ReactNode
}) => <option value={value}>{children}</option>

// 모달 템플릿
export function Modal({
  compact,
  header,
  title,
  navTop,
  backLink,
  onClickDelete,
  onClickBack,
  onClickLightbox,
  children,
  bookInfoStyle,
}: {
  compact?: boolean
  header?: boolean
  title?: string
  navTop?: boolean
  backLink?: string
  onClickDelete?: () => void
  onClickBack?: () => void
  onClickLightbox?: () => void
  children: ReactNode
  bookInfoStyle?: boolean
}) {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.modal}>
        <div
          // className={`${style.modal_container} slide-in-top ${
          //   compact && style.compact
          className={`${style.modal_container} ${
            compact && style.compact
          } ${bookInfoStyle && style.book_info}`}>
          {header && (
            <div className={style.modal_header}>
              <div className={style.modal_header_container}>
                <div className={style.txt_h}>{title}</div>
              </div>
              <button
                onClick={onClickDelete}
                className={style.delete_button}></button>
            </div>
          )}
          {navTop && (
            <div className={style.nav_top}>
              <div className={style.nav_top_back_link} onClick={onClickBack}>
                <div className={style.arrow_icon}>
                  {/* <Image
                    alt=""
                    src="/src/images/arrow-icons/chv_left.svg"
                    width={26}
                    height={26}
                  /> */}
                </div>
                <div className={style.txt_h}>{title}</div>
              </div>
            </div>
          )}
          <div className={style.modal_body}>{children}</div>
        </div>
      </div>
      <div
        className={style.light_box}
        onClick={(e) => {
          e.stopPropagation()
          onClickLightbox && onClickLightbox()
        }}></div>
    </>
  )
}

// 결과없음 메세지
export function EmptyMessage({
  isAward,
  children,
}: {
  isAward?: boolean
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.empty_message}>
      {isAward ? (
        <Image
          alt=""
          src="/src/images/@empty-message/empty-award.svg"
          width={156}
          height={140}
        />
      ) : (
        <Image
          alt=""
          src="/src/images/@empty-message/empty-board.svg"
          width={156}
          height={140}
        />
      )}

      <div className={style.txt_p}>{children}</div>
    </div>
  )
}

// 체크박스
export function CheckBox({
  id,
  check,
  onClick,
}: {
  id?: string
  check: boolean
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div id={id} className={style.check_box} onClick={onClick}>
      {check ? (
        <Image
          alt=""
          src="/src/images/check-icons/check_box_on.svg"
          width={18}
          height={18}
        />
      ) : (
        <Image
          alt=""
          src="/src/images/check-icons/check_box_off.svg"
          width={18}
          height={18}
        />
      )}
    </div>
  )
}

// 커스텀 마진
export function Margin({ height }: { height: number }) {
  return <div style={{ marginBottom: `${height}px` }}></div>
}

// 게시판 (컨테이너)
export const NoticeBoardContainer = ({
  children,
}: {
  children?: ReactNode
}) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.notice_board_container}>{children}</div>
}

// 게시판 (아이템)
export const NoticeBoardItem = ({
  title,
  date,
  href,
}: {
  title?: string
  date?: string
  href?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.notice_board_item}>
      <div className={style.notice_date}>{date}</div>
      <Link href={href ? href : ''} target="_self">
        <div className={style.notice_title}>{title}</div>
      </Link>
    </div>
  )
}
