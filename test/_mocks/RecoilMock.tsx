import { FC, useEffect } from 'react'
import { RecoilRoot, RecoilState, useRecoilState } from 'recoil'

export type TRecoilMockProps = {
  node: RecoilState<any>
  onChange?: (value: any) => void
  values?: any
}

const Mock: FC<TRecoilMockProps> = ({ node, onChange, values, children }) => {
  const [value, setValue] = useRecoilState(node)

  useEffect(() => {
    if (values) setValue(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => onChange && onChange(value), [onChange, value])

  return <>{children}</>
}

export const RecoilMock: FC<TRecoilMockProps> = ({
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
