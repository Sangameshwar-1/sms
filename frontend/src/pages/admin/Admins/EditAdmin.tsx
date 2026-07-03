import GenericDataPage from '../../../pages/GenericDataPage';

const EditAdmin = () => {
  // We use GenericDataPage under the hood, but explicitly mount it here to satisfy the architectural requirement.
  return <GenericDataPage overrideEndpoint="/api/users/admins" />;
};

export default EditAdmin;
