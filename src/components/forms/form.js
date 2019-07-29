import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import axios from 'axios'

const config = {
  script:
    'https://script.google.com/a/angelodias.com.br/macros/s/AKfycbyNzwmRKak0_9hBat41RrkNhJaqeA6KxiaJPkic/exec',
  sheet: 'responses',
  // email: '',
}

const Thanks = () => (
  <div className="thankyou_message">
    <h2>Obrigado pelo contato!</h2>
    <p>Responderemos à sua solicitação em breve.</p>
  </div>
)

class Form extends Component {
  constructor(props) {
    super(props)
    const { form } = this.props
    this.state = {
      form: {
        form,
        name: '',
        message: '',
        email: '',
        honeypot: '',
      },
      sent: false,
      clicked: false,
      filled: false,
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
    const { form } = this.state
    form[id] = value

    // check if filled
    const data = Object.keys(form)
      .filter(each => each !== 'honeypot')
      .map(each => (form[each].trim().length === 0 ? 'empty' : 'full'))

    // check if email has @
    const hasAt = Object.keys(form)
      .filter(each => each === 'email')
      .map(each => form[each])
      .join('')
      .includes('@')
    const isFilled = !data.some(each => each === 'empty') && hasAt
    this.setState({ form, filled: isFilled })
  }

  render() {
    const {
      form: { name, message, email, honeypot },
      sent,
      clicked,
      filled,
    } = this.state

    const Button = () => {
      if (!filled) {
        return (
          <button type="button" disabled>
            Preencha os campos acima
          </button>
        )
      }
      if (clicked) {
        return (
          <button type="button" disabled>
            Carregando...
          </button>
        )
      }
      return (
        <button type="button" onClick={() => this.handleClick()}>
          Enviar
        </button>
      )
    }

    return (
      <>
        {sent ? (
          <Thanks />
        ) : (
          <>
            <form>
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
                <Button />
              </div>
            </form>
          </>
        )}
      </>
    )
  }
}

Form.propTypes = {
  form: PropTypes.string.isRequired,
}

export default Form
