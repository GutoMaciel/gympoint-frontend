import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';
import DefaultTable from '~/components/DefaultTable';
import Modal from '~/components/Modal';

export default function HelpOrderList() {
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get(`students/help-orders`, {
          // params: { page },
        });

        const data = response.data.rows.map(order => ({
          ...order,
          // formattedDate: format(
          //   parseISO(order.created_at),
          //   "d 'de' MMMM 'de ' Y",
          //   { locale: pt }
          // ),
        }));
        // setTotalPages(Math.ceil(response.data.count / 10, 1));
        setOrders(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao obter os pedidos de auxílio');
      }
    }
    getOrders();
  }, []);

  function handleOrderChange(id) {
    const updateOrders = orders.filter(ord => ord.id !== id);
    setOrders(updateOrders);
  }

  return (
    <>
      <Toolbar>
        <div>
          <span>Help Orders</span>
        </div>
      </Toolbar>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>STUDENT</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.student.name}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderId(order.id);
                      setVisible(true);
                    }}
                  >
                    Answer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
      <Modal
        visible={visible}
        order_id={orderId}
        hide={() => setVisible(false)}
        handleOrderChange={handleOrderChange}
      />
    </>
  );
}
