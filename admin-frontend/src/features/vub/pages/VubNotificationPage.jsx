import { useParams } from "react-router-dom";
import { useVubNotifications } from "../hooks/useVubNotifications";
import { useState } from "react";
import { useCreateVubNotification } from "../hooks/useCreateVubNotification";
import { useUpdateVubNotificaion } from "../hooks/useUpdateVubNotificaion";
import { useDeleteVubNotification } from "../hooks/useDeleteVubNotification";
import { Button, Flex, Modal, Popconfirm, Table } from "antd";
import { CreateVubNotificationForm } from "../forms/CreateVubNotificationForm";
import { UpdateVubNotificationForm } from "../forms/UpdateVubNotificationForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const VubNotificationPage = () => {
  const { id } = useParams();

  const { data: notifications, isPending: isLoadingNotifications } =
    useVubNotifications({
      id: id,
      enabled: true,
    });

  const [isOpenCreateNotificationModal, setIsOpenCreateNotificationModal] =
    useState(false);

  const [isOpenUpdateNotificationModal, setIsOpenUpdateNotificationModal] =
    useState(false);
  const [selectedNotification, setSelectedNotification] = useState();

  const { mutate: createNotification } = useCreateVubNotification();
  const { mutate: updateNotification } = useUpdateVubNotificaion();
  const { mutate: deleteNotification } = useDeleteVubNotification();

  const openCreateNotificationModal = () => {
    setIsOpenCreateNotificationModal(true);
  };

  const closeCreateNotificationModal = () => {
    setIsOpenCreateNotificationModal(false);
  };

  const openUpdateNotificationModal = (notification) => {
    setSelectedNotification(notification);
    setIsOpenUpdateNotificationModal(true);
  };

  const closeUpdateNotificationModal = () => {
    setSelectedNotification();
    setIsOpenUpdateNotificationModal(false);
  };

  const handleCreateNotification = (values) => {
    createNotification(
      {
        id: id,
        date: values.date,
        description: values.description,
        name: values.name,
      },
      {
        onSuccess: () => closeCreateNotificationModal(),
      }
    );
  };

  const handleUpdateNotification = (values) => {
    updateNotification(
      {
        transactionId: selectedNotification._id,
        date: values.date,
        description: values.description,
        name: values.name,
      },
      {
        onSuccess: () => closeUpdateNotificationModal(),
      }
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleString("ru-RU"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Flex gap={5}>
          <Button
            onClick={() => openUpdateNotificationModal(record)}
            icon={<EditOutlined />}
          ></Button>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this account?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteNotification({
                transactionId: record._id,
              });
            }}
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <div style={{ padding: "5px" }}>
      <Flex justify="end">
        <Button type="primary" onClick={openCreateNotificationModal}>
          Добавить
        </Button>
      </Flex>

      <Modal
        open={isOpenCreateNotificationModal}
        onCancel={closeCreateNotificationModal}
        footer={null}
      >
        <CreateVubNotificationForm onFinish={handleCreateNotification} />
      </Modal>

      <Modal
        open={isOpenUpdateNotificationModal}
        onCancel={closeUpdateNotificationModal}
        footer={null}
      >
        <UpdateVubNotificationForm
          onFinish={handleUpdateNotification}
          notification={selectedNotification}
        />
      </Modal>

      <div style={{ padding: "10px 5px" }}>
        <h3>Notifications:</h3>
        <Table
          loading={isLoadingNotifications}
          columns={columns}
          dataSource={notifications}
          rowKey="_id"
          size="small"
          pagination={false}
        />
      </div>
    </div>
  );
};
