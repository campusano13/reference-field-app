import React, { useEffect, useState } from 'react';
import {
    Card,
    Typography,
    Heading,
    CardActions,
    DropdownList,
    DropdownListItem,
} from '@contentful/forma-36-react-components';
import { MultipleEntryReferenceEditor } from '@contentful/field-editor-reference';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
    sdk: FieldExtensionSDK;
}

const Field = (props: FieldProps) => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const referenceEntryIds: string[] = props.sdk.field.getValue().map((v: any) => v.sys.id);

        Promise.all(referenceEntryIds.map((id: string) => props.sdk.space.getEntry(id)))
        .then((data: any) => {
            setEntries(data);
        })
    });

    return <div>
        {JSON.stringify(entries)}
    </div>
};

export default Field;
