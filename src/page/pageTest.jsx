import { useLocation } from 'react-router-dom';
function pageTest() {
  const location = useLocation();
  const testpate = location.state.hello;
  return (
    <div>
      <h2>{testpate}</h2>
    </div>
  );
}

export default pageTest;
