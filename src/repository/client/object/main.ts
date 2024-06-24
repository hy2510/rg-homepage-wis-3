import RenewType from '@/util/string-utils'

export interface Main {
  slide: SlideBanner[]
  board: BoardBanner[]
  social: SocialBanner[]
  adImageBanner: AdImageBanner[]
  adBanner: AdBarBanner[]
  campaign: number
}

type SlideBanner = {
  image: string
  link: string
  self: boolean
}
type BoardBannerOption = {
  tag: string
  image: string
  tagColor: string
  titleColor: string
  dateColor: string
  summaryColor: string
  backgroundColor: string
  button: string
}
type BoardBanner = {
  template: 'notice' | 'infographic' | 'campaign' | 'newsletter' | undefined
  title: string
  summary: string
  date: string
  link: string
  self: boolean
  customDecorate?: BoardBannerOption
}
type SocialBanner = {
  image: string
  link: string
  self: boolean
}
type AdImageBanner = {
  title: string
  backgroundColor: string
  image: string
  width: number
  height: number
  link: string
  self: boolean
}
type AdBarBanner = {
  title: string
  subtitle: string
  backgroundColor: string
  image: string
  link: string
  self: boolean
}

export function makeMain(json?: any): Main {
  return {
    slide: json?.slide?.map((item: any): SlideBanner => {
      return {
        image: RenewType.renewString(item.image),
        link: RenewType.renewString(item.link),
        self: RenewType.renewBoolean(item.self),
      }
    }),
    board: json?.board?.map((item: any): BoardBanner => {
      return {
        template: RenewType.renewString(item.template) as
          | 'notice'
          | 'infographic'
          | 'campaign'
          | 'newsletter'
          | undefined,
        title: RenewType.renewString(item.title),
        summary: RenewType.renewString(item.summary),
        date: RenewType.renewString(item.date),
        link: RenewType.renewString(item.link),
        self: RenewType.renewBoolean(item.self),
      }
    }),
    social: json?.social?.map((item: any): SocialBanner => {
      return {
        image: RenewType.renewString(item.image),
        link: RenewType.renewString(item.link),
        self: RenewType.renewBoolean(item.self),
      }
    }),
    adImageBanner: json?.adImageBanner?.map((item: any): AdImageBanner => {
      return {
        title: RenewType.renewString(item.title),
        backgroundColor: RenewType.renewString(item.backgroundColor),
        image: RenewType.renewString(item.image),
        width: RenewType.renewNumber(item.width),
        height: RenewType.renewNumber(item.height),
        link: RenewType.renewString(item.link),
        self: RenewType.renewBoolean(item.self),
      }
    }),
    adBanner: json?.adBanner?.map((item: any): AdBarBanner => {
      return {
        title: RenewType.renewString(item.title),
        subtitle: RenewType.renewString(item.subtitle),
        backgroundColor: RenewType.renewString(item.backgroundColor),
        image: RenewType.renewString(item.image),
        link: RenewType.renewString(item.link),
        self: RenewType.renewBoolean(item.self),
      }
    }),
    campaign: RenewType.renewNumber(json.campaign),
  }
}
