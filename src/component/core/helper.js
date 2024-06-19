const token = localStorage.getItem("Token");

export const header = {
    'Authorization': `Bearer ${token}`,
}