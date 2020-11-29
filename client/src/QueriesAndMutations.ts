export const getToDos = async () => {
  const res = await fetch('/api/todos/');
  return res.json();
};

export const createToDo = async (text: string) => {
  await fetch('/api/todos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });
};

export const updateToDo = async (id: string) => {
  await fetch(`/api/todos/${id}/`, { method: 'PATCH' });
};

export const deleteToDo = async (id: string) => {
  await fetch(`/api/todos/${id}/`, { method: 'DELETE' });
};
