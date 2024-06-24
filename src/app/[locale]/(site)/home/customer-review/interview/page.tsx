'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_interview'

// RG인 인터뷰 카드1
const InterviewCard1 = ({ movieSrc }: { movieSrc: string }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.interview_card_1}>
      {/* <Link href={href ? href : ""}>
        <Image
          width={300}
          height={300}
          style={{ width: "100%", height: "auto" }}
          src={imgSrc}
        />
      </Link> */}
      <iframe
        src={movieSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
        }}
      />
    </div>
  )
}

// RG인 인터뷰 카드2
const InterviewCard2 = ({
  imgSrc,
  href,
  txt_sub,
  txt_title,
  txt_link,
}: {
  imgSrc: string
  href: string
  txt_title: string
  txt_sub: string
  txt_link: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.interview_card_2}>
      <div className={style.group_thumbnail_image}>
        <Image
          width={300}
          height={300}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          src={imgSrc}
          alt=""
        />
      </div>
      <div className={style.group_thumnail_text}>
        <div className={style.txt_sub}>{txt_sub}</div>
        <div className={style.txt_title}>{txt_title}</div>
        <div className={style.group_link}>
          <Link href={href ? href : ''} target="_blank">
            <div className={style.btn_link}>
              <span>{txt_link}</span>
              <span className={style.ico_arrow_right}></span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.interview}`}>
      <div className={style.group_interview_main_media}>
        <InterviewCard1
          movieSrc={
            'https://www.youtube.com/embed/VZE-tDzBcxA?si=PFlNT90B8W6qMBDb'
          }
        />
      </div>
      <div className={style.group_interview_thumbnails}>
        <div className={style.txt_label}>인터뷰 모아보기</div>
        <div className={style.list_thumbnails}>
          <InterviewCard2
            imgSrc={'/src/sample-images/interview_thumbnail_image_1.png'}
            txt_sub={"리딩게이트 명예의 전당 'Titanium(티타늄)'등급"}
            txt_title={"'천소현 학생' 특별 인터뷰"}
            txt_link={'카페글 바로 보기'}
            href={
              'https://www.youtube.com/playlist?list=PLbIV2Wes7jczKZkbqMaIjHgSHwDLEuaFO'
            }
          />
          <InterviewCard2
            imgSrc={'/src/sample-images/interview_thumbnail_image_2.png'}
            txt_sub={'2023 리딩게이트 슈퍼스타 선발대회 슈퍼스타상'}
            txt_title={'Presenter 김지율'}
            txt_link={'카페글 바로 보기'}
            href={
              'https://cafe.naver.com/readinggatecafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=29561033%26search.menuid=31%26search.boardtype=W'
            }
          />
        </div>
      </div>
    </div>
  )
}
