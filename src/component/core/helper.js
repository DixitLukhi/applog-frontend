const token = localStorage.getItem("Token");

export const header = {
    'Authorization': `Bearer ${token}`,
}

export const imageHeader = {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
}