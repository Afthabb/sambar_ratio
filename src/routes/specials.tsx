import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/specials")({ component: () => <Outlet /> });
