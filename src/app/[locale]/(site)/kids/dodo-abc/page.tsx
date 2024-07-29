'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import PkList from '@/app/[locale]/(site)/kids/prek_list.json'
import { useEffect, useState } from 'react'

const STYLE_ID = 'page_kids_dodo_abc'

export default function Page() {
  const style = useStyle(STYLE_ID)
  const pkItems = [...PkList]
  const seriesNames = [
    'Dodo ABC (Alphabet)', 
    'Dodo ABC (Phonics 1)', 
    'Dodo ABC (Phonics 2)', 
    'Dodo ABC (Sight Words 1)', 
    'Dodo ABC (Sight Words 2)', 
    'Dodo ABC (Song & Chant > Alphabet Chant)', 
    'Dodo ABC (Song & Chant > Phonics Chant)', 
    'Dodo ABC (Song & Chant > Nursery Rhyme)',
    'Dodo ABC (Game > Alphabet)',
    'Dodo ABC (Game > Phonics)',
    'Dodo ABC (Game > Sight Words 1)',
    'Dodo ABC (Game > Sight Words 2)'
  ]
  const [currentSeriesName, setCurrentSeriesName] = useState(seriesNames[0])
  const studyActiveStatus = currentSeriesName == seriesNames[0] || currentSeriesName == seriesNames[1] || currentSeriesName == seriesNames[2] || currentSeriesName == seriesNames[3] || currentSeriesName == seriesNames[4]
  const songActiveStatus = currentSeriesName == seriesNames[5] || currentSeriesName == seriesNames[6] || currentSeriesName == seriesNames[7]
  const gameActiveStatus = currentSeriesName == seriesNames[8] || currentSeriesName == seriesNames[9] || currentSeriesName == seriesNames[10] || currentSeriesName == seriesNames[11]

  return (
    <>
      <div className={`${style.kids_dodo_abc} 
          ${currentSeriesName == seriesNames[0] && style.alphabet}
          ${currentSeriesName == seriesNames[1] && style.phonics_1}
          ${currentSeriesName == seriesNames[2] && style.phonics_2}
          ${currentSeriesName == seriesNames[3] && style.sight_word_1}
          ${currentSeriesName == seriesNames[4] && style.sight_word_2}
          ${currentSeriesName == seriesNames[5] && style.song_alphabet}
          ${currentSeriesName == seriesNames[6] && style.song_phonics}
          ${currentSeriesName == seriesNames[7] && style.song_nulsery}
          ${currentSeriesName == seriesNames[8] && style.game_alphabet}
          ${currentSeriesName == seriesNames[9] && style.game_phonics}
          ${currentSeriesName == seriesNames[10] && style.game_sight_word_1}
          ${currentSeriesName == seriesNames[11] && style.game_sight_word_2}
        `}
      >
        <div className='container compact'>
          <div className={style.logo}></div>

          <div className={`${style.nav} ${style.items_center}`}>
            <div className={`${style.nav_item} ${studyActiveStatus && style.active}`} onClick={() => {setCurrentSeriesName(seriesNames[0])}}>Study</div>
            <div className={`${style.nav_item} ${songActiveStatus && style.active}`} onClick={() => {setCurrentSeriesName(seriesNames[5])}}>Song & Chant</div>
            <div className={`${style.nav_item} ${gameActiveStatus && style.active}`} onClick={() => {setCurrentSeriesName(seriesNames[8])}}>Game</div>
          </div>

          {/* Study List */}
          {studyActiveStatus
            ? <>
                <Category seriesNames={seriesNames} currentSeriesName={currentSeriesName} setCurrentSeriesName={setCurrentSeriesName} />

                <div className={style.book_list}>
                  {currentSeriesName != seriesNames[4] && <MovieThumbnail tag='Intro' seriesNames={seriesNames} currentSeriesName={currentSeriesName}  />}

                  {pkItems.map((a,i) => {
                    if (a.SeriesName == currentSeriesName) {
                      return (
                        <>
                          <StudyThumbnail key={i} active={false} passed1={false} passedAll={false} tumbnailImage={a.ThumbnailImg} title={a.Title} />
                        </>
                      )
                    }
                  })}

                  {currentSeriesName != seriesNames[4] && <MovieThumbnail tag='Ending' seriesNames={seriesNames} currentSeriesName={currentSeriesName}  />}
                </div>
              </>
            : null
          }

          {/* Song & Chant List */}
          {songActiveStatus
            ? <>
                <SongCategory seriesNames={seriesNames} currentSeriesName={currentSeriesName} setCurrentSeriesName={setCurrentSeriesName} />
                
                <div className={style.book_list}>
                  {pkItems.map((a,i) => {
                    if (a.SeriesName == currentSeriesName) {
                      return (
                        <>
                          <SongThumbnail key={i} passed1={false} passedAll={false} tumbnailImage={a.ThumbnailImg} title={a.Title} />
                        </>
                      )
                    }
                  })}
                </div>
            </>
            
            : null
          }

          {/* Game List */}
          {gameActiveStatus
            ? <>
                <GameCategory seriesNames={seriesNames} currentSeriesName={currentSeriesName} setCurrentSeriesName={setCurrentSeriesName} />

                <div className={style.game_list}>
                  {pkItems.map((a,i) => {
                    if (a.SeriesName == currentSeriesName) {
                      return (
                        <>
                          <GameThumbnail key={i} active={true} passed1={false} passedAll={false} tumbnailImage={a.ThumbnailImg} title={a.Title} />
                        </>
                      )
                    }
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
      <div className={`${style.category_item} ${seriesNames[0] == currentSeriesName ? style.active : null}`}  onClick={() => {setCurrentSeriesName(seriesNames[0])}}>
        <div className={`${style.img_land} ${style.alphabet} ${seriesNames[0] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[1] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[1])}}>
        <div className={`${style.img_land} ${style.phonics_1} ${seriesNames[1] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[2] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[2])}}>
        <div className={`${style.img_land} ${style.phonics_2} ${seriesNames[2] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[3] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[3])}}>
        <div className={`${style.img_land} ${style.sight_word_1} ${seriesNames[3] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[4] == currentSeriesName ? style.active : null}`}  onClick={() => {setCurrentSeriesName(seriesNames[4])}}>
        <div className={`${style.img_land} ${style.sight_word_2} ${seriesNames[4] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
    </div>
  )
}

interface MovieThumbnailProps {
  tag: string;
  seriesNames: string[];
  currentSeriesName: string;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = ({tag, currentSeriesName, seriesNames}) => {
  const style = useStyle(STYLE_ID)

  const imgTumbnail = [
    {category: 'alphabet',
      intro: 'url("/src/images/@kids-dodo-abc/intro_movie_alphabet.png")',
      ending: 'url("/src/images/@kids-dodo-abc/ending_movie_alphabet.png")'
    },
    {category: 'phonics1',
      intro: 'url("/src/images/@kids-dodo-abc/intro_movie_phonics1.png")',
      ending: 'url("/src/images/@kids-dodo-abc/ending_movie_phonics1.png")'
    },
    {category: 'phonics2',
      intro: 'url("/src/images/@kids-dodo-abc/intro_movie_phonics2.png")',
      ending: 'url("/src/images/@kids-dodo-abc/ending_movie_phonics2.png")'
    },
    {category: 'sightWord',
      intro: 'url("/src/images/@kids-dodo-abc/intro_movie_sight_word.png")',
      ending: 'url("/src/images/@kids-dodo-abc/ending_movie_sight_word.png")'
    }
  ]

  const [introMovieThumbnailURL, setIntroMovieThumbnailURL] = useState('')
  const [endingMovieThumbnailURL, setEndingMovieThumbnailURL] = useState('')

  useEffect(() => {
    currentSeriesName == seriesNames[0] && setIntroMovieThumbnailURL(imgTumbnail[0].intro)
    currentSeriesName == seriesNames[1] && setIntroMovieThumbnailURL(imgTumbnail[1].intro)
    currentSeriesName == seriesNames[2] && setIntroMovieThumbnailURL(imgTumbnail[2].intro)
    currentSeriesName == seriesNames[3] && setIntroMovieThumbnailURL(imgTumbnail[3].intro)
    currentSeriesName == seriesNames[0] && setEndingMovieThumbnailURL(imgTumbnail[0].ending)
    currentSeriesName == seriesNames[1] && setEndingMovieThumbnailURL(imgTumbnail[1].ending)
    currentSeriesName == seriesNames[2] && setEndingMovieThumbnailURL(imgTumbnail[2].ending)
    currentSeriesName == seriesNames[3] && setEndingMovieThumbnailURL(imgTumbnail[3].ending)
  }, [currentSeriesName])

  return (
    <div className={`${style.movie_thumbnail}`}>
      <div className={style.tag}>
        <span className={style.ico_movie}></span>
        <span className={style.txt_tag}>{tag}</span>
      </div>
      <div 
        className={style.img_thumbnail}
        style={{backgroundImage: `${tag == 'Intro' ? introMovieThumbnailURL : endingMovieThumbnailURL}`
      }}>
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
          <div className={style.img_pick} style={{backgroundImage: 'url("https://wcfresource.a1edu.com/newsystem/image/dodoabc/cover/eb-pk-301.jpg")'}}>
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

interface GameCategoryProps {
  seriesNames: string[];
  currentSeriesName: string;
  setCurrentSeriesName: any;
}

const GameCategory: React.FC<GameCategoryProps> = ({seriesNames, currentSeriesName, setCurrentSeriesName}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.game_category}>
      <div className={`${style.category_item} ${seriesNames[8] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[8])}}>
        <div className={`${style.img_land} ${style.alphabet} ${seriesNames[8] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[9] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[9])}}>
        <div className={`${style.img_land} ${style.phonics} ${seriesNames[9] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[10] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[10])}}>
        <div className={`${style.img_land} ${style.sight_word_1} ${seriesNames[10] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
      <div className={`${style.category_item} ${seriesNames[11] == currentSeriesName ? style.active : null}`} onClick={() => {setCurrentSeriesName(seriesNames[11])}}>
        <div className={`${style.img_land} ${style.sight_word_2} ${seriesNames[11] == currentSeriesName ? style.active : null}`}></div>
        <div className={style.txt_status}>20/20</div>
      </div>
    </div>
  )
}

interface GameThumbnailProps {
  key: number;
  active: boolean;
  passed1: boolean;
  passedAll: boolean;
  tumbnailImage: string;
  title: string;
}

const GameThumbnail: React.FC<GameThumbnailProps> = ({key, active, passed1, passedAll, tumbnailImage}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.game_thumbnail} ${active && style.active} ${passed1 || passedAll ? style.passed : null}`} key={key}>
      {passed1 && <div className={style.ico_passed_1}></div>}
      {passedAll && <div className={style.ico_passed_all}></div>}
      <div className={style.img_thumbnail}>
        <Image src={tumbnailImage} alt="" width={320} height={180} />
      </div>
    </div>
  )
}