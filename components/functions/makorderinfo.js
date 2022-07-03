export const makorderinfo = (buyerData, data, totalSum) => {
  const UserName = `${buyerData.name} ${buyerData.surname}`;
  const orderNum = "order" + Math.ceil(Math.random() * 100000);
  const orderDatas = [orderNum, ...data];
  console.log(buyerData);
  const fullOrderData = {
    UserName: UserName,
    userinfo: buyerData,
    sumOrders: totalSum,
    orderNum: [orderDatas],
  };
  return fullOrderData;
};
