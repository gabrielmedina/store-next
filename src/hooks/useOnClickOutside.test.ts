import { fireEvent, renderHook } from '@testing-library/react'
import { useOnClickOutside } from './useOnClickOutside'

const handlerMock = jest.fn()

const contentElement = document.createElement('div')
document.body.appendChild(contentElement)

const descendentElement = document.createElement('div')
contentElement.appendChild(descendentElement)

const outsideElement = document.createElement('div')
document.body.appendChild(outsideElement)

const refMock = { current: contentElement }

describe('useOnClickOutside()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call handler function when outside element has click (mousedown)', () => {
    renderHook(() => useOnClickOutside({ ref: refMock, handler: handlerMock }))

    expect(handlerMock).toHaveBeenCalledTimes(0)

    fireEvent.mouseDown(outsideElement)
    expect(handlerMock).toHaveBeenCalledTimes(1)
  })

  it('should call handler function when outside element has touch (touchstart)', () => {
    renderHook(() => useOnClickOutside({ ref: refMock, handler: handlerMock }))

    expect(handlerMock).toHaveBeenCalledTimes(0)

    fireEvent.touchStart(outsideElement)
    expect(handlerMock).toHaveBeenCalledTimes(1)
  })

  it("should don't call handler function when ref element has click", () => {
    renderHook(() => useOnClickOutside({ ref: refMock, handler: handlerMock }))

    expect(handlerMock).toHaveBeenCalledTimes(0)

    fireEvent.mouseDown(contentElement)
    expect(handlerMock).not.toHaveBeenCalled()
  })

  it("should don't call handler function when ref descendent elements has click", () => {
    renderHook(() => useOnClickOutside({ ref: refMock, handler: handlerMock }))

    expect(handlerMock).toHaveBeenCalledTimes(0)

    fireEvent.mouseDown(descendentElement)
    expect(handlerMock).not.toHaveBeenCalled()
  })
})
