'use client'

// @Deprecate('Not Used')
import Image from 'next/image'
import { useState } from 'react'
import { Dropdown, DropdownItem } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'home_rg_news_post_board'

export default function RgNewsPostBoard({ postData }: { postData: any[] }) {
  const style = useStyle(STYLE_ID)

  const data = [...postData]

  const blurDataURL =
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='

  const [current, _current] = useState(0)

  const onClickLeft = () => {
    data.length - 1 == current ? _current(current) : _current(current + 1)
  }

  const onClickRight = () => {
    current == 0 ? _current(current) : _current(current - 1)
  }

  return (
    <div className={style.rg_news_post_board}>
      {/* 회차 선택 */}
      <div className={style.group_1}>
        <div className={style.btn_left} onClick={onClickLeft}>
          <div className={'ico-arrow-left'} />
        </div>
        <div className={style.col_center}>
          <Dropdown title={data[current].title}>
            {data.map((a, i) => {
              return (
                <DropdownItem
                  key={`dropdown-rg-news-${i}`}
                  onClick={() => {
                    _current(i)
                  }}>
                  {a.title}
                </DropdownItem>
              )
            })}
          </Dropdown>
        </div>
        <div className={style.btn_right} onClick={onClickRight}>
          <div className={'ico-arrow-right'} />
        </div>
      </div>

      {/* 내용 */}
      <div className={style.group_2}>
        <Image
          alt=""
          src={data[current].imgSrc}
          width={1000}
          height={800}
          loading="lazy"
          placeholder="blur"
          blurDataURL={blurDataURL}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  )
}
