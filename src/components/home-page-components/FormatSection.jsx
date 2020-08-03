import React from 'react'

const FormatSection = (props) => {
  return (
    <section id="format">
      <div className="container">
        <h1>Formatting Content</h1>
        <p style={{padding: '0 10%', marginBottom: '1.7rem', fontSize: '1.1rem'}}>
          You can change the styling of text by simply selecting the text you want to format and then selecting a particlar style from toolbar (tooltip) that appears.
          Here is the list of all the formatting options that you can apply on content -
        </p>
        <div className="row">
          <div className="col-md-7 formatBtnCol" style={{textAlign: 'left'}}>
            <ul>
              <li>
                <span>H1</span> <span>H2</span> Create headings, <h3 style={{display: 'inline-flex'}}>H1 being bigger</h3> than <h5 style={{display: 'inline-flex'}}>H2</h5>.
              </li>
              <li>
                <span><u>A</u></span> Make your notes colorful, change <span style={{color: 'crimson', background: 'transparent', margin: '0', padding: '0'}}>color </span> <span style={{color: 'blueviolet', background: 'transparent', margin: '0', padding: '0'}}> of selected </span> <span style={{color: 'deepskyblue', background: 'transparent', margin: '0', padding: '0'}}>text.</span>
              </li>
              <li>
                <span>X<sub>2</sub></span> <span>X<sup>2</sup></span> Now writing <sup>formulas</sup> are even easier with these <sub>buttons</sub>.
              </li>
              <li>
                <span><b>B</b></span> <span><i>I</i></span> <span><u>U</u></span> <span><s>S</s></span><b>Bold</b>, <i>Italic</i>, <u>underline</u> and <s>Strikethrough</s> selected text respectively.
              </li>
              <li>
                <span style={{textAlign: 'center', fontSize: '1.5rem', padding: '0 6px', height: '20px'}}><b>&#8221;</b></span> <blockquote style={{display: 'inline-block'}}>Blockquote text.</blockquote>
              </li>
              <li>
                <span><i className="fas fa-list-ol"></i></span> <span><i className="fas fa-list-ul"></i></span> Add ordered and unordered respectively.
              </li>
              <li>
                <span><i className="fas fa-link"></i></span> Add <a href='#home'>links</a> to note.
              </li>
              <li>
                <span><i><u>T</u></i> <sub>x</sub></span> Clear all formatting from selected text.
              </li>
            </ul>
          </div>
          <div className="col-md-5">

          </div>
        </div>
      </div>
    </section>
  )
}

export default FormatSection;
