import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectField,
    FormLabel,
    Option,
} from '@contentful/forma-36-react-components';
// import { Select } from "@contentful/f36-components";
// import { MultipleEntryReferenceEditor } from '@contentful/field-editor-reference';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
    sdk: FieldExtensionSDK;
}

const Field = (props: FieldProps) => {
    // const [entries, setEntries] = useState([]);
    // const [selected, setSelected] = useState(props.sdk.field.getValue() || null);
    const [selectValue, setSelectValue] = useState(['optionOne']);

    useEffect(() => {
        props.sdk.window.startAutoResizer();
        // const referenceEntryIds: string[] = props.sdk.field.getValue().map((v: any) => v.sys.id);

        // Promise.all(referenceEntryIds.map((id: string) => props.sdk.space.getEntry(id)))
        // .then((data: any) => {
        //     setEntries(data);
        //     setSelectedId(data[0].sys.id)
        // })

        // props.sdk.entry.fields.salesforceIDs.setValue([{ selectedId: 'optionThree' }]);

        console.log(props.sdk);
    }, [props]);

    // const selectedEntry = entries.find((entry: any) => entry.sys.id === selectedId) || {};

    // const setValue = () => {
    //     props.sdk.field.setValue(['optionThree']);
    // }

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

export default Field;
