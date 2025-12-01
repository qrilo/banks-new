import { Button, Flex, Modal, Popconfirm, Table } from "antd";
import { useCreateVub } from "../hooks/useCreateVub";
import { useVub } from "../hooks/useVub";
import { useUpdateVub } from "../hooks/useUpdateVub";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateVubForm } from "../forms/CreateVubForm";
import { UpdateVubForm } from "../forms/UpdateVubForm";
import { useDeleteVub } from "../hooks/useDeleteVub";
import { useNavigate } from "react-router-dom";

export const VubTab = () => {
  const navigate = useNavigate();

  const { data: csas } = useVub({
    enabled: true,
  });

  const { mutate: createCsas } = useCreateVub();
  const { mutate: updateCsas } = useUpdateVub();
  const { mutate: deleteCsas } = useDeleteVub();

  const [isOpenCreateCsasModal, setIsOpenCreateCsasModal] = useState();
  const [isOpenUpdateCsasModal, setIsOpenUpdateCsasModal] = useState();

  const [selectedVub, setSelectedVub] = useState();

  const openCreateCsasModal = () => {
    setIsOpenCreateCsasModal(true);
  };

  const closeCreateCsasModal = () => {
    setIsOpenCreateCsasModal(false);
  };

  const handleCreateCsas = (values) => {
    createCsas(
      {
        bank: values.bank,
        comment: values.comment,
        email: values.email,
        fullname: values.fullname,
        phone: values.phone,
        pinLength: values.pinLength,
        expenses: values.expenses,
        contact: values.contact,
      },
      {
        onSuccess: () => {
          closeCreateCsasModal();
        },
      }
    );
  };

  const openUpdateCsasModal = (csas) => {
    setSelectedVub(csas);
    setIsOpenUpdateCsasModal(true);
  };

  const closeUpdateCsasModal = () => {
    setSelectedVub();
    setIsOpenUpdateCsasModal(false);
  };

  const handleUpdateCsas = (values) => {
    updateCsas(
      {
        id: values.id,
        bank: values.bank,
        comment: values.comment,
        email: values.email,
        fullname: values.fullname,
        phone: values.phone,
        pinLength: values.pinLength,
        expenses: values.expenses,
        contact: values.contact,
      },
      {
        onSuccess: () => {
          closeUpdateCsasModal();
        },
      }
    );
  };

  const columns = [
    {
      title: "fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "pin Length",
      dataIndex: "pinLength",
      key: "pinLength",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, render) => {
        return (
          <Flex gap={5}>
            <Button
              onClick={() => navigate(`/vub/${render._id}/notifications`)}
            >
              Уведомления
            </Button>
            <Button onClick={() => navigate(`/vub/${render._id}/accounts`)}>
              Счета
            </Button>
            <Button
              onClick={() => openUpdateCsasModal(render)}
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this account?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteCsas({
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

  return (
    <div>
      <Modal
        open={isOpenCreateCsasModal}
        onCancel={closeCreateCsasModal}
        footer={null}
      >
        <CreateVubForm onFinish={handleCreateCsas} />
      </Modal>

      <Modal
        open={isOpenUpdateCsasModal}
        onCancel={closeUpdateCsasModal}
        footer={null}
      >
        <UpdateVubForm onFinish={handleUpdateCsas} vub={selectedVub} />
      </Modal>

      <div>
        <Flex justify="end" style={{ marginBottom: 8 }}>
          <Button type="primary" onClick={openCreateCsasModal}>
            Добавить
          </Button>
        </Flex>
        <Table dataSource={csas} columns={columns} size="small" />
      </div>
    </div>
  );
};
