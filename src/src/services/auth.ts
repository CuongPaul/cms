import apiClient from ".";

const signIn = async (body: { email: string; password: string }) => {
  const { data } = await apiClient({
    body,
    method: "POST",
    endpoint: "/sign-in",
  });

  return data;
};

const signOut = async () => {
  const { data } = await apiClient({ method: "POST", endpoint: "sign-out" });

  window.location.href = "/";
  localStorage.removeItem("accessToken");

  return data;
};

const refreshAccessToken = async () => {
  try {
    const { data } = await apiClient({
      method: "POST",
      allowRefresh: false,
      endpoint: "refresh-access-token",
    });

    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    return data;
  } catch {
    window.location.href = "/";
    localStorage.removeItem("accessToken");
  }
};

export { signIn, signOut, refreshAccessToken };
