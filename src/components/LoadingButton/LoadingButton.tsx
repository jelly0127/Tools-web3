import { LoadingButton as MLoadingButton } from '@mui/lab'
import styled from 'styled-components'
import { defaultTheme, IBMPlexSerifs } from '../../style'

const ButtonWrapper = styled(MLoadingButton)`
  background: transparent;
  font-family: ${IBMPlexSerifs};
  &.MuiButton-contained {
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
      /* padding-left: ${props => props.loading && '20px'}; */
      :hover {
        text-decoration: underline;
      }
    }
    &.small {
      line-height: 24px;
      font-size: ${defaultTheme.fontSmall};
      padding: 8px 16px;
      border-radius: 16px;
    }
    &.large {
      line-height: 24px;
      font-size: ${defaultTheme.fontLarge};
      padding: 16px 48px;
      border-radius: 32px;
    }
  }
  &.MuiButton-outlined {
    border-radius: 2px;
    background: ${defaultTheme.grey2};
    color: ${defaultTheme.grey1};
    border: 1px solid #000;
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
      background: #838080;
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
  }
  &.MuiButton-text {
    border: 0;
  }
`

type LoadingButtonProps = {
  loading?: boolean
  disabled?: boolean
  text: string
  size?: 'small' | 'large' | 'medium'
  variant?: 'text' | 'outlined' | 'contained' // 文字型、描边型、实心按钮
  fullWidth?: boolean // 是否根据父元素填充宽度
  loadingPosition?: 'center' | 'end' | 'start'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  disabled,
  text,
  size = 'medium',
  variant = 'contained',
  loadingPosition,
  fullWidth = false,
  onClick,
}) => {
  const handleClick = (evt: any) => {
    if (onClick && !disabled) {
      onClick(evt)
    }
  }

  return (
    <ButtonWrapper
      className={size}
      disabled={disabled}
      loading={loading}
      variant={variant}
      onClick={handleClick}
      size={size}
      loadingPosition={loadingPosition}
      fullWidth={fullWidth}
    >
      {disabled ? 'loading...' : text}
    </ButtonWrapper>
  )
}

export default LoadingButton
