import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';

const App: React.FC = () => {
  const queryCache = new QueryCache();

  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <AddToDo />
        <ToDoList />
      </ReactQueryCacheProvider>
    </>
  );
};

export default App;
