import React from 'react';
import { Tabs, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useState } from 'react';
import ReactToPrint from 'react-to-print';
import { TitleBar } from '../../shared/TitleBar';
import operationManualSlice from '../slice/operationManualSlice';

//*Pdf css

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

//*

//*for PDF Package
import { Document, Page, pdfjs } from 'react-pdf';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

//*

function OperationManual(props) {
  const { pdfView } = props;

  useEffect(() => {
    pdfView();
  }, []);

  const { pdfItems } = useSelector((state) => state.OperationManual);
  // console.log(pdfItems);

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
    fetch('pdfItems.pdf_link').then((response) => {
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
          {/* <article className="article">
            <h4 className="article-title mb-2 ">Terminal Operation Manual</h4>
          </article> */}
        </div>
      </QueueAnim>
      <TitleBar
        title={'Terminal Operation Manual'}
        breadCrumbObject={{
          Support: '/support',
          'Terminal Operation Manual': '',
        }}
      />

      <Tabs
        destroyInactiveTabPane
        tabPosition="top"
        animated={true}
        tabBarStyle={{ background: '#ffffff', paddingLeft: '20px' }}
        tabBarGutter={70}
      >
        <Tabs.TabPane tab="Operation Manual" key="1"></Tabs.TabPane>
      </Tabs>

      <div className="d-flex" style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button className="btn-custom-field mb-2 mt-n4" onClick={onButtonClick}>
          Download
        </Button>
        <ReactToPrint
          trigger={() => {
            return (
              <Button
                onClick={() => handlePrint('printableArea')}
                className="btn-custom-field mb-2 mt-n4"
                style={{ marginLeft: '20px' }}
              >
                Print
              </Button>
            );
          }}
          content={() => pdfRef.current}
        />
      </div>

      <div className="card">
        <div
          id="printableArea"
          style={{
            overflow: 'auto',
            width: '100%',
            height: '700px',
            flexDirection: 'column',
          }}
        >
          <Document file={pdfItems.pdf_link} onLoadSuccess={onDocumentLoadSuccess} ref={pdfRef}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={1000} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default OperationManual;
