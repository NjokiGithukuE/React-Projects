import Sidebar from "./components/Sidebar";
import BoardTasks from "./components/BoardTasks";

export default function Home() {
  return (
    <main className="h-full">
      <Sidebar />
      <BoardTasks />
    </main>
  )
}