import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Form, Grid } from 'antd';
import FormBuilder from 'antd-form-builder';

import Message from '../../../shared/Message';
import ApprovedList from './List';
import './style.css';
import { TitleBar } from '../../../shared/TitleBar';
import CustomModal from '../../../shared/Modal/CustomFormModal';
import { WButton } from '../../../shared/Widgets';
import { fetch } from '../../../../utils/httpUtil';
import useModalHook from '../../../shared/Hooks/modalHook';

const { useBreakpoint } = Grid;
const TabPane = Tabs.TabPane;

const MasterTabs = (props) => {
  const screens = useBreakpoint();
  const {
    mastersErrors,
    updateMasters,
    fetchMastersByObjectType,
    cleanMasters,
    // fetchUserAuditLogWithCriteria,
    addMasters,
    cleanMastersErrors,
    mastersDetailsErrors,
    mastersDetailsLoading,
    mastersDetails,
    // fetch details
    fetchMasterUpdateRequestById,
    fetchMastersByIdentifier,
    cleanMastersDetails,
  } = props;
  const [form] = Form.useForm();
  const forceUpdate = FormBuilder.useForceUpdate();

  const stateFromLink = props?.history?.location?.state;
  const tabKeyValue = stateFromLink?.tabState || 'approved';

  const [currentTabKey, setCurrentTabKey] = useState(tabKeyValue);

  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentMastersId, setCurrentMastersId] = useState();
  const [selectType, setSelectType] = useState([]);
  const [objectType, setObjectType] = useState();
  const [modalVisible, showModal, hideModal] = useModalHook();

  const fetchMastersWithUpdatedFields = (value) => {
    fetchMastersByObjectType(value);
  };

  const fetchDetails = () => {
    if (editMode) {
      cleanMastersDetails();
      fetchMasterUpdateRequestById(currentMastersId);
    }
    if (viewMode) {
      fetchMastersByIdentifier(currentMastersId);
    }
  };

  useEffect(() => {
    fetchDetails();

    return () => {
    };
  }, [editMode, viewMode]);

  const extraActions = (
    <WButton className="mx-4 my-2" onClick={() => showModal()} customType="add">
      Add Master
    </WButton>
  );

  // const objects = ['gender', 'payment_method', 'relation', 'id_type'];
  useEffect(() => {
    fetch('config/v1/admin/masters/master_object').then((response) => {
      if (response.data.success) {
        // const res = response?.data?.data?.filter((item) => objects?.includes(item.value));
        setObjectType(response?.data?.data?.[0]?.value);
        setSelectType(response?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchCurrentTabList(currentTabKey);

    return () => {
      cleanMasters();
    };
  }, [objectType]);

  const handleTabChange = (currentTab) => {
    cleanMasters();
    setCurrentTabKey(currentTab);
    fetchCurrentTabList(currentTab);
  };

  const apiMetaData = () => {
    let meta = {
      initialValues: (viewMode || editMode) && {
        ...mastersDetails,
      },
      columns: screens.xl || screens.lg ? 3 : screens.md ? 2 : 1,
      formItemLayout: [24, 24],

      fields: [
        {
          key: 'object_type',
          label: 'Type',
          widget: 'select',
          options: selectType,
          required: true,
          readOnly: editMode,
        },
        { key: 'label', label: 'Label', required: true },
        { key: 'value', label: 'Value', required: true },
      ],
    };
    return meta;
  };

  const handleAddMasters = (values) => {
    addMasters({
      ...values,
    }).then((response) => {
      if (response.type.endsWith('fulfilled')) {
        fetchMastersWithUpdatedFields(values.object_type);
        setObjectType(values.object_type);
        hideModal();
      }
    });
  };

  const handleEditMasters = (values) => {
    let formData = {
      id: currentMastersId,

      formData: {
        ...values,
      },
    };
    updateMasters(formData).then((response) => {
      if (response.type.endsWith('fulfilled')) {
        hideModal();
        fetchMastersWithUpdatedFields(objectType);
      }
    });
  };

  const fetchCurrentTabList = (currentTab) => {
    switch (currentTab) {
      case 'approved':
        if (objectType) fetchMastersWithUpdatedFields(objectType);
        break;
      default:
        break;
    }
  };

  const modalProps = {
    title: viewMode ? 'Master Detail' : editMode ? 'Edit Master' : 'Add Master',
    meta: apiMetaData,
    onFinishAdd: handleAddMasters,
    onFinishEdit: handleEditMasters,
    form: form, //form instance for the modal form
    loading: mastersDetailsLoading,
    error: mastersDetailsErrors,
    onCancel: () => {
      hideModal();
    },
    afterClose: () => {
      cleanMastersDetails();
      cleanMastersErrors();
    },
    visible: modalVisible,
    editMode,
    setEditMode,
    viewMode,
    setViewMode,
    width: '700px',
    style: { padding: '0' },
    forceUpdate, // for dynamic forms
  };

  return (
    <div className="container-fluid no-breadcrumb page-dashboard">
      <div className="article__section">
        <article className="article">
          <TitleBar
            title="Masters"
            breadCrumbObject={{
              Settings: '',
              Masters: '',
            }}
          />

          <CustomModal className="masterModal" {...modalProps} />
          {mastersErrors && <Message error={mastersErrors}/>}

          <Tabs
            defaultActiveKey={currentTabKey}
            tabPosition="top"
            animated={false}
            onChange={handleTabChange}
            tabBarStyle={{ background: '#ffffff' }}
            tabBarExtraContent={extraActions}
          >
            <TabPane key="approved" tab="Approved">
              <ApprovedList
                {...props}
                currentTabKey={currentTabKey}
                showModal={showModal}
                editMode={editMode}
                setEditMode={setEditMode}
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectType={selectType}
                setObjectType={setObjectType}
                objectType={objectType}
                setCurrentMastersId={setCurrentMastersId}
              />
            </TabPane>
          </Tabs>
        </article>
      </div>
    </div>
  );
};

export default withRouter(MasterTabs);
