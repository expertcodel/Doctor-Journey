"use client"
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../../../component/Editor.jsx'), { ssr: false })
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useEffect, useState } from 'react';
import axios from 'axios'

function Page() {


  const [primaryAuth, setPrimaryauth] = useState(false);
  const [primaryAuthlist, setPrimaryauthList] = useState([]);
  const [primaryAuthname, setPrimaryauthName] = useState("");
  const [secondaryAuth, setSecondaryauth] = useState(false);
  const [secondaryAuthlist, setSecondaryauthList] = useState([]);
  const [secondaryAuthname, setSecondaryauthName] = useState("");
  // const [content, setContent] = useState([]);
  // const [abstract, setAbstract] = useState("");
  // const [keywords, setKeywords] = useState("");
  // const [introduction, setIntroduction] = useState("");
  // const [methods, setMethods] = useState("");
  // const [results, setResults] = useState("");
  // const [discussion, setDiscussion] = useState("");
  // const [conclusion, setConclusion] = useState("");
  // const [references, setReferences] = useState("");
  // const [abbreviations, setAbbreviations] = useState("");
  // const [copyright, setCopyright] = useState("");
  // const [editor, setEditor] = useState([{ text: 'Abstract', open: true }, { text: 'Keywords', open: false }, { text: 'Introduction', open: false }, { text: 'Methods', open: false }, { text: 'Results', open: false }, { text: 'Discussion', open: false }, { text: 'Conclusion', open: false }, { text: 'References', open: false }, { text: 'Abbreviations', open: false }, { text: 'Copyright', open: false }]);

  

  
  const config = {
    readonly: false,
    toolbar: true,
    minHeight: 300,
    spellcheck: true,
    placeholder: 'Type something here...',
    uploader:{
      insertImageAsBase64URI: true
    }

  };

  async function saveArticle(e) {

    e.preventDefault();
    let arr=[];
    const value = document.querySelectorAll('.jodit-wysiwyg');
    const contentList = Array.from(value);
    contentList.map((item) => arr.push(item.innerHTML))
    // setContent((prev) => [...prev, item.innerHTML])
    // const value=document.getElementById('gf').value
    // console.log(value);
    
    const option =
    {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createArticle`,
      data:
      {

        userId: "3206283",
        articleTitle: e.target.Title.value.trim(),
        contentList: arr,
        articleSummary: e.target.Summary.value.trim(),
        DOI: e.target.DOI.value.trim(),
        price: Number(e.target.Price.value.trim()),
        remarks: e.target.Remarks.value.trim(),
        primaryAuthor: primaryAuthlist,
        secondaryAuthor: secondaryAuthlist
      }
    }

    await axios.request(option)

  }

  const handleList = () => {

    setPrimaryauthList((prev) => [...prev, primaryAuthname]);
    setPrimaryauth(false);

  }

  const removeItems = (idx) => {

    setPrimaryauthList((prev) => prev.filter((item, i) => i !== idx));


  }

  const handleList1 = () => {

    setSecondaryauthList((prev) => [...prev, secondaryAuthname]);
    setSecondaryauth(false);

  }

  const removeItems1 = (idx) => {

    setSecondaryauthList((prev) => prev.filter((item, i) => i !== idx));


  }




  return (
    <div className="main-content">
      <div className="page-content">



        <form onSubmit={saveArticle} className="row g-3">

          <div className="col-md-6">
            <label htmlFor="fullnameInput" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="fullnameInput"
              placeholder="Title"
              name='Title'
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="Price"
              name='Price'
              placeholder="Price"
            />
          </div>
          {/* {
            editor.map((item, i) =>
              <div className="col-12" key={i}>
                <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                  {item.text}
                  
                </label>

                <Editor key={i} idx={i}/>
              


              </div>
              ) } */}

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              abstract
            </label>

            <JoditEditor //value={abstract}
              config={config}
              className='editor-content'
              // onChange={(value) => setAbstract(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              keywords
            </label>

            <JoditEditor //value={keywords}
              config={config}
             // onChange={(value) => setKeywords(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              introduction
            </label>

            <JoditEditor //value={introduction}
              config={config}
              //onChange={(value) => setIntroduction(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              methods
            </label>

            <JoditEditor //value={methods}
              config={config}
              //onChange={(value) => setMethods(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              results
            </label>

            <JoditEditor //value={results}
              config={config}
             // onChange={(value) => setResults(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              discussion
            </label>

            <JoditEditor //value={discussion}
              config={config}
              //onChange={(value) => setDiscussion(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              conclusion
            </label>

            <JoditEditor //value={conclusion}
              config={config}
              //onChange={(value) => setConclusion(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              references
            </label>

            <JoditEditor //value={references}
              config={config}
              //onChange={(value) => setReferences(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              abbreviations
            </label>

            <JoditEditor //value={abbreviations}
              config={config}
              //onChange={(value) => setAbbreviations(value)}
            />
          </div>

          <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              copyright
            </label>

            <JoditEditor //value={copyright}
              config={config}
              //onChange={(value) => setCopyright(value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="DOI" className="form-label">
              DOI
            </label>
            <input
              type="text"
              className="form-control"
              id="DOI"
              placeholder="DOI"
              name='DOI'
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="Date"
              placeholder="Date"
              name='Date'
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAddress2" className="form-label">
              Primary author
            </label>
            <div className="form-select mb-3" style={{ height: '50px', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} onClick={() => setPrimaryauth(!primaryAuth)}>
            </div>


            {
              primaryAuthlist.length > 0 && <div className="form-control" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '-17px' }}>
                {
                  primaryAuthlist.map((item, i) => <div key={i} style={{ backgroundColor: '#405189', color: 'white', borderRadius: '5px', padding: '6px', display: 'flex', gap: '0.5rem' }}>{item}
                    <span><i class="ri-home-line ri-scissors-line" onClick={() => removeItems(i)}></i></span></div>)
                }
              </div>
            }
            {

              primaryAuth &&

              <div className="form-control" style={{ backgroundColor: '#fff', position: 'absolute', zIndex: '99', width: '97.5%', display: 'flex', gap: '2rem', padding: '30px', marginTop: primaryAuthlist.length === 0 ? "-17px" : "-1px" }} >


                <input type="text" className="form-control" placeholder='Add author' style={
                  { height: '40px', width: "65%" }} onChange={(e) => setPrimaryauthName(e.target.value)} />
                <button type="button" className="btn btn-primary" onClick={handleList}>
                  + Add
                </button>


              </div>

            }



          </div>
          <div className="col-md-6">
            <label htmlFor="inputAddress2" className="form-label">
              Secondary author
            </label>
            <div className="form-select mb-3" style={{ height: '50px', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} onClick={() => setSecondaryauth(!secondaryAuth)}>
            </div>
            {
              secondaryAuthlist.length > 0 && <div className="form-control" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '-17px' }}>
                {
                  secondaryAuthlist.map((item, i) => <div key={i} style={{ backgroundColor: '#405189', color: 'white', borderRadius: '5px', padding: '6px', display: 'flex', gap: '0.5rem' }}>{item}
                    <span><i class="ri-home-line ri-scissors-line" onClick={() => removeItems1(i)}></i></span></div>)
                }
              </div>
            }
            {

              secondaryAuth &&

              <div className="form-control" style={{ backgroundColor: '#fff', position: 'absolute', zIndex: '99', width: '97.5%', display: 'flex', gap: '2rem', padding: '30px', marginTop: secondaryAuthlist.length === 0 ? "-17px" : "-1px" }} >


                <input type="text" className="form-control" placeholder='Add author' style={
                  { height: '40px', width: "65%" }} onChange={(e) => setSecondaryauthName(e.target.value)} />
                <button type="button" className="btn btn-primary" onClick={handleList1}>
                  + Add
                </button>


              </div>

            }



          </div>




          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Summary
            </label>
            <textarea
              name='Summary'
              className="form-control"
              rows={5}
              placeholder="Summary"
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Remarks
            </label>
            <textarea
              name='Remarks'
              className="form-control"
              rows={5}
              placeholder="Remarks"
            />
          </div>

          <div className="col-12">
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
          {/* {
             content.map((item)=><div>{typeof(item)}</div>)
          } */}
        </form>



      </div>
    </div>
  )
}

export default Page