import { Button, Input, Select, Switch } from "antd";
import ProfileInfo from "./ProfileInfo";

const Child2 = () => {
    return (
        <div>
            <div>
                <Input placeholder="Api Key" />
            </div>
            <div>
                <Select
                    placeholder="Select a Role"
                    options={[
                        { label: "role-1", value: "role-1" },
                        { label: "role-2", value: "role-2" },
                        { label: "role-3", value: "role-3" },
                    ]}
                />
            </div>
            <div>
                <Switch /> active in-active user ,
            </div>
            <div>
                <Button type="primary">Save</Button>
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