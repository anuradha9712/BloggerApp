import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

//afterEach(cleanup)
describe.only('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'testing',
      author: 'anu',
      url: 'url',
      user: '123456789',
      likes: 10
    }
    mockHandler = jest.fn()
    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  it('renders its title', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('testing')
  })

  it('renders its author', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('anu')
  })

  it('renders its likes', () => {
    const div = component.container.querySelector('.likes')

    expect(div).toHaveTextContent(10)
  })

  it('like clicked twice works ', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})