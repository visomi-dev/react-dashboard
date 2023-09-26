import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { authStore as auth } from '@/stores/auth';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { dashboardPath } from '@/constants/routes';

type Inputs = {
  username: string;
  password: string;
};

export function SignIn() {
  const signIn = auth.use.signIn();
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async ({ username, password }: Inputs) => {
    try {
      await signIn(username, password);

      navigate(dashboardPath);
    } catch (error$) {
      setError((error$ as Error).message);
    }
  }, []);

  return (
    <div className="flex w-full flex-col p-8">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            id="sign-in"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Type your username"
                {...register('username', {
                  required: true,
                })}
                disabled={formState.isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Type your password"
                type="password"
                {...register('password', {
                  required: true,
                })}
                disabled={formState.isSubmitting}
              />
            </div>

            {error && <p className="text-center text-red-400">{error}</p>}
          </form>
        </CardContent>

        <CardFooter className="flex-end flex">
          <Button
            form="sign-in"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? '...' : 'Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
