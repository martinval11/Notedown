'use client';

import {
  PasswordInput,
  Text,
  Group,
  Button,
  Input,
  Title,
} from '@mantine/core';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './styles.module.css';
import Footer from '@/components/Footer/Footer';

import { supabase } from '@/lib/supabaseClient';
import { decrypt } from '@/lib/security/decrypt';
import { Toaster, toast } from 'sonner';
import { FormEvent, useRef, useState } from 'react';
import { TABLE_NAME } from '@/consts/consts';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { data: users, error } = await supabase
      .from(TABLE_NAME)
      .select('name, password');

    if (error) {
      toast.error('Something went wrong');
      throw new Error(error.message);
    }

    const searchUser = users.find(
      (user: any) =>
        user.name === (username || userRef.current?.value) &&
        decrypt(user.password).message === (password || passRef.current?.value)
    );

    if (searchUser) {
      localStorage.setItem('username', searchUser.name);
      router.push('/dashboard');
      return;
    }
    toast.error('Wrong username or password');
    setLoading(false);
  };

  return (
    <>
      <Toaster richColors />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={login}>
          <Title className={styles.title}>Login</Title>
          <Group justify="space-between" mb={5} mt={10}>
            <Text component="label" htmlFor="your-username" size="sm" fw={500}>
              Username
            </Text>
          </Group>
          <Input
            placeholder="Username"
            type="text"
            id="your-username"
            required
            value={username}
            onChange={(event: any) => setUsername(event.target.value)}
            data-cy="username-input-login"
          />

          <Group mb={5} mt={10}>
            <Text component="label" htmlFor="your-password" size="sm" fw={500}>
              Password
            </Text>
          </Group>
          <PasswordInput
            placeholder="Your password"
            id="your-password"
            ref={passRef}
            value={password}
            onChange={(event: any) => setPassword(event.target.value)}
            data-cy="password-input-login"
            required
          />

          <Button
            type="submit"
            mt={5}
            w="100%"
            disabled={loading}
            data-cy="login-btn"
          >
            {loading ? 'Login...' : 'Login'}
          </Button>

          <Link href="/signup" className={styles.formLink}>
            Just getting started? Create an Account
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
