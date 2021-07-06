import PaginatedTable from '../components/tables/PaginatedTable';

const ParksPage = ({ history }) => {
  return (
    <div className="parks-page-background">
      <PaginatedTable history={history} />
    </div>
  );
};

export default ParksPage;
