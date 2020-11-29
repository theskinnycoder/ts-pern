import { useMutation, useQueryCache } from 'react-query';
import { deleteToDo } from '../QueriesAndMutations';
import { ToDoType } from './ToDoList';

export type ToDoPropType = {
  toDo: ToDoType | undefined;
};

const ToDoItem: React.FC<ToDoPropType> = ({ toDo }) => {
  const cache = useQueryCache();

  const [removeTodo] = useMutation(deleteToDo, {
    onSuccess: () => {
      cache.invalidateQueries('getToDos');
    }
  });

  const deleteHandler: React.FormEventHandler = async () => {
    removeTodo(toDo?.id);
  };

  return (
    <li className='toDoItem'>
      <h4 style={{ textDecoration: toDo?.isCompleted ? 'line-through' : '' }}>
        {toDo?.text}
      </h4>
      <button onClick={deleteHandler}>
        <i className='material-icons'>delete</i>
      </button>
    </li>
  );
};

export default ToDoItem;
