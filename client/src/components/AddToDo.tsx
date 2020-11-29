import { useState } from 'react';
import { useMutation, useQueryCache } from 'react-query';
import { createToDo } from '../QueriesAndMutations';

const AddToDo: React.FC = () => {
  const cache = useQueryCache();

  const [addTodo] = useMutation(createToDo, {
    onSuccess: () => {
      cache.invalidateQueries('getToDos');
    }
  });

  const submitHandler: React.FormEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  const [text, setText] = useState<string>('');

  return (
    <form method='POST' onSubmit={submitHandler}>
      <input
        type='text'
        name='text'
        id='text'
        placeholder='Add a new ToDo...'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type='submit'>
        Add<i className='material-icons'>plus</i>
      </button>
    </form>
  );
};

export default AddToDo;
