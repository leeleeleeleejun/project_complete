import ListFrame from '../common/ListFrame';
import ItemInBasket from './ItemInBasket';

const BasketList = (props) => {
  return (
    <ListFrame>
      {props.basketListItem.map((i) => (
        <ItemInBasket
          key={i.id}
          name={i.name}
          img={i.img}
          count={props.basketListCount[i.name]}
          cancelButtonHandle={() => {
            props.cancelButtonHandle(i);
          }}
          isBsket
        ></ItemInBasket>
      ))}
    </ListFrame>
  );
};

export default BasketList;
