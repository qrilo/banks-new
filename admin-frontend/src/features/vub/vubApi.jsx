import api from "../../shared/api/api";

export const getVubAPI = async () => {
  try {
    const response = await api.get(`Vub`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createVubAPI = async ({
  fullname,
  email,
  phone,
  comment,
  pinLength,
  expenses,
  contact,
  code,
}) => {
  try {
    const response = await api.post(`Vub`, {
      fullname,
      email,
      phone,
      comment,
      pinLength,
      expenses,
      contact,
      code,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateVubAPI = async ({
  id,
  fullname,
  email,
  phone,
  comment,
  pinLength,
  expenses,
  contact,
  code,
}) => {
  try {
    const response = await api.put(`Vub/${id}`, {
      fullname,
      email,
      phone,
      comment,
      pinLength,
      expenses,
      contact,
      code,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteVubAPI = async ({ id }) => {
  try {
    const response = await api.delete(`Vub/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getVubAccountsAPI = async ({ id }) => {
  try {
    const response = await api.get(`Vub/${id}/accounts`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createVubAccountAPI = async ({
  id,
  name,
  balance,
  hash,
  showNewPayment,
  expenses,
}) => {
  try {
    const response = await api.post(`Vub/${id}/accounts`, {
      name,
      balance,
      hash,
      showNewPayment,
      expenses,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateVubAccountAPI = async ({
  id,
  name,
  balance,
  hash,
  showNewPayment,
  expenses,
}) => {
  try {
    const response = await api.put(`Vub/accounts/${id}`, {
      name,
      balance,
      hash,
      showNewPayment,
      expenses,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteVubAccountAPI = async ({ id }) => {
  try {
    const response = await api.delete(`Vub/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTransactionAPI = async ({
  accountId,
  name,
  amount,
  date,
  description,
  transactionType,
  type,
}) => {
  try {
    const response = await api.post(`Vub/accounts/${accountId}/transactions`, {
      name,
      amount,
      date,
      description,
      transactionType,
      type,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTransactionAPI = async ({
  id,
  name,
  amount,
  date,
  description,
  transactionType,
  type,
}) => {
  try {
    const response = await api.put(`Vub/transactions/${id}`, {
      name,
      amount,
      date,
      description,
      transactionType,
      type,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTransactionAPI = async ({ id }) => {
  try {
    const response = await api.delete(`Vub/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getNotificationAPI = async ({ id }) => {
  try {
    const response = await api.get(`vub/${id}/notifications`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createNotificationAPI = async ({
  id,
  name,
  description,
  date,
}) => {
  try {
    const response = await api.post(`vub/${id}/notifications`, {
      name,
      description,
      date,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateNotificationAPI = async ({
  transactionId,
  name,
  description,
  date,
}) => {
  try {
    const response = await api.put(`vub/notifications/${transactionId}`, {
      name,
      description,
      date,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteNotificationAPI = async ({ transactionId }) => {
  try {
    const response = await api.delete(`vub/notifications/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
