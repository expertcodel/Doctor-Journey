"use client"
import dynamic from 'next/dynamic';
//const Editor = dynamic(() => import('../../../../component/Editor.jsx'), { ssr: false })
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'next/navigation.js';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



function Page() {


  const [primaryAuth, setPrimaryauth] = useState(false);
  const [primaryAuthlist, setPrimaryauthList] = useState([]);
  const [primaryAuthname, setPrimaryauthName] = useState("");
  // const [updatedList, setUpdatedlist] = useState([]);
  // const [keywords, setKeywords] = useState("");
  // const [introduction, setIntroduction] = useState("");
  // const [methods, setMethods] = useState("");
  // const [results, setResults] = useState("");
  // const [discussion, setDiscussion] = useState("");
  // const [conclusion, setConclusion] = useState("");
  // const [references, setReferences] = useState("");
  // const [abbreviations, setAbbreviations] = useState("");
  // const [copyright, setCopyright] = useState("");
  
  const [secondaryAuth, setSecondaryauth] = useState(false);
  const [secondaryAuthlist, setSecondaryauthList] = useState([]);
  const [secondaryAuthname, setSecondaryauthName] = useState("");
  //const [content1, setContent1] = useState('');
  const config = {
    readonly: false,
    toolbar: true,
    minHeight: 400,
    spellcheck: true,
    placeholder: 'Type something here...',
    uploader:{
      insertImageAsBase64URI: true
    }

  };


  // useEffect(()=>{

  //   if(refEditor.current)
  //   {
  //     console.log(refEditor.current,refEditor.current.value);
  //     //refEditor.current.focus();
  //    // refEditor.current.editor.focus();
  //   }

  // },[abstract])
  const [content, setContent] = useState({Abstract: "", Keywords: "", Introduction: "", Methods: "", Results: "", Discussion: "", Conclusion: "", References: "", Abbreviations: "", Copyright: "" })

  // const [content, setContent] = useState({ "Abstract": "", "Keywords": "", "Introduction": "", "Methods": "", "Results": "", "Discussion": "", "Conclusion": "", "References": "", "Abbreviations": "", "Copyright": "" })
  // const [editor, setEditor] = useState(["Abstract", "Keywords", "Introduction", "Methods", "Results", "Discussion", "Conclusion", "References", "Abbreviations", "Copyright"])

  const [data, setData] = useState({ Title: "", Price: "", DOI: "", Summary: "", Remarks: "", primaryAuthor: [], secondaryAuthor: [], Date: "" });

  // const [editor, setEditor] = useState([{ text: 'Abstract', open: true }, { text: 'Keywords', open: false }, { text: 'Introduction', open: false }, { text: 'Methods', open: false }, { text: 'Results', open: false }, { text: 'Discussion', open: false }, { text: 'Conclusion', open: false }, { text: 'References', open: false }, { text: 'Abbreviations', open: false }, { text: 'Copyright', open: false }]);


  const params = useParams();
  const { slug } = params
  useEffect(() => {

    const getArticle = async () => {

      const option = {

        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getArticle`,
        data: {
          articleId: slug
        }

      }

      const response = await axios.request(option);

      setData({
        Title: response.data.article.articleTitle, Price: String(response.data.article.price), DOI: response.data.article.DOI,
        Summary: response.data.article.articleSummary, Remarks: response.data.article.remarks, Date: response.data.article.publishedDate
      })
      setPrimaryauthList(response.data.article.articleAuthor.primary);
      setSecondaryauthList(response.data.article.articleAuthor.secondary);

      setContent({Abstract: response.data.article.Abstract, Keywords: response.data.article.Keywords, Introduction: response.data.article.Introduction, Methods: response.data.article.Methods, Results: response.data.article.Results, Discussion: response.data.article.Discussion, Conclusion: response.data.article.Conclusion, References: response.data.article.References, Abbreviations: response.data.article.Abbreviations, Copyright: response.data.article.Copyright})



      // setAbstract(response.data.article.Abstract);
      // setKeywords(response.data.article.Keywords)
      // setIntroduction(response.data.article.Introduction);
      // setMethods(response.data.article.Methods);
      // setResults(response.data.article.Results);
      // setDiscussion(response.data.article.Discussion);
      // setConclusion(response.data.article.Conclusion);
      // setReferences(response.data.article.References);
      // setAbbreviations(response.data.article.Abbreviations);
      // setCopyright(response.data.article.Copyright);

      //     setContent(content.map((item,i)=>{ 
      //   //   switch (i) {

      //   //   case 0:
      //   //      item = response.data.article.Abstract;


      //   //     break;
      //   //   case 1:
      //   //     item = response.data.article.Keywords;

      //   //     break;
      //   //   case 2:
      //   //     item = response.data.article.Introduction;


      //   //     break;
      //   //   case 3:
      //   //     item = response.data.article.Methods;

      //   //     break;
      //   //   case 4:
      //   //     item = response.data.article.Results;


      //   //     break;
      //   //   case 5:
      //   //     item = response.data.article.Discussion;

      //   //     break;
      //   //   case 6:
      //   //     item = response.data.article.Conclusion;


      //   //     break;
      //   //   case 7:
      //   //     item = response.data.article.References;

      //   //     break;
      //   //   case 8:
      //   //     item = response.data.article.Abbreviations;


      //   //     break;
      //   //   case 9:
      //   //     item = response.data.article.Copyright;

      //   //     break;

      //   //   default:
      //   //     break;
      //   // }

      //   if(i===0)
      //   {
      //     item = response.data.article.Abstract;
      //   }

      //    return item
      // }))



    }

    getArticle();

  }, [])

  async function handleSubmit(e) {

    e.preventDefault();
    let arr=[];
    const value = document.querySelectorAll('.jodit-wysiwyg');
    const contentList = Array.from(value);
    contentList.map((item) => arr.push(item.innerHTML))
    
   
    const option =
    {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/updateArticle`,
      data:
      {

        articleId: slug,
        articleTitle: data.Title,
        contentList: arr,
        articleSummary: data.Summary,
        DOI: data.DOI,
        price: data.Price,
        remarks: data.Remarks,
        primaryAuthor: primaryAuthlist,
        secondaryAuthor: secondaryAuthlist
      }
    }


      axios.request(option)



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



        <form onSubmit={handleSubmit} className="row g-3">

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
              value={data.Title}
              onChange={(e) => setData({ Title: e.target.value })}
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
              value={String(data.Price)}
              onChange={(e) => setData({ Price: e.target.value })}
              placeholder="Price"
            />
          </div>

        


        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              abstract
            </label>

            <JoditEditor 
              // ref={refEditor}
              value={content.Abstract}
              config={config}
              //id='gf'
              // onChange={(value) => setAbstract(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              keywords
            </label>

            <JoditEditor value= {content.Keywords}
              config={config}
             // onChange={(value) => setKeywords(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              introduction
            </label>

            <JoditEditor value={content.Introduction}
              config={config}
             // onChange={(value) => setIntroduction(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              methods
            </label>

            <JoditEditor value={content.Methods}
              config={config}
              //onChange={(value) => setMethods(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              results
            </label>

            <JoditEditor value={content.Results}
              config={config}
              //onChange={(value) => setResults(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              discussion
            </label>

            <JoditEditor value={content.Discussion}
              config={config}
             // onChange={(value) => setDiscussion(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              conclusion
            </label>

            <JoditEditor value={content.Conclusion}
              config={config}
             // onChange={(value) => setConclusion(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              references
            </label>

            <JoditEditor value={content.References}
              config={config}
              //onChange={(value) => setReferences(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              abbreviations
            </label>

            <JoditEditor value={content.Abbreviations}
              config={config}
              //onChange={(value) => setAbbreviations(value)}
            />
        </div>

        <div className="col-12" >
            <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
              copyright
            </label>

            <JoditEditor value={content.Copyright}
              config={config}
             // onChange={(value) => setCopyright(value)}
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
              value={data.DOI}
              onChange={(e) => setData({ DOI: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Date" className="form-label">
              Date
            </label>
            <input
              type="text"
              className="form-control"
              id="Date"
              placeholder="Date"
              value={data.Date}
              name='Date'
              onChange={(e) => setData({ Date: e.target.value })}
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
              value={data.Summary}
              onChange={(e) => setData({ Summary: e.target.value })}
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
              value={data.Remarks}
              onChange={(e) => setData({ Remarks: e.target.value })}
            />
          </div>

          <div className="col-12">
            <div className="text-end">
              <button type="submit" className="btn btn-primary" >
                Submit
              </button>
            </div>
          </div>

        </form>



      </div>
    </div>
  )
}

export default Page