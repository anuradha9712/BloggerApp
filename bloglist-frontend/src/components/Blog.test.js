import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'
import Blog from './Blog'


let component

describe('Blog List Test', () => {

    beforeEach(() => {
        const blog ={
            title:"testing",
            author:"anuradha",
            url:"www.website.com",
            user:"anu",
            likes:1
        }

        const user = {
            username:"anu",
            name:"anu"
        }

        let setUpdate
        component = render(
            <Blog blog={blog} user={user}  setUpdate={setUpdate} />
        )
    })

    test('check title and Author', () => {

        const divTitle = component.container.querySelector('.titleAuthor')
        expect(divTitle).toHaveTextContent('testing')

        const divAuthor = component.container.querySelector('.titleAuthor')
        expect(divAuthor).toHaveTextContent('anuradha')

        console.log(prettyDOM(divTitle))
        component.debug()


    })

    
})


describe('<Togglable />', () => {
  
    beforeEach(() => {
      component = render(
        <Togglable buttonLabel="View">
          <div className="testDiv" />
        </Togglable>
      )
    })

    test('renders its children', () => {
        expect(
          component.container.querySelector('.testDiv')
        ).toBeDefined()
    })
    
    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')
    
        expect(div).toHaveStyle('display: none')
    })
    
    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('View')
        fireEvent.click(button)
    
        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', () => {
        const button = component.getByText('View')
        fireEvent.click(button)
      
        const closeButton = component.getByText('cancel')
        fireEvent.click(closeButton)
      
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })


})
