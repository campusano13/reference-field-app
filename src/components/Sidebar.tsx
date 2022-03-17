import React, { useEffect, useState } from "react";
import {
  Select,
  FormLabel,
  Option,
} from "@contentful/forma-36-react-components";
import { SidebarExtensionSDK } from "@contentful/app-sdk";

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

type formOptions = {
  [key: string]: any;
};

const customFields = [
  "sitecoreTemplateId",
  "sitecoreProductRuleId",
  "salesforceElementId",
  "salesforceSuperCategory",
  "salesforcePartnerId",
];

const Sidebar = (props: SidebarProps) => {
  const baseForm: formOptions = {
    sitecoreTemplateId: props.sdk.entry.fields.sitecoreTemplateId.getValue(),
    sitecoreProductRuleId: props.sdk.entry.fields.sitecoreProductRuleId.getValue(),
    salesforceElementId: props.sdk.entry.fields.salesforceElementId.getValue(),
    salesforceSuperCategory: props.sdk.entry.fields.salesforceSuperCategory.getValue(),
    salesforcePartnerId: props.sdk.entry.fields.salesforcePartnerId.getValue(),
  };
  const baseValues: any = { sitecoreTemplateId: ["xyz", "123"] };

  const [form, setForm] = useState(baseForm);
  const [apiValues, setApiValues] = useState(baseValues);

  useEffect(() => {
    console.log("form change", form);
  }, [form]);

  const onChange = (e: any) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });

    props.sdk.entry.fields[`${e.target.id}`].setValue(e.target.value);
  };

  return (
    <>
      {customFields?.map((field: any, index: any) => (
        <div key={field}>
          <FormLabel htmlFor={field} requiredText="requiredText">
            {field}
          </FormLabel>
          <Select
            id={field}
            name={field}
            onChange={onChange}
            className="sidebar-select"
          >
            {apiValues[field]?.map((v: any) => (
              <Option value={v} key={v}>
                {v}
              </Option>
            ))}
          </Select>
        </div>
      ))}
    </>
  );
};

export default Sidebar;
