import PaginatedTable from '../components/tables/PaginatedTable';

const ParksPage = ({ history }) => {
  return (
    <div className="parks-page-background">
      <div className="container">
        <h1>Parks Page</h1>
      </div>

      <PaginatedTable history={history} />
    </div>
  );
};

export default ParksPage;
