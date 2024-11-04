"use client";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userRegister } from "@/utils/authUtils";

export default function Page() {
  const { register, handleSubmit } = useForm<FormData>();

  interface FormData {
    email: string;
    password: string;
  }
  const onSubmit = async (data: FormData) => {
    console.log({ data });
    await userRegister({ data });
  };
  return (
    <div className="flex justify-center items-center flex-row  h-screen">
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Lee Robinson" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit(onSubmit)}>
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
