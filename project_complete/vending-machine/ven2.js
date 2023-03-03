const changeButton = document.querySelector('.change-coin-button'); // 코인 변환 버튼
const moneyPullButton = document.querySelector('.money-pull-button'); // 현금 입금 버튼
const coinPullButton = document.querySelector('.coin-pull-button'); // 코인 입금 버튼
const returnMoneyButton = document.querySelector('.return-money'); // 거스름돈 반환 버튼
const returnCoinButton = document.querySelector('.return-coin'); // 코인 반환 버튼
const myMoneyValue = document.getElementById('my-money-value'); // 소지금
const myCoinValue = document.getElementById('my-coin-value'); // 소지코인
const getInputMoneyCoin = document.querySelector('.vending-machine-input'); // 자판기 입금할 금액
const machineBalanceMoney = document.querySelector(
  '.vending-machine-balance-money'
); // 자판기 입금되어 있는 금액(잔액)
const machineBalanceCoin = document.querySelector(
  '.vending-machine-balance-coin'
); // 자판기 입금되어 있는 금액(잔액)

// 코인변환 이벤트
changeButton.addEventListener('click', () => {
  const changeCoin = document.querySelector('.change-coin'); // 변환하고자 하는 코인 인풋태그
  if (myMoneyValue.textContent.includes(',')) {
    myMoneyValue.textContent = myMoneyValue.textContent.replace(/,/g, '');
  }
  if (
    myMoneyValue.textContent > changeCoin.value * 900 &&
    changeCoin.value > 0
  ) {
    myCoinValue.textContent =
      Number(myCoinValue.textContent) + Number(changeCoin.value);
    myMoneyValue.textContent -= changeCoin.value * 900;
    myMoneyValue.textContent = myMoneyValue.textContent.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );
    changeCoin.value = '';
  } else if (changeCoin.value <= 0) alert('다시 입력해주세요');
  else
    alert(
      `${changeCoin.value * 900 - myMoneyValue.textContent}원 이 부족합니다`
    );
});

// 입금 이벤트 변수
const inputEvent = (inputTarget, machineBalance) => {
  if (inputTarget.textContent.includes(',')) {
    inputTarget.textContent = inputTarget.textContent.replace(/,/g, '');
  }
  if (machineBalance.textContent.includes(',')) {
    machineBalance.textContent = machineBalance.textContent.replace(/,/g, '');
  }
  if (
    Number(inputTarget.textContent) >= getInputMoneyCoin.value &&
    getInputMoneyCoin.value > 0
  ) {
    (() => {
      inputTarget.textContent -= getInputMoneyCoin.value;
      return inputTarget;
    })();
    (() => {
      machineBalance.textContent =
        Number(machineBalance.textContent) + Number(getInputMoneyCoin.value);
      return machineBalance;
    })();
  } else if (getInputMoneyCoin.value <= 0) alert('다시 입력해주세요');
  else
    alert(`${getInputMoneyCoin.value - inputTarget.textContent} 이 부족합니다`);
  inputTarget.textContent = inputTarget.textContent.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );
  machineBalance.textContent = machineBalance.textContent.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );
  getInputMoneyCoin.value = '';
};

// 현금 입금 이벤트
moneyPullButton.addEventListener('click', () => {
  inputEvent(myMoneyValue, machineBalanceMoney);
});

// 코인 입금 이벤트
coinPullButton.addEventListener('click', () => {
  inputEvent(myCoinValue, machineBalanceCoin);
});

// 반환 이벤트 변수
const returnBalance = (returnTarget, my) => {
  if (returnTarget.textContent.includes(',')) {
    returnTarget.textContent = returnTarget.textContent.replace(/,/g, '');
  }
  if (my.textContent.includes(',')) {
    my.textContent = my.textContent.replace(/,/g, '');
  }
  my.textContent = Number(returnTarget.textContent) + Number(my.textContent);
  my.textContent = my.textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  returnTarget.textContent = 0;
};

// 현금반환 이벤트
returnMoneyButton.addEventListener('click', () => {
  returnBalance(machineBalanceMoney, myMoneyValue);
});

