// console.log(globalThis.hybrids === hybrids, {globalThis} );
let { define, html, children } = globalThis.hybrids ?? {} // import { define,html } from 'hybrids'; // will be async imported

const classDefaults = 'frow-g2 h-6 w-1/2'

const FlexRow = {
  tag: 'flex-row',
  
  'classbefore': `gap-0`,
  'classafter': `gap-0`,

  // render: ({classAfter}) => ({ class: `flex flex-row justify-between h-6 w-1/2 gap-2 ${classAfter}`}),
  // class: classDefaults, // works fine
  // class: ({ classbefore, classafter }) => html`${classbefore} ${classDefaults} ${classafter}`,
  
  class: '', // works fine
  
  // class: ({ classbefore, classafter }) => Object.assign(()=>html``, { class: `${classbefore} ${classDefaults} ${classafter}`}),
  className: (passed) => {
    const { classbefore, classafter } = passed
    console.log({classbefore, classafter, passed})
    passed.class = `${classbefore} ${classDefaults} ${classafter}`
    return `${classbefore} ${classDefaults} ${classafter}`
  },

  // allChildren: children((c)=>console.log(c) ?? true), // ${allChildren}
  // display: ({inputBuffer,answer}) => makeDisplay(inputBuffer, answer),
  // render: ({ children, className }) => html`
  //   <div className="${className}">
  //     ${[...children].map(item => html`
  //       <div>${item}</div>
  //     `)}
  //   </div>
  // `,
  content: (host) => {
    const { children, className } = host
    host.class = className
    return html`
      ${[...children].map(item => {
        console.log({item});
        const extractedClass = item.className
        item.className = ''
        return html`
          <div class="${extractedClass} btn h-fit b-1 bg-blue-400">${item}</div>`})
      }
    `
  },
  // render: (host) => Object.assign(host, { class: host.className }),
}

if(globalThis.hybrids){
  define(FlexRow)
}

void (async ()=>{
  // const hybridsModule = await import('https://www.unpkg.com/hybrids@8.0.8/src/index.js')
  // console.log(hybridsModule)

  // console.log(define === globalThis.hybrids?.define, {define, globalThis},'before' )
  if(!globalThis.hybrids){
    globalThis.hybrids = await import('https://www.unpkg.com/hybrids@8.0.8/src/index.js')
    console.log('fetch needed in flex-row')
    ;( { define, html, children } = globalThis.hybrids) // destructuring onto pre initialized vars needs this funny ;(syntax) // https://flaviocopes.com/javascript-destructure-object-to-existing-variable/
    // console.log({define, globalThis}, define === globalThis.hybrids.define )
    define(FlexRow)
  } 
  
})()