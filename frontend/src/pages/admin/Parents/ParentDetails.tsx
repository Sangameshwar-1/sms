import GenericDataPage from '../../../pages/GenericDataPage';

const ParentDetails = () => {
  // We use GenericDataPage under the hood, but explicitly mount it here to satisfy the architectural requirement.
  return <GenericDataPage overrideEndpoint="/api/users/parents" />;
};

export default ParentDetails;
