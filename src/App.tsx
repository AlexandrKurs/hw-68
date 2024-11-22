import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {selectAddTaskLoading, selectAllTasks, selectFetchTasksLoading} from "./store/slices/toDoSlice.ts";
import {addNewTask, fetchAllTasks} from "./store/thunks/toDo/toDoThunks.ts";
import {Spinner} from "react-bootstrap";

const initialStateToForm = {
    title: '',
    status: false,
};

const App = () => {

    const addLoading = useAppSelector(selectAddTaskLoading);
    const fetchLoading = useAppSelector(selectFetchTasksLoading);
    const allTasks = useAppSelector(selectAllTasks);
    const dispatch = useAppDispatch();
    const [task, setCase] = useState<ITaskForm>(initialStateToForm);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setCase(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addNewTask({...task}));
    };

    const fetchTasks = useCallback(async () => {
        await dispatch(fetchAllTasks());
    }, [dispatch]);

    useEffect(() => {
        void fetchTasks();
    },[]);

    return (
        <div className="container">
            <h1 className="text-center bg-black text-white text-uppercase py-2">To do list</h1>
            <form onSubmit={onSubmit}
                className="my-3 mx-auto w-50 d-flex justify-content-between align-items-center">
                <div className="w-75">
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={onChangeInput}
                        className="form-control border-black bg-secondary text-white"
                    />
                </div>
                <div>
                    <button disabled={addLoading} className="btn btn-dark">Add task</button>
                    {addLoading ? <Spinner/> : null}
                </div>
            </form>
            <hr/>

            <div>
                {fetchLoading ? <Spinner/> :
                    <>
                        {allTasks.length === 0 ? <p>No tasks yet</p> :
                            <>
                                {allTasks.map((task) => (
                                    <div key={task.id} className="border border-black p-4 mb-3 w-50 mx-auto d-flex justify-content-between align-items-center">
                                        <div>{task.title}</div>
                                    </div>
                                ))}
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )

};
export default App; 