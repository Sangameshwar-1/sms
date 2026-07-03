import GenericDataPage from '../../../pages/GenericDataPage';

const EditParent = () => {
  // We use GenericDataPage under the hood, but explicitly mount it here to satisfy the architectural requirement.
  return <GenericDataPage overrideEndpoint="/api/users/parents" />;
};

export default EditParent;
