import React, { useEffect, useState } from "react";
import {
  Select,
  FormLabel,
  Option,
} from "@contentful/forma-36-react-components";
import { SidebarExtensionSDK } from "@contentful/app-sdk";
import ReactSelect from "react-select";
import axios from "axios";

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

type formOptions = {
  [key: string]: any;
};

const customSelectFields = [
  "sitecoreTemplateId",
  "sitecoreProductRuleId",
  "salesforceElementId",
  "salesforceSuperCategory",
];

const customMultiselectFields = ["salesforcePartnerId"];

const Sidebar = (props: SidebarProps) => {
  const baseForm: formOptions = {
    sitecoreTemplateId: props.sdk.entry.fields.sitecoreTemplateId.getValue(),
    sitecoreProductRuleId: props.sdk.entry.fields.sitecoreProductRuleId.getValue(),
    salesforceElementId: props.sdk.entry.fields.salesforceElementId.getValue(),
    salesforceSuperCategory: props.sdk.entry.fields.salesforceSuperCategory.getValue(),
    salesforcePartnerId: props.sdk.entry.fields.salesforcePartnerId.getValue(),
  };
  const baseApiValues: any = {};

  // eslint-disable-next-line
  const [form, setForm] = useState(baseForm);
  const [apiValues, setApiValues] = useState(baseApiValues);

  useEffect(() => {
    const getSitecoreTemplateIds = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=12"
      );

      setApiValues((prevState: any) => {
        return {
          ...prevState,
          sitecoreTemplateId: res.data,
        };
      });
    };

    const getSitecoreProductRuleId = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_start=12&_limit=12"
      );

      setApiValues((prevState: any) => {
        return {
          ...prevState,
          sitecoreProductRuleId: res.data,
        };
      });
    };

    const getSalesforceElementId = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_start=25&_limit=12"
      );

      setApiValues((prevState: any) => {
        return {
          ...prevState,
          salesforceElementId: res.data,
        };
      });
    };

    const getSalesforceSuperCategory = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_start=37&_limit=12"
      );

      setApiValues((prevState: any) => {
        return {
          ...prevState,
          salesforceSuperCategory: res.data,
        };
      });
    };

    const getSalesforcePartnerId = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_start=49&_limit=12"
      );

      const ids = res.data.map((item: any) => {
        return {
          value: item.id,
          label: item.id,
        };
      });

      setApiValues((prevState: any) => {
        return {
          ...prevState,
          salesforcePartnerId: ids,
        };
      });
    };

    getSitecoreTemplateIds();
    getSitecoreProductRuleId();
    getSalesforceElementId();
    getSalesforceSuperCategory();
    getSalesforcePartnerId();
  }, []);

  const onChange = (e: any) => {
    if (e.target?.type === "select-one") {
      setForm((prevState) => {
        return {
          ...prevState,
          [e.target.id]: e.target.value,
        };
      });

      props.sdk.entry.fields[`${e.target.id}`].setValue(e.target.value);
    } else {
      // Multiselect salesforcePartnerId
      // Convert this format: e = [{ value: xxx, label: xxx }]
      const getIds = e.map((item: any) => {
        return item.value;
      });

      setForm((prevState) => {
        return {
          ...prevState,
          salesforcePartnerId: JSON.stringify(getIds),
        };
      });

      props.sdk.entry.fields.salesforcePartnerId.setValue(
        JSON.stringify(getIds)
      );
    }
  };

  return (
    <>
      {customSelectFields?.map((field: string) => (
        <div key={field}>
          <FormLabel htmlFor={field} requiredText="requiredText">
            {field}
          </FormLabel>
          <Select
            id={field}
            name={field}
            onChange={onChange}
            className="sidebar-select"
            value={baseForm[field]}
          >
            {apiValues[field]?.map((v: any) => (
              <Option value={v.title} key={v.id}>
                {v.title}
              </Option>
            ))}
          </Select>
        </div>
      ))}
      {customMultiselectFields?.map((field: string) => (
        <div key={field}>
          <FormLabel htmlFor={field} requiredText="requiredText">
            {field}
          </FormLabel>
          <ReactSelect
            isMulti
            key={field}
            id={field}
            options={apiValues[field]}
            className="sidebar-select"
            onChange={onChange}
          />
        </div>
      ))}
    </>
  );
};

export default Sidebar;
