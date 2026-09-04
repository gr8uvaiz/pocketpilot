import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { signupSchema, type SignupFormData } from "../schemas/auth.schema";
import { useRegisterMutation } from "../services/auth.api";

const Signup = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/login");
      toast.success("Account created successfully");
    } catch {
      toast.error("Signup failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-screen w-full items-center justify-center">
          <Card className="p-4">
            <Label>Name</Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}

            <Label>Email</Label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}

            <Label>Password</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}

            <Button type="submit" isLoading={isLoading}>
              Signup
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link className="text-primary hover:underline" to="/login">
                Login
              </Link>
            </p>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Signup;
