// Controlled Form Fields
import React, { useReducer } from 'react'

// Here, we want to be able to update the state of the form fields based on
// changes to other fields. This uses a pattern called "controlled props" which
// is supported by all form fields in React.
//
// To control the value of (most) form fields, you simply pass a `value` prop to
// the element and it becomes controlled. From there on, React will cease to
// attempt to update the value itself as the user attempts to make changes to
// it. Instead, you are responsible for making sure that it's kept up to date.
//
// You can do this with the `onChange` prop. Whenever the user makes a change to
// the field value, react will call your change handler and you can use
// `event.target` to know what the new value should be.

// We're going to use React.useReducer.

// This is a utility that you can use in your reducer. It accepts an array of
// values and returns the state that should exist based on that array.
// So the job of your reducer is to take the value from the input that
// experienced the change and turn its values into an array.
// eslint-disable-next-line no-unused-vars
const availableOptions = ['apple', 'grape', 'cherry', 'orange', 'pear', 'peach']

function getStateFromArray(array) {
  return {
    commaSeparated: array.join(','),
    multiline: array.join('\n'),
    multiSelect: array.filter(v => availableOptions.includes(v)),
  }
}

// here's the start to your reducer
// eslint-disable-next-line no-unused-vars
function fancyFormReducer(state, action) {
  switch (action.type) {
    case 'COMMA_SEPARATED': {
      // 🐨 change this to handle the `action.value` from the comma-separated
      // input.
      // 💰 `return getStateFromArray(arrayOfValues)`
      const allVals = action.value.split(',')
      return getStateFromArray(allVals)
    }
    case 'MULTILINE': {
      // 🐨 change this to handle the `action.value` from the multiline input.
      // 💰 `return getStateFromArray(arrayOfValues)`
      const allVals = action.value.split('\n')
      return getStateFromArray(allVals)
    }
    case 'MULTISELECT': {
      // 🐨 change this to handle the `action.selectedOptions` from the select.
      // 💰 a <select> DOM node has a `selectedOptions` property which is an
      // array of <option> DOM nodes. Each of those has a `value` property.
      // 💰 you can use `action.selectedOptions.map` to map over those options
      // and get your array of values.
      // 💰 `return getStateFromArray(arrayOfValues)`
      const allVals = Array.from(action.selectedOptions).map(option => option.value)
      return getStateFromArray(allVals)
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}


function MyFancyForm() {
  // because React will not be able to update the state of the fields once we
  // add our onChange handlers we'll need to store that state ourselves.
  // 🐨 use the useReducer hook with the fancyFormReducer from above and the
  // initial state for each of the fields:
  //   commaSeparated: '' (for the <input />)
  //   multiline: '' (for the <textarea />)
  //   multiSelect: [] (for the <select />)
  const [ state, dispatch ] = useReducer(fancyFormReducer, { commaSeparated: '', multiline: '', multiSelect: [] })
  // Now we need to add an onChange event handler for each of the form fields.
  // Each handler will be unique to the type of input we're using, but they
  // will all be pretty simple and just call dispatch with the information the
  // reducer needs to calculate the new state (in my final version I just use
  // inline arrow functions that call dispatch).
  const { commaSeparated, multiline, multiSelect } = state
  function inputChangeHandler(e) {
    dispatch({ type: 'COMMA_SEPARATED', value: e.target.value })
  }

  function textAreaChangeHandler(e) {
    dispatch({ type: 'MULTILINE', value: e.target.value })
  }

  function selectChangeHandler(e) {
    dispatch({ type: 'MULTISELECT', selectedOptions: e.target.selectedOptions })
  }

  return (
    <form>
      <div>
        <label>
          comma separated values:
          <br />
          <input
            type="text"
            // 🐨 add a value prop for the commaSeparated state
            value={commaSeparated}
            // 🐨 also add an onChange to call dispatch for COMMA_SEPARATED
            onChange={inputChangeHandler}
          />
        </label>
      </div>
      <div>
        <label>
          multiline values:
          <br />
          <textarea
            rows={availableOptions.length}
            // 🐨 add a value prop for the multiline state
            value={multiline}
            // 🐨 also add an onChange to call dispatch for MULTILINE
            onChange={textAreaChangeHandler}
          />
        </label>
      </div>
      <div>
        <label>
          multiselect values:
          <br />
          <select
            multiple
            size={availableOptions.length}
            // 🐨 add a value prop for the state of the multiSelect
            value={multiSelect}
            // 🐨 also add an onChange to call dispatch for MULTISELECT
            onChange={selectChangeHandler}
          >
            {availableOptions.map(optionValue => (
              <option key={optionValue} value={optionValue}>
                {optionValue}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  )
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <MyFancyForm />
}
Usage.title = 'Controlled Form Fields'

export default Usage
