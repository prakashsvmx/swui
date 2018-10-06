import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import {EntityTypes} from "../../utils/AppConstants";

const RelatedList = ({data: relatedList, type, title}) => {

    let typeIdentity = type;
    if(type=== EntityTypes.PEOPLE)
    {
        typeIdentity='characters';
    }
    return (
        <Card className={`RelatedList ${type}`}>
            <CardBody className="EntityRefCard">
                <CardTitle>{title}</CardTitle>
                {relatedList.map((relatedItem) => (
                    <Link to={`/${type}/${relatedItem.id}`}>
                        <Avatar name={relatedItem.name}
                                key={relatedItem.id}
                                round={true}
                                maxInitials={3}
                                size="40"
                                className={`RelatedListAvatar ${type}`}
                                src={`https://starwars-visualguide.com/assets/img/${typeIdentity}/${relatedItem.id}.jpg`}
                        />
                    </Link>
                ))}
            </CardBody>
        </Card>
    );
}


export default RelatedList;
