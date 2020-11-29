import { useQuery } from 'react-query';
import { getToDos } from '../QueriesAndMutations';
import ToDoItem from './ToDoItem';

export type ToDoType = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const ToDoList: React.FC = () => {
  const { data, isLoading, isError } = useQuery('getToDos', getToDos);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  return (
    <ul>
      {data.toDos?.map((toDo: ToDoType) => (
        <ToDoItem key={toDo?.id} toDo={toDo} />
      ))}
    </ul>
  );
};

export default ToDoList;
