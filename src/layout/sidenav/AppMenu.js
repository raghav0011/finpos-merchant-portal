import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';

import LAYOUT_CONFIG from '../../layout/config';
import { toggleOffCanvasMobileNav } from '../../layout/duck/actions';
import { PERMISSION_KEY } from '../../constants';
import menuRoute from '../../constants/menuRoute';
import { urlToList } from '../../utils/commonUtil';
import { getLocalStorage } from '../../utils/storageUtil';
import MenuIcon from '../../app/shared/MenuIcon';

const { SubMenu } = Menu;

const AppMenu = (props) => {
  const userPermission = getLocalStorage(PERMISSION_KEY);
  const activeMenuKey = urlToList(props.location.pathname);
  const [rootMenuItemKeys] = useState(['/dashboard', '/customers', '/send', '/transactions'] || []); // without submenu
  const [rootSubmenuKeys] = useState(
    [
      '/roles',
      '/users',
      '/settings',
      '/masters',
      '/password-policy',
      '/form-fields',
      '/api-logs',
    ] || []
  ); // with submenu
  const [openKeys, setOpenKeys] = useState(activeMenuKey || []);

  const {
    isMobileNav,
    handleToggleOffCanvasMobileNav,
    colorOption,
    location: { pathname },
  } = props;

  const currentPathname = pathname ? pathname : '/';
  const menuTheme =
    ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0 ? 'light' : 'dark';

  const handleMenuClick = (v) => {
    if (rootMenuItemKeys.indexOf(v.key) >= 0) {
      setOpenKeys([v.key]);
    }
    if (isMobileNav) {
      closeMobileSidenav();
    }
  };

  const handleOpenChange = (v) => {
    const latestOpenKey = v.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(v);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const closeMobileSidenav = () => {
    if (LAYOUT_CONFIG.AutoCloseMobileNav) {
      handleToggleOffCanvasMobileNav(true);
    }
  };

  const formatMenuItems = (data, parentPath = '', parentName) => {
    return data.map((item) => {
      let locale = 'menu';
      if (parentName && item.name) {
        locale = `${parentName}.${item.name}`;
      } else if (item.name) {
        locale = `menu.${item.name}`;
      } else if (parentName) {
        locale = parentName;
      }
      const result = {
        ...item,
        locale,
      };
      if (item.routes) {
        const children = formatMenuItems(
          item.routes,
          `${parentPath}${item.path}/`,
          item.rights,
          locale
        );
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    });
  };

  const verifyItemPermission = (targetItem) => {
    let rights = targetItem?.rights;
    if (!rights) {
      return targetItem;
    }

    if (Array.isArray(rights)) {
      if (rights.indexOf(userPermission) >= 0) {
        return targetItem;
      }
      if (Array.isArray(userPermission)) {
        for (let i = 0; i < userPermission.length; i += 1) {
          const element = userPermission[i];
          if (rights.indexOf(element) >= 0) {
            return targetItem;
          }
        }
      }
    }
    return;
  };

  const renderSideMenu = (targetItem) => {
    if (targetItem?.rights?.length > 0) {
      let authorizedItem = verifyItemPermission(targetItem);
      return authorizedItem ? renderMenuItem(authorizedItem) : null;
    } else {
      return renderMenuItem(targetItem);
    }
  };

  const renderSubMenuItem = (item) => {
    const segmentURL = currentPathname.split('/');
    const secondSegmentURL = '/' + segmentURL[1];
    const lastSegmentURL = currentPathname.substr(currentPathname.lastIndexOf('/') + 1);

    return (
      <SubMenu
        title={
          item.iconName ? (
            <span>
              <MenuIcon type={item.iconName} />
              <span className="nav-text">{item.menuName || item.name}</span>
            </span>
          ) : (
            item.name
          )
        }
        key={item.path || item.menuName}
        className={
          secondSegmentURL === item.path &&
          (lastSegmentURL === 'edit' || lastSegmentURL === 'detail')
            ? 'ant-menu-item-selected'
            : ''
        }
      >
        {item?.children?.map((child) => {
          return renderMenuItem(child);
        })}
      </SubMenu>
    );
  };

  const renderMenuItem = (item) => {
    return item && item.children && item.children.length > 0 ? (
      renderSubMenuItem(item)
    ) : (
      <Menu.Item
        key={item.path || item.menuName}
        className={currentPathname.includes(item.path) ? 'ant-menu-item-selected' : ''}
      >
        <Link to={item.path} style={{ width: '100%', display: 'block' }}>
          <MenuIcon type={item.iconName} />
          <span className="nav-text">{item.menuName || item.name}</span>
        </Link>
      </Menu.Item>
    );
  };

  const menus = formatMenuItems(menuRoute);

  return (
    <>
      <Menu
        theme={menuTheme}
        mode="inline"
        // inlineCollapsed={collapsedNav}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        onClick={handleMenuClick}
        selectedKeys={[currentPathname]}
      >
        {menus.map((menu) => renderSideMenu(menu))}
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    collapsedNav: state.ui.collapsedNav,
    colorOption: state.ui.colorOption,
    location: state.router.location,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch(toggleOffCanvasMobileNav(isOffCanvasMobileNav));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
