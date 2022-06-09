import { gql } from '@apollo/client';

/* SERVER QUERIES */
export const GET_TEMPLATE = gql`
  query template($id: String!) {
    template(id: $id) {
      id
      key
      type
      subType
      isBase
      isDefault
      path
      rawTemplate
      values {
        key
        type
        label
        exampleValue
        mapping
        description
      }
    }
  }
`;

export const GET_PLACEHOLDERS = gql`
  query templates(
    $paginationArgs: TemplatePaginationArgs!
    $searchBy: TemplateSearchInput!
    $filterBy: TemplateFilterInput
  ) {
    templates(paginationArgs: $paginationArgs, searchBy: $searchBy, filterBy: $filterBy) {
      templates {
        id
        key
        type
        subType
        values {
          key
          type
          label
          exampleValue
          mapping
          description
        }
      }
    }
  }
`;

export const UPDATE_TEMPLATE = gql`
  mutation updateTemplate($updateTemplateInput: UpdateTemplateInput!) {
    updateTemplate(updateTemplateInput: $updateTemplateInput) {
      id
      key
      type
      subType
      isBase
      isDefault
      path
      rawTemplate
      values {
        key
        type
        label
        exampleValue
        mapping
        description
      }
    }
  }
`;
