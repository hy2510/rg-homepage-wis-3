"use client";

import { useScreenMode, useStyle } from "@/ui/context/StyleContext";
import Image from "next/image";
import { useState } from "react";

const STYLE_ID = "page_about";

export default function Page() {
  const style = useStyle(STYLE_ID);
  const isMobile = useScreenMode() === "mobile";

  return (
    <>
      <div className={style.about}>
        <div className={style.global_header_bg}></div>
      </div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
    </>
  );
}

const Section1 = () => {
  const style = useStyle(STYLE_ID);
  const backgroundVideo = "/src/videos/about_video_background.mp4";

  return (
    <div className={style.section_1}>
      <div className={style.ribbon}></div>
      <div className={style.center_group}>
        <div className={style.main_title}>
          <div className={style.row_1}>
            <span className={style.txt}>초등부터</span>
            <span className={style.line}></span>
            <span className={style.txt}>성인까지</span>
          </div>
          <div className={style.row_2}>
            <span>문해력 잡는 영어독서 앱</span>
          </div>
          <div className={style.row_3}>
            비결은 제대로된 <b>다독과 정독!</b>
          </div>
        </div>
        <div className={style.app_link_group}>
          <div className={style.btn}>Web</div>
          <div className={style.btn}>iOS</div>
          <div className={style.btn}>Android</div>
        </div>
      </div>
      {/* 백그라운드 비디오 연속 재생 */}
      <div className={style.video_background}>
        <video className="background-video" autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const Section2 = () => {
  const style = useStyle(STYLE_ID);

  return (
    <div className={style.section_2}>
      <div className={style.hero_text}>
        <div className={style.row_1}>
          <div className={style.col_1}>
            <div className={style.txt_1}>회원 누적 74만명!</div>
            <div className={style.txt_2}>초등학교 영어</div>
          </div>
          <div className={style.col_2}>
          </div>
          <div className={style.col_3}>프로그램 공급 1위</div>
        </div>
        <div className={style.row_2}>
          <div className={style.award_item}>
            <div>2019</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2020</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2021</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2022</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
          <div className={style.award_item}>
            <div>2023</div>
            <div>대한민국 교육</div>
            <div>브랜드 대상</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Section3 = () => {
  const style = useStyle(STYLE_ID);

  return (
    <div className={style.section_3}>
      <div className={style.col_1}></div>
      <div className={style.col_2}>
        <div className={style.txt_1}>영어 실력을 좌우하는 문해력 키우기,</div>
        <div className={style.txt_2}>
          <div>‘다독과 정독’이</div>
          <div className={style.dot_box}>
            <div className={style.txt}>정답입니다</div><span className={style.dot}></span>
          </div>
        </div>
        <div className={style.txt_3}>리딩게이트는 총 6,000여 권의 방대한 학습 도서 컨텐츠를 제공! 수준별 다양한 주제의 영어 환경 속에서 소리내어 읽고, 독후 학습을 통해 영어의 문맥과 핵심 파악 능력을 키울 수 있습니다.</div>
      </div>
    </div>
  )
}

const Section4 = () => {
  const style = useStyle(STYLE_ID);

  return (
    <div className={style.section_4}>
      <div className={style.row_1}>
        <div className={style.txt_1}>다독을 위한 최상의 조건</div>
        <div className={style.txt_2}>오디오 스토리북 3,000권 + @</div>
      </div>
      <div className={style.row_2}>
        <div className={style.contents_image}>
        </div>
      </div>
    </div>
  )
}

const Section5 = () => {
  const style = useStyle(STYLE_ID);

  const [tabActive, setTabActive] = useState([true, false, false]);

  const Tabs = () => {
    return (
      <div className={style.tabs}>
        <TabButton txt1={'Level K'} txt2={'초등 저학년 학생'} active={tabActive[0]} onClick={() => {setTabActive([true, false, false])}} />
        <TabButton txt1={'Level 1'} txt2={'초등 고학년 학생'} active={tabActive[1]} onClick={() => {setTabActive([false, true, false])}} />
        <TabButton txt1={'Level 2~6'} txt2={'중학생 이상'} active={tabActive[2]} onClick={() => {setTabActive([false, false, true])}} />
      </div>
    )
  }

  type TabButtonProps = {
    txt1: string;
    txt2: string;
    active: boolean;
    onClick: any;
  };

  const TabButton: React.FC<TabButtonProps> = ({txt1, txt2, active, onClick}) => {
    return (
      <div className={`${style.tab_button} ${active ? style.active : ''}`} onClick={onClick}>
        <div className={style.txt_1}>{txt1}</div>
        <div className={style.txt_2}>{txt2}</div>
      </div>
    )
  }

  const SlideCard = () => {
    return (
      <>
        <div className={style.slide_card}>
          <div className={style.btn_left}></div>
          <div className={style.slide_image}>
            <Image src={'/src/images/@about/section05/sample.png'} width={1100} height={720} alt='' />
          </div>
          <div className={style.btn_right}></div>
        </div>
        <div className={style.slide_card_contents}>
          <div className={style.slide_card_contents_row_1}>
            <div className={style.step}>Step1</div>
            <div className={style.study_name}>Reading Comprehension</div>
          </div>
          <div className={style.slide_card_contents_row_2}>단어를 듣고 알맞은 그림을 찾으며 듣기 집중 훈련을 할 수 있어요.</div>
        </div>
        <div className={style.dots}>
          <div className={`${style.dot} ${style.active}`}></div>
          <div className={`${style.dot}`}></div>
          <div className={`${style.dot}`}></div>
          <div className={`${style.dot}`}></div>
        </div>
      </>
    )
  }

  return (
    <div className={style.section_5}>
      <div className={style.row_1}>
        <div className={style.txt_1}>제대로된 정독 훈련!</div>
        <div className={style.txt_2}>독서 퀴즈 세트 6,000편 + @</div>
      </div>
      <Tabs />
      <SlideCard />
    </div>
  )
}

const Section6 = () => {
  const style = useStyle(STYLE_ID);

  return (
    <div className={style.section_6}>
      <div className={style.container}>
        <div className={style.col_left}>
          <div className={style.title}>
            <div className={style.txt_1}>수준별 목표 달성!</div>
            <div className={style.txt_2}>레벨업 시스템</div>
          </div>
        </div>
        <div className={style.col_right}>
          <div className={style.card_1}>
            <div className={style.symbol_image}>
              <Image src={"/src/images/@about/section06/img_symbol_01.svg"} width={456} height={475} alt="" />
              <div className={style.sub_text}>
                <div className={style.txt}>Level-Up</div>
                <div className={style.txt}>System</div>
              </div>
            </div>
            <div className={style.text_group}>
              <div className={style.txt_1}>레벨별 필요 포인트</div>
              <div className={style.txt_2}>달성시 자동 레벨업!</div>
              <div className={style.txt_3}>모든 책에는 포인트가 부여되어 있으며, 독후 학습 PASS시 해당 포인트를 획득할 수 있습니다.각 레벨마다 일정 포인트가 쌓이면 자동으로 레벌 업이 됩니다.</div>
            </div>
          </div>
          <div className={style.card_2}>
            <div className={style.symbol_image}>
              <Image src={"/src/images/@about/section06/img_symbol_02.svg"} width={456} height={475} alt="" />
              <div className={style.sub_text}>
                <div className={style.txt}>Level-Up</div>
                <div className={style.txt}>System</div>
              </div>
            </div>
            <div className={style.text_group}>
              <div className={style.txt_1}>레벨별 필요 포인트</div>
              <div className={style.txt_2}>달성시 자동 레벨업!</div>
              <div className={style.txt_3}>모든 책에는 포인트가 부여되어 있으며, 독후 학습 PASS시 해당 포인트를 획득할 수 있습니다.각 레벨마다 일정 포인트가 쌓이면 자동으로 레벌 업이 됩니다.</div>
            </div>
          </div>
          <div className={style.card_3}>
            <div className={style.symbol_image}>
              <Image src={"/src/images/@about/section06/img_symbol_03.svg"} width={456} height={475} alt="" />
              <div className={style.sub_text}>
                <div className={style.txt}>Level-Up</div>
                <div className={style.txt}>System</div>
              </div>
            </div>
            <div className={style.text_group}>
              <div className={style.txt_1}>레벨별 필요 포인트</div>
              <div className={style.txt_2}>달성시 자동 레벨업!</div>
              <div className={style.txt_3}>모든 책에는 포인트가 부여되어 있으며, 독후 학습 PASS시 해당 포인트를 획득할 수 있습니다.각 레벨마다 일정 포인트가 쌓이면 자동으로 레벌 업이 됩니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Section7 = () => {
  const style = useStyle(STYLE_ID);

  return (
    <div className={style.section_7}>
      <div className={style.title}>
        <div className={style.txt_1}>꼼꼼한 관리</div>
        <div className={style.txt_2}>학습케어 서비스</div>
      </div>
      <div className={style.jumbotron}>
        <div className={style.col_left}>
          <div className={style.text_group}>
            <div className={style.txt_1}>레벨테스트</div>
            <div className={style.txt_2}>회원의 영어 리딩 수준을 확인 할 수 있어요.</div>
          </div>
          <div className={style.arrows}>
            <div className={style.btn_arrow_left}></div>
            <div className={style.btn_arrow_right}></div>
          </div>
        </div>
        <div className={style.col_right}>
          <div className={style.card_contents}>
            <Image src={'/src/images/@about/section07/contents01.png'} alt="" width={770} height={410} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Section8 = () => {
  const style = useStyle(STYLE_ID);

  const reviewData = [
    {
      title: "4살 아이! 보고 또 보니",
      post: "영어로 대답해요!",
      name: "허니* 님",
    },
    {
      title: "5살 아이! 놀이처럼 했더니",
      post: "단어가 저절로!",
      name: "팬더** 님",
    },
    {
      title: "엄마와 함께 목표를 세우고",
      post: "독후프로그램까지 으쌰으쌰!",
      name: "하나** 님",
    },
    {
      title: "수준에 맞는 eBook으로",
      post: "문제풀이까지 non-stop",
      name: "김*아 님",
    },
    {
      title: "학원 도움 없이도",
      post: "단어, 문제풀기까지 커버 가능!",
      name: "김*영님",
    },
    {
      title: "4살 아이! 보고 또 보니",
      post: "영어로 대답해요!",
      name: "허니* 님",
    },
    {
      title: "5살 아이! 놀이처럼 했더니",
      post: "단어가 저절로!",
      name: "팬더** 님",
    },
    {
      title: "엄마와 함께 목표를 세우고",
      post: "독후프로그램까지 으쌰으쌰!",
      name: "하나** 님",
    },
    {
      title: "수준에 맞는 eBook으로",
      post: "문제풀이까지 non-stop",
      name: "김*아 님",
    },
    {
      title: "학원 도움 없이도",
      post: "단어, 문제풀기까지 커버 가능!",
      name: "김*영님",
    },
    {
      title: "4살 아이! 보고 또 보니",
      post: "영어로 대답해요!",
      name: "허니* 님",
    },
    {
      title: "5살 아이! 놀이처럼 했더니",
      post: "단어가 저절로!",
      name: "팬더** 님",
    },
    {
      title: "엄마와 함께 목표를 세우고",
      post: "독후프로그램까지 으쌰으쌰!",
      name: "하나** 님",
    },
    {
      title: "수준에 맞는 eBook으로",
      post: "문제풀이까지 non-stop",
      name: "김*아 님",
    },
    {
      title: "학원 도움 없이도",
      post: "단어, 문제풀기까지 커버 가능!",
      name: "김*영님",
    },
  ]

  type ReviewCardProps = {
    txt_1: string;
    txt_2: string;
    txt_3: string;
  }

  const ReviewCard: React.FC<ReviewCardProps> = ({txt_1, txt_2, txt_3}) => {
    return (
      <div className={style.review_card}>
        <div className={style.txt_1}>{txt_1}</div>
        <div className={style.line}></div>
        <div className={style.txt_2}>{txt_2}</div>
        <div className={style.line}></div>
        <div className={style.txt_3}>{txt_3}</div>
      </div>
    )
  }

  return (
    <div className={style.section_8}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.txt_1}>꿈을 이룬 놀라운 경험!</div>
          <div className={style.txt_2}>리게인들의 생생 후기</div>
          <div className={style.real_review_image}>
            <Image src={'/src/images/@about/section08/text_real_review.svg'} width={376} height={120} alt=""/>
          </div>
        </div>
        <div className={style.video_thumnail}>
          <iframe frameBorder={0} width="100%" height="100%" src="https://www.youtube.com/embed/VZE-tDzBcxA?si=ONCujaG5TnjmGvsg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
      </div>
      <div className={style.reviews}>
        {reviewData.map((a, i) => {
          return (
            <>
              <ReviewCard txt_1={a.title} txt_2={a.post} txt_3={a.name} />
            </>
          )
        })}
      </div>
      <div className={style.container_2}>
        <div className={style.btn_line}>다른 후기 더보기</div>
      </div>
    </div>
  )
}

const Section9 = () => {
  const style = useStyle(STYLE_ID);

  type CategoryButtonProps = {
    img: string;
    txt_1: string;
    txt_2: string;
    txt_3: string;
    etc: boolean;
  }

  const CategoryButton: React.FC<CategoryButtonProps> = ({img, txt_1, txt_2, txt_3, etc}) => {
    return (
      <div className={style.category_button}>
        <div className={style.icon_image}>
          <Image src={img} width={100} height={100} alt="" />
        </div>
        <div className={style.txt_1}>{txt_1}</div>
        <div className={style.txt_2}>{txt_2}</div>
        <div className={`${etc ? style.txt_2 : style.txt_3}`}>{txt_3}</div>
      </div>
    )
  }

  return (
    <div className={style.section_9}>
      <div className={style.header}>
        <div className={style.txt_1}>국내외 1,000여개 교육기관이 선택!</div>
        <div className={style.txt_2}>초등 선생님들이 검증하고, 어머님들이 인정한</div>
        <div className={style.txt_3}>최고의 영어독서 앱 <b>리딩게이트</b>를 경험해 보세요!</div>
      </div>
      <div className={style.buttons}>
        <CategoryButton img="/src/images/@about/section09/ico_prek_icon.svg" txt_1="기초영어프로그램" txt_2="영어가 처음인 미취학 ~ 초등 저학년" txt_3="207편" etc={false} />
        <CategoryButton img="/src/images/@about/section09/ico_ebook_icon.svg" txt_1="오디오 스토리북" txt_2="초등 저학년 ~ 성인" txt_3="3,000권 + @" etc={false} />
        <CategoryButton img="/src/images/@about/section09/ico_quiz_icon.svg" txt_1="독서 퀴즈 세트" txt_2="초등 저학년 ~ 성인" txt_3="6,000편 + @" etc={false} />
        <CategoryButton img="/src/images/@about/section09/ico_level_up_icon.svg" txt_1="레벨업 시스템" txt_2="미국 유치원 ~ 초등 6학년 기준" txt_3="수준별로 체계적 관리" etc={true} />
      </div>
    </div>
  )
}