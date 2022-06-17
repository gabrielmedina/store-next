import { FC, useEffect } from 'react'
import { RecoilRoot, RecoilState, useRecoilState } from 'recoil'

type TProps = {
  node: RecoilState<any>
  onChange: (value: any) => void
  values?: any
}

const Mock: FC<TProps> = ({ node, onChange, values, children }) => {
  const [value, setValue] = useRecoilState(node)

  useEffect(() => {
    if (values) setValue(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => onChange(value), [onChange, value])

  return <>{children}</>
}

export const RecoilMock: FC<TProps> = ({
  node,
  onChange,
  values,
  children,
}) => {
  return (
    <RecoilRoot>
      <Mock node={node} values={values} onChange={onChange}>
        {children}
      </Mock>
    </RecoilRoot>
  )
}
