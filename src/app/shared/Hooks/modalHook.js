import { useState } from 'react';

const useModalHook = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return [modalVisible, showModal, hideModal];
};

export default useModalHook;
