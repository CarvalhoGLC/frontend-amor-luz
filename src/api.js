const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export async function fetchMessages() {
  const res = await fetch(`${API_BASE_URL}/api/messages`);
  if (!res.ok) return [];
  const data = await parseJsonSafe(res);
  return Array.isArray(data) ? data : [];
}

export async function login(password) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(data.error || 'Senha incorreta.');
  }
  return data.token;
}

export async function createMessage(token, message) {
  const res = await fetch(`${API_BASE_URL}/api/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(message),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(data.error || 'Não foi possível publicar agora.');
  }
  return data;
}

export async function deleteMessage(token, id) {
  const res = await fetch(`${API_BASE_URL}/api/messages/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await parseJsonSafe(res);
    throw new Error(data.error || 'Não foi possível excluir a mensagem.');
  }
}

export async function fetchVideos() {
  const res = await fetch(`${API_BASE_URL}/api/videos`);
  if (!res.ok) return [];
  const data = await parseJsonSafe(res);
  return Array.isArray(data) ? data : [];
}

export async function createVideo(token, video) {
  const res = await fetch(`${API_BASE_URL}/api/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(video),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(data.error || 'Não foi possível adicionar o vídeo agora.');
  }
  return data;
}

export async function deleteVideo(token, id) {
  const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await parseJsonSafe(res);
    throw new Error(data.error || 'Não foi possível remover o vídeo.');
  }
}