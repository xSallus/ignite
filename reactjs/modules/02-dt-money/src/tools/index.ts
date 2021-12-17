function formatAmount(amount: string) {
  let value = amount.replace(/\D/g, "");
  
  switch (value.length) {
    case 4:
      value = value.replace(/^(\d{2})(\d{2})/, "$1,$2");
      break;
    case 5:
      value = value.replace(/^(\d{3})(\d{2})/, "$1,$2");
      break;
    case 6:
      value = value.replace(/^(\d{1})(\d{3})(\d{2})/, "$1.$2,$3");
      break;
    case 7:
      value = value.replace(/^(\d{2})(\d{3})(\d{2})/, "$1.$2,$3");
      break;
    case 8:
      value = value.replace(/^(\d{3})(\d{3})(\d{2})/, "$1.$2,$3");
      break;
    case 9:
      value = value.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3,$4");
      break;
    case 3:
      value = value.replace(/^(\d{1})(\d{2})/, "$1,$2");
      break;
    default:
      value = Number(value).toFixed(2).replace(/\D/g, "").replace(/^(\d{1})(\d{2})/, "$1,$2");
      break;
  }

  return `R$ ${value}`;
}

function formatDate(date: string) {
  let arrDate = date.split("T");

  return arrDate[0].split("-").reverse().join("/");
}

export { formatAmount, formatDate };
