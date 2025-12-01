import { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Space,
  InputNumber,
  Card,
  Divider,
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

export const UpdateVubForm = ({ onFinish, loading, vub }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (vub) {
      form.setFieldsValue({
        fullname: vub.fullname || "",
        email: vub.email || "",
        phone: vub.phone || "",
        comment: vub.comment || "",
        pinLength: vub.pinLength?.toString() || undefined,
        expenses:
          vub.expenses?.length > 0
            ? vub.expenses
            : [
                { name: "Výdaje za tento měsíc", amount: 0 },
                { name: "Bydlení", amount: 0 },
              ],
        contact: vub.contact || { fullname: "", phoneNumber: "" },
      });
    } else {
      form.setFieldsValue({
        expenses: [
          { name: "Výdaje za tento měsíc", amount: 0 },
          { name: "Bydlení", amount: 0 },
        ],
        contact: { fullname: "", phoneNumber: "" },
      });
    }
  }, [vub, form]);

  const handleFinish = (values) => {
    onFinish({ ...values, id: vub?._id });
    if (!vub) form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Fullname"
        name="fullname"
        rules={[{ required: true, message: "Please enter full name" }]}
      >
        <Input placeholder="Fullname" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input placeholder="Phone" />
      </Form.Item>

      <Form.Item label="Comment" name="comment">
        <Input.TextArea placeholder="Comment" rows={4} />
      </Form.Item>

      <Form.Item
        label="Pin Length"
        name="pinLength"
        rules={[{ required: true, message: "Please select pin length" }]}
      >
        <Select placeholder="Pin Length">
          <Option value="4">4</Option>
          <Option value="6">6</Option>
          <Option value="8">8</Option>
        </Select>
      </Form.Item>

      <Form.List name="expenses">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <Form.Item
                  name={[name, "name"]}
                  rules={[
                    { required: true, message: "Введите название расхода" },
                  ]}
                >
                  <Input placeholder="Название" style={{ width: 200 }} />
                </Form.Item>

                <Form.Item
                  name={[name, "amount"]}
                  rules={[{ required: true, message: "Введите сумму" }]}
                >
                  <InputNumber placeholder="Сумма" style={{ width: 140 }} />
                </Form.Item>

                {fields.length > 2 && (
                  <MinusCircleOutlined onClick={() => remove(name)} />
                )}
              </Space>
            ))}
          </>
        )}
      </Form.List>

      {/* ---- Саппорт ---- */}
      <Divider>Саппорт</Divider>
      <Card size="small" style={{ marginBottom: 16 }}>
        <Form.Item
          label="Fullname"
          name={["contact", "fullname"]}
          rules={[{ required: true, message: "Введите имя саппорта" }]}
        >
          <Input placeholder="Fullname" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name={["contact", "phoneNumber"]}
          rules={[{ required: true, message: "Введите номер телефона" }]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Save changes
        </Button>
      </Form.Item>
    </Form>
  );
};
