import { Form, Switch } from 'antd';

interface SwitchInputProps {
    name: string;
    label: string;
    checkedChildren?: string;
    unCheckedChildren?: string;
    initialValue?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    valuePropName?: string;
}

const SwitchInput = ({
    name,
    label,
    checkedChildren = 'Active',
    unCheckedChildren = 'Inactive',
    initialValue,
    disabled,
    onChange,
    valuePropName = 'value'
}: SwitchInputProps) => {
    return (
        <Form.Item
            name={name}
            label={label}
            valuePropName={valuePropName}
            initialValue={initialValue}
        >
            <Switch
                checkedChildren={checkedChildren}
                unCheckedChildren={unCheckedChildren}
                disabled={disabled}
                onChange={onChange}
            />
        </Form.Item>
    );
};

export default SwitchInput;