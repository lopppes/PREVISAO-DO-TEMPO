function inicializarAplicativo() {
  const chaveDaApi = "97fb7a18656e4370a3d200851240604";
  const botaoDeBusca = document.querySelector(".btn-busca");

  botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value.trim();
    if (!cidade) {
      console.error("Por favor, insira o nome da cidade");
      return;
    }

    try {
      const dados = await buscarDadosDaCidade(cidade, chaveDaApi);
      if (dados) {
        preencherDadosNaTela(dados, cidade);
      } else {
        console.error("Não foi possível encontrar dados para a cidade especificada");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da cidade:", error);
    }
  });
}

async function buscarDadosDaCidade(cidade, chaveDaApi) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

  const resposta = await fetch(apiUrl);
  if (!resposta.ok) {
    throw new Error("Erro ao obter os dados da API");
  }

  return resposta.json();
}

function preencherDadosNaTela(dados, cidade) {
  const { current } = dados;
  const temperatura = current.temp_c;
  const condicao = current.condition.text;
  const humidade = current.humidity;
  const velocidadeDoVento = current.wind_kph;
  const iconeCondicao = current.condition.icon;

  document.getElementById("cidade").textContent = cidade;
  document.getElementById("temperatura").textContent = `${temperatura} ºC`;
  document.getElementById("condicao").textContent = condicao;
  document.getElementById("humidade").textContent = `${humidade}%`;
  document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento} km/h`;
  document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}

document.addEventListener("DOMContentLoaded", inicializarAplicativo);
