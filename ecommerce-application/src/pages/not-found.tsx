const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>Error 404 - Not Found</h1>
      <button onClick={() => history.back()}>Return</button>
    </div>
  );
};

export default NotFoundPage;
