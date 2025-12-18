import { useEffect, useState } from "react";
import DeskTwoToneIcon from '@mui/icons-material/DeskTwoTone';

const MOCK_USERS = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  { id: 3, firstName: "Alice", lastName: "Johnson" },
];

export default function LoginPage() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [selectedUserId, setSelectedUserId] = useState("");

    const handleLogin = () => {
        // const user = users.find(u => u.id === Number(selectedUserId));
        // if (user) {
        //   onLogin(user);
        // }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[95%] max-w-sm bg-white rounded-xl shadow-md p-6 text-main-purple">

                <div className="flex items-center gap-3 justify-center mb-4">
                    <DeskTwoToneIcon sx={{fontSize: 55}} className="text-main-orange" />
                    <h1 className="font-bold text-2xl">BookMyDesk</h1>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-center">
                    Select User
                </h2>

                <select
                    value={selectedUserId}
                    onChange={e => setSelectedUserId(e.target.value)}
                    className="w-full border border-main-orange/40 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-main-orange"
                >
                    <option value="">-- Choose user --</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleLogin}
                    disabled={!selectedUserId}
                    className="w-full bg-main-orange text-white py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition"
                >
                    Login
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                    Authentication is simulated for demo purposes
                </p>
            </div>
        </div>
    );
}