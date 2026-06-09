
import Register from "../../features/Authentication/Register/Register";

const RegisterView = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="border border-blue-300 p-5 rounded-lg">
                <div className="mb-4">
                    <h2 className="text-md">Register</h2>
                </div>
                <Register />
            </div>
        </div>
    )
}

export default RegisterView; 