import { Button as MButton } from '@mui/material'
import styled, { keyframes } from 'styled-components'
import { defaultTheme, IBMPlexSerifs } from '../../style'

const ButtonWrapper = styled(MButton)`
  font-family: ${IBMPlexSerifs};

  &.MuiButton-contained {
    font-family: ${IBMPlexSerifs};

    box-shadow: none;
    border-radius: 2px;
    background: ${defaultTheme.grey2};
    color: ${defaultTheme.grey1};
    line-height: 22px;
    font-size: ${defaultTheme.fontNormal};
    padding: 8px 24px;
    text-transform: none;
    width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
    position: relative;
    overflow: hidden;
    border: 1px solid #000;
    ::after {
      content: '';
      display: block;
      position: absolute;
      top: -120px;
      left: -80px;
      width: 26px;
      height: 360px;
      background: #727070;
      opacity: 0.2;
      transform: rotate(-45deg);
      transition: all 0.5s ease-out;
    }
    :hover {
      text-decoration: underline;
    }
    :hover::after {
      left: 140%;
    }
    &.Mui-disabled {
      font-family: ${IBMPlexSerifs};
      background: ${defaultTheme.grey2};
      color: ${defaultTheme.grey3};
      cursor: not-allowed;
      pointer-events: auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    &.small {
      line-height: 24px;
      font-size: 18px;
      padding: 16px 48px;
      border-radius: 32px;
    }
    &.large {
      line-height: 24px;
      font-size: ${defaultTheme.fontSmall};
      padding: 8px 16px;
      border-radius: 16px;
    }
  }
  &.MuiButton-outlined {
    box-shadow: none;
    color: ${props => props.theme.grey1};
    border-color: ${props => props.theme.grey3};
    border-radius: 2px;
    font-weight: 400;
    text-transform: none;
    font-size: ${defaultTheme.fontNormal};
    padding: 8px 24px;
    font-family: ${IBMPlexSerifs};
  }
  &.MuiButton-text {
    border: 0;
  }
`
const ButtonPrimary = styled(MButton)`
  background: transparent;

  &.MuiButton-contained {
    box-shadow: none;
    font-family: ${IBMPlexSerifs};

    border-radius: 2px;
    background: ${defaultTheme.grey1};
    color: ${defaultTheme.grey2};
    line-height: 22px;
    font-size: ${defaultTheme.fontNormal};
    padding: 8px 24px;
    text-transform: none;
    width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
    position: relative;
    overflow: hidden;
    ::after {
      content: '';
      display: block;
      position: absolute;
      top: -120px;
      left: -80px;
      width: 26px;
      height: 360px;
      background: #ffffff;
      opacity: 0.2;
      transform: rotate(-45deg);
      transition: all 0.5s ease-out;
    }
    :hover {
      text-decoration: underline;
    }
    :hover::after {
      left: 140%;
    }
    &.Mui-disabled {
      background: ${props => props.theme.grey1};
      color: ${defaultTheme.grey2};
      /* -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; */
      cursor: not-allowed;
      pointer-events: auto;
    }
    &.small {
      line-height: 24px;
      font-size: 18px;
      padding: 16px 48px;
      border-radius: 32px;
    }
    &.large {
      line-height: 24px;
      font-size: ${defaultTheme.fontSmall};
      padding: 8px 16px;
      border-radius: 16px;
    }
  }
  &.MuiButton-outlined {
    box-shadow: none;
    font-family: ${IBMPlexSerifs};

    color: ${props => props.theme.grey1};
    border-color: ${props => props.theme.grey3};
    border-radius: 2px;
    font-weight: 400;
    text-transform: none;
    font-size: ${defaultTheme.fontNormal};
    padding: 8px 24px;
    position: relative;
    overflow: hidden;
    ::after {
      content: '';
      display: block;
      position: absolute;
      top: -120px;
      left: -80px;
      width: 26px;
      height: 360px;
      background: #ffffff;
      opacity: 0.2;
      transform: rotate(-45deg);
      transition: all 0.5s ease-out;
    }
    :hover {
      text-decoration: underline;
    }
    :hover::after {
      left: 200%;
    }
  }
  &.MuiButton-text {
    border: 0;
  }
`
type ButtonProps = {
  disabled?: boolean
  text: string
  primary?: boolean
  size?: 'small' | 'large' | 'medium'
  variant?: 'text' | 'outlined' | 'contained' // 文字型、描边型、实心按钮
  fullWidth?: boolean // 是否根据父元素填充宽度
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  disabled,
  text,
  size = 'medium',
  variant = 'contained',
  primary,
  fullWidth = false,
  style,
  onClick,
}) => {
  const handleClick = (evt: any) => {
    if (onClick && !disabled) {
      onClick(evt)
    }
  }

  return (
    <>
      {primary ? (
        <ButtonPrimary
          style={style}
          className={size}
          disabled={disabled}
          variant={variant}
          onClick={handleClick}
          size={size}
        >
          <span className=".left-to-right">{text}</span>
        </ButtonPrimary>
      ) : (
        <ButtonWrapper
          style={style}
          className={size}
          disabled={disabled}
          variant={variant}
          onClick={handleClick}
          size={size}
        >
          <span className=".left-to-right">{text}</span>
        </ButtonWrapper>
      )}
    </>
  )
}

export default Button
