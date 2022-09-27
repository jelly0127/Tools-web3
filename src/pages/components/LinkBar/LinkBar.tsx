import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { flexCenter, IBMPlexSansThais } from '../../../style'

const LinkBox = styled.div`
  width: 996px;
  height: 52px;
  ${IBMPlexSansThais}

  ${flexCenter}
  margin: auto;
  flex-direction: row;
  justify-content: center;
  font-weight: 500;
  font-size: ${props => props.theme.fontNormal};
  border: 1px dashed ${props => props.theme.grey1};
  .link {
    text-decoration: underline;
  }
`
const LinkBar = () => {
  return (
    <LinkBox>
      <div>
        {'You can get test funds'}
        {'\u00A0'}
      </div>
      <Link to={'/mint'} className="link">
        here
      </Link>
    </LinkBox>
  )
}
export default LinkBar
