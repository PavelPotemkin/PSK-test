import { ref } from "vue";

export function useSwitcher() {
  const isShow = ref(false);
  const hide = () => {
    isShow.value = false;
  };
  const show = () => {
    isShow.value = true;
  };

  return {
    isShow,
    hide,
    show,
  };
}
