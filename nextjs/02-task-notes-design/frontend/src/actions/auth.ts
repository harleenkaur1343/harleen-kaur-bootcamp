// 'use server';

// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { api } from '@/lib/api';
// import type { Login } from '@/types/user';

// export async function loginAction(_prevState: any, formData: FormData) {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const info: Login = { email, password };

//   try {
//     const response = await api.login(info); 
//     const infores = await response.json(); 
//     console.log("In actions auth", infores.user);
//     return infores.user;

//   } catch (error) {
//     console.log("In action error", error)
//     return { error: 'Invalid credentials' };
//   }
  
//   redirect('/tasks');  
// }
