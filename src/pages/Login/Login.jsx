import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import { TbForbidFilled } from 'react-icons/tb'

const Login = () => {
    const { loading, setLoading, signIn, signInWithGoogle } =
        useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    // Handle submit
    const handleSubmit = event => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)
                toast.error(err.message)
            })
    }

    // Handle google signin
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)
                toast.error(err.message)
            })
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign In</h1>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Your Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='something@gmail.com'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-950 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Your Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='password here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-950 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-gray-950 w-full rounded-md py-3 text-white'
                        >
                            {loading ? (
                                <TbForbidFilled className='m-auto animate-spin' size={24} />
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>

                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div
                    onClick={handleGoogleSignIn}
                    className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                >
                    <FcGoogle size={32} />

                    <p>Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    You do not have account?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-gray-900 text-gray-600'
                    >
                        Register
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login