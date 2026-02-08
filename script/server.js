const userExample = {
  userId: "number",
  userName: "string",
  password: "string",
  games: "number",
  wins: "number",
};

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

updateData(JSON.stringify([userExample]));