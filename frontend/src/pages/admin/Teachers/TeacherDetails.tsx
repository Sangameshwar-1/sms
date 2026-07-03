import GenericDataPage from '../../../pages/GenericDataPage';

const TeacherDetails = () => {
  // We use GenericDataPage under the hood, but explicitly mount it here to satisfy the architectural requirement.
  return <GenericDataPage overrideEndpoint="/api/users/teachers" />;
};

export default TeacherDetails;
