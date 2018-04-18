const html = require('choo/html')
const css = require('sheetify')
const prettyHash = require('pretty-hash')
const header = require('../components/header')
const button = require('../components/button')
const footer = require('../components/footer')

const prefix = css`
  :host {
    .content {
      margin: 1rem 1rem 2rem 1rem;
    }
    .uvp {
      box-shadow: 0 0 20px rgba(0,0,0,.15);
      padding: 1em;
    }
    .uvp h4 {
      margin: 0.5rem 1rem 1rem 1rem;
      font-size: 1.3rem;
      text-align: center;
    }
    h3 {
      margin-top: 2rem;
    }
    ul {
      padding: 0 0.3rem 0.5rem 0.3rem;
    }
    li {
      list-style-type: none;
      border: 1px solid var(--color-neutral-20);
      border-radius: 0.5rem;
      margin: 0 0 0.5rem 0;
      padding: 0 0.5rem;
      line-height: 3rem;
      position: relative;
      cursor: pointer;
      font-size: 1.2rem;
    }
    li span {
      font-size: 12px;
      font-family: monospace;
      line-height: 1rem;
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
      pointer-events: none;
    }
  }
`

module.exports = mainView

function mainView (state, emit) {
  const documents = state.documents.map(doc => {
    return html`
      <li onclick=${click} onkeydown=${keydown} tabindex="0" role="button">
        <span>${prettyHash(doc.key)}</span>
        <a href="/doc/${doc.key}" class="link" tabindex="-1">${doc.name}</a>
      </li>
    `
    function click (event) {
      event.target.querySelector('a').click()
    }
    function keydown (event) {
      if (event.key === ' ' || event.key === 'Enter') {
        event.target.querySelector('a').click()
      }
    }
  })
  const docHeader = documents.length > 0 ? html`<h3>Shopping Lists</h3>` : null
  return html`
    <body class=${prefix}>
      ${header()}
      <section class="content">
        <div class="uvp">
          <h4>Test drive multi-writer Dat!</h4>
          <p>
            This is a <b>Progressive Web App</b> built to demonstrate the use of the new 
            <b>multi-writer</b> capabilities from the 
            <a href="https://datproject.org/" class="link">Dat Project</a>.
          </p>
          <p>
            Make shopping lists and use them online or offline, and sync between multiple
            devices or users.
          </p>
        </p>
        <header>
          ${docHeader}
        </header>
        <ul>
          ${documents}
        </ul>
        ${button.button('Create a new Shopping List', () => emit('pushState', '/create'))}
      </section>
      ${footer(state)}
    </body>
  `
}
