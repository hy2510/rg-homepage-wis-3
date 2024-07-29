'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import PkList from '@/app/[locale]/(site)/kids/prek_list.json'
import PkSongList from '@/app/[locale]/(site)/kids/prek_song_list.json'
import { useState } from 'react'
import Link from 'next/link'

const STYLE_ID = 'page_kids_prek'

export default function Page() {
  const style = useStyle(STYLE_ID)
  const pkItems = [...PkList]
  const songItems = [...PkSongList]
  const seriesNames = [
    'AlphabetLand', 
    'PhonicsLand', 
    'WordLand', 
    'StoryLand',
    'SongLand'
  ]
  const [currentSeriesName, setCurrentSeriesName] = useState(seriesNames[0])
  const studyActiveStatus = currentSeriesName == seriesNames[0] || currentSeriesName == seriesNames[1] || currentSeriesName == seriesNames[2] || currentSeriesName == seriesNames[3]
  const songActiveStatus = currentSeriesName == seriesNames[4]

  return (
    <>
      <div className={style.kids_prek}>
        <div className='container compact'>
          <div className={style.logo}>
            <div className={style.img_logo}></div>
          </div>

          {/* <div className={`${style.nav} ${style.items_center}`}>
            <div className={`${style.nav_item} ${studyActiveStatus && style.active}`} onClick={() => {setCurrentSeriesName(seriesNames[0])}}>Study</div>
            <div className={`${style.nav_item} ${songActiveStatus && style.active}`} onClick={() => {setCurrentSeriesName(seriesNames[4])}}>Song & Chant</div>
          </div> */}

          {/* Study List */}
          {studyActiveStatus
            ? <>
                <Category seriesNames={seriesNames} currentSeriesName={currentSeriesName} setCurrentSeriesName={setCurrentSeriesName} />

                <div className={style.book_list}>
                  {pkItems.map((a,i) => {
                    if (a.SeriesName == currentSeriesName) {
                      return (
                        <>
                          <StudyThumbnail key={i} active={true} passed1={false} passedAll={false} tumbnailImage={a.ThumbnailImg} title={a.Title} />
                        </>
                      )
                    }
                  })}
                </div>
              </>
            : null
          }

          {/* Song & Chant List */}
          {songActiveStatus
            ? <>
              <div className={style.song_book_list}>
                  {songItems.map((a,i) => {
                    return (
                      <>
                        <Link href={a.ContentsURL} target='_blank'>
                          <SongThumbnail key={i} passed1={false} passedAll={false} tumbnailImage={`/src/prek_song_land_thumbnail_images/${a.ThumbnailImage}`} title={a.Title} />
                        </Link>
                      </>
                    )
                  })}
                </div>
            </>
            
            : null
          }
        </div>
      </div>
      {studyActiveStatus ? <NextPickBar /> : null}
    </>
  )
}

interface CategoryProps {
  seriesNames: string[];
  currentSeriesName: string;
  setCurrentSeriesName: any;
}

const Category: React.FC<CategoryProps> = ({seriesNames, currentSeriesName, setCurrentSeriesName}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.category}>
      <div className={`${style.category_item} ${style.alphabet} ${seriesNames[0] == currentSeriesName ? style.active : null}`}  onClick={() => {setCurrentSeriesName(seriesNames[0])}}>
        <div className={style.txt_category_name}>Alphabet</div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${style.phonics} ${seriesNames[1] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[1])}}>
        <div className={style.txt_category_name}>Phonics</div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${style.word} ${seriesNames[2] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[2])}}>
        <div className={style.txt_category_name}>Word</div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${style.story} ${seriesNames[3] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[3])}}>
        <div className={style.txt_category_name}>Story</div>
        <div className={style.txt_status}>20/20</div>
      </div>
    </div>
  )
}

interface StudyThumbnailProps {
  key: number;
  active: boolean;
  passed1: boolean;
  passedAll: boolean;
  tumbnailImage: string;
  title: string;
}

const StudyThumbnail: React.FC<StudyThumbnailProps> = ({key, active, passed1, passedAll, tumbnailImage, title}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.study_thumbnail} ${active && style.active} ${passed1 || passedAll ? style.passed : null} ${passedAll && style.passed_all}`} key={key}>
      {passed1 && <div className={style.ico_passed_1}></div>}
      {passedAll && <div className={style.ico_passed_all}></div>}
      <div className={style.img_thumbnail}>
        <Image src={tumbnailImage} alt="" width={320} height={180} />
      </div>
      <div className={style.txt_study_title}>{title}</div>
      <div className={style.btn_download}></div>
    </div>
  )
}

const NextPickBar = () => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.next_pick_bar}>
      <div className={style.container}>
        <div className={style.col_1}>
          <div className={style.img_pick} style={{backgroundImage: 'url("https://wcfresource.a1edu.com/newsystem/image/br/covernew1/eb-pk-001.jpg")'}}>
          </div>
          <div>
            <div className={style.txt_label}>Next Pick!</div>
            <div className={style.txt_title}>Aa</div>
          </div>
        </div>
        <div className={style.col_2}>
          <div className={style.btn_start}></div>
        </div>
      </div>
    </div>
  )
}

interface SongCategoryProps {
  seriesNames: string[];
  currentSeriesName: string;
  setCurrentSeriesName: any;
}

const SongCategory: React.FC<SongCategoryProps> = ({seriesNames, currentSeriesName, setCurrentSeriesName}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.song_category}>
      <div className={`${style.category_item} ${seriesNames[5] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[5])}}>
        <div className={`${style.img_land} ${style.alphabet} ${seriesNames[5] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[6] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[6])}}>
        <div className={`${style.img_land} ${style.phonics} ${seriesNames[6] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[7] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[7])}}>
        <div className={`${style.img_land} ${style.nursery} ${seriesNames[7] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
    </div>
  )
}

interface SongThumbnailProps {
  key: number;
  passed1: boolean;
  passedAll: boolean;
  tumbnailImage: string;
  title: string;
}

const SongThumbnail: React.FC<SongThumbnailProps> = ({key, passed1, passedAll, tumbnailImage, title}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.song_thumbnail} ${style.active} ${passed1 || passedAll ? style.passed : null}`} key={key}>
      {passed1 && <div className={style.ico_passed_1}></div>}
      {passedAll && <div className={style.ico_passed_all}></div>}
      <div className={style.img_thumbnail}>
        <Image src={tumbnailImage} alt="" width={320} height={180} />
      </div>
      <div className={style.txt_study_title}>{title}</div>
    </div>
  )
}
