import React, { Component } from 'react'
// import axios from 'axios'

const config = {
  script:
    'https://script.google.com/a/angelodias.com.br/macros/s/AKfycbyNzwmRKak0_9hBat41RrkNhJaqeA6KxiaJPkic/exec',
  sheet: 'responses',
  // email: '',
}

const Thanks = () => (
  <div className="thankyou_message">
    <h2>Thanks for contacting us! We will get back to you soon!</h2>
  </div>
)

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        name: '',
        message: '',
        email: '',
        honeypot: '',
      },
      sent: false,
      clicked: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    const { form } = this.state

    // loading
    this.setState({ clicked: true })

    // sent
    const setSent = () => {
      this.setState({ sent: true })
    }

    // checking if bot
    const { honeypot } = form
    if (honeypot) {
      return false
    }

    // sending through xhr as axios won't work (CORS)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', config.script)
    // xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function xhrGo() {
      setSent()
    }
    const encoded = Object.keys(form)
      .map(k => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(form[k])}`
      })
      .join('&')

    // finally sending
    xhr.send(encoded)
    return true
  }

  handleChange = ({ target }) => {
    const { id, value } = target
    const { state } = this
    state.form[id] = value
    this.setState(state)
  }

  render() {
    const {
      form: { name, message, email, honeypot },
      sent,
      clicked,
    } = this.state

    return (
      <>
        {sent ? (
          <Thanks />
        ) : (
          <>
            <form
            // method="POST"
            // action={config.script} // change this url
            >
              <div>
                <fieldset>
                  <label htmlFor="name">
                    Name:
                    <input
                      onChange={this.handleChange}
                      id="name"
                      key="name"
                      name="name"
                      placeholder="What your Mom calls you"
                      value={name}
                    />
                  </label>
                </fieldset>
                <fieldset>
                  <label htmlFor="message">
                    Message:
                    <textarea
                      onChange={this.handleChange}
                      id="message"
                      key="message"
                      name="message"
                      rows={10}
                      placeholder="Tell us what's on your mind..."
                      value={message}
                    />
                  </label>
                </fieldset>
                <fieldset>
                  <label htmlFor="email">
                    Your Email Address:
                    <input
                      onChange={this.handleChange}
                      id="email"
                      key="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your.name@email.com"
                      value={email}
                    />
                  </label>
                </fieldset>
                <fieldset className="honeypot-field" style={{ display: 'none' }}>
                  <label htmlFor="honeypot">
                    {/* To help avoid spam, utilize a Honeypot technique with a hidden text field; must
                    be empty to submit the form! Otherwise, we assume the user is a spam bot. */}
                    <input
                      onChange={this.handleChange}
                      id="honeypot"
                      key="honeypot"
                      type="text"
                      name="honeypot"
                      value={honeypot}
                    />
                  </label>
                </fieldset>
                {clicked ? (
                  <button type="button" disabled>
                    Loading
                  </button>
                ) : (
                  <button type="button" onClick={() => this.handleClick()}>
                    Send
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </>
    )
  }
}

export default Form
