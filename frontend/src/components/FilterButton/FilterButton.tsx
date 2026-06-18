import { Button } from 'antd'
import filtersIcon from '../../assets/icons/filters.svg'

const FilterButton = ({toggleFilter}: {toggleFilter: () => void}) => {
  return (

      <Button onClick={toggleFilter}>
          <img src={filtersIcon} alt="icon" />
          Filters
      </Button>

  )
}

export default FilterButton