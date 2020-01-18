import React, { useRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';

import { Container, Modal } from './styles';

export default function AnswerModal({
  order_id,
  visible,
  hide,
  handleOrderChange,
}) {
  const schema = Yup.object().shape({
    answer: Yup.string().required('An answer is required'),
  });

  const [studentQuestion, setStudentQuestion] = useState('');

  const ref = useRef();

  useEffect(() => {
    async function getQuestionInfo() {
      if (visible) {
        const response = await api.get(`answer/${order_id}`);
        const { question } = response.data;
        setStudentQuestion(question);
      }
    }
    getQuestionInfo();
  }, [order_id, visible]);

  async function handleSubmit({ answer }) {
    try {
      await api.put(`help-orders/${order_id}/answer`, {
        answer,
      });
      setStudentQuestion('');
      handleOrderChange(order_id);
      hide();
      toast.success('Reply sent with success.');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      hide();
    }
  }

  return (
    <Container visible={visible} ref={ref} onClick={handleOverlayClick}>
      <Modal visibleEffect>
        <strong>Student question:</strong>
        <p>{studentQuestion}</p>
        <Form onSubmit={handleSubmit} schema={schema}>
          <strong>Asnwer:</strong>
          <Input
            name="answer"
            placeholder="Your answer"
            multiline
            type="text"
          />
          <button type="submit">Reply</button>
        </Form>
      </Modal>
    </Container>
  );
}
