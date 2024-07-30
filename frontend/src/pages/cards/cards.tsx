import { useEffect, useState } from "react";
import api from "../../http/base_api";
import { BASE_URL } from "../../config";
import { Button, Card } from "antd";
import CardComponent from "./components/CardComponent";
import CardFormModal from "./components/CardModal";
import useCardStore from "../../store/cardStore";
import EditCardModal from "./components/EditCardModal";
import DeleteCardModal from "./components/DeleteCardModal";

export interface CardInterface {
    id: string;
    name: string;
    author: string;
    image: string;
    price: number;
    cardTypeId: number;
}

const Cards = () => {
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [deleteModalVisivle, setDeleteModalVisible] = useState<boolean>(false);
    const [editCard, setEditCard] = useState<CardInterface | null>(null);
    const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
    const { cards } = useCardStore();

    return (
        <>
            {cards ? (
                <div className="w-full p-10 flex items-center flex-col gap-10">
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            setCreateModalVisible(true);
                        }}
                    >
                        Create Card
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 w-max">
                        {cards.map((card) => (
                            <>
                                <div className="gap-2 flex flex-col">
                                    <CardComponent card={card} />
                                    <div className="flex w-full gap-2">
                                        <Button
                                            className="w-full"
                                            onClick={() => {
                                                setEditCard(card);
                                                setEditModalVisible(true);
                                            }}
                                        >
                                            edit
                                        </Button>
                                        <Button
                                            className="w-full"
                                            danger
                                            onClick={() => {
                                                setDeleteCardId(card.id);
                                                setDeleteModalVisible(true);
                                            }}
                                        >
                                            delete
                                        </Button>
                                    </div>
                                </div>
                                {/* <div>
                                    <Button
                                        onClick={() => {
                                            setEditCard(card);
                                            setEditModalVisible(true);
                                        }}
                                    >
                                        edit
                                    </Button>
                                </div> */}
                            </>
                        ))}
                    </div>
                </div>
            ) : (
                <h2>no no no</h2>
            )}
            <CardFormModal visible={createModalVisible} setVisible={setCreateModalVisible} />
            {editCard && <EditCardModal visible={editModalVisible} setVisible={setEditModalVisible} card={editCard} />}
            {deleteCardId && (
                <DeleteCardModal
                    visible={deleteModalVisivle}
                    setVisible={setDeleteModalVisible}
                    cardId={deleteCardId}
                />
            )}
        </>
    );
};

export default Cards;
