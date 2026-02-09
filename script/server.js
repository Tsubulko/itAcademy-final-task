const DATA = [
    {
        userId: "1",
        userName: "Ivan",
        password: "12345",
        games: "10",
        wins: "1",
    },
    {
        userId: "2",
        userName: "Pavel",
        password: "67890",
        games: "17",
        wins: "16",
    },
    {
        userId: "3",
        userName: "Igor",
        password: "krutoy",
        games: "134",
        wins: "81",
    },
    {
        userId: "4",
        userName: "Alex",
        password: "24.05.2009",
        games: "3",
        wins: "0",
    },
    {
        userId: "5",
        userName: "John",
        password: "america",
        games: "45",
        wins: "31",
    },
    {
        userId: "6",
        userName: "Oleg",
        password: "gazmanov",
        games: "22",
        wins: "11",
    },
    {
        userId: "7",
        userName: "Yan",
        password: "toples",
        games: "24",
        wins: "9",
    },
    {
        userId: "8",
        userName: "Sofy",
        password: "11111",
        games: "7",
        wins: "2",
    },
    {
        userId: "9",
        userName: "Masha",
        password: "bear",
        games: "55",
        wins: "2",
    },
    {
        userId: "10",
        userName: "Glasha",
        password: "00001",
        games: "19",
        wins: "14",
    }
];
;

export function postData(myValue) {
  const url = "https://fe.it-academy.by/AjaxStringStorage2.php";
  const requestName = "TsybulkoFinalProject";

  const saveSuccessHandler = (data) => {
    console.log(data);
  };

  const errorHandler = (jqXHR, statusStr, errorStr) => {
    console.error(statusStr + " " + errorStr);
  };

  $.ajax(url, {
    type: "POST",
    dataType: "text",
    data: { f: "INSERT", n: requestName, v: myValue },
    success: saveSuccessHandler,
    error: errorHandler,
  });

  const sp = new URLSearchParams();
  sp.append("f", "READ");
  sp.append("n", requestName);

  const options = { method: "POST", body: sp };
}


export function getData() {
  const url = "https://fe.it-academy.by/AjaxStringStorage2.php";
  const requestName = "TsybulkoFinalProject";

  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      cache: false,
      dataType: "json",
      data: { f: "READ", n: requestName },
      success: (data) => {
        resolve(data.result); 
      },
      error: (jqXHR, statusStr, errorStr) => {
        reject(statusStr + " " + errorStr);
      },
    });
  });
}

export function updateData(updatedValue) {
  const url = "https://fe.it-academy.by/AjaxStringStorage2.php";
  const requestName = "TsybulkoFinalProject";
  const password = "fishAndChips";

  const readSuccessHandler = (data) => {
    console.log(data.result);
  };

  const errorHandler = (jqXHR, statusStr, errorStr) => {
    console.error(statusStr + " " + errorStr);
  };

  $.ajax({
    url: url,
    type: "POST",
    cache: false,
    dataType: "json",
    data: { f: "LOCKGET", n: requestName, p: password },
    success: readSuccessHandler,
    error: errorHandler,
  });

  $.ajax({
    url: url,
    type: "POST",
    cache: false,
    dataType: "json",
    data: { f: "UPDATE", n: requestName, p: password, v: updatedValue },
    success: readSuccessHandler,
    error: errorHandler,
  });
}

// updateData(JSON.stringify(DATA));