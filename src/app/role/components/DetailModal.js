import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

import Detail from './Detail';
import EditForm from './EditForm';

const DetailModal = (props) => {
  const [editMode, setEditMode] = useState(false);

  const { fetchPermission, detailModalVisible, hideDetailModal, cleanPermission } = props;

  useEffect(() => {
    fetchPermission();

    return () => {
      cleanPermission();
    };
  }, []);

  return (
    <>
      <Modal
        title="Role Details"
        visible={detailModalVisible}
        onCancel={hideDetailModal}
        destroyOnClose={true}
        width="800px"
        footer={null}
        centered
      >
        {!editMode ? (
          <Detail {...props} setEditMode={setEditMode}/>
        ) : (
          <EditForm {...props} setEditMode={setEditMode}/>
        )}
      </Modal>
    </>
  );
};

export default withRouter(DetailModal);
