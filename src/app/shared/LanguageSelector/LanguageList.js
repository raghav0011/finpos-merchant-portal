import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { setLocalStorage } from '../../../utils/storageUtil';
import { LANGUAGE_KEY } from '../../../constants';

const LanguageList = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    const languageVal = language.item.props.title;
    i18n.changeLanguage(languageVal);
    setLocalStorage(LANGUAGE_KEY, languageVal);
  };

  const languageTitle = (languageVal) => {
    let LanguageTitle;
    switch (languageVal) {
      case 'sa':
        LanguageTitle = 'عربى';
        break;
      default:
        LanguageTitle = 'English';
    }
    return LanguageTitle;
  };

  const menu = (
    <Menu>
      <Menu.Item
        title="sa"
        onClick={(event) => {
          changeLanguage(event);
        }}
      >
        <img src="../../../assets/flags/flag-sa.png" height="20" className="mr-2" alt="Avatar" />
        عربى
      </Menu.Item>

      <Menu.Item
        title="en"
        onClick={(event) => {
          changeLanguage(event);
        }}
      >
        <img src="../../../assets/flags/flag-uk.png" height="20" className="mr-2" alt="Avatar" />
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a href="!#">
        {languageTitle(i18n.language)} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default LanguageList;
