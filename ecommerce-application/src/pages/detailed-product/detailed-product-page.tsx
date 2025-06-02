import { useParams } from 'react-router-dom';
import type { ReactElement } from 'react';

const DetailedProductpage = (): ReactElement => {
    const { itemID } = useParams();
    return <div>item page {itemID}</div>;
};

export default DetailedProductpage;