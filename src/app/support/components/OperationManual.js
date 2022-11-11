import React from 'react';
import { Tabs, Button, Card } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { pdfView } from '../slice/operationManualSlice';

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

function OperationManual() {
  const { pdfItems, isLoading } = useSelector((state) => state.OperationManual);
  // console.log(pdfItems);
  // console.log(isLoading);
  // console.log(pdfItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pdfView());
  }, []);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
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
        <Card className="card" style={{ border: 'none' }}>
          {/* <div>{pdfItems?.pdf_link}</div> */}
          <Document
            file="https://www.buds.com.ua/images/Lorem_ipsum.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </Card>
      </div>
    </div>
  );
}

export default OperationManual;
