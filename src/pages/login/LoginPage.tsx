import React from 'react'

interface IProps {}

const LoginPage = (props: IProps) => {
  return (
    <div className="login-page">
      Hello world!
      <i className="fas fa-sun" />
    </div>
  )

  function test() {
    console.log('hello')
  }
}

export default LoginPage
