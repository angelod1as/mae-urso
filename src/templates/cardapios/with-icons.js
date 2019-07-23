import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Plate from '../../svg/plate-fork-and-knife.svg'

const icons = {
  'Louças e Talheres': <Plate />,
  'Compra dos ingredientes': '',
  'Deslocamento do Chef': '',
  'Preparo do Menu': '',
  'Limpeza da cozinha': '',
}

const Icon = styled.div`
  display: flex;
  align-items: center;
  div {
    width: 40px;
    height: auto;
    margin-right: 10px;
    line-height: 0;
    svg {
      fill: ${p => p.theme.color.color};
    }
  }
`

const WithIcon = ({ item }) => {
  if (icons[item]) {
    return (
      <Icon>
        <div>{icons[item]}</div>
        <p>{item}</p>
      </Icon>
    )
  }
  return (
    <Icon>
      <div />
      <p>{item}</p>
    </Icon>
  )
}

WithIcon.propTypes = {
  item: PropTypes.string.isRequired,
}

export default WithIcon
