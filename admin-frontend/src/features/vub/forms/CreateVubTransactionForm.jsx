import { Form, Input, InputNumber, Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

export const CreateVubTransactionForm = ({ onFinish, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (values.date) {
      values.date = values.date.toISOString();
    }
    onFinish(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={{ type: "top", amount: 0, date: dayjs() }}
    >
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: "Please input the amount!" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter amount"
          step={0.01}
        />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please select a date!" }]}
      >
        <DatePicker style={{ width: "100%" }} showTime />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: false }]}
      >
        <Input.TextArea placeholder="Enter description" rows={3} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}
        >
          Create Transaction
        </Button>
      </Form.Item>
    </Form>
  );
};
