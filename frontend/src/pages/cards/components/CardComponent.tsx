import { Card } from "antd";
import { BASE_URL } from "../../../config";
import { CardInterface } from "../cards";
import useCardTypeStore from "../../../store/cardTypeStore";

const CardComponent = ({ card }: { card: CardInterface }) => {
    const { cardTypes } = useCardTypeStore();

    return (
        <Card
            key={card.id}
            hoverable
            style={{
                width: "240px",
            }}
            cover={<img alt={card.name} src={`${BASE_URL}/card_images/${card.image}`} />}
        >
            <Card.Meta title={card.name} description={card.author} />

            <p>{cardTypes?.find((cardType) => cardType.id == card.cardTypeId)?.typeDescription}</p>
        </Card>
    );
};

export default CardComponent;
