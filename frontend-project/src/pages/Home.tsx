import {useSelector} from 'react-redux';
import {RootState} from "../store/store.ts";

const Home = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  return (
    <main className="content-container">
      <div className="p-4 text-center">
        <h1 className="text-3xl">Altametrics Invoice App</h1>
        {token ? (
          <p>Welcome back :)</p>
        ) : (
          <p className="mt-2">Please login to view your invoices.</p>
        )}
      </div>
    </main>
  );
};

export default Home;