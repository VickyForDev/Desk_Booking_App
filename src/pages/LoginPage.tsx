import { useState } from "react";
import DeskTwoToneIcon from "@mui/icons-material/DeskTwoTone";
import { useQuery } from "@tanstack/react-query";
import { BOOKING_API_BASE_URL } from "../api/deskBookingAPI";
import type { User } from "../dataTypes/UserTypes";
import { PATHS } from "./routes/paths";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();

  const {
    isPending,
    isError,
    error,
    data: users,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${BOOKING_API_BASE_URL}/users`);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      return res.json();
    },
  });

  const handleLogin = () => {
    if (!selectedUserId) return;

    localStorage.setItem("userId", selectedUserId);
    navigate(PATHS.HOME);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[95%] max-w-sm bg-white rounded-xl shadow-md p-6 text-main-purple">
        <div className="flex items-center gap-3 justify-center mb-4">
          <DeskTwoToneIcon sx={{ fontSize: 55 }} className="text-main-orange" />
          <h1 className="font-bold text-2xl">BookMyDesk</h1>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center">Select User</h2>

        {isError && (
          <p className="text-xs text-red-500 mt-1">
            {(error as Error).message}
          </p>
        )}

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          disabled={isPending}
          className={`
                        w-full rounded-lg px-3 py-2 mb-1
                        border border-main-orange/40
                        focus:outline-none focus:ring-2 focus:ring-main-orange
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                    `}
        >
          <option value="">
            {isPending ? "Loading users..." : "-- Choose user --"}
          </option>
          {!isPending &&
            users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
        </select>

        <button
          onClick={handleLogin}
          disabled={!selectedUserId || isPending || isError}
          className="w-full bg-main-orange text-white py-2 mt-2
                        rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed 
                        hover:bg-orange-600 transition cursor-pointer"
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
