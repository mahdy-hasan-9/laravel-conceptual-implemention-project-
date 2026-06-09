import Login from "../../features/Authentication/Login/Login";

const LoginView = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="border border-blue-300 p-5 rounded-lg">
                <div className="mb-4">
                    <h2 className="text-md">Login</h2>
                </div>
                <Login />
            </div>
        </div>
    )
}

export default LoginView; 