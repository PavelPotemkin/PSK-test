import { ref } from "vue";

export function useLoading<T = unknown, D = unknown>(
  func: (args?: D) => Promise<T>,
  args?: D
) {
  const isLoading = ref<boolean>(true);
  const error = ref<unknown>(null);

  const fetchData = async () => {
    try {
      return await func(args);
    } catch (e: unknown) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    fetchData,
  };
}
