import React from 'react';
import classNames from 'classnames';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const PasswordPolicyList = (props) => {
  let passwordPolicyList = [];
  const { passwordPolicies, password, userID } = props;

  const passwordPolicySatisfied = (passwordPolicy) => {
    return passwordPolicy.predicate(password);
  };

  const principleClass = (passwordPolicy) => {
    let satisfied = passwordPolicySatisfied(passwordPolicy);

    return classNames({
      'text-success': satisfied,
      'text-danger': !satisfied,
    });
  };

  if (passwordPolicies?.minimumLength === passwordPolicies?.maximumLength) {
    passwordPolicyList.push({
      label: `Should be exactly ${passwordPolicies?.minimumLength} characters in length.`,
      predicate: (password) => password.length === passwordPolicies?.minimumLength,
    });
  } else {
    passwordPolicyList.push({
      label: `Should be between ${passwordPolicies?.minimumLength} and ${passwordPolicies?.maximumLength} characters in length.`,
      predicate: (password) =>
        password.length <= passwordPolicies?.maximumLength &&
        password.length >= passwordPolicies?.minimumLength,
    });
  }

  if (passwordPolicies?.maximumLength > 0) {
    passwordPolicyList.push({
      label: `Maximum password length ${passwordPolicies?.maximumLength}`,
      error: 'Password must be less than 10 characters',
      predicate: (password) =>
        password.length <= passwordPolicies?.maximumLength &&
        password.length >= passwordPolicies?.minimumLength,
    });
  }

  if (passwordPolicies?.minimumUpperCaseLetters > 0) {
    let regexUpper = `^(.*?[A-Z]){${parseInt(passwordPolicies?.minimumUpperCaseLetters)},}`;
    const UPPERCASE_REGEX = new RegExp(regexUpper);
    passwordPolicyList.push({
      label: `Should contain at least ${passwordPolicies?.minimumUpperCaseLetters} uppercase letters.`,
      predicate: (password) => password.match(UPPERCASE_REGEX) !== null,
    });
  }
  if (passwordPolicies?.minimumLowerCaseLetters > 0) {
    let regexLower = `^(.*?[a-z]){${parseInt(passwordPolicies?.minimumLowerCaseLetters)},}`;
    const LOWERCASE_REGEX = new RegExp(regexLower);
    passwordPolicyList.push({
      label: `Should contain at least ${passwordPolicies?.minimumLowerCaseLetters} lowercase letters.`,
      predicate: (password) => password.match(LOWERCASE_REGEX) !== null,
    });
  }

  if (passwordPolicies?.minimumNumbers > 0) {
    let regexNumeric = `^(.*?[0-9]){${parseInt(passwordPolicies?.minimumNumbers)},}`;
    const NUMERIC_REGEX = new RegExp(regexNumeric);
    passwordPolicyList.push({
      label: `Should contain at least ${passwordPolicies?.minimumNumbers} numbers.`,
      predicate: (password) => password.match(NUMERIC_REGEX) !== null,
    });
  }

  if (passwordPolicies?.minimumSpecialCharacters > 0) {
    let regexSpecialChar = `^(.*?[-!$%^&*()_+|~=\`{}\\[\\]:\\/;<>?,.@#]){${parseInt(
      passwordPolicies?.minimumSpecialCharacters
    )},}`;
    const SPECIAL_CHAR_REGEX = new RegExp(regexSpecialChar);
    passwordPolicyList.push({
      label: `Should contain at least ${passwordPolicies?.minimumSpecialCharacters} special characters.`,
      predicate: (password) => password.match(SPECIAL_CHAR_REGEX) !== null,
    });
  }

  if (passwordPolicies?.dontAllowPasswordSimilarToUserName) {
    passwordPolicyList.push({
      label: "Should not be similar to 'User ID' ",
      predicate: (password) =>
        password.length >= passwordPolicies?.minimumLength && userID !== password,
    });
  }

  return (
    <ul style={{ marginTop: '14px' }}>
      {passwordPolicyList.map((passwordPolicy, i) => (
        <div key={i} className={principleClass(passwordPolicy)}>
          {principleClass(passwordPolicy) === 'text-success' ? (
            <CheckCircleOutlined />
          ) : (
            <CloseCircleOutlined />
          )}
          <strong> {passwordPolicy.label}</strong>
        </div>
      ))}
    </ul>
  );
};

export default PasswordPolicyList;
