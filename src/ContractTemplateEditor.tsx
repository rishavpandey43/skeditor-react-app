import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SkEditor } from '@skuad/skeditor';

import { GET_PLACEHOLDERS, GET_TEMPLATE, UPDATE_TEMPLATE } from './graphql/Query';

const ContractTemplateEditor = () => {
  // contract query/mutation

  const [templateData, setTemplateData] = useState('');

  // Get initial data for editor
  const {
    loading: getTemplateQueryLoading,
    error: getTemplateQueryError,
    data: getTemplateQueryData,
  } = useQuery(GET_TEMPLATE, {
    variables: { id: '6299aac82a68032b923d061d' },
  });

  // Get placeholder data
  const {
    loading: getPlaceholderLoading,
    error: getPlaceholderError,
    data: getPlaceholderData,
  } = useQuery(GET_PLACEHOLDERS, {
    variables: {
      paginationArgs: {
        limit: -1,
        offset: 0,
      },
      searchBy: {
        keys: ['geography:IN::type:CONTRACT'], // hardcoded the key for now
      },
      filterBy: {
        subType: ['Placeholder'],
      },
    },
  });

  // Update template data
  const [updateTemplate, { loading: updateTemplateMutationLoading }] = useMutation(UPDATE_TEMPLATE, {
    variables: {
      updateTemplateInput: {
        id: getTemplateQueryData?.template?.id,
        key: getTemplateQueryData?.template?.key,
        type: getTemplateQueryData?.template?.type,
        subType: getTemplateQueryData?.template?.subType,
        rawTemplate: templateData,
      },
    },
  });

  useEffect(() => {
    if (getTemplateQueryData?.template) {
      setTemplateData(getTemplateQueryData?.template?.rawTemplate);
    }
  }, [getTemplateQueryData?.template]);

  return (
    <>
      {(getTemplateQueryLoading || getPlaceholderLoading) && <p>Loading...</p>}
      {(getTemplateQueryError || getPlaceholderError) && <p>Error</p>}
      {templateData && getPlaceholderData && (
        <div style={{ width: '70%', margin: 'auto' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <h1 style={{ textAlign: 'center' }}>Template Builder</h1>
            <button
              style={{
                backgroundColor: 'black',
                color: 'white',
                margin: '5px',
              }}
              onClick={() => {
                updateTemplate();
              }}
            >
              {updateTemplateMutationLoading ? 'Updating Contract Template...' : 'Update Contract Template'}
            </button>
          </div>
          <SkEditor
            templateData={templateData}
            globalPlaceholders={getPlaceholderData?.templates?.templates[0]?.values}
            onChange={(value: any) => setTemplateData(value)}
          />
        </div>
      )}
    </>
  );
};

export default ContractTemplateEditor;
