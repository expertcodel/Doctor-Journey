"use client"
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UniversalContext } from './context.js';
export default function CreateArticle({userList}) {


  const router=useRouter();
  const { userData } = UniversalContext();
  const [primaryAuth, setPrimaryauth] = useState(false);
  const [primaryAuthlist, setPrimaryauthList] = useState([]);
  const [primaryAuthname, setPrimaryauthName] = useState("");
  const [secondaryAuth, setSecondaryauth] = useState(false);
  const [secondaryAuthlist, setSecondaryauthList] = useState([]);
  const [secondaryAuthname, setSecondaryauthName] = useState("");
  const [searchedList, setSearchedlist] = useState(userList);
  const [check, setCheck] = useState([]);
  const [searchedList1, setSearchedlist1] = useState(userList);
  const [check1, setCheck1] = useState([]);
  const [imageUrl, setImageurl] = useState(null);
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




  const config = useMemo(() => {
    return {
      readonly: false,
      toolbar: true,
      minHeight: 300,
      spellcheck: true,
      placeholder: 'Type something here...',
      uploader: {
        insertImageAsBase64URI: true
      }
    }

  }, []);

  async function saveArticle(e) {

    e.preventDefault();
    let arr = [];
    const value = document.querySelectorAll('.jodit-wysiwyg');
    const contentList = Array.from(value);
    contentList.map((item) => arr.push(item.innerHTML))


    const formData = new FormData();
    formData.append('file', imageUrl);
    const data = JSON.stringify({
      userId: userData.userId,
      articleTitle: e.target.Title.value.trim(),
      contentList: arr,
      articleSummary: e.target.Summary.value.trim(),
      DOI: e.target.DOI.value.trim(),
      price: Number(e.target.Price.value.trim()),
      remarks: e.target.Remarks.value.trim(),
      primaryAuthor: check,
      secondaryAuthor: check1
    })
    formData.append('data', data);



    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createArticle`, { method: 'POST', body: formData });

    const res = await response.json();
    if (res.status) {

      sessionStorage.setItem('successMsg', 'Article Created Successfully');
      router.push(`/${userData.usertype}/articlelist`);

    }
 
  }

  const removeItems = (idx) => {

    setCheck((prev) => prev.filter((_, i) => i !== idx));
  }



  const removeItems1 = (idx) => {

    setCheck1((prev) => prev.filter((_, i) => i !== idx));
  }



  const searchArticles = async (e) => {

    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUsers/?name=${e.target.value}`, { method: 'GET' });
    const response = await res.json();
    if (response.status) {
      setSearchedlist(response.userlist);
    }





  }

  const searchArticles1 = async (e) => {

    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUsers/?name=${e.target.value}`, { method: 'GET' });
    const response = await res.json();
    if (response.status) {
      setSearchedlist1(response.userlist);
    }





  }

  const addArticles = async (authorId) => {

    let flag = true;
    check.map((item) => {
      if (item.userId === authorId) {
        flag = false

      }
      return item;
    })

    if (flag) {
      setCheck((prev) => [...prev, { userId: authorId }]);
    }

  }


  const addArticles1 = async (authorId) => {

    let flag = true;
    check1.map((item) => {
      if (item.userId === authorId) {
        flag = false

      }
      return item;
    })

    if (flag) {
      setCheck1((prev) => [...prev, { userId: authorId }]);
    }

  }

  const fileUpload = async () => {

    const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
    const imagePreview = document.getElementById('imagePreview');
    const imageurl = URL.createObjectURL(thumbnailImage);
    imagePreview.src = imageurl
    setImageurl(thumbnailImage);


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

          <div className="col-md-6">
            <label className="form-label" htmlFor="project-thumbnail-img">Article Thumbnail</label>
            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} />
            <div style={{ marginTop: '10px' }}>Choose 1920 x 970 Dimension</div>
            <Image priority width={imageUrl && 100} height={imageUrl && 100} id='imagePreview' />

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

          <div className="col-md-6" >
            <label htmlFor="inputAddress2" className="form-label">
              Primary author
            </label>


            <div className="form-select" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', height: '40px' }} onClick={() => setPrimaryauth(!primaryAuth)}>
              {
                check.map((item, i) => <div key={i} style={{ backgroundColor: '#405189', color: 'white', borderRadius: '5px', padding: '3px', display: 'flex', gap: '0.5rem' }}>{item.userId}
                  <span><i class="ri-home-line ri-scissors-line" onClick={() => removeItems(i)}></i></span>
                </div>)
              }
            </div>

            {

              primaryAuth &&

              <div className="form-control" style={{ position: 'absolute', zIndex: '99', marginTop: '10px', width: '98.5%' ,overflow:'auto'}}>



                <input type="text" className="form-control" placeholder='Search articles' onChange={searchArticles} />


                <div className="form-control" style={{ marginTop: '17px', cursor: 'pointer', border: 'none', height: '180px' }}>

                  {



                    <div className="table-responsive table-card">
                      <table className="table table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="cardtableCheck"
                                />
                                <label className="form-check-label" htmlFor="cardtableCheck" />
                              </div>
                            </th>
                            <th scope="col">User Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Usertype</th>


                          </tr>
                        </thead>
                        <tbody>
                          {
                            searchedList.length > 0 &&
                            searchedList.map((item, i) =>
                              <tr key={i} >
                                <td>
                                  <div className="form-check">

                                    <button
                                      type="button"
                                      className="btn btn-success add-btn"
                                      style={{ height: '50px' }}
                                      onClick={() => addArticles(item.userId)}
                                    >
                                      Add
                                    </button>
                                    <label className="form-check-label" htmlFor="cardtableCheck01" />
                                  </div>
                                </td>
                                <td>
                                  {item.userId}
                                </td>
                                <td>{item.name.substr(0, 30)} {item.name.length > 30 && '...'}</td>
                                <td>{item.usertype}</td>


                              </tr>

                            )
                          }

                        </tbody>
                      </table>
                    </div>





                  }
                </div>



              </div>

            }


          </div>


          <div className="col-md-6" >
            <label htmlFor="inputAddress2" className="form-label">
              Secondary author
            </label>


            <div className="form-select" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', height: '40px' }} onClick={() => setSecondaryauth(!secondaryAuth)}>
              {
                check1.map((item, i) => <div key={i} style={{ backgroundColor: '#405189', color: 'white', borderRadius: '5px', padding: '3px', display: 'flex', gap: '0.5rem' }}>{item.userId}
                  <span><i class="ri-home-line ri-scissors-line" onClick={() => removeItems1(i)}></i></span>
                </div>)
              }
            </div>

            {

              secondaryAuth &&

              <div className="form-control" style={{ position: 'absolute', zIndex: '99', marginTop: '10px', width: '98.5%',overflow:'auto' }}>



                <input type="text" className="form-control" placeholder='Search articles' onChange={searchArticles1} />


                <div className="form-control" style={{ marginTop: '17px', cursor: 'pointer', border: 'none', height: '180px' }}>

                  {



                    <div className="table-responsive table-card">
                      <table className="table table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="cardtableCheck"
                                />
                                <label className="form-check-label" htmlFor="cardtableCheck" />
                              </div>
                            </th>
                            <th scope="col">User Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Usertype</th>


                          </tr>
                        </thead>
                        <tbody>
                          {
                            searchedList1.length > 0 &&
                            searchedList1.map((item, i) =>
                              <tr key={i} >
                                <td>
                                  <div className="form-check">

                                    <button
                                      type="button"
                                      className="btn btn-success add-btn"
                                      style={{ height: '50px' }}
                                      onClick={() => addArticles1(item.userId)}
                                    >
                                      Add
                                    </button>
                                    <label className="form-check-label" htmlFor="cardtableCheck01" />
                                  </div>
                                </td>
                                <td>
                                  {item.userId}
                                </td>
                                <td>{item.name.substr(0, 30)} {item.name.length > 30 && '...'}</td>
                                <td>{item.usertype}</td>


                              </tr>

                            )
                          }

                        </tbody>
                      </table>
                    </div>





                  }
                </div>



              </div>

            }


          </div>

          {/* <div className="col-md-6">
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



          </div> */}




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

