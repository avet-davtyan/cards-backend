import React, { Dispatch, SetStateAction } from "react";
import { Modal, Button } from "antd";
import useCardStore from "../../../store/cardStore";
import api from "../../../http/base_api";

interface DeleteCardModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    cardId: string; // ID of the card to be deleted
}

const DeleteCardModal = ({ visible, setVisible, cardId }: DeleteCardModalProps) => {
    const { getCards } = useCardStore();

    const handleOk = async () => {
        try {
            await api.delete(`cards/${cardId}`);
            await getCards();
            setVisible(false);
        } catch (error) {
            console.error("Failed to delete the card:", error);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                title="Delete Card"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                okText="Yes, delete it"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this card? This action cannot be undone.</p>
            </Modal>
        </>
    );
};

export default DeleteCardModal;
