// Função para exibir os tópicos postados
function displayTopics() {
    const topicsContainer = document.getElementById('topicsContainer');
    topicsContainer.innerHTML = ''; // Limpa o conteúdo existente

    const topics = JSON.parse(localStorage.getItem('topics')) || [];

    // Verifica se há tópicos e os exibe
    if (topics.length > 0) {
        topics.forEach(topic => {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic';
            topicDiv.innerHTML = `
                <h3>${topic.title}</h3>
                <p>${topic.content}</p>
                <p>Postado por: <strong>${topic.username}</strong></p>
                <img src="${topic.profilePic}" alt="Foto do usuário" style="width: 50px; height: 50px;">
                <button onclick="deleteTopic(${topic.id})">Excluir Tópico</button>
            `;
            topicsContainer.appendChild(topicDiv);
        });
    } else {
        topicsContainer.innerHTML = '<p>Nenhum tópico postado ainda.</p>'; // Mensagem se não houver tópicos
    }
}

// Função para excluir um tópico
function deleteTopic(topicId) {
    const topics = JSON.parse(localStorage.getItem('topics')) || [];
    const updatedTopics = topics.filter(topic => topic.id !== topicId); // Filtra os tópicos para remover o que foi excluído
    localStorage.setItem('topics', JSON.stringify(updatedTopics)); // Atualiza o localStorage

    displayTopics(); // Re-exibe os tópicos
}

// Adicionando novos tópicos ao localStorage
document.getElementById('newTopicForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const title = document.getElementById('topicTitle').value;
    const content = document.getElementById('topicContent').value;

    const userData = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = userData[userData.length - 1]; // Considera o último usuário como o atual

    const topics = JSON.parse(localStorage.getItem('topics')) || [];
    const newTopic = {
        id: topics.length + 1,
        title: title,
        content: content,
        username: currentUser.username,
        profilePic: currentUser.profilePic
    };

    topics.push(newTopic);
    localStorage.setItem('topics', JSON.stringify(topics));

    // Atualiza a exibição dos tópicos
    displayTopics();

    // Limpa os campos do formulário
    document.getElementById('newTopicForm').reset();
});

// Chama a função para exibir os tópicos ao carregar a página
window.onload = displayTopics;
