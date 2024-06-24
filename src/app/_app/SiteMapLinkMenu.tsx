'use client'

import Link from 'next/link'
import { CSSProperties, useState } from 'react'
import SITE_PATH from '../site-path'

const ROOT_STYLE: CSSProperties = {
  position: 'fixed',
  padding: '12px',
  left: 0,
  top: 0,
  zIndex: 101,
  backgroundColor: '#867070',
  border: '1px solid #867070',
}
const MENU_BUTTON_STYLE: CSSProperties = {
  fontWeight: 800,
  fontSize: '20px',
  color: '#D5B4B4',
}
const MENU_STYLE: CSSProperties = {
  display: 'flex',
  padding: '12px',
  color: '#F5EBEB',
}
const GROUP_STYLE: CSSProperties = {
  float: 'left',
  marginLeft: '16px',
  marginRight: '16px',
}
const ITEM_STYLE: CSSProperties = {
  display: 'block',
  textDecorationLine: 'underline',
}

export default function SiteMapLinkMenu() {
  const entries = Object.entries(SITE_PATH)

  const [isShowMenu, setShowMenu] = useState(false)

  return (
    <div style={ROOT_STYLE}>
      <button
        style={MENU_BUTTON_STYLE}
        onClick={() => {
          setShowMenu(!isShowMenu)
        }}>
        {!isShowMenu ? `[三] MENU` : `[×] CLOSE`}
      </button>
      {isShowMenu && (
        <div style={MENU_STYLE}>
          {entries.map((entry) => {
            const topKey = entry[0]
            const topValue = entry[1]
            const childKeys = Object.keys(topValue)

            return (
              <div key={topKey}>
                <div style={GROUP_STYLE}>
                  <h2>{topKey}</h2>
                  {childKeys.map((key) => {
                    const link = (topValue as Record<string, string>)[key]
                    return (
                      <LinkItem
                        key={`${topKey}-${key}`}
                        title={key}
                        link={link}
                        onClick={() => setShowMenu(false)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}

          <div>
            <div style={GROUP_STYLE}>
              <h2>{'ERROR'}</h2>
              <LinkItem
                title={'Not found'}
                link={'/error-page-not-found'}
                onClick={() => setShowMenu(false)}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <h3>STUDY TEST</h3>
        <LinkItem title="DODO ABC" link={'/legacy/DodoABC/localtest2.html'} />
        <LinkItem title="Pre K" link={'/legacy/test.html/#/abc123'} />
        <LinkItem title="abc" link={'/legacy/test.html'} />
      </div>
    </div>
  )
}

function LinkItem({
  title,
  link,
  onClick,
}: {
  title: string
  link: string
  onClick?: () => void
}) {
  return (
    <div style={ITEM_STYLE}>
      <Link href={link} onClick={onClick}>
        <span>{title}</span>
      </Link>
    </div>
  )
}
