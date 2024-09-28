// src/features/counter/Counter.tsx
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";


const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>--Home page--</p>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;