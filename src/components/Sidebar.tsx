import React from 'react';
import {     
    Select,
    SelectField,
    FormLabel,
    Option, 
} from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK, FieldExtensionSDK } from '@contentful/app-sdk';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

const Sidebar = (props: SidebarProps) => {
  const onChange = () => {
      props.sdk.entry.fields.salesforceElementId.setValue('test');
  };

  return <>
        <FormLabel
            htmlFor="optionSelect"
            requiredText="requiredText"
            >
            Salesforce ID
        </FormLabel>
        <Select id="optionSelect" name="optionSelect" onChange={onChange}>
            <Option value="optionOne">Option 1</Option>
            <Option value="optionTwo">Option 2</Option>
            <Option value="optionThree">Option 3</Option>
        </Select>
    </>
};

export default Sidebar;
