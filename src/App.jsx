// App.jsx
import { Toaster, toast } from "react-hot-toast";

function App() {
  return (
    <div className="p-10">
      <button
        onClick={() => toast.success("Hello Rezwan! ")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Show Toast
      </button>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
