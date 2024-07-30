import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCardTypeStore from "../../../store/cardTypeStore";
import api from "../../../http/base_api";
import useCardStore, { Card } from "../../../store/cardStore";

interface CardFormValues {
    name: string;
    author: string;
    price: number;
    image: UploadFile[];
    cardTypeId: number;
}

interface EditCardModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    card: Card; // ID of the card being edited
}

const EditCardModal = ({ visible, setVisible, card }: EditCardModalProps) => {
    const [form] = Form.useForm<CardFormValues>();
    const { cardTypes } = useCardTypeStore();
    const { getCards } = useCardStore();

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                name: card.name,
                author: card.author,
                price: card.price,
                cardTypeId: card.cardTypeId,
                image: card.image ? [{ url: card.image, name: card.image, uid: "-1" }] : [],
            });
        }
    }, [visible, card]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (values.image && values.image.length > 0) {
                const file = values.image[0].originFileObj;

                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("author", values.author);
                formData.append("price", values.price.toString());
                formData.append("cardTypeId", values.cardTypeId.toString());
                if (file) {
                    formData.append("image", file, file.name);
                }

                await api.patch(`cards/${card.id}`, formData);
                await getCards();
            } else {
                console.error("No file selected or file object is not available");
            }

            setVisible(false);
            form.resetFields();
        } catch (info) {
            console.log("Validate Failed:", info);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal title="Edit Card" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical" initialValues={{ price: 0 }}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="author"
                        label="Author"
                        rules={[{ required: true, message: "Please enter the author" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, type: "number", message: "Please enter a valid price" }]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true, message: "Please upload an image" }]}
                    >
                        <Upload
                            beforeUpload={() => false} // Prevent automatic upload
                            accept="image/*"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="cardTypeId"
                        label="Card Type"
                        rules={[{ required: true, message: "Please select a card type" }]}
                    >
                        <Select placeholder="Select a card type">
                            {cardTypes &&
                                cardTypes.map((type) => (
                                    <Select.Option key={type.id} value={type.id}>
                                        {type.typeDescription}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditCardModal;
