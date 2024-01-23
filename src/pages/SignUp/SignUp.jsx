import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveUser } from '../../api/auth'

const SignUp = () => {
    const {
        loading,
        setLoading,
        signInWithGoogle,
        createUser,
        updateUserProfile,
    } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    // Handle user registration
    const handleSubmit = event => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        createUser(email, password)
            .then(result => {
                updateUserProfile(name, imageUrl)
                    .then(() => {
                        toast.success('Signup successful')
                        saveUser(result.user)
                        navigate(from, { replace: true })
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log(err.message)
                        toast.error(err.message)
                    })
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)
                toast.error(err.message)
            })

        return
    }

    // Handle google signin
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                // save user to db
                saveUser(result.user)
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
                    <h1 className='my-3 text-4xl font-bold'>Register</h1>

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
                                Full Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-950 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='role' className='block mt-4 mb-2 text-sm'>
                                Role
                            </label>
                            <select
                                id='role'
                                name='role'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-950 bg-gray-200 text-gray-900'
                            >
                                <option value='owner'>House Owner</option>
                                <option value='renter'>House Renter</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
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
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='password'
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
                                <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                            ) : (
                                'Register'
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
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-gray-900 text-gray-950'
                    >
                        SignIn
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default SignUp