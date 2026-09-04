import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogoutMutation } from "../services/auth.api";

function Navbar() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between bg-zinc-100">
      <div>Pocket</div>
      <Button
        variant={"ghost"}
        className={"cursor-pointer"}
        isLoading={isLoading}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </div>
  );
}

export default Navbar;
