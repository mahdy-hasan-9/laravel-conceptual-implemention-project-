import ResetPassword from "../../features/Authentication/ResetPassword/ResetPassword ";

const ResetPasswordView = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="border border-blue-300 p-5 rounded-lg">
                <div className="mb-4">
                    <h2 className="text-md">Reset Password</h2>
                </div>
                <ResetPassword />
            </div>
        </div>
    )
}

export default ResetPasswordView
