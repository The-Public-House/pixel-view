export const createInput = (id, className, labelText, type) => {
  const input = document.createElement("input");
  const label = document.createElement("label");
  
  input.id = id;
  input.type = type;
   
  label.for = id;
  
  label.appendChild(document.createTextNode(labelText));

  const div = document.createElement("div");
    
  div.appendChild(label);
  div.appendChild(input);

  return div;
};

export const createButton = (className, onClick, buttonText) => {
  const button = document.createElement("button");
  button.appendChild(document.createTextNode(buttonText));

  button.class = className;

  button.onclick = onClick;

  return button;
}

export const appendChilds = (father, childs) => childs.forEach(value => father.appendChild(value));

export const createTitle = (text) => {
  const title = document.createElement("h1");
  title.appendChild(document.createTextNode(text));
  return title;
};

export const baseUrl = "https://agriland11971.c42.integrator.host/services"

export const postHttp = async (endPoint, onSuccess, onFailed, onError, data) => {
  var request = new XMLHttpRequest(); 
  request.open('POST', `${baseUrl}${endPoint}`, true);
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      
      onSuccess(data);
    } else {
      onFailed();
    }
  };
  
  request.onerror = function() {
    onError();
  };
  
  request.send(JSON.stringify(data));
};

export const getHttp = async (endPoint, query, onSuccess, onFailed, onError) => {
  var request = new XMLHttpRequest(); 
  request.open('GET', `${baseUrl}${endPoint}${query ? `?${query}` : ''}`, true);
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      
      onSuccess(data);
    } else {
      onFailed();
    }
  };
  
  request.onerror = function() {
    onError();
  };
  
  request.send(JSON.stringify());
}

export const constructData = (values) => values.map(
    value => ({ [value]: document.getElementById(value).value })
  );