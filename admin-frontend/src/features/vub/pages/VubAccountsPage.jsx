import { useParams } from "react-router-dom";
import { useVubAccounts } from "../hooks/useVubAccounts";
import { Button, ColorPicker, Flex, Modal, Popconfirm, Table, Tag } from "antd";
import { useState } from "react";
import { useCreateVubAccount } from "../hooks/useCreateVubAccount";
import { CreateVubAccountForm } from "../forms/CreateVubAccountForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UpdateVubAccountForm } from "../forms/UpdateVubAccountForm";
import { useUpdateVubAccount } from "../hooks/useUpdateVubAccount";
import { useDeleteVubAccount } from "../hooks/useDeleteVubAccount";
import { CreateVubTransactionForm } from "../forms/CreateVubTransactionForm";
import { UpdateVubTransactionForm } from "../forms/UpdateVubTransactionForm";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import dayjs from "dayjs";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

export const VubAccountsPage = () => {
  const { id } = useParams();

  const { data: Vub } = useVubAccounts({
    enabled: true,
    id: id,
  });

  const { mutate: createAccount } = useCreateVubAccount();
  const { mutate: updateAccount } = useUpdateVubAccount();
  const { mutate: deleteAccount } = useDeleteVubAccount();

  const { mutate: createTransaction } = useCreateTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const [isOpenCreateAccountModal, setIsOpenCreateAccountModal] = useState();
  const [isOpenUpdateAccountModal, setIsOpenUpdateAccountModal] = useState();

  const [isOpenCreateTransaction, setIsOpenCreateTransaction] = useState();
  const [isOpenUpdateTransaction, setIsOpeUpdateTransaction] = useState();

  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedTransaction, setSelectedTransaction] = useState();

  const openCreateAccountModal = () => {
    setIsOpenCreateAccountModal(true);
  };

  const closeCreateAccountModal = () => {
    setIsOpenCreateAccountModal(false);
  };

  const openUpdateAccountModal = (account) => {
    setIsOpenUpdateAccountModal(true);
    setSelectedAccount(account);
  };

  const closeUpdateAccountModal = () => {
    setIsOpenUpdateAccountModal(false);
    setSelectedAccount();
  };

  const openCreateTransaction = (account) => {
    setSelectedAccount(account);
    setIsOpenCreateTransaction(true);
  };

  const closeCreateTransaction = () => {
    setSelectedAccount();
    setIsOpenCreateTransaction(false);
  };

  const openUpdateTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsOpeUpdateTransaction(true);
  };

  const closeUpdateTransaction = () => {
    setSelectedTransaction();
    setIsOpeUpdateTransaction(false);
  };

  const handleCreateAccount = (values) => {
    createAccount(
      {
        id: id,
        balance: values.balance,
        hash: values.color,
        name: values.name,
        showNewPayment: values.showNewPayment,
        expenses: values.expenses,
      },
      {
        onSuccess: () => closeCreateAccountModal(),
      }
    );
  };

  const handleUpdateAccount = (values) => {
    updateAccount(
      {
        id: selectedAccount?._id,
        balance: values.balance,
        hash: values.color,
        name: values.name,
        showNewPayment: values.showNewPayment,
        expenses: values.expenses,
      },
      {
        onSuccess: () => closeUpdateAccountModal(),
      }
    );
  };

  const handleCreateTransaction = (values) => {
    createTransaction(
      {
        accountId: selectedAccount._id,
        amount: values.amount,
        date: values.date,
        description: values.description,
        name: values.name,
        transactionType: values.transactionType,
        type: values.type,
      },
      {
        onSuccess: () => closeCreateTransaction(),
      }
    );
  };

  const handleUpdateTransaction = (values) => {
    updateTransaction(
      {
        id: selectedTransaction?._id,
        amount: values.amount,
        date: values.date,
        description: values.description,
        name: values.name,
        transactionType: values.transactionType,
        type: values.type,
      },
      {
        onSuccess: () => closeUpdateTransaction(),
      }
    );
  };

  const columns = [
    {
      title: "Название счёта",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Баланс",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => `${balance} EUR`,
    },
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
      render: (_, render) => (
        <ColorPicker value={render.hash} disabled={true} />
      ),
    },
    {
      title: "showNewPayment",
      dataIndex: "showNewPayment",
      key: "showNewPayment",
      render: (_, render) => (
        <div>{render.showNewPayment ? <Tag>Yes</Tag> : <Tag>No</Tag>}</div>
      ),
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, render) => {
        return (
          <Flex gap={5}>
            <Button
              icon={<EditOutlined />}
              onClick={() => openUpdateAccountModal(render)}
            ></Button>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this account?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteAccount({
                  id: render._id,
                });
              }}
            >
              <Button icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  const expandedRowColumns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      titel: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Flex gap={5}>
            <Button
              icon={<EditOutlined />}
              onClick={() => openUpdateTransaction(record)}
            ></Button>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this transactions?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteTransaction({
                  id: record?._id,
                });
              }}
            >
              <Button icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 10 }}>
      <Modal
        open={isOpenCreateAccountModal}
        onCancel={closeCreateAccountModal}
        footer={null}
      >
        <CreateVubAccountForm onFinish={handleCreateAccount} />
      </Modal>

      <Modal
        open={isOpenUpdateAccountModal}
        onCancel={closeUpdateAccountModal}
        footer={null}
      >
        <UpdateVubAccountForm
          onFinish={handleUpdateAccount}
          account={selectedAccount}
        />
      </Modal>

      <Flex justify="end" style={{ padding: "5px 0" }}>
        <Button type="primary" onClick={openCreateAccountModal}>
          Добавить счет
        </Button>
      </Flex>

      <Table
        rowKey="_id"
        id="_id"
        columns={columns}
        dataSource={Vub}
        size="small"
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <Modal
                open={isOpenCreateTransaction}
                title="Transaction"
                onCancel={closeCreateTransaction}
                footer={null}
                centered
              >
                <CreateVubTransactionForm onFinish={handleCreateTransaction} />
              </Modal>

              <Modal
                open={isOpenUpdateTransaction}
                title="Transaction"
                onCancel={closeUpdateTransaction}
                footer={null}
                centered
              >
                <UpdateVubTransactionForm
                  transaction={selectedTransaction}
                  onFinish={handleUpdateTransaction}
                />
              </Modal>

              <Flex justify="space-between" align="center">
                <h3>Transactions</h3>
                <Button
                  type="primary"
                  onClick={() => openCreateTransaction(record)}
                >
                  Добавить
                </Button>
              </Flex>

              <Table
                columns={expandedRowColumns}
                dataSource={record?.transactions}
              />
            </div>
          ),
        }}
      />
    </div>
  );
};
