// const disableAllButtons = form => {
//   const buttons = form.querySelectorAll('button')
//   for (let i = 0; i < buttons.length; i += 1) {
//     buttons[i].disabled = true
//   }
// }

// get all data in form and return object
export const getFormData = form => {
  console.log(form)
  // const { elements } = form
  // let honeypot
  // const fields = Object.keys(elements)
  //   .filter(k => {
  //     if (elements[k].name === 'honeypot') {
  //       honeypot = elements[k].value
  //       return false
  //     }
  //     return true
  //   })
  //   .map(k => {
  //     if (elements[k].name !== undefined) {
  //       return elements[k].name
  //       // special case for Edge's html collection
  //     }
  //     if (elements[k].length > 0) {
  //       return elements[k].item(0).name
  //     }
  //     return null
  //   })
  //   .filter((item, pos, self) => {
  //       console.log(pos) // eslint-disable-line
  //     return self.indexOf(item) === pos && item
  //   })
  // const formData = {}
  // fields.forEach(name => {
  //   const element = elements[name]
  //   // singular form elements just have one value
  //   formData[name] = element.value
  //   // when our element has multiple items, get their values
  //   if (element.length) {
  //     const data = []
  //     for (let i = 0; i < element.length; i += 1) {
  //       const item = element.item(i)
  //       if (item.checked || item.selected) {
  //         data.push(item.value)
  //       }
  //     }
  //     formData[name] = data.join(', ')
  //   }
  // })
  // // add form-specific values into the data
  // formData.formDataNameOrder = JSON.stringify(fields)
  // formData.formGoogleSheetName = form.dataset.sheet || 'responses' // default sheet name
  // formData.formGoogleSend = form.dataset.email || '' // no email by default
  //   console.log(formData) // eslint-disable-line
  // return { data: formData, honeypot }
}

export const handleFormSubmit = event => {
  // handles form submit without any jquery
  event.preventDefault() // we are submitting via xhr below
  const form = event.target
  const formData = getFormData(form)
  const { data } = formData
  // If a honeypot field is filled, assume it was done so by a spam bot.
  if (formData.honeypot) {
      console.log('Robot Detected!') // eslint-disable-line
    return false
  }

  // disableAllButtons(form)

  const url = form.action
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  // xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.onreadystatechange = () => {
      console.log(xhr.status, xhr.statusText) // eslint-disable-line
      console.log(xhr.responseText) // eslint-disable-line
    form.reset()
    const formElements = form.querySelector('.form-elements')
    if (formElements) {
      formElements.style.display = 'none' // hide form
    }
    const thankYouMessage = form.querySelector('.thankyou_message')
    if (thankYouMessage) {
      thankYouMessage.style.display = 'block'
    }
  }
  // url encode form data for sending as post data
  const encoded = Object.keys(data)
    .map(k => {
      return `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`
    })
    .join('&')
  xhr.send(encoded)
  return true
}

export const loaded = () => {
    console.log('Contact form submission handler loaded successfully.') // eslint-disable-line
  // bind to the submit event of our form
  const forms = document.querySelectorAll('form.gform')
  for (let i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', handleFormSubmit, false)
  }
}
