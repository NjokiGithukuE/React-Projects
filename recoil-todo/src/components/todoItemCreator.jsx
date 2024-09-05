import { useState } from 'react';
import { todoListAtom  } from '../recoil/atom/todoAtom';
import { generateUID } from '../utils/uuid';

export const TodoItemCreator  = () => {
    const [inputValue, setInputValue] = useState('');
    const [_, setTodoList] = useRecoilState(todoListAtom);

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const addTodoItem = () => {
        if (inputValue) {
            setTodoList((oldTodoList) => [
                ...oldTodoList,
            {
                id: generateUID(),
                title: inputValue,
                isComplete: false,
            }
        ]);
        setInputValue('');
        }
    }

    return (
        <div className="todo-creator">
            <input type="text" value={inputValue} onChange={onChange} />
            <button className='add-btn' onClick={addTodoItem}>
                Add Task
            </button>
        </div>
    )
}