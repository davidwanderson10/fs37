async function buscar(cep) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const dados = await response.json();
    console.log(dados);
  } catch (e) {
    console.error(e);
  }
}

buscar('60831350')