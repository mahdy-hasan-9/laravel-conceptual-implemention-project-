import ForgetPassword from "../../features/Authentication/ForgetPassword/ForgetPassword";

const ForgetPasswordView = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="border border-blue-300 p-5 rounded-lg">
                <div className="mb-4">
                    <h2 className="text-md">Forget Password</h2>
                </div>
                <ForgetPassword />
            </div>
        </div>
    )
}

export default ForgetPasswordView