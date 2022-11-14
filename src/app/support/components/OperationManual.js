import React from 'react';
import { Tabs, Button, Card } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { pdfView } from '../slice/operationManualSlice';
import ReactToPrint from 'react-to-print';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

//*for PDF Package
import { Document, Page, pdfjs } from 'react-pdf';
import { useRef } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

//*

function OperationManual() {
  //*for PDF Package

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  //*

  const pdfRef = useRef();

  // Function will execute on click of button
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch('Support.pdf').then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'Support.pdf';
        alink.click();
      });
    });
  };
  function handlePrint(divName) {
    // var printContents = document.getElementById(divName).innerHTML;
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    printContents.print();

    document.body.innerHTML = originalContents;
  }

  return (
    <div className="container-fluid no-breadcrumb page-dashboard ">
      {/* main */}
      <QueueAnim type="right" className="ui-animate">
        <div
          className="article__section"
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          <article className="article">
            <h4 className="article-title mb-2 ">Terminal Operation Manual</h4>
          </article>
          <div>
            <Button className="btn-custom-field mb-2 mt-n4" onClick={onButtonClick}>
              Download
            </Button>
            <ReactToPrint
              trigger={() => {
                return (
                  <Button
                    onClick={() => handlePrint('printableArea')}
                    // onClick={() => handlePrint2()}
                    className="btn-custom-field mb-2 mt-n4"
                    style={{ marginLeft: '20px' }}
                  >
                    Print
                  </Button>
                );
              }}
              content={() => pdfRef.current}
            />
            {/* <Button
              onClick={() => handlePrint('printableArea')}
              // onClick={() => handlePrint2()}
              className="btn-custom-field mb-2 mt-n4"
              style={{ marginLeft: '20px' }}
            >
              Print
            </Button> */}
          </div>
        </div>
      </QueueAnim>
      <div className="card">
        <Tabs
          destroyInactiveTabPane
          tabPosition="top"
          animated={true}
          tabBarStyle={{ background: '#ffffff', marginLeft: '20px' }}
          tabBarGutter={70}
        >
          <Tabs.TabPane tab="Operation Manual" key="1"></Tabs.TabPane>
        </Tabs>
        <div style={{ marginLeft: '350px' }}>
          <div
            id="printableArea"
            style={{
              overflow: 'auto',
              width: '100%',
              height: '700px',
              flexDirection: 'column',
            }}
          >
            {/* <ReactToPrint
            trigger={() => {
              return <a>Print this out!</a>;
            }}
            content={() => pdfRef.current}
          /> */}
            <Document
              file="Support.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              ref={pdfRef}
              className="blockquote text-center"
              width="1000"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperationManual;
