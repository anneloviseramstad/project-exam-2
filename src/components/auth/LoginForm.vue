<script>
import { useUserStore } from "../../store/userStore";
const userStore = useUserStore();

async function handleLogin() {
  try {
    await userStore.login({ email, password });
    router.push("/profile");
  } catch (err) {
    console.error(err);
  }
}
</script>

<template></template>
