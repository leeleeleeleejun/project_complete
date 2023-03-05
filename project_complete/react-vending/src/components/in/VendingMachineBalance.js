import styled from 'styled-components';
//import EffectMenuFrame from '../common/EffectMenuFrame';

const VendingMachineBalanceTag = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  background-color: #eae8fe;
  width: 65%;
  padding: 6px 10px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const VendingMachineBalance = (props) => {
  return (
    <VendingMachineBalanceTag>
      {props.text1}
      <span>
        <span>{props.number}</span>
        {props.text2}
      </span>
    </VendingMachineBalanceTag>
  );
};

export default VendingMachineBalance;
