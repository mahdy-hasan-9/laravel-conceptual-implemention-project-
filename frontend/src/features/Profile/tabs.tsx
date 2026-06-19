import { Input } from "antd";
import ProfileInfo from "./ProfileInfo";

const Child2 = () => {
    return (
        <div>
            <div>
                <Input placeholder="Api Key" />
            </div>
            <div>
                <select name="" id="">
                    <option value="">role-1</option>
                </select>
            </div>
            <div>
                <switch /> active in-active user ,
            </div>
            <div>
                button for save all
            </div>
        </div>
    )
}

export const tabs = [
    {
        id: 1,
        label: "Basic Information",
        child: <ProfileInfo />
    },
    {
        id: 2,
        label: "Advanced",
        child: <Child2 />
    },
]