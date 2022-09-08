import { Modal } from 'antd';

const ApproveModel = (props) => {
  const { id, title, width, history, path } = props;
  Modal.confirm({
    title: title,
    width: width,
    cancelText: 'No',
    okText: 'Yes',
    onOk() {
      props.approveEntity({ id: id }).then((response) => {
        if (response?.status === 200) {
          history?.push(path);
        }
      });
    },
  });
};

export default ApproveModel;