// 코인반환 이벤트
returnCoinButton.addEventListener('click', () => {
  returnBalance(machineBalanceCoin, myCoinValue);
});

const itemEvent = (() => {
  const menuList = document.querySelector('.menu-list'); // 자판기 메뉴판
  const item = document.querySelectorAll('.menu-list-item'); // 자판기 아이템(음료, 음식)
  const getItemList = document.querySelector('.get-item-list'); // 선택한 아이템 리스트
  const machineBalanceMoney = document.querySelector(
    '.vending-machine-balance-money'
  ); // 자판기 입금되어 있는 금액(잔액)
  const machineBalanceCoin = document.querySelector(
    '.vending-machine-balance-coin'
  ); // 자판기 입금되어 있는 코인(잔액)
  const basketTotal = document.querySelector('.basket-total-money'); // 자판기 아이템 총액
  const basketTotalSale = document.querySelector('.basket-total-sale-money'); //자판기 할인된 금액
  const getButton = document.querySelector('.get-button'); // 아이템획득 버튼
  const myColaList = document.querySelector('.my-cola-list'); // 획득한 아이템 리스트
  const totalMoney = document.querySelector('.total-money'); // 획득한 아이템 총액

  const itemListobj = {}; //Createitem에 사용되는 객체
  class Createitem {
    constructor(_price) {
      this.spanElement = document.createElement('span');
      this.useCoin = 0;
      this.price = _price;
    }
    pushItem(eCurrentTarget) {
      const liElement = document.createElement('li');
      const divElement = document.createElement('div');
      const divElement2 = document.createElement('div');
      const imgElement = document.createElement('img');
      const strongElement = document.createElement('strong');
      const cancelButtonElement = document.createElement('button');
      const price = Number(
        eCurrentTarget.children[2].textContent.replace(/원|,/g, '')
      );
      imgElement.setAttribute(
        'src',
        eCurrentTarget.firstElementChild.getAttribute('src')
      );
      this.spanElement.textContent = 1;
      this.spanElement.setAttribute('class', 'count');
      cancelButtonElement.textContent = '취소';
      strongElement.textContent = eCurrentTarget.children[1].textContent;
      liElement.setAttribute('class', 'get-item');
      liElement.setAttribute('id', strongElement.textContent);
      liElement.setAttribute('draggable', 'true');
      divElement.append(imgElement, strongElement);
      divElement2.append(cancelButtonElement, this.spanElement);
      liElement.append(divElement, divElement2);
      getItemList.appendChild(liElement);

      //아이템 선택 취소 이벤트
      cancelButtonElement.addEventListener('click', () => {
        if (this.spanElement.textContent > 1) {
          --this.spanElement.textContent;
        } else {
          delete itemListobj[strongElement.textContent];
          liElement.remove();
        }
        // 코인을 소모한 아이템일 경우 코인 반환 - 코인 우선
        if (this.useCoin >= price / 1000) {
          machineBalanceCoin.textContent =
            Number(machineBalanceCoin.textContent) + price / 1000;
          this.useCoin -= price / 1000;
          // 현금 또는 (현금+코인) 을 소모한 아이템일 경우
        } else {
          machineBalanceCoin.textContent =
            Number(machineBalanceCoin.textContent) + Number(this.useCoin);
          machineBalanceMoney.textContent =
            machineBalanceMoney.textContent.replace(/,/g, '');
          machineBalanceMoney.textContent =
            Number(machineBalanceMoney.textContent) +
            (price - this.useCoin * 1000);
          machineBalanceMoney.textContent =
            machineBalanceMoney.textContent.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ','
            );
          this.useCoin = 0;
        }
        basketTotalFuction();
      });

      // 수량 선택 시 키보드 수정 가능 이벤트
      const count = document.querySelectorAll('.count');
      const span = this.spanElement;
      count.forEach((editItem) => {
        editItem.addEventListener('click', editCountwrap);
      });
      function editCountwrap(e) {
        editCount(e, span);
      }
      function editCount(e, spanElement) {
        const eventTag = e.currentTarget;
        const elementTagName = eventTag.tagName;
        // 변경 전 수량
        let existingValue = spanElement.textContent;
        if (elementTagName === 'SPAN') {
          // edit-mode
          const editInput = document.createElement('input');
          editInput.setAttribute('type', 'number');
          editInput.value = eventTag.innerText;
          editInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') editCount(e, span);
          });

          editInput.addEventListener('focusout', function (e) {
            // focusout과 keydown 이벤트 충돌 방지
            if (e.sourceCapabilities !== null) editCount(e, span);
          });
          eventTag.replaceWith(editInput);
        } else {
          // save
          spanElement.textContent = eventTag.value;
          eventTag.replaceWith(spanElement);
          // 수량 증가 시
          if (existingValue < spanElement.textContent) {
            if (spanElement.textContent > 0) {
              if (
                machineBalanceCoin.textContent * 1000 >=
                itemListobj[strongElement.textContent].price *
                  (spanElement.textContent - existingValue)
              ) {
                machineBalanceCoin.textContent -=
                  (itemListobj[strongElement.textContent].price *
                    (spanElement.textContent - existingValue)) /
                  1000;
                for (
                  let i = 0;
                  i < spanElement.textContent - existingValue;
                  i++
                ) {
                  itemListobj[strongElement.textContent].useCoin++;
                }
              } else {
                if (machineBalanceMoney.textContent.includes(',')) {
                  machineBalanceMoney.textContent =
                    machineBalanceMoney.textContent.replace(/,/g, '');
                }
                if (
                  machineBalanceMoney.textContent >=
                  itemListobj[strongElement.textContent].price *
                    (spanElement.textContent - existingValue)
                ) {
                  machineBalanceMoney.textContent -=
                    itemListobj[strongElement.textContent].price *
                    (spanElement.textContent - existingValue);
                } else {
                  alert(
                    `${
                      itemListobj[strongElement.textContent].price *
                        (spanElement.textContent - existingValue) -
                      machineBalanceMoney.textContent
                    }원이 부족합니다`
                  );
                  spanElement.textContent = existingValue;
                }
              }
            }
          } else if (spanElement.textContent < 0) {
            alert('다시 입력해주세요');
            spanElement.textContent = existingValue;
          }
          // 수량 감소 시
          else {
            for (let i = 0; i < existingValue - spanElement.textContent; i++) {
              if (
                itemListobj[strongElement.textContent].useCoin >=
                itemListobj[strongElement.textContent].price / 1000
              ) {
                machineBalanceCoin.textContent =
                  Number(machineBalanceCoin.textContent) +
                  itemListobj[strongElement.textContent].price / 1000;
                itemListobj[strongElement.textContent].useCoin -=
                  itemListobj[strongElement.textContent].price / 1000;
              } else {
                machineBalanceCoin.textContent =
                  Number(machineBalanceCoin.textContent) +
                  Number(itemListobj[strongElement.textContent].useCoin);
                machineBalanceMoney.textContent =
                  machineBalanceMoney.textContent.replace(/,/g, '');
                machineBalanceMoney.textContent =
                  Number(machineBalanceMoney.textContent) +
                  (price -
                    itemListobj[strongElement.textContent].useCoin * 1000);
                machineBalanceMoney.textContent =
                  machineBalanceMoney.textContent.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ','
                  );
                itemListobj[strongElement.textContent].useCoin = 0;
              }
            }
          }
          if (Number(spanElement.textContent) === 0) {
            delete itemListobj[strongElement.textContent];
            liElement.remove();
          }
          machineBalanceMoney.textContent =
            machineBalanceMoney.textContent.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ','
            );
          basketTotalFuction();
        }
      }

      //취소 드래그 이벤트
      liElement.addEventListener('click', (e) => {
        //다중선택(shift)
        if (e.shiftKey) {
          e.currentTarget.classList.add('shiftKey');
          cancleActiveShiftKey.push(e.currentTarget);
        }
      });
      liElement.addEventListener('dragstart', (e) => {
        if (cancleActiveShiftKey.includes(liElement)) {
          checkShiftKey = true;
        }

        dragAndDropEventWrap.dragstart(e);
      });

      menuList.addEventListener('dragover', (e) => {
        dragAndDropEventWrap.dragover(e);
      });

      menuList.addEventListener('drop', (e) => {
        if (checkShiftKey) {
          [...getItemList.children].forEach((shiftKeyItem) => {
            if (cancleActiveShiftKey.includes(shiftKeyItem)) {
              for (
                let i = 0;
                i < Number(shiftKeyItem.lastChild.lastChild.textContent);
                i++
              ) {
                // 코인을 소모한 아이템일 경우 코인 반환 - 코인 우선
                if (
                  itemListobj[shiftKeyItem.firstChild.lastChild.textContent]
                    .useCoin >=
                  itemListobj[shiftKeyItem.firstChild.lastChild.textContent]
                    .price /
                    1000
                ) {
                  machineBalanceCoin.textContent =
                    Number(machineBalanceCoin.textContent) +
                    itemListobj[shiftKeyItem.firstChild.lastChild.textContent]
                      .price /
                      1000;
                  itemListobj[
                    shiftKeyItem.firstChild.lastChild.textContent
                  ].useCoin -=
                    itemListobj[shiftKeyItem.firstChild.lastChild.textContent]
                      .price / 1000;
                  // 현금을 소모한 아이템일 경우 현금 반환
                } else {
                  machineBalanceCoin.textContent =
                    Number(machineBalanceCoin.textContent) +
                    Number(
                      itemListobj[shiftKeyItem.firstChild.lastChild.textContent]
                        .useCoin
                    );
                  machineBalanceMoney.textContent =
                    machineBalanceMoney.textContent.replace(/,/g, '');
                  machineBalanceMoney.textContent =
                    Number(machineBalanceMoney.textContent) +
                    (itemListobj[shiftKeyItem.firstChild.lastChild.textContent]
                      .price -
                      itemListobj[shiftKeyItem.firstChild.lastChild.textContent]
                        .useCoin *
                        1000);
                  machineBalanceMoney.textContent =
                    machineBalanceMoney.textContent.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ','
                    );
                  itemListobj[
                    shiftKeyItem.firstChild.lastChild.textContent
                  ].useCoin = 0;
                }
              }
              shiftKeyItem.remove();
              delete itemListobj[shiftKeyItem.firstChild.lastChild.textContent];
            }
          });
          cancleActiveShiftKey = [];
        }
        checkShiftKey = false;
        basketTotalFuction();
      });
    }
  }

  // 드래그함수모음
  // 이벤트발생타겟(e.currentTarget) 변수
  let picked = null;

  const dragAndDropEventWrap = {
    id: null,

    price: null,

    dragstart(e) {
      picked = e.currentTarget;
    },

    dragover(e) {
      e.preventDefault();
    },

    addDrop() {
      if (checkShiftKey) {
        checkShiftKey = false;
        addActiveShiftKey.forEach((shiftKeyItem) => {
          dragAndDropEventWrap.id = shiftKeyItem.children[1].textContent;
          dragAndDropEventWrap.price = Number(
            shiftKeyItem.children[2].textContent.replace(/원|,/g, '')
          );
          pushEventWrap(
            shiftKeyItem,
            dragAndDropEventWrap.id,
            dragAndDropEventWrap.price
          );
          shiftKeyItem.classList.remove('shiftKey');
          addActiveShiftKey = [];
        });
      } else {
        dragAndDropEventWrap.id = picked.children[1].textContent;
        dragAndDropEventWrap.price = Number(
          picked.children[2].textContent.replace(/원|,/g, '')
        );
        pushEventWrap(
          picked,
          dragAndDropEventWrap.id,
          dragAndDropEventWrap.price
        );
      }
      picked = null;
    },
  };
  let cancleActiveShiftKey = [];
  let addActiveShiftKey = [];
  let checkShiftKey = false;

  //아이템에 pushItem 이벤트 할당
  item.forEach((item) => {
    item.addEventListener('click', (e) => {
      //다중선택(shift)
      if (e.shiftKey) {
        e.currentTarget.classList.add('shiftKey');
        addActiveShiftKey.push(item);
      } else {
        const id = e.currentTarget.children[1].textContent;
        const price = Number(
          e.currentTarget.children[2].textContent.replace(/원|,/g, '')
        );
        pushEventWrap(e.currentTarget, id, price);
      }
    });
    item.addEventListener('keypress', (e) => {
      if (e.keyCode === 100) {
        addActiveShiftKey.forEach((shiftKeyItem) => {
          shiftKeyItem.classList.remove('shiftKey');
        });
        addActiveShiftKey = [];
      }
    });

    // 드래그 시작 이벤트
    item.addEventListener('dragstart', (e) => {
      if (addActiveShiftKey.includes(item)) {
        checkShiftKey = true;
      }
      dragAndDropEventWrap.dragstart(e);
    });
  });

  // 수량 추가 드래그 함수
  getItemList.addEventListener('dragover', (e) => {
    dragAndDropEventWrap.dragover(e);
  });

  getItemList.addEventListener('drop', dragAndDropEventWrap.addDrop);

  // 장바구니 추가 이벤트
  const pushEventWrap = (e, id, price) => {
    const push = (e) => {
      if (!itemListobj[id]) {
        itemListobj[id] = new Createitem(price);
        itemListobj[id].pushItem(e);
      } else itemListobj[id].spanElement.textContent++;
    };

    if (machineBalanceCoin.textContent >= price / 1000) {
      machineBalanceCoin.textContent -= price / 1000;
      push(e);
      itemListobj[id].useCoin += price / 1000;
    } else {
      if (machineBalanceMoney.textContent.includes(',')) {
        machineBalanceMoney.textContent =
          machineBalanceMoney.textContent.replace(/,/g, '');
      }
      if (
        Number(machineBalanceMoney.textContent) +
          machineBalanceCoin.textContent * 1000 >=
        price
      ) {
        machineBalanceMoney.textContent -=
          price - machineBalanceCoin.textContent * 1000;
        push(e);
        if (machineBalanceCoin.textContent >= 1) {
          itemListobj[id].useCoin = machineBalanceCoin.textContent;
        }
        machineBalanceCoin.textContent = 0;
      } else
        alert(
          `${
            price -
            (Number(machineBalanceMoney.textContent) +
              machineBalanceCoin.textContent * 1000)
          }원이 부족합니다`
        );
    }

    machineBalanceMoney.textContent = machineBalanceMoney.textContent.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );
    basketTotalFuction();
  };

  // 획득 이벤트
  getButton.addEventListener('click', () => {
    [...getItemList.children].forEach((item) => {
      delete itemListobj[`${item.getAttribute('id')}`];
      // 취소버튼 삭제
      item.lastElementChild.firstElementChild.remove();
      // 아이템 수량 수정 이벤트 삭제
      // 큰페이지에서 사용할 경우 느려질 수 있음
      item.lastElementChild.lastElementChild.outerHTML =
        item.lastElementChild.lastElementChild.outerHTML;
      if ([...myColaList.children].length > 0) {
        for (let i = 0; [...myColaList.children].length > i; i++) {
          // myColaList에 기존에 아이템항목이 존재할 때 항목추가가 아닌 수량 증가
          if (
            [...myColaList.children][i].getAttribute('id') ===
            item.getAttribute('id')
          ) {
            [...myColaList.children][
              i
            ].lastElementChild.lastElementChild.textContent =
              Number(
                [...myColaList.children][i].lastElementChild.lastElementChild
                  .textContent
              ) + Number(item.lastElementChild.lastElementChild.textContent);
            item.remove();
          }
          if ([...getItemList.children].length === 0) break;
        }
      }
    });
    myColaList.append(...getItemList.children);
    basketTotal.textContent = basketTotal.textContent.replace(/,/g, '');
    totalMoney.textContent = totalMoney.textContent.replace(/,/g, '');
    totalMoney.textContent =
      Number(totalMoney.textContent) + Number(basketTotal.textContent);
    totalMoney.textContent = totalMoney.textContent.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );
    if (Number(basketTotalSale.textContent.replace(/,/g, '')) > 0) {
      machineBalanceMoney.textContent = machineBalanceMoney.textContent.replace(
        /,/g,
        ''
      );
      basketTotalSale.textContent = basketTotalSale.textContent.replace(
        /,/g,
        ''
      );
      machineBalanceMoney.textContent =
        Number(machineBalanceMoney.textContent) +
        Number(basketTotalSale.textContent);
      machineBalanceMoney.textContent = machineBalanceMoney.textContent.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      );
    }
    basketTotal.textContent = 0;
    basketTotalSale.textContent = 0;
  });

  // 자판기 장바구니 총액 함수
  const basketTotalFuction = () => {
    basketTotal.textContent = 0;

    [...getItemList.children].forEach((i) => {
      basketTotal.textContent =
        Number(basketTotal.textContent) +
        itemListobj[i.firstElementChild.lastElementChild.textContent].price *
          i.lastElementChild.lastElementChild.textContent;
    });
    if (Number(basketTotal.textContent) >= 10000) {
      basketTotalSale.textContent =
        (Number(basketTotal.textContent) * 15) / 100;
      basketTotal.textContent -= (Number(basketTotal.textContent) * 15) / 100;
      basketTotalSale.textContent = basketTotalSale.textContent.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      );
    } else {
      basketTotalSale.textContent = 0;
    }
    basketTotal.textContent = basketTotal.textContent.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );
  };

  const tsxtCompare = () => {
    return function (a, b) {
      // 프로퍼티 값이 문자열인 경우, - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
      return a.getAttribute('id') > b.getAttribute('id')
        ? 1
        : a.getAttribute('id') < b.getAttribute('id')
        ? -1
        : 0;
    };
  };

  const countCompare = () => {
    return function (a, b) {
      // 프로퍼티 값이 문자열인 경우, - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
      return Number(a.lastChild.firstChild.textContent) <
        Number(b.lastChild.firstChild.textContent)
        ? 1
        : Number(a.lastChild.firstChild.textContent) >
          Number(b.lastChild.firstChild.textContent)
        ? -1
        : 0;
    };
  };

  // 획득한 아이템 정렬
  let myColaListItem = null;
  const textSort = document.querySelector('#text-sort');
  const countSort = document.querySelector('#count-sort');
  const customSort = document.querySelector('#custom-sort');

  textSort.addEventListener('click', () => {
    myColaListItem = [...myColaList.children];
    myColaListItem.sort(tsxtCompare());
    myColaListItem.forEach((i) => {
      myColaList.appendChild(i);
    });
  });

  countSort.addEventListener('click', () => {
    myColaListItem = [...myColaList.children];
    myColaListItem.sort(countCompare());
    myColaListItem.forEach((i) => {
      myColaList.appendChild(i);
    });
  });

  let customSortButtonActiveChecking = true;
  customSort.addEventListener('click', () => {
    if (customSortButtonActiveChecking) {
      customSort.classList.add('shiftKey');

      [...myColaList.children].forEach((i) => {
        i.setAttribute('draggable', 'true');
        i.addEventListener('dragstart', (e) => {
          i.classList.add('dragging');
        });

        i.addEventListener('dragover', (e) => {
          e.preventDefault();
        });

        i.addEventListener('dragend', () => {
          i.classList.remove('dragging');
        });
      });

      myColaList.addEventListener('drop', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(myColaList, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement === undefined) {
          myColaList.appendChild(draggable);
        } else {
          myColaList.insertBefore(draggable, afterElement);
        }
      });
    } else {
      customSort.classList.remove('shiftKey');
      [...myColaList.children].forEach((i) => {
        i.setAttribute('draggable', 'false');
      });
    }
    customSortButtonActiveChecking = !customSortButtonActiveChecking;
  });

  //  커스텀정렬에 사용된 함수 (들어갈 자리 찾기)
  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll('.get-item:not(.dragging)'),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
})();
