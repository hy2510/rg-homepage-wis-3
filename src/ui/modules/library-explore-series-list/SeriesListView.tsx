import { SearchSeriesCategory } from '@/repository/client/object/search-series-category'
import { SeriesItem, SeriesList } from './series-list'

export default function SeriesListView({
  series,
  onSeriesClick,
}: {
  series: SearchSeriesCategory[]
  onSeriesClick?: (seriesItem: SearchSeriesCategory) => void
}) {
  return (
    <SeriesList>
      {series.map((ss) => {
        return (
          <SeriesItem
            key={ss.name}
            theme={ss.color}
            seriesImgSrc={ss.imagePath}
            seriesName={ss.name}
            onClick={() => onSeriesClick && onSeriesClick(ss)}
          />
        )
      })}
    </SeriesList>
  )
}
