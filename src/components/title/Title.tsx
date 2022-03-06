import React from 'react'
import { Helmet } from 'react-helmet-async'

interface IProps {
  titleItems: Array<string | number | undefined>
}

const Title = ({ titleItems }: IProps) => {
  return (
    <Helmet>
      <title>{convertTitle(titleItems)}</title>
    </Helmet>
  )

  function convertTitle(items: Array<string | number | undefined>) {
    return `${items.filter(i => i).join(' - ')} - StreamElements Sounds Editor`
  }
}

export default Title
