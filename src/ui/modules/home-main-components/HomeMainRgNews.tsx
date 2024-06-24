import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'home_main_rg_news'

export const RgNewsContainer = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.rg_news_container}>
      <div className={style.row_1}>
        <div style={{ display: 'inline-block' }}>
          <Link href={SITE_PATH.HOME.NOTICE} className={style.btn_read_more}>
            <span className={style.txt_title}>{t('t326')}</span>
            <div className={style.ico_arrow}></div>
          </Link>
        </div>
      </div>
      <div className={style.row_2}>{children}</div>
    </div>
  )
}

export const RgNewsCard = ({
  tag,
  tagColor,
  title,
  titleColor,
  summary,
  summaryColor,
  date,
  dateColor,
  bgColor,
  bgImage,
  btnMore,
  href,
  target,
}: {
  tag?: string
  tagColor?: string
  title?: string
  titleColor?: string
  summary?: string
  summaryColor?: string
  date?: string
  dateColor?: string
  bgColor?: string
  bgImage?: string
  btnMore?: string
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <Link
      href={href ? href : ''}
      className={style.rg_post_card}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : '',
        backgroundColor: bgColor ? bgColor : '',
      }}
      target={target ? target : '_self'}>
      <div
        className={style.tag}
        style={{ color: tagColor ? tagColor : '#3AB6FF' }}>
        {tag ? tag : t('t325')}
      </div>
      <div
        className={style.title}
        style={{ color: titleColor ? titleColor : '' }}>
        {title}
      </div>
      {summary ? (
        <div
          className={style.summary}
          style={{ color: summaryColor ? summaryColor : '' }}>
          {summary}
        </div>
      ) : (
        <></>
      )}
      <div className={style.date} style={{ color: dateColor ? dateColor : '' }}>
        {date}
      </div>
      {btnMore ? (
        <div
          className={style.btnMore}
          style={{
            color: tagColor ? tagColor : '',
            borderColor: tagColor ? tagColor : '',
            backgroundColor: bgColor ? bgColor : '#fff',
          }}>
          {btnMore}
        </div>
      ) : (
        <></>
      )}
    </Link>
  )
}

export const RgNewsCardBasic = ({
  title,
  summary,
  date,
  href,
  target,
}: {
  title: string
  summary?: string
  date?: string
  href?: string
  target?: string
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  const tag = t('t325')
  const bgImage = '/src/images/@home/img_post_card_bg_default.svg'
  return (
    <RgNewsCard
      tag={tag}
      bgImage={bgImage}
      title={title}
      summary={summary}
      date={date}
      href={href}
      target={target}
    />
  )
}

export const RgNewsCardInfographic = ({
  title,
  summary,
  date,
  href,
  target,
}: {
  title: string
  summary?: string
  date?: string
  href?: string
  target?: string
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  const tag = t('t329')
  const tagColor = '#FF81AD'
  const titleColor = '#000000'
  const summaryColor = '#777777'
  const bgColor = '#FDE2EB'
  const bgImage = '/src/images/@home/rg-news-sample/infographic.svg'
  return (
    <RgNewsCard
      tag={tag}
      tagColor={tagColor}
      titleColor={titleColor}
      summaryColor={summaryColor}
      bgColor={bgColor}
      bgImage={bgImage}
      title={title}
      summary={summary}
      date={date}
      href={href}
      target={target}
    />
  )
}

export const RgNewsCardNewsLetter = ({
  title,
  summary,
  date,
  href,
  target,
}: {
  title: string
  summary?: string
  date?: string
  href?: string
  target?: string
}) => {
  // @Language 'common'
  const { t } = useTranslation()

  const tag = t('t327')
  const tagColor = '#00AEEF'
  const titleColor = '#000000'
  const summaryColor = '#777777'
  const bgColor = '#F1F6FF'
  const bgImage = '/src/images/@home/rg-news-sample/img_news_letter.svg'
  const btnMore = '보러가기'

  return (
    <RgNewsCard
      tag={tag}
      tagColor={tagColor}
      titleColor={titleColor}
      summaryColor={summaryColor}
      bgColor={bgColor}
      bgImage={bgImage}
      btnMore={btnMore}
      title={title}
      summary={summary}
      date={date}
      href={href}
      target={target}
    />
  )
}

export const RgNewsCardCampaign = ({
  title,
  summary,
  date,
  href,
  target,
}: {
  title: string
  summary?: string
  date?: string
  href?: string
  target?: string
}) => {
  const tag = '캠페인'
  const tagColor = '#FFE8A2'
  const titleColor = '#FFFFFF'
  const summaryColor = '#DDDDDD'
  const bgColor = '#CA112D'
  const bgImage = '/src/images/@home/rg-news-sample/campaign.svg'

  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <Link
      href={href ? href : ''}
      className={style.rg_post_card}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : '',
        backgroundColor: bgColor ? bgColor : '',
      }}
      target={target ? target : '_self'}>
      <div
        className={style.tag}
        style={{ color: tagColor ? tagColor : '#3AB6FF' }}>
        {tag ? tag : t('t325')}
      </div>
      <div
        className={style.title}
        style={{ color: titleColor ? titleColor : '' }}>
        {title}
      </div>
      {summary ? (
        <div
          className={style.summary}
          style={{ color: summaryColor ? summaryColor : '' }}>
          {summary}
        </div>
      ) : (
        <></>
      )}
    </Link>
  )
}
