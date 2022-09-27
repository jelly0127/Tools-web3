import { createContext, useContext, useState } from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10001;

  .mask {
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #00000020;
  }
`

interface LoadingProps {
  text?: string
}
const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <Wrapper>
      <div className="mask">
        <ReactLoading type="spokes" className="icon" color="#777E90" />
        {text}
      </div>
    </Wrapper>
  )
}

type LoadingOptions = LoadingProps
type SetLoadingOptions = React.Dispatch<React.SetStateAction<LoadingOptions>>
const LoadingContext = createContext<[(show: boolean) => void, SetLoadingOptions]>([] as any)
export const LoadingProvider: React.FC<any> = ({ children }) => {
  const [showLoading, setShowLoading] = useState(false)
  const [loadingProps, setLoadingProps] = useState<LoadingOptions>({
    text: '',
  })

  return (
    <LoadingContext.Provider value={[setShowLoading, setLoadingProps]}>
      {children}
      {showLoading && <Loading {...loadingProps} />}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const [setShow, setLoadingProps] = useContext(LoadingContext)

  return {
    show({ autoHide }: { autoHide?: number } = {}) {
      setShow(true)
      if (autoHide) {
        setTimeout(() => {
          setShow(false)
        }, autoHide)
      }
    },
    hide() {
      setShow(false)
    },
    setLoadingProps(props: Partial<LoadingOptions>) {
      setLoadingProps(op => ({
        ...op,
        ...props,
      }))
    },
  }
}

export default Loading
