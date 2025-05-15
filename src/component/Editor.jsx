"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import ClassicEditor from '../../public/assets/libs/@ckeditor/ckeditor5-build-classic/build/ckeditor';


function Editor({ idx ,i,text}) {

  //let cnt = 0;
  
  useEffect(() => {


  //   const createEditor=async()=>
  //   {
  //    if (cnt === 0) {
      

  //     console.log(
  //       await ClassicEditor.create(document.querySelector('.ckeditor-classic')).then(function (e) { e.ui.view.editable.element.style.height = "200px" }));

  //     await ClassicEditor.create(document.querySelector('.ckeditor-classic')).then(function (e) { e.ui.view.editable.element.style.height = "200px" }).then(editor => {
  //       console.log('Editor initialized:', editor)
  //       editor.setData('<p>Hello, world!</p>')}).catch(function (e) { console.error(e) })

  //     // Array.from(document.querySelectorAll(`.ck-bhai`)).forEach((item)=>item.innerHTML=idx)
  //     // document.querySelector(`.ck-content`).textContent="<p>rohit</p>";

  //     //document.querySelector(`.ck-content${i}`).innerHTML = idx

  //   }
  // }


  //   createEditor();
   // cnt++;

  // document.querySelector(`.ck-content${i}`).innerHTML = idx[text]

  }, [])

  const a=()=>
  {
    // document.querySelector(`ck-editor`)
    // console.log("ck",document.querySelector('.ck-content').innerHTML);
    // document.querySelector(`.ck-content`).setHTMLUnsafe("<p>rohit</p>")
    document.querySelector(`.ck-content${i}`).innerHTML = idx[text]
  }

  return (

    <>


          <div className="col-12">
            <div className="text-end">
              <button type="submit" className="btn btn-primary" onClick={a}>
                Edit
              </button>
            </div>
          </div>
   
     
      <div
        className="ck ck-reset ck-editor ck-rounded-corners"
        role="application"
        dir="ltr"
        lang="en"
        aria-labelledby="ck-editor__label_e0c5bd0ff4277adafcb78a9358a2a54df"
      >
        <label
          className="ck ck-label ck-voice-label"
          id="ck-editor__label_e0c5bd0ff4277adafcb78a9358a2a54df"
        >
          Rich Text Editor
        </label>
        <div className="ck ck-editor__top ck-reset_all" role="presentation">
          <div className="ck ck-sticky-panel">
            <div
              className="ck ck-sticky-panel__placeholder"
              style={{ display: "none" }}
            />
            <div className="ck ck-sticky-panel__content">
              <div
                className="ck ck-toolbar ck-toolbar_grouping"
                role="toolbar"
                aria-label="Editor toolbar"
                tabIndex={-1}
              >
                <div className="ck ck-toolbar__items">
                  <button
                    className="ck ck-button ck-disabled ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_eec9c3ac4229a8f0764b8cbf1da0a7f9b"
                    aria-disabled="true"
                    data-cke-tooltip-text="Undo (Ctrl+Z)"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="m5.042 9.367 2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_eec9c3ac4229a8f0764b8cbf1da0a7f9b"
                    >
                      Undo
                    </span>
                  </button>
                  <button
                    className="ck ck-button ck-disabled ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_e32c24f754b769af60f7a29843dab2dec"
                    aria-disabled="true"
                    data-cke-tooltip-text="Redo (Ctrl+Y)"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="m14.958 9.367-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_e32c24f754b769af60f7a29843dab2dec"
                    >
                      Redo
                    </span>
                  </button>
                  <span className="ck ck-toolbar__separator" />
                  <div className="ck ck-dropdown ck-heading-dropdown">
                    <button
                      className="ck ck-button ck-off ck-button_with-text ck-dropdown__button"
                      type="button"
                      tabIndex={-1}
                      aria-label="Heading"
                      data-cke-tooltip-text="Heading"
                      data-cke-tooltip-position="s"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="ck ck-button__label">Paragraph</span>
                      <svg
                        className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-dropdown__arrow"
                        viewBox="0 0 10 10"
                      >
                        <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z" />
                      </svg>
                    </button>
                    <div
                      className="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se"
                      tabIndex={-1}
                    />
                  </div>
                  <span className="ck ck-toolbar__separator" />
                  <button
                    className="ck ck-button ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_ee8f78bbabfc3f307397ba021c36ccb47"
                    aria-pressed="false"
                    data-cke-tooltip-text="Bold (Ctrl+B)"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_ee8f78bbabfc3f307397ba021c36ccb47"
                    >
                      Bold
                    </span>
                  </button>
                  <button
                    className="ck ck-button ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_e3008e829309728d2b9b021a729eace61"
                    aria-pressed="false"
                    data-cke-tooltip-text="Italic (Ctrl+I)"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="m9.586 14.633.021.004c-.036.335.095.655.393.962.082.083.173.15.274.201h1.474a.6.6 0 1 1 0 1.2H5.304a.6.6 0 0 1 0-1.2h1.15c.474-.07.809-.182 1.005-.334.157-.122.291-.32.404-.597l2.416-9.55a1.053 1.053 0 0 0-.281-.823 1.12 1.12 0 0 0-.442-.296H8.15a.6.6 0 0 1 0-1.2h6.443a.6.6 0 1 1 0 1.2h-1.195c-.376.056-.65.155-.823.296-.215.175-.423.439-.623.79l-2.366 9.347z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_e3008e829309728d2b9b021a729eace61"
                    >
                      Italic
                    </span>
                  </button>
                  <span className="ck ck-toolbar__separator" />
                  <button
                    className="ck ck-button ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_ed1d91d7d34bbeb6f09395396761eeec2"
                    aria-pressed="false"
                    data-cke-tooltip-text="Link (Ctrl+K)"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_ed1d91d7d34bbeb6f09395396761eeec2"
                    >
                      Link
                    </span>
                  </button>
                  <button
                    className="ck ck-button ck-off ck-file-dialog-button"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_ec022b5c5b06179d92e65f88b46bbd3f1"
                    data-cke-tooltip-text="Upload image from computer"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M1.2 1C.536 1 0 1.47 0 2.1v12.863C0 15.603.547 16 1.199 16h6.3c.908-1.19 1.892-2.41 2.8-3.6L6.615 9.15a.694.694 0 0 0-.957-.033L1.5 13.5v-11h15v6c.6.6 1.012.857 1.5 1.5V2.1c0-.63-.55-1.1-1.201-1.1h-15.6Zm11.724 2.805a2.133 2.133 0 0 0-.998.283 2.129 2.129 0 0 0-.992 1.295c-.074.27-.095.55-.057.828a2.136 2.136 0 0 0 1.56 1.783 2.13 2.13 0 0 0 2.612-1.506 2.129 2.129 0 0 0-2.125-2.683Z" />
                      <path d="M15.208 19.011c.436 0 .79-.327.79-.763v-5.4l2.059 2.455a.79.79 0 0 0 1.212-1.015l-3.352-3.995a.79.79 0 0 0-.996-.179.786.786 0 0 0-.299.221l-3.35 3.99a.79.79 0 1 0 1.21 1.017L14.5 12.9v5.3c0 .437.272.811.709.811Z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_ec022b5c5b06179d92e65f88b46bbd3f1"
                    >
                      Upload image from computer
                    </span>
                    <input
                      className="ck-hidden"
                      type="file"
                      tabIndex={-1}
                      accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/tiff"
                      multiple="true"
                    />
                  </button>
                  <div className="ck ck-dropdown">
                    <button
                      className="ck ck-button ck-off ck-dropdown__button"
                      type="button"
                      tabIndex={-1}
                      aria-labelledby="ck-editor__aria-label_e91f9b86bd66fdd0b4334c941e57ca538"
                      data-cke-tooltip-text="Insert table"
                      data-cke-tooltip-position="s"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 6v3h4V6H3zm0 4v3h4v-3H3zm0 4v3h4v-3H3zm5 3h4v-3H8v3zm5 0h4v-3h-4v3zm4-4v-3h-4v3h4zm0-4V6h-4v3h4zm1.5 8a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 17V4c.222-.863 1.068-1.5 2-1.5h13c.932 0 1.778.637 2 1.5v13zM12 13v-3H8v3h4zm0-4V6H8v3h4z" />
                      </svg>
                      <span
                        className="ck ck-button__label"
                        id="ck-editor__aria-label_e91f9b86bd66fdd0b4334c941e57ca538"
                      >
                        Insert table
                      </span>
                      <svg
                        className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-dropdown__arrow"
                        viewBox="0 0 10 10"
                      >
                        <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z" />
                      </svg>
                    </button>
                    <div
                      className="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se"
                      tabIndex={-1}
                    />
                  </div>
                  <button
                    className="ck ck-button ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_e3da47c5a55748947b57150c7f3c93879"
                    aria-pressed="false"
                    data-cke-tooltip-text="Block quote"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_e3da47c5a55748947b57150c7f3c93879"
                    >
                      Block quote
                    </span>
                  </button>
                  <div className="ck ck-dropdown">
                    <button
                      className="ck ck-button ck-off ck-dropdown__button"
                      type="button"
                      tabIndex={-1}
                      aria-labelledby="ck-editor__aria-label_e951bc54c428c04217dbb2cd3e76a9981"
                      data-cke-tooltip-text="Insert media"
                      data-cke-tooltip-position="s"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                        viewBox="0 0 20 20"
                      >
                        <path d="M18.68 3.03c.6 0 .59-.03.59.55v12.84c0 .59.01.56-.59.56H1.29c-.6 0-.59.03-.59-.56V3.58c0-.58-.01-.55.6-.55h17.38zM15.77 15V5H4.2v10h11.57zM2 4v1h1V4H2zm0 2v1h1V6H2zm0 2v1h1V8H2zm0 2v1h1v-1H2zm0 2v1h1v-1H2zm0 2v1h1v-1H2zM17 4v1h1V4h-1zm0 2v1h1V6h-1zm0 2v1h1V8h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zM7.5 7.177a.4.4 0 0 1 .593-.351l5.133 2.824a.4.4 0 0 1 0 .7l-5.133 2.824a.4.4 0 0 1-.593-.35V7.176v.001z" />
                      </svg>
                      <span
                        className="ck ck-button__label"
                        id="ck-editor__aria-label_e951bc54c428c04217dbb2cd3e76a9981"
                      >
                        Insert media
                      </span>
                      <svg
                        className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-dropdown__arrow"
                        viewBox="0 0 10 10"
                      >
                        <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z" />
                      </svg>
                    </button>
                    <div
                      className="ck ck-reset ck-dropdown__panel ck-dropdown__panel_se"
                      tabIndex={-1}
                    />
                  </div>
                  <span className="ck ck-toolbar__separator" />
                  <button
                    className="ck ck-button ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_ef90683e8de7bd7d1ba4165e4137f13bc"
                    aria-pressed="false"
                    data-cke-tooltip-text="Bulleted List"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0C1 4.784 1.777 4 2.75 4c.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75C1.784 7.5 1 6.723 1 5.75zm6 9c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0c0-.966.777-1.75 1.75-1.75.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75-.966 0-1.75-.777-1.75-1.75z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_ef90683e8de7bd7d1ba4165e4137f13bc"
                    >
                      Bulleted List
                    </span>
                  </button>
                  <button
                    className="ck ck-button ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_eefab7a05542299867c95c53deda0aacd"
                    aria-pressed="false"
                    data-cke-tooltip-text="Numbered List"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM3.5 3v5H2V3.7H1v-1h2.5V3zM.343 17.857l2.59-3.257H2.92a.6.6 0 1 0-1.04 0H.302a2 2 0 1 1 3.995 0h-.001c-.048.405-.16.734-.333.988-.175.254-.59.692-1.244 1.312H4.3v1h-4l.043-.043zM7 14.75a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_eefab7a05542299867c95c53deda0aacd"
                    >
                      Numbered List
                    </span>
                  </button>
                  <button
                    className="ck ck-button ck-disabled ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_ec28b36a6bf0b257cc80877be0eeb2c45"
                    aria-disabled="true"
                    data-cke-tooltip-text="Decrease indent"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zm1.618-9.55L.98 9.358a.4.4 0 0 0 .013.661l3.39 2.207A.4.4 0 0 0 5 11.892V7.275a.4.4 0 0 0-.632-.326z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_ec28b36a6bf0b257cc80877be0eeb2c45"
                    >
                      Decrease indent
                    </span>
                  </button>
                  <button
                    className="ck ck-button ck-disabled ck-off"
                    type="button"
                    tabIndex={-1}
                    aria-labelledby="ck-editor__aria-label_ebf70ca70ba5624ac27ce75cfc4ac3801"
                    aria-disabled="true"
                    data-cke-tooltip-text="Increase indent"
                    data-cke-tooltip-position="s"
                  >
                    <svg
                      className="ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zM1.632 6.95 5.02 9.358a.4.4 0 0 1-.013.661l-3.39 2.207A.4.4 0 0 1 1 11.892V7.275a.4.4 0 0 1 .632-.326z" />
                    </svg>
                    <span
                      className="ck ck-button__label"
                      id="ck-editor__aria-label_ebf70ca70ba5624ac27ce75cfc4ac3801"
                    >
                      Increase indent
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ck ck-editor__main" role="presentation">
          <div
            className={`ck ck-content${i} ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred`}
            lang="en"
            dir="ltr"
            role="textbox"
            aria-label="Editor editing area: main"
            contentEditable="true"
          >
            <p>
              <br data-cke-filler="true" />
            </p>
          </div>
        </div>
      </div>


    </>
  )
}

export default Editor