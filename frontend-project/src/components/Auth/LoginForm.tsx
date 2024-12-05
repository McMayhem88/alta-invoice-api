import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch} from "../../hooks/dispatch.hook";
import {setCredentials} from "../../store/auth/auth.slice";
import {login} from "../../api/auth";
import {useNavigate} from "react-router-dom";
import {ROUTE_CONSTANTS} from "../../constants/constants.ts";
import {useState} from "react";


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [loginError, setLoginError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  
  const hasError = () => {
    if (loginError === null) {
      return false;
    }
    return loginError.trim() !== '';
  };
  
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data);
      dispatch(setCredentials(response));
      navigate(ROUTE_CONSTANTS.invoices);
      setLoginError('');
    }
    catch (error: any) {
      setLoginError(error?.response?.data?.message || 'Login failed');
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto mt-10 p-4 border bg-gray-100">
      <h2 className="text-center text-2xl font-bold text-center mb-5">Login</h2>
      <div className="mb-4">
        <label className="block mb-1">Email:</label>
        <input type="email" className="w-full border px-2 py-1" {...register('email')} disabled={isSubmitting}/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password:</label>
        <input type="password" className="w-full border px-2 py-1" {...register('password')} disabled={isSubmitting}/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in' : 'Login'}
      </button>
      {hasError() && (
        <div className="text-red-500 text-sm py-4 px-2">
          {loginError}
        </div>
      )}
    </form>
  );
};

export default LoginForm;