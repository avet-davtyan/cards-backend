import React, { Dispatch, SetStateAction } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCardTypeStore from "../../../store/cardTypeStore";
import api from "../../../http/base_api";
import useCardStore from "../../../store/cardStore";

interface CardFormValues {
    name: string;
    author: string;
    price: number;
    image: UploadFile[];
    cardTypeId: number;
}

const CardFormModal = ({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
    const [form] = Form.useForm<CardFormValues>();
    const { cardTypes } = useCardTypeStore();
    const { getCards } = useCardStore();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // Ensure the file is present in the file list
            if (values.image && values.image.length > 0) {
                const file = values.image[0].originFileObj;

                // Check if the file object is valid
                if (file) {
                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("author", values.author);
                    formData.append("price", values.price.toString());
                    formData.append("cardTypeId", values.cardTypeId.toString());
                    formData.append("image", file, file.name);

                    await api.post("cards", formData);
                    await getCards();
                } else {
                    console.error("File object is not available");
                }
            } else {
                console.error("No file selected");
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
            <Modal title="Create Card" visible={visible} onOk={handleOk} onCancel={handleCancel}>
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

export default CardFormModal;
