import React from 'react';
import { Tabs, Button, Card } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { pdfView } from '../slice/operationManualSlice';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

//*for PDF Package
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

//*

function OperationManual() {
  const { pdfItems, isLoading } = useSelector((state) => state.OperationManual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pdfView());
  }, []);

  //*for PDF Package

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  //*

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
            <Button className="btn-custom-field mb-2 mt-n4">Download</Button>
            <Button className="btn-custom-field mb-2 mt-n4" style={{ marginLeft: '20px' }}>
              Print
            </Button>
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
        <div
          style={{
            overflow: 'auto',
            width: '100%',
            height: '700px',
            flexDirection: 'column',
          }}
        >
          <Document file="Support.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default OperationManual;
