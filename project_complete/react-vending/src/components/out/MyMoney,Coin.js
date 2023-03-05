import styled from 'styled-components';

const MyMoneyTag = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  background-color: #eae8fe;
  margin-top: -22px;
  padding: 6px 10px;
  border-radius: 5px;
  font-weight: 500;
  margin-top: ${(props) => !props.className || '10px'};
`;

const MyMoney = (props) => {
  return (
    <MyMoneyTag className={props.className}>
      {props.text1}
      <span>
        <span>{props.number}</span>
        {props.text2}
      </span>
    </MyMoneyTag>
  );
};

export default MyMoney;
