import React from 'react';
import styles from './AutoComplete.module.scss';
// import { setEventType, setActionSuggestions } from '../Action/actionActions';
// import { setMatcherType, setAssertionSuggestions } from '../Assertion/assertionActions';
import { updateAction, updateAssertion } from '../../../context/testCaseActions';
import { eventTypesList } from '../Action/eventTypesList';
import { matcherTypesList } from '../Assertion/matcherTypesList';
import AutoSuggest from 'react-autosuggest';

const AutoComplete = ({ statement, statementType, dispatchToTestCase }) => {
  let updatedAction = { ...statement };
  let updatedAssertion = { ...statement };

  const handleChangeValue = (e, { newValue }) => {
    if (statementType === 'action') {
      updatedAction.eventType = newValue;
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.matcherType = newValue;
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  const inputProps = {
    placeholder: statementType === 'action' ? 'Enter an event' : 'Enter a matcher',
    value: statementType === 'action' ? statement.eventType : statement.matcherType,
    onChange: handleChangeValue,
  };

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (statementType === 'action') {
      return inputLength === 0
        ? []
        : eventTypesList.filter(
            eventType => eventType.name.toLowerCase().slice(0, inputLength) === inputValue
          );
    } else {
      return inputLength === 0
        ? []
        : matcherTypesList.filter(
            matcherType => matcherType.name.toLowerCase().slice(0, inputLength) === inputValue
          );
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    if (statementType === 'action') {
      updatedAction.suggestions = getSuggestions(value);
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.suggestions = getSuggestions(value);
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };

  const onSuggestionsClearRequested = () => {
    if (statementType === 'action') {
      updatedAction.suggestions = [];
      dispatchToTestCase(updateAction(updatedAction));
    } else {
      updatedAssertion.suggestions = [];
      dispatchToTestCase(updateAssertion(updatedAssertion));
    }
  };
  const getSuggestionValue = suggestion => suggestion.name;
  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  return (
    <AutoSuggest
      theme={styles}
      suggestions={statement.suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoComplete;