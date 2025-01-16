export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
}

export async function postData<T>(url: string, data: any): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('An error occurred while posting the data.');
  }
  return res.json();
}

export async function putData<T>(url: string, data: any): Promise<T> {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('An error occurred while updating the data.');
  }
  return res.json();
}

export async function deleteData<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('An error occurred while deleting the data.');
  }
  return res.json();
}
