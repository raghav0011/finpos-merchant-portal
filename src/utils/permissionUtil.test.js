import * as permissionUtil from './permissionUtil';

import * as storageUtil from "./storageUtil";
import mockResponse from '../../__mocks__/permission';
import {agentAuthority} from '../constants/autherityConfig';

describe('permissionUtil --- isAllowed', () => {

  it('empty user permission array', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue([]);
    expect(permissionUtil.isAllowed(agentAuthority)).toEqual(false);
  });

  it('undefined user permission array', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue(null);
    expect(permissionUtil.isAllowed(agentAuthority)).toEqual(false);
  });

  it('empty menu item permission array', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue(mockResponse.authority.data.permissions);
    expect(permissionUtil.isAllowed([])).toEqual(false);
  });

  it('undefined menu item permission array', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue(mockResponse.authority.data.permissions);
    expect(permissionUtil.isAllowed(null)).toEqual(false);
  });

  it('correct user and menu item permission array', () => {
    storageUtil.getLocalStorage = jest.fn().mockReturnValue(mockResponse.authority.data.permissions);
    expect(permissionUtil.isAllowed(agentAuthority)).toEqual(true);
  });

});
