import { useRecoilState } from "recoil";
import { TodoItemCreator } from "./todoItemCreator";
import { TodoItem } from './todoItem';
import { todoListAtom } from "../recoil/atom/todoAtom";

export const TodoMain = () => {
    const todoList = useRecoilValue(todoListAtom);

    return (
        <div className="parent-container">
            <div>
                <TodoItemCreator />
                {todoList.length > 0 && (
                    <div className="todos-list">
                        {todoList.map((todoItem) => (
                            <TodoItem key={todoItem.id} item={todoItem} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};