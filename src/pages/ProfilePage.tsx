import UserReservationsTabs from "../components/profile/UserReservationsTabs";
import { Navigate } from "react-router";
import { PATHS } from "./routes/paths";
import { BOOKING_API_BASE_URL } from "../api/deskBookingAPI";
import type { FullUser } from "../dataTypes/UserTypes";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../components/shared/FullScreenLoader";

export default function ProfilePage() {
  const userId = localStorage.getItem("userId");

  const {
    isPending,
    isError,
    error,
    data: user,
  } = useQuery<FullUser>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`${BOOKING_API_BASE_URL}/users/${userId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      return res.json();
    },
    enabled: !!userId,
  });

  if (!userId) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  if (isError) {
    return <p className="text-red-500">{(error as Error).message}</p>;
  }

  return (
    <>
      <FullScreenLoader open={isPending} />
      {user && (
        <>
          <h1 className="text-3xl font-bold mb-7">
            {user.firstName} {user.lastName}
          </h1>
          <UserReservationsTabs reservations={user.reservations} />
        </>
      )}
    </>
  );
}
